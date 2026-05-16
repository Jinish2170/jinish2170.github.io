import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "cost-optimizing-llm-inference",
  title: "Cost-Optimizing LLM Inference: Caching, Batching, and Model Routing",
  description:
    "LLM bills go from 'cheap' to 'crisis' faster than any cloud cost line. The techniques to control them are well-known but rarely applied early enough. Here's the operational playbook.",
  date: "2026-01-08",
  updated: "2026-04-15",
  tags: ["LLM", "Cost", "Caching", "Inference", "GenAI"],
  category: "GenAI Engineering",
  readingTime: 9,
  tldr:
    "Three levers control LLM cost: caching, batching, and model routing. Apply them in that order. Most apps can cut inference bills by 60-80% with these alone — before touching prompt engineering or quantization.",
  faq: [
    {
      q: "What's the highest-impact thing I can do to reduce LLM costs?",
      a: "Semantic caching. Caching exact-match queries is table stakes; semantic caching (matching queries that mean the same thing) catches 20-40% additional hits in most real apps. The cache hit pays nothing to the LLM provider and returns in milliseconds.",
    },
    {
      q: "Is it worth running my own model to save costs?",
      a: "Only at scale. Self-hosting open-weight models (Llama, Mistral) saves money but costs engineering time, GPU ops burden, and quality trade-offs. The crossover is usually 10M+ tokens/day of consistent traffic. Below that, model routing on managed APIs is more efficient.",
    },
    {
      q: "How much do prompt caching features (Anthropic, OpenAI) actually save?",
      a: "For RAG with long retrieved context, 50-90% of input token costs when used correctly. The catch is that you need cache hits to amortize the write cost, and the cached prefix has to be stable. Most teams misuse it by varying the cached portion.",
    },
  ],
  related: [
    "streaming-llm-responses",
    "production-rag-pipeline",
    "edge-vs-origin-genai",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Nothing scales a cloud bill faster than an LLM feature that takes
        off. Token costs that looked negligible in beta turn into a line
        item the CFO asks about three months later. The mistake teams make
        is treating cost as a problem to solve later. By the time it&rsquo;s
        a problem, the architectural choices that locked you in are months
        old.
      </p>
      <p>
        Three techniques control most of the cost: caching, batching, and
        model routing. Applied in that order, they compound. None require
        sophisticated infrastructure or ML expertise; they require
        discipline and being honest about traffic patterns.
      </p>

      <h2 id="caching">Caching: the free 50%</h2>
      <p>
        LLM caching has two flavors and you need both:
      </p>
      <h3 id="exact-match">Exact-match cache</h3>
      <p>
        Hash the full input (system prompt + user message + context). If
        you&rsquo;ve seen this exact input in the last N hours, return the
        cached response. This catches 10&ndash;30% of real-world traffic in
        most apps because users ask the same thing repeatedly and apps
        have user-action triggered LLM calls that fire on identical inputs.
      </p>
      <p>
        Implementation is a Redis <code>GET</code> and <code>SETEX</code>{" "}
        with a TTL that matches your content freshness. Cost: trivial.
        Engineering time: an afternoon.
      </p>

      <h3 id="semantic-cache">Semantic cache</h3>
      <p>
        Two queries that mean the same thing should hit the same cached
        answer. &ldquo;How do I reset my password&rdquo; and &ldquo;I
        forgot my password, what now&rdquo; are semantically identical
        but won&rsquo;t exact-match. Semantic cache catches the additional
        20&ndash;40% of traffic.
      </p>
      <p>Mechanism:</p>
      <ol>
        <li>Embed every user query.</li>
        <li>
          Search for a previous query with cosine similarity above a
          threshold (start at 0.95; tune down for higher hit rate, up for
          safety).
        </li>
        <li>
          If you find one, return its cached answer. If not, generate and
          store.
        </li>
      </ol>
      <p>
        The threshold is the only thing to tune. Too high and you cache
        nothing; too low and you serve wrong answers because two
        superficially similar queries mean different things.
      </p>

      <Callout label="When semantic caching is dangerous">
        Don&rsquo;t semantically cache anything user-specific or
        time-sensitive. &ldquo;What&rsquo;s my account balance&rdquo; from
        two users should never share a cached answer. Cache only by
        scope: cache global FAQ answers, cache per-tenant configuration
        lookups, never cache across security boundaries.
      </Callout>

      <h3 id="prompt-caching">Provider prompt caching</h3>
      <p>
        Anthropic, OpenAI, and Gemini now offer prompt caching at the
        provider level. You mark portions of your prompt as cacheable
        (long system prompts, large retrieved context). Subsequent requests
        with the same cached prefix pay 10&ndash;25% of normal input cost
        for that portion.
      </p>
      <p>
        For RAG with 4K&ndash;16K tokens of retrieved context, this is a
        massive win. The catch: you need cache hits to amortize the cache
        write cost. Structure your prompt with stable prefixes (system,
        retrieved context) and volatile suffixes (user query) so the
        cached portion stays cached.
      </p>

      <h2 id="batching">Batching: amortize the overhead</h2>
      <p>
        Most LLM APIs charge per-request and have per-request overhead.
        For background jobs that aren&rsquo;t latency-sensitive, batching
        multiple requests into one is straightforwardly cheaper.
      </p>
      <p>
        Anthropic and OpenAI both offer batch APIs at 50% discount with
        24-hour SLAs. If you have a use case like:
      </p>
      <ul>
        <li>Generating embeddings for a corpus during reindex</li>
        <li>Classifying overnight support tickets</li>
        <li>Tagging or summarizing a backlog</li>
        <li>Running your eval harness</li>
      </ul>
      <p>
        Use the batch API. Half-price for latency you don&rsquo;t need is
        free money.
      </p>

      <h2 id="model-routing">Model routing: don&rsquo;t use the biggest hammer</h2>
      <p>
        The most expensive mistake in cost optimization is using your
        flagship model (GPT-4o, Claude Opus, Gemini Ultra) for everything.
        Most LLM tasks don&rsquo;t need the strongest model. They need a
        good-enough model with sub-second latency at a tenth the cost.
      </p>
      <p>
        Build a router that picks the right model per task:
      </p>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Suggested tier</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Query rewriting for retrieval</td>
            <td>Small (Haiku, Flash, 4o-mini)</td>
          </tr>
          <tr>
            <td>Classification / routing decisions</td>
            <td>Small</td>
          </tr>
          <tr>
            <td>Simple Q&amp;A on retrieved context</td>
            <td>Medium (Sonnet, Pro)</td>
          </tr>
          <tr>
            <td>Multi-step reasoning, planning</td>
            <td>Large (Opus, GPT-4, Ultra)</td>
          </tr>
          <tr>
            <td>Eval judging</td>
            <td>Large for accuracy, medium for bulk</td>
          </tr>
        </tbody>
      </table>
      <p>
        For a chat product that handles all four task types, routing
        typically cuts cost 60&ndash;75%. The routing decision itself is
        cheap&mdash;either rule-based or one small classification call.
      </p>

      <h3 id="ab-route">A/B routing for safety</h3>
      <p>
        When introducing a smaller model for a tier, don&rsquo;t cut over.
        Route a percentage of traffic to the smaller model, run both
        outputs through your eval harness, compare. Promote when you have
        confidence; revert if quality degrades. Without an eval harness
        (see the eval post in this series), this is hard to do
        responsibly.
      </p>

      <h2 id="other-levers">Other levers, ranked</h2>
      <ul>
        <li>
          <strong>Trim system prompts.</strong> Every token in the system
          prompt is paid on every request. Audit yours; you&rsquo;ll find
          dead instructions and copy-pasted boilerplate.
        </li>
        <li>
          <strong>Limit max_tokens.</strong> Set a reasonable maximum based
          on your use case. Don&rsquo;t pay for 4096 tokens of headroom
          when 512 is enough.
        </li>
        <li>
          <strong>Truncate retrieved context aggressively.</strong> More
          retrieved chunks isn&rsquo;t always better. Eight chunks at 256
          tokens beats sixteen at 512 for both cost and recall in most
          tests.
        </li>
        <li>
          <strong>Stop generation early.</strong> Use stop sequences. If
          you only need the first JSON object, stop on the closing brace.
        </li>
      </ul>

      <h2 id="instrument-it">Instrument before you optimize</h2>
      <p>
        Every LLM call should log: model name, input tokens, output
        tokens, cached tokens, latency, cost. Aggregate by feature, by
        user tier, by query type. Without this, optimization is guessing.
        With it, you can see exactly where the money goes and target the
        20% of calls causing 80% of cost.
      </p>
      <p>
        The pattern across every project I&rsquo;ve seen is the same:
        somebody adds an LLM feature, costs grow linearly with usage, and
        nobody notices until the bill hits a threshold. The teams that
        avoid the crisis are the ones that built cost dashboards on day
        one&mdash;before the bill mattered, when the cost story was
        easy to fix.
      </p>
    </>
  )
}
