import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "idempotency-keys-llm-apis",
  title: "Idempotency Keys for AI APIs: Resilient Pipelines at Scale",
  description:
    "Network failures + non-deterministic LLM calls = duplicate generations the user paid for twice. Idempotency keys solve it. Here's how the pattern works for AI workloads specifically.",
  date: "2025-10-10",
  updated: "2026-03-08",
  tags: ["Idempotency", "Backend", "LLM", "Distributed Systems"],
  category: "Backend Systems",
  readingTime: 8,
  tldr:
    "Add a client-provided idempotency key to every LLM API request. Hash it, store the response, return the same response on retry. Without this, network failures mid-LLM-call cost you money and create duplicate outputs.",
  faq: [
    {
      q: "Why do LLM APIs need idempotency more than regular APIs?",
      a: "Because the operation is expensive and non-idempotent by nature. A retried POST /api/users might create a duplicate user (annoying). A retried POST /api/chat creates a duplicate $0.30 generation (expensive) and a duplicate output (broken UX).",
    },
    {
      q: "How long should I cache idempotency responses?",
      a: "Stripe's standard is 24 hours and that's a good default. The window has to be longer than the worst-case retry window of any reasonable client (mobile clients with bad networks can take minutes), but not so long that you cache stale results indefinitely.",
    },
    {
      q: "What goes wrong if a client sends the same idempotency key with different payloads?",
      a: "That's a client bug — they're treating two different operations as one. The right behavior is to return a 422 error so the client realizes the mismatch, not to silently overwrite or serve the original response. Stripe does this; you should too.",
    },
  ],
  related: [
    "jwt-refresh-token-rotation",
    "streaming-llm-responses",
    "backpressure-streaming-apis",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Here&rsquo;s a sequence that&rsquo;s playing out right now in
        production AI apps you&rsquo;ve used: client makes a POST to an
        LLM endpoint, the response is taking a while, mobile network
        hiccups, the request times out at the proxy layer, the client
        retries. The server, meanwhile, was halfway through generating
        the response. Now it&rsquo;s generating a second one.
      </p>
      <p>
        You just paid for two LLM calls instead of one. Worse, if the
        client is showing the response inline, it might display both,
        rendering twice or rendering the older one over the newer one.
      </p>
      <p>
        Idempotency keys are the fix. Stripe popularized the pattern for
        payments; the same pattern works perfectly for LLM APIs, where
        the cost-per-call and side-effect-on-retry make it especially
        valuable.
      </p>

      <h2 id="how-the-pattern-works">How the pattern works</h2>
      <ol>
        <li>
          The client generates a unique ID for each logical operation
          (UUID v4, ULID, anything random and stable).
        </li>
        <li>
          The client sends that ID in an <code>Idempotency-Key</code>{" "}
          header on the request.
        </li>
        <li>
          On the server, before processing, look up that key in a cache.
          If you have a stored response, return it immediately.
        </li>
        <li>
          If you don&rsquo;t, process the request, store the response
          alongside the key, then return it.
        </li>
        <li>
          On retry with the same key, the server returns the cached
          response. No duplicate processing, no duplicate cost.
        </li>
      </ol>

      <h2 id="store-the-right-thing">Store the right thing</h2>
      <p>
        The naive version stores just the response body. That&rsquo;s
        almost right. You also want to store:
      </p>
      <ul>
        <li>
          <strong>Status code.</strong> Retries should see the original
          status, not a fresh 200 wrapping a stored 500.
        </li>
        <li>
          <strong>Response headers</strong> that matter (rate limit
          headers, custom IDs).
        </li>
        <li>
          <strong>A hash of the request payload.</strong> If the client
          sends the same key with a different body, return 422&mdash;they
          have a bug.
        </li>
        <li>
          <strong>A timestamp.</strong> So you can expire keys after a
          window.
        </li>
        <li>
          <strong>A &ldquo;processing&rdquo; flag.</strong> The first
          request marks the key as in-flight; concurrent retries wait or
          return 409 rather than starting parallel processing.
        </li>
      </ul>
      <pre>
        <code>{`-- idempotency table
CREATE TABLE idempotency (
  key            TEXT PRIMARY KEY,
  payload_hash   TEXT NOT NULL,
  status         INT,                 -- null while in-flight
  response_body  JSONB,
  response_headers JSONB,
  processing     BOOLEAN DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at     TIMESTAMPTZ NOT NULL DEFAULT now() + interval '24 hours'
);

CREATE INDEX ON idempotency (expires_at);`}</code>
      </pre>

      <h2 id="concurrent-retries">The concurrent retry race</h2>
      <p>
        What happens if the client times out at 3 seconds, retries, and
        the original request is still processing? Without care, you now
        have two concurrent processings, both about to write the response
        and create the bug you were trying to avoid.
      </p>
      <p>
        The fix is a database-level upsert with conditional behavior:
      </p>
      <pre>
        <code>{`-- Atomic: insert if not exists, or read existing
INSERT INTO idempotency (key, payload_hash, processing)
VALUES ($1, $2, true)
ON CONFLICT (key) DO NOTHING
RETURNING key;

-- If RETURNING returns nothing, the key existed already.
-- Look it up to decide what to do.`}</code>
      </pre>
      <p>
        Three cases on the second request:
      </p>
      <ol>
        <li>
          Original is still processing &rarr; return 409 Conflict (client
          should wait and retry, with backoff).
        </li>
        <li>
          Original completed &rarr; return the stored response.
        </li>
        <li>
          Original failed permanently &rarr; return the stored error
          response. Yes, you return errors too&mdash;the client must see
          a consistent answer for the same idempotency key.
        </li>
      </ol>

      <Callout label="What about streaming responses?">
        For streaming endpoints, idempotency is trickier. Store the
        completed stream after it finishes, keyed by idempotency key.
        On retry: if the stream completed, replay it as a new stream
        (or as a single non-streaming response&mdash;your call). If
        it&rsquo;s still streaming, return 409. The pattern is the same,
        the storage is heavier.
      </Callout>

      <h2 id="ttl">TTL: how long to remember</h2>
      <p>
        Stripe&rsquo;s standard is 24 hours. That works for almost
        everything. Considerations:
      </p>
      <ul>
        <li>
          Long enough that mobile clients with bad networks finish their
          retry loop (often minutes).
        </li>
        <li>
          Short enough that storage doesn&rsquo;t grow unboundedly.
        </li>
        <li>
          Short enough that stale responses don&rsquo;t leak between
          unrelated user sessions if a key happens to collide (it
          shouldn&rsquo;t, with UUIDs, but defense in depth).
        </li>
      </ul>
      <p>
        A daily cron that deletes rows past <code>expires_at</code> is
        the whole expiry mechanism. Don&rsquo;t bother with TTL columns
        in Redis if you&rsquo;re using a real DB&mdash;the visibility
        and audit value of a SQL table is worth more than the
        operational simplicity.
      </p>

      <h2 id="client-side">Client-side: where the keys come from</h2>
      <p>
        Generate the key on the client when the user initiates an action
        and store it in component state. If the user&rsquo;s action
        triggers a retry (button click, network reconnect, whatever),
        reuse the same key. The key represents the logical
        operation&mdash;not the network attempt.
      </p>
      <pre>
        <code>{`// In your client
async function sendMessage(text) {
  // One key per logical send, persisted while the message is in flight
  const idempotencyKey = crypto.randomUUID()

  while (!done) {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey
        },
        body: JSON.stringify({ text })
      })
      // Handle response...
      done = true
    } catch (err) {
      await backoff()
      // retry uses the same key
    }
  }
}`}</code>
      </pre>

      <h2 id="combine-with">Combine with: dedup-on-server</h2>
      <p>
        Even with idempotency keys, you might want a secondary
        deduplication on the server side using a content hash for
        completely different reasons (caching, billing). The two layers
        don&rsquo;t conflict&mdash;idempotency handles &ldquo;same logical
        request retried&rdquo;; content dedup handles &ldquo;same input
        from different requests.&rdquo;
      </p>
      <p>
        For LLM APIs specifically, idempotency keys + semantic caching is
        the combination that keeps your bill predictable and your retry
        logic honest. Both are cheap to implement and pay back the
        engineering time the first time a customer&rsquo;s app retries a
        long generation.
      </p>
    </>
  )
}
