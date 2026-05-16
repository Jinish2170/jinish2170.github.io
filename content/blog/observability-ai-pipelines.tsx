import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "observability-ai-pipelines",
  title: "Observability for AI Pipelines: Logs, Traces, and the Missing Telemetry",
  description:
    "Most AI pipelines have less observability than a 2010 PHP app. Here's what to actually log, how to trace across LLM calls, and the metrics that separate working systems from working-by-accident.",
  date: "2025-07-14",
  updated: "2025-12-30",
  tags: ["Observability", "LLM", "Backend", "MLOps", "AI Security"],
  category: "AI Security",
  readingTime: 8,
  tldr:
    "AI observability needs three layers: structured per-call logs (every LLM call with full inputs/outputs), distributed traces (one trace per user request across the model and tool calls), and aggregate metrics (latency percentiles, token usage, error rates). Without all three, you cannot debug.",
  faq: [
    {
      q: "Do I need a vendor like Langfuse or LangSmith?",
      a: "Useful but not required. The data structures matter more than the tool. If you're already running Datadog, Honeycomb, or Grafana Cloud, sending LLM trace data there with the right shape works fine. Buy when you want LLM-specific UX, not because the data is alien.",
    },
    {
      q: "Should I log full LLM prompts and responses in production?",
      a: "Yes, with care. They're the most valuable debugging artifact you have. The caveats: scrub or hash PII, keep retention bounded (30-90 days), encrypt at rest, and don't index raw text in search. The cost is real; so is the alternative of debugging blind.",
    },
    {
      q: "What's the most important AI metric to track?",
      a: "Time-to-first-token P95 for chat features, and per-request cost as a histogram for all features. The first measures perceived latency; the second is what makes or breaks your unit economics. Average values hide both.",
    },
  ],
  related: [
    "streaming-llm-responses",
    "cost-optimizing-llm-inference",
    "retrieval-diagnostics-rag-hallucination",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        AI pipelines are systems. Systems need observability. Yet most LLM
        features ship with less instrumentation than a hobby project: a
        few print statements, maybe a Sentry alert, no traces, no
        structured logs, no cost dashboards. When something breaks in
        production it&rsquo;s debugged by re-running the prompt locally
        and hoping.
      </p>
      <p>
        Three layers separate working systems from working-by-accident:
        structured logs, distributed traces, and aggregate metrics. Each
        does something the others can&rsquo;t.
      </p>

      <h2 id="layer-1-logs">Layer 1: structured logs per LLM call</h2>
      <p>
        Every single LLM call should emit a structured log line with at
        minimum:
      </p>
      <pre>
        <code>{`{
  "event": "llm_call",
  "request_id": "r-abc-123",
  "user_id": "u-456",
  "tenant_id": "t-789",
  "feature": "support_chat",
  "model": "claude-3-5-sonnet-20241022",
  "input_tokens": 1240,
  "output_tokens": 380,
  "cached_input_tokens": 800,
  "latency_ms": 2104,
  "ttft_ms": 412,
  "cost_usd": 0.0064,
  "stop_reason": "end_turn",
  "prompt_hash": "sha256:abc...",
  "prompt": "...",        // full text, optionally
  "response": "...",      // full text, optionally
  "retrieved_chunk_ids": ["c-1", "c-2", "c-7"],
  "tool_calls": [{ "name": "search", "args": {...} }]
}`}</code>
      </pre>
      <p>
        This single log line answers most production questions: which
        model? how slow? how expensive? what context did it have? what
        did it do? When a user reports &ldquo;it gave me a wrong
        answer,&rdquo; you find their request by request_id and have the
        full picture in one query.
      </p>

      <Callout label="Privacy and prompt logging">
        Logging full prompts and responses creates a privacy surface.
        Scrub PII before storing (or hash it with a tenant-scoped salt
        for joinability), encrypt at rest, set retention to 30&ndash;90
        days, and don&rsquo;t index raw text in search. The data is
        valuable; the obligation is real.
      </Callout>

      <h2 id="layer-2-traces">Layer 2: distributed traces across the pipeline</h2>
      <p>
        A user request rarely makes one LLM call. It does retrieval, an
        LLM call, a tool call, maybe another LLM call. Without
        traces you can&rsquo;t see how those compose, where latency comes
        from, or which step failed.
      </p>
      <p>
        Use OpenTelemetry. Span the entire request and emit child spans
        for each step:
      </p>
      <pre>
        <code>{`with tracer.start_as_current_span("chat_request") as span:
    span.set_attribute("user_id", user_id)

    with tracer.start_as_current_span("rewrite_query"):
        rewritten = small_llm.complete(original_query)

    with tracer.start_as_current_span("retrieve") as ret:
        chunks = retriever.search(rewritten, top_k=10)
        ret.set_attribute("chunk_count", len(chunks))
        ret.set_attribute("top_score", chunks[0].score)

    with tracer.start_as_current_span("rerank"):
        chunks = reranker.rerank(rewritten, chunks)[:3]

    with tracer.start_as_current_span("generate") as gen:
        gen.set_attribute("model", "claude-3-5-sonnet")
        response = llm.complete(prompt, stream=True)
        for chunk in response:
            ...

    return response`}</code>
      </pre>
      <p>
        Now you can answer: &ldquo;why did this user&rsquo;s response
        take 8 seconds?&rdquo; with a trace view that breaks it down by
        step. Most of the time, the bottleneck is not where you assumed
        it was.
      </p>

      <h2 id="layer-3-metrics">Layer 3: aggregate metrics that matter</h2>
      <p>
        Logs and traces are per-request; metrics are aggregate. Track:
      </p>
      <ul>
        <li>
          <strong>Time-to-first-token</strong> as a histogram (P50, P95,
          P99). The single best proxy for perceived latency on streaming
          features.
        </li>
        <li>
          <strong>End-to-end latency</strong> as a histogram, by feature.
        </li>
        <li>
          <strong>Cost per request</strong> as a histogram, by feature and
          model. Average cost lies; histograms show the long tail.
        </li>
        <li>
          <strong>Error rate</strong> by feature, by model, by error type.
          A spike in <code>rate_limit</code> errors is a different bug
          than a spike in <code>timeout</code> errors.
        </li>
        <li>
          <strong>Cache hit rate</strong>, both for your application
          cache and provider prompt cache.
        </li>
        <li>
          <strong>Refusal rate</strong> from the model. A creeping rise
          can mean a prompt regression or shifting input distribution.
        </li>
        <li>
          <strong>Tool call success rate</strong>, by tool. Catches
          schema drift between your spec and the model&rsquo;s
          interpretation.
        </li>
      </ul>

      <h2 id="dashboards">The four dashboards you actually need</h2>
      <ol>
        <li>
          <strong>Health.</strong> Error rate, P95 latency, request rate,
          one big number per feature. Glance to know if anything is on
          fire.
        </li>
        <li>
          <strong>Cost.</strong> Spend per feature, per model, per day,
          per user tier. Trends. Anomalies. Catches runaway costs the day
          they start, not the month they show up on the bill.
        </li>
        <li>
          <strong>Quality.</strong> Eval harness results over time (from
          your eval pipeline). Refusal rates. User feedback (thumbs
          up/down) joined with model version. Catches silent regressions
          your error metrics don&rsquo;t.
        </li>
        <li>
          <strong>Retrieval.</strong> For RAG features: recall@k, score
          distributions, fallback rate. The leading indicator for
          hallucination complaints.
        </li>
      </ol>

      <h2 id="alerts">Alert on a small set</h2>
      <p>
        Alert fatigue kills observability programs. Alert on a tight set:
      </p>
      <ul>
        <li>P95 latency exceeds 2x baseline for 5 minutes</li>
        <li>Error rate exceeds 1% for 5 minutes</li>
        <li>Daily cost projected to exceed budget</li>
        <li>Eval harness score drops below threshold</li>
      </ul>
      <p>
        Everything else is a dashboard, not a page. Engineers who get
        paged for &ldquo;cache hit rate dropped 3%&rdquo; learn to ignore
        the pager.
      </p>

      <h2 id="closing">Closing: the cheapest leverage</h2>
      <p>
        Per dollar spent, observability is the highest-leverage investment
        in an AI pipeline. The cost is mostly engineering time on day one;
        the payoff is every debug session for the rest of the system&rsquo;s
        life. Build it before you have an incident, not after. The
        incident comes either way; whether you can answer questions
        during it is determined by what you logged.
      </p>
    </>
  )
}
