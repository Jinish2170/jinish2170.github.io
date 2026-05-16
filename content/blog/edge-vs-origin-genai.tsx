import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "edge-vs-origin-genai",
  title: "Edge vs Origin for GenAI Apps: When Cloudflare Workers Actually Win",
  description:
    "Edge runtimes are advertised as the future of every web app. For GenAI specifically, they're a great fit for some shapes and a terrible fit for others. Here's the honest decision matrix.",
  date: "2025-06-28",
  updated: "2025-12-18",
  tags: ["Edge", "Cloudflare Workers", "Vercel Edge", "Architecture", "GenAI"],
  category: "AI Security",
  readingTime: 8,
  tldr:
    "Edge wins when your work is light proxy logic, short-lived AI calls under 30 seconds, or geo-distributed access to small models/embeddings. Origin wins when you need long-running streams, large model weights, GPU access, or rich Node ecosystem APIs.",
  faq: [
    {
      q: "Can I run my LLM API gateway on Cloudflare Workers?",
      a: "Yes — and it's a great use case. Auth, rate-limiting, request shaping, and forwarding to an LLM provider all fit in Workers' execution budget. The latency improvement vs an origin proxy is meaningful when your users are global.",
    },
    {
      q: "Can I host a model itself on the edge?",
      a: "Small ones, yes — Workers AI hosts curated open-weight models with GPU backing in their network. For your own model, the answer is no in any practical sense; edge runtimes don't ship with PyTorch or GPU access. Use origin for self-hosted models.",
    },
    {
      q: "What about Vercel Edge Functions for AI streaming?",
      a: "Works well for short streams (under 60s on most plans, configurable). The Web Streams API is well-supported. Watch out for execution time limits on long generations — they'll truncate without warning. Test your worst case.",
    },
  ],
  related: [
    "streaming-llm-responses",
    "cost-optimizing-llm-inference",
    "notebook-to-production-ml",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Every infrastructure pitch in 2024 was &ldquo;move it to the
        edge.&rdquo; For most web apps, that&rsquo;s reasonable. For GenAI
        apps specifically, the answer is more nuanced. Edge runtimes have
        constraints that are non-issues for static sites and showstoppers
        for some AI workloads.
      </p>
      <p>
        I&rsquo;ve shipped GenAI features on Cloudflare Workers, Vercel
        Edge Functions, and standard Node origins. Each has shapes where
        it&rsquo;s clearly the right choice. Here&rsquo;s the honest
        decision matrix.
      </p>

      <h2 id="what-edge-is-good-at">Where edge wins</h2>
      <h3 id="gateway-layer">Gateway / proxy layer</h3>
      <p>
        Your LLM gateway&mdash;the thing that handles auth, rate-limiting,
        logging, request shaping, and routing to the actual LLM
        provider&mdash;is a perfect edge workload. The work is light,
        latency-sensitive, and benefits from being near the user. A
        global Cloudflare Worker serves these requests in single-digit
        milliseconds of overhead, vs. 50&ndash;200ms from a single-region
        origin.
      </p>
      <p>
        The pattern: edge worker accepts the user request, validates,
        rate-limits, then opens a streaming connection to OpenAI /
        Anthropic / etc. and pipes the response back. The expensive
        work (the LLM call) is happening in some other cloud&rsquo;s
        datacenter regardless; the edge optimization is everything that
        happens before and around it.
      </p>

      <h3 id="rag-retrieval">Lightweight retrieval</h3>
      <p>
        Edge databases (Cloudflare D1, Vectorize, Turso) make it
        possible to do embedding lookup at the edge for small corpora.
        For a docs-search use case where the index fits in 100MB and
        you want users worldwide to get sub-100ms retrieval, edge
        retrieval is genuinely magical.
      </p>
      <p>
        For larger corpora, this falls apart fast. Edge databases
        aren&rsquo;t designed for millions of vectors with complex
        metadata filtering. Stay on origin for those.
      </p>

      <h3 id="auth-and-session">Auth and session handling</h3>
      <p>
        Validating JWTs, looking up session tokens, checking rate limits
        per user&mdash;all fast, stateless work that benefits from being
        close to the user. Edge handles this beautifully and frees your
        origin from the boilerplate.
      </p>

      <Callout label="The composition pattern">
        The cleanest GenAI architecture in 2026 looks like: edge handles
        auth, rate-limit, request validation, and proxies to either the
        LLM provider directly or to an origin service. Origin handles
        anything that doesn&rsquo;t fit in edge constraints. Each layer
        does what it&rsquo;s good at.
      </Callout>

      <h2 id="where-edge-loses">Where edge loses</h2>
      <h3 id="long-running-streams">Long-running streams (over execution limits)</h3>
      <p>
        Edge runtimes have execution time limits&mdash;30s on Workers
        free, longer on paid, 60s default on Vercel Edge. LLM streams can
        run longer for complex generations, especially with reasoning
        models. If your stream might exceed the limit, the edge runtime
        kills it silently mid-response and your user sees a broken UI.
      </p>
      <p>
        Mitigations: check provider durations and pick edge tiers
        accordingly. For unbounded streams, originate or use a
        Durable Object pattern that can outlive a single request.
      </p>

      <h3 id="large-models">Self-hosted models</h3>
      <p>
        Edge runtimes don&rsquo;t ship with PyTorch, ONNX Runtime, or
        GPU access. If your AI is a model you host (not a model you
        call via API), edge is not your platform. Cloudflare Workers AI
        is the exception&mdash;they expose specific curated models with
        GPU backing through a managed API, but you can&rsquo;t bring
        your own weights.
      </p>

      <h3 id="rich-node-deps">Heavy Node ecosystem</h3>
      <p>
        Edge runtimes implement a subset of Node APIs. Native modules
        don&rsquo;t work. <code>fs</code> and <code>child_process</code>{" "}
        don&rsquo;t exist. Some popular libraries (Prisma in some
        configurations, sharp, anything with native bindings) don&rsquo;t
        load. The compatibility surface is improving but not yet 100%.
      </p>

      <h3 id="connection-pooling">Database connection pooling</h3>
      <p>
        Edge functions are ephemeral and globally distributed. Each
        invocation can hit a different region. Traditional connection
        pools don&rsquo;t apply&mdash;you&rsquo;d open and close a
        connection per invocation, which kills your database.
      </p>
      <p>
        Solutions: use a connection pooler (Prisma Accelerate, Hyperdrive,
        PgBouncer in front) or a database designed for edge access
        patterns (Turso, PlanetScale, Neon with their HTTP driver). Or
        just put data access on the origin and call origin from edge for
        DB work.
      </p>

      <h2 id="decision-table">A quick decision table</h2>
      <table>
        <thead>
          <tr>
            <th>Workload</th>
            <th>Edge</th>
            <th>Origin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LLM API gateway (proxy + auth + rate limit)</td>
            <td>✅ ideal</td>
            <td>OK</td>
          </tr>
          <tr>
            <td>Streaming LLM response forwarding</td>
            <td>✅ if &lt; execution limit</td>
            <td>✅ for any duration</td>
          </tr>
          <tr>
            <td>Small global vector retrieval</td>
            <td>✅ ideal</td>
            <td>OK</td>
          </tr>
          <tr>
            <td>Large vector DB queries</td>
            <td>❌</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>Self-hosted model inference</td>
            <td>❌</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>Complex multi-step agent pipelines</td>
            <td>❌</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>Background jobs (batch embedding, training)</td>
            <td>❌</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>WebSocket session for voice / collab</td>
            <td>⚠ Durable Objects</td>
            <td>✅</td>
          </tr>
        </tbody>
      </table>

      <h2 id="closing">Closing: hybrid is the answer</h2>
      <p>
        The dichotomy &ldquo;edge or origin&rdquo; is wrong. Mature GenAI
        apps use both. Edge for the surface layer&mdash;auth, routing,
        cheap retrieval, gateway logic. Origin for the heavy
        lifting&mdash;long streams, large models, batch processing,
        complex orchestration. Pick the right shape for each piece;
        the answer to which is right depends on the piece, not the app.
      </p>
    </>
  )
}
