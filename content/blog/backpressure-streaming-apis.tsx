import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "backpressure-streaming-apis",
  title: "Backpressure in Streaming APIs: The Pattern Most Tutorials Skip",
  description:
    "Streaming APIs that don't implement backpressure look fine in development and fall over in production. The mechanics matter; the patterns are well-known and rarely applied.",
  date: "2025-09-04",
  updated: "2026-02-12",
  tags: ["Streaming", "Backend", "Node.js", "Distributed Systems"],
  category: "Backend Systems",
  readingTime: 7,
  tldr:
    "Backpressure is what stops a fast producer from melting a slow consumer. Use AsyncIterators with await on writes, set timeouts, detect disconnects, and stop the upstream when you do. The shape of the bug is always the same: memory grows, latency degrades, then everything stops.",
  faq: [
    {
      q: "What is backpressure in plain terms?",
      a: "The mechanism by which a slow consumer signals to a fast producer to slow down. Without it, the producer keeps producing, the consumer can't keep up, and data buffers indefinitely until you run out of memory or a timeout fires.",
    },
    {
      q: "Does Node.js handle backpressure automatically?",
      a: "Streams in Node handle it if you use them correctly — meaning you await write() return values and use pipeline()/pipe() rather than manual pumping. Most homegrown streaming code skips these and ends up bypassing the built-in machinery.",
    },
    {
      q: "Is backpressure relevant for LLM streaming?",
      a: "Yes, but in the opposite direction from most tutorials. The LLM is the slow producer (50-100 tokens/sec) and the client is usually fast. The real backpressure problem is slow clients holding open upstream LLM connections that cost money. Detect slow consumers and cancel upstream.",
    },
  ],
  related: [
    "streaming-llm-responses",
    "idempotency-keys-llm-apis",
    "observability-ai-pipelines",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Streaming APIs look easy in tutorials because the demo always has
        a fast consumer and unlimited memory. Production has neither.
        Without backpressure, your streaming endpoint works on day one,
        works in load tests, and falls over the first time a real user
        with a flaky mobile connection hits it.
      </p>

      <h2 id="the-shape-of-the-bug">The shape of the bug</h2>
      <p>
        Producer is faster than consumer. Bytes go into a buffer. Buffer
        grows. Memory pressure increases. GC pauses lengthen. Latency on
        other requests degrades. Eventually OOM, or a timeout fires
        somewhere upstream and the whole stream is killed mid-response.
      </p>
      <p>
        The shape is the same whether you&rsquo;re streaming logs,
        database rows, or LLM tokens. The mechanism is universal; only
        the rates change.
      </p>

      <h2 id="backpressure-in-node">Backpressure the Node way</h2>
      <p>
        Node&rsquo;s streams have built-in backpressure. The trick is
        using them correctly. The two patterns that work:
      </p>
      <h3 id="pipeline">pipeline()</h3>
      <p>
        For wiring two streams together, <code>stream.pipeline()</code>{" "}
        handles backpressure automatically. The destination signals when
        it can&rsquo;t take more, the source pauses. Use this whenever
        possible:
      </p>
      <pre>
        <code>{`import { pipeline } from 'stream/promises'

await pipeline(
  sourceStream,           // could be DB cursor, HTTP body, etc.
  transformStream,
  destinationStream       // could be HTTP response
)`}</code>
      </pre>

      <h3 id="async-iterators">AsyncIterators with awaited writes</h3>
      <p>
        For LLM streaming where you&rsquo;re iterating manually, the
        pattern is: await every write. If <code>res.write()</code> returns{" "}
        <code>false</code>, it&rsquo;s telling you the buffer is full and
        you should wait. Most homegrown code ignores the return value and
        loses backpressure entirely.
      </p>
      <pre>
        <code>{`for await (const chunk of llmStream) {
  const event = \`data: \${JSON.stringify({ value: chunk })}\\n\\n\`
  if (!res.write(event)) {
    // Backpressure: wait for drain before continuing
    await new Promise(resolve => res.once('drain', resolve))
  }
}`}</code>
      </pre>

      <h2 id="client-disconnect">Detect client disconnect, cancel upstream</h2>
      <p>
        The most expensive backpressure failure in LLM streaming is the
        slow client that holds the connection open while you burn upstream
        tokens. The fix is to listen for the client closing the connection
        and cancel your upstream call when it does.
      </p>
      <pre>
        <code>{`const ac = new AbortController()

req.on('close', () => {
  if (!res.writableEnded) ac.abort('client-closed')
})

const llmStream = await openai.chat.completions.create({
  ...
}, { signal: ac.signal })

try {
  for await (const chunk of llmStream) {
    if (ac.signal.aborted) break
    if (!res.write(...)) await drain(res)
  }
} catch (err) {
  if (err.name === 'AbortError') return // expected
  throw err
}`}</code>
      </pre>

      <Callout label="The proxy buffering trap">
        Even with perfect backpressure code, nginx will buffer your
        stream by default and the user will see nothing for 30 seconds,
        then everything at once. Set <code>X-Accel-Buffering: no</code>{" "}
        in your response headers. Cloudflare and most CDNs respect this.
      </Callout>

      <h2 id="timeouts-as-backstop">Timeouts as a backstop</h2>
      <p>
        Backpressure logic is best-effort. As a backstop, every long-lived
        connection should have a maximum lifetime and a per-chunk write
        timeout. If a single write hasn&rsquo;t completed in 10 seconds,
        the client is gone and you should bail.
      </p>
      <pre>
        <code>{`function writeWithTimeout(res, chunk, ms = 10000) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('write-timeout')), ms)
    const ok = res.write(chunk, (err) => {
      clearTimeout(t)
      err ? reject(err) : resolve(ok)
    })
    if (!ok) res.once('drain', () => { clearTimeout(t); resolve(true) })
  })
}`}</code>
      </pre>

      <h2 id="testing-it">Testing backpressure</h2>
      <p>
        Backpressure bugs hide because development is fast. The way to
        flush them out:
      </p>
      <ul>
        <li>
          Use <code>tc</code> or <code>toxiproxy</code> to simulate slow
          clients in tests.
        </li>
        <li>
          Run a load test with one slow consumer alongside many fast ones.
          Watch memory.
        </li>
        <li>
          Disconnect mid-stream in integration tests. Assert that upstream
          is canceled and memory doesn&rsquo;t grow.
        </li>
      </ul>

      <h2 id="closing">Closing</h2>
      <p>
        Backpressure is one of those quiet engineering details that
        separates code that works at scale from code that doesn&rsquo;t.
        It&rsquo;s not glamorous. It&rsquo;s not a feature anyone notices.
        It&rsquo;s the reason your server doesn&rsquo;t fall over when the
        first 1% of users with bad connections show up. Build it in; the
        cost is small and the alternative is debugging memory pressure at
        3am.
      </p>
    </>
  )
}
