import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "streaming-llm-responses",
  title: "Streaming LLM Responses: The Backend Engineering Behind Token-by-Token UX",
  description:
    "Token streaming is what makes ChatGPT feel fast. It's also where most homegrown LLM apps quietly break — connection management, backpressure, error mid-stream, and the eval gap.",
  date: "2026-03-22",
  updated: "2026-05-08",
  tags: ["LLM", "Streaming", "SSE", "Backend", "WebSockets"],
  category: "GenAI Engineering",
  readingTime: 10,
  tldr:
    "Streaming LLM responses well is mostly about handling failure mid-stream, not about emitting tokens fast. SSE is the right default; WebSockets only when you need bidirectional. Most apps get the happy path right and the failure modes catastrophically wrong.",
  faq: [
    {
      q: "Should I use Server-Sent Events or WebSockets for LLM streaming?",
      a: "SSE for almost everything. It's unidirectional (which is what LLM responses actually are), reconnects automatically, works through HTTP, and has zero handshake overhead. Use WebSockets only when you genuinely need bidirectional communication mid-stream, like canceling a generation or supporting voice.",
    },
    {
      q: "What happens if my LLM provider fails halfway through a response?",
      a: "By default, your user sees a half-finished message and nothing happens. The right behavior is to detect the stream interruption, emit a structured error event to the client, and either retry from the last assistant token or surface a recoverable error. Build for this from day one — it will happen.",
    },
    {
      q: "How do I handle backpressure when the LLM streams faster than my consumer can render?",
      a: "It's rarely the bottleneck — LLMs emit at ~50-100 tokens/sec which any modern frontend can render. The real backpressure issue is the other direction: clients with bad connections that can't accept fast enough, and your server holding the upstream connection open. Use a small buffer with a timeout and cancel upstream if the client falls behind.",
    },
  ],
  related: [
    "production-rag-pipeline",
    "backpressure-streaming-apis",
    "observability-ai-pipelines",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Token streaming is the difference between a chat that feels alive
        and one that feels like a form submission. It&rsquo;s also where
        most homegrown LLM apps quietly fall apart&mdash;not in the happy
        path, where tokens flow nicely, but in the failure modes nobody
        tested.
      </p>

      <h2 id="why-streaming">Why streaming, and what you&rsquo;re actually doing</h2>
      <p>
        A non-streaming LLM call waits for the full response, then sends
        it. Time-to-first-byte equals time-to-last-byte equals 5&ndash;30
        seconds. For anything conversational, that feels broken.
      </p>
      <p>
        Streaming sends each token as it&rsquo;s generated. First byte hits
        the user in 200&ndash;800ms regardless of total response length.
        Same total latency, perceived latency cut by 80%. This is not a
        nice-to-have for chat UIs&mdash;it&rsquo;s table stakes.
      </p>

      <h2 id="sse-vs-websockets">SSE vs WebSockets, and why SSE wins</h2>
      <p>
        For LLM streaming specifically, Server-Sent Events is the right
        choice for almost every use case. Here&rsquo;s the comparison
        engineers should actually care about:
      </p>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>SSE</th>
            <th>WebSockets</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Direction</td>
            <td>Server &rarr; Client</td>
            <td>Bidirectional</td>
          </tr>
          <tr>
            <td>Transport</td>
            <td>HTTP/1.1+</td>
            <td>Custom (ws://)</td>
          </tr>
          <tr>
            <td>Reconnection</td>
            <td>Built-in</td>
            <td>You write it</td>
          </tr>
          <tr>
            <td>Proxies / CDN</td>
            <td>Works out of the box</td>
            <td>Often broken without config</td>
          </tr>
          <tr>
            <td>Auth</td>
            <td>Same headers as HTTP</td>
            <td>Special handshake</td>
          </tr>
        </tbody>
      </table>
      <p>
        LLM responses are inherently unidirectional. The client sends a
        prompt, the server streams a response. Picking WebSockets for this
        is over-engineering and you&rsquo;ll regret it when you debug your
        first proxy issue.
      </p>
      <p>
        Use WebSockets when you have a real bidirectional need&mdash;voice
        streaming, mid-generation cancellation that has to round-trip
        fast, multi-user collaboration on a single stream. Otherwise: SSE.
      </p>

      <Callout label="Edge consideration">
        Cloudflare Workers, Vercel Edge, and most serverless platforms
        handle SSE natively but have execution time limits. Long-running
        LLM calls (over 30s) often hit these limits silently. Test with
        your worst-case prompt before you ship.
      </Callout>

      <h2 id="the-event-protocol">Design your event protocol like an API, not a stream</h2>
      <p>
        A naive SSE stream sends raw tokens. That&rsquo;s fine for a
        demo. In production you want a typed event protocol that lets you
        distinguish&mdash;on the client&mdash;between a token, a tool
        invocation, a citation, a thinking-update, an error, and a
        completion.
      </p>
      <pre>
        <code>{`// Server emits typed events
data: {"type":"token","value":"Hello"}\\n\\n
data: {"type":"token","value":" world"}\\n\\n
data: {"type":"citation","docId":"d-42","range":[0,11]}\\n\\n
data: {"type":"tool_call","name":"search","args":{"q":"weather"}}\\n\\n
data: {"type":"done","stopReason":"end_turn","usage":{"in":42,"out":18}}\\n\\n`}</code>
      </pre>
      <p>
        The cost is small (a JSON wrapper per token) and the benefits are
        large: typed clients, richer UIs, instrumentation hooks, the
        ability to add features later without breaking the wire format.
      </p>

      <h2 id="failure-mid-stream">Failure mid-stream is the hard part</h2>
      <p>
        The happy path is well-documented. What separates production
        systems from prototypes is what happens when the stream
        breaks&mdash;and it will break.
      </p>
      <p>Four failure modes you must handle:</p>
      <ol>
        <li>
          <strong>Upstream LLM provider errors mid-stream.</strong> The
          OpenAI/Anthropic/Gemini API was streaming fine and then sent an
          error event. You need to forward this to the client as a typed
          error, not silently truncate the message.
        </li>
        <li>
          <strong>Network failure between your server and the LLM.</strong>{" "}
          TCP reset, timeout, DNS hiccup. You&rsquo;ve already streamed half
          the response to the user. Don&rsquo;t restart from scratch;
          surface a recoverable error or attempt resumption.
        </li>
        <li>
          <strong>Client disconnects mid-stream.</strong> User closed the
          tab, lost wifi, navigated away. Your server is still consuming
          upstream tokens at full cost. Detect disconnect and cancel
          upstream immediately, or you&rsquo;re burning money for nobody.
        </li>
        <li>
          <strong>Content filtering trips mid-stream.</strong> The provider
          decides three sentences in that the response violates a policy
          and cuts off. Your UI shouldn&rsquo;t look broken; it should
          surface a clean &ldquo;response stopped by safety filter&rdquo;
          state.
        </li>
      </ol>

      <h3 id="canceling-upstream">Canceling upstream when client disconnects</h3>
      <p>
        This one is missed by most implementations and it costs real money.
        The pattern in Node:
      </p>
      <pre>
        <code>{`app.get('/api/chat', async (req, res) => {
  const ac = new AbortController()

  // Forward client disconnect to upstream
  req.on('close', () => ac.abort())

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('X-Accel-Buffering', 'no') // nginx: don't buffer

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    stream: true,
  }, { signal: ac.signal })

  for await (const chunk of stream) {
    if (ac.signal.aborted) break
    const delta = chunk.choices[0]?.delta?.content
    if (delta) res.write(\`data: \${JSON.stringify({ type: 'token', value: delta })}\\n\\n\`)
  }

  res.write('data: [DONE]\\n\\n')
  res.end()
})`}</code>
      </pre>
      <p>
        The <code>X-Accel-Buffering: no</code> header is the one most
        people miss. Without it, nginx buffers your stream and the user
        sees a 30-second pause followed by the full response at once. The
        feature is broken, the bug is invisible until you put nginx in
        front.
      </p>

      <h2 id="backpressure">Real backpressure: slow clients</h2>
      <p>
        The backpressure direction most tutorials worry about (LLM faster
        than consumer) is rarely a real problem&mdash;LLMs emit at maybe
        100 tokens/sec, any modern browser handles that easily.
      </p>
      <p>
        The real problem is the opposite direction: a client with a flaky
        mobile connection can&rsquo;t accept the stream fast enough, the
        TCP write buffer fills up, and your server thread is now blocked
        waiting on a write that may never complete. Meanwhile your upstream
        LLM bill is ticking.
      </p>
      <p>
        Solutions in order of complexity:
      </p>
      <ul>
        <li>
          Set a write timeout. If the client hasn&rsquo;t accepted the next
          chunk in 10 seconds, treat as disconnect and cancel upstream.
        </li>
        <li>
          Use HTTP/2 if you can. Per-stream flow control means a slow
          client doesn&rsquo;t block your entire connection pool.
        </li>
        <li>
          For high-fan-out broadcast scenarios (rare for LLM apps), use a
          message-queue intermediary so the LLM stream completes and is
          delivered to slow clients on their own schedule.
        </li>
      </ul>

      <h2 id="instrumentation">Instrumentation is non-negotiable</h2>
      <p>
        Every streamed response should emit a structured log line at
        completion with: time-to-first-token, total stream duration, total
        tokens in/out, stop reason (done / error / cancel / safety), and
        client disconnect status. Without these you can&rsquo;t answer
        basic questions like &ldquo;is our LLM latency degrading?&rdquo;
        or &ldquo;what fraction of streams are getting cancelled?&rdquo;
      </p>
      <p>
        Time-to-first-token is the metric that most directly correlates
        with perceived quality. Track it as a percentile, not an average.
        Average TTFT hides the 5% of users seeing 4-second waits.
      </p>

      <h2 id="closing">Closing notes</h2>
      <p>
        Streaming sounds like a transport detail and is actually a product
        decision. It changes how users perceive your AI feature, but it
        also changes your operational surface area substantially. Build it
        with the failure modes in mind and it stays a feature. Build it
        for the demo and you&rsquo;ll discover the failure modes in
        production with an audience.
      </p>
    </>
  )
}
