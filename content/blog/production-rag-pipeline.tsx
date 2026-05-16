import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "production-rag-pipeline",
  title: "Building a Production RAG Pipeline: What the Tutorials Don't Tell You",
  description:
    "Most RAG tutorials stop at 'embed, retrieve, generate.' Production RAG starts there — chunking strategy, retrieval diagnostics, eval harnesses, and the failure modes that don't show up in demos.",
  date: "2026-04-12",
  updated: "2026-05-10",
  tags: ["RAG", "GenAI", "Vector Search", "LLM", "Production"],
  category: "GenAI Engineering",
  readingTime: 12,
  tldr:
    "Production RAG is not a model problem — it's a retrieval-quality problem disguised as a model problem. Most failures come from chunking, query rewriting, and the absence of an eval harness.",
  faq: [
    {
      q: "Why does my RAG system hallucinate even with good documents indexed?",
      a: "Most hallucination at this stage is a retrieval failure, not a generation failure. The model is answering from its weights because retrieval returned irrelevant or off-topic chunks. Log the retrieved chunks alongside the output and you'll usually see the gap immediately.",
    },
    {
      q: "What's the right chunk size for RAG?",
      a: "There's no universal answer — it depends on whether your corpus is technical docs (smaller, 256–512 tokens), conversational/narrative (larger, 800–1024), or structured (chunk by record). The right way to choose is to run your eval set across three sizes and pick the one with the best recall@k, not the one a tutorial recommended.",
    },
    {
      q: "Do I need a vector database for RAG?",
      a: "Not at the scale most projects start. For under ~50k chunks, pgvector on Postgres handles it with HNSW and is operationally simpler than running a dedicated vector DB. Switch when you actually hit scale or latency limits — not preemptively.",
    },
  ],
  related: [
    "retrieval-diagnostics-rag-hallucination",
    "vector-db-tradeoffs",
    "eval-harnesses-llm-features",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Most RAG tutorials end where production starts. They show you{" "}
        <code>embed → retrieve → generate</code> against a tiny corpus, the
        model returns plausible-looking text, and the post wraps with{" "}
        &ldquo;you now have RAG.&rdquo; You don&rsquo;t. You have a demo. A
        demo and a production RAG system share the same three nouns and
        almost nothing else.
      </p>
      <p>
        I&rsquo;ve built RAG features into actual products — not toy
        notebooks — and the failure modes that show up in week three are
        invisible in the tutorial. This post is the punch list I wish I&rsquo;d
        had on day one.
      </p>

      <h2 id="not-a-model-problem">RAG is not a model problem</h2>
      <p>
        The single most important reframe: when your RAG system gives a
        wrong answer, the problem is almost never the LLM. The model
        faithfully synthesized whatever you handed it. The problem is
        upstream — in retrieval. Internalize this and your debugging gets an
        order of magnitude faster.
      </p>
      <p>
        Concretely, when an answer is wrong, ask three questions in order:
      </p>
      <ol>
        <li>Were the right chunks retrieved at all?</li>
        <li>Were they ranked high enough to make it into the context window?</li>
        <li>
          Given those chunks, would a human have produced the right answer?
        </li>
      </ol>
      <p>
        Only if the answer to the third question is &ldquo;yes&rdquo; is
        your problem the model. In my experience that&rsquo;s under ten
        percent of failures. The rest are retrieval. Yet teams spend their
        time tweaking prompts.
      </p>

      <Callout label="The single highest-ROI thing you can do">
        Log every retrieval&mdash;query, retrieved chunk IDs, scores, and
        the final answer&mdash;structured, so you can join them later.
        Without this you are debugging blind. With it, the failure modes
        light up.
      </Callout>

      <h2 id="chunking-is-load-bearing">Chunking is load-bearing</h2>
      <p>
        Chunk size is the most important hyperparameter in your RAG system
        and nobody talks about it because tutorials use whatever default the
        library ships with. The default is wrong for your data. It is
        always wrong for your data.
      </p>
      <p>
        Three failure modes from chunking:
      </p>
      <ul>
        <li>
          <strong>Chunks too small.</strong> You retrieve sentence fragments
          that lack context. The model has to guess what the &ldquo;it&rdquo;
          refers to.
        </li>
        <li>
          <strong>Chunks too large.</strong> Embeddings become diluted
          averages. A document about &ldquo;auth and billing&rdquo;
          retrieves for both queries even when the relevant section is just
          two sentences.
        </li>
        <li>
          <strong>Chunks split mid-thought.</strong> Naive character-split
          chunking cuts code blocks in half, splits tables from their
          headers, and breaks the conceptual unit you actually wanted to
          retrieve.
        </li>
      </ul>
      <p>
        Practical heuristic: chunk by{" "}
        <em>semantic boundary</em> first&mdash;markdown headers, function
        bodies, paragraph breaks&mdash;then enforce a maximum. Never split a
        code block. Never split a table from its header. Always include
        about a 10&ndash;15% overlap so a thought that straddles two chunks
        survives in both.
      </p>

      <h3 id="metadata-is-half-the-system">Metadata is half the system</h3>
      <p>
        Every chunk should carry structured metadata: source document, URL,
        section, last-updated, author, access-level. Half your retrieval
        bugs become trivial when you can filter by metadata before the
        vector search. A common pattern:
      </p>
      <pre>
        <code>{`-- pgvector with metadata filter
SELECT chunk_id, content, embedding <=> $1 AS distance
FROM chunks
WHERE doc_type = 'spec'
  AND updated_at > now() - interval '90 days'
  AND tenant_id = $2
ORDER BY embedding <=> $1
LIMIT 10;`}</code>
      </pre>
      <p>
        The <code>WHERE</code> clause eliminates entire categories of
        retrieval failure that no amount of embedding tuning will fix. Use
        it.
      </p>

      <h2 id="query-rewriting">Query rewriting is not optional</h2>
      <p>
        User queries are rarely good retrieval queries. Someone asks
        &ldquo;why doesn&rsquo;t login work on mobile?&rdquo; and your
        retriever needs to fetch docs about authentication errors, mobile
        viewport handling, and session timeouts&mdash;none of which share
        many tokens with the original query.
      </p>
      <p>
        The fix is a query-rewriting step before retrieval. Run the user
        query through a small/fast model with a tight prompt that expands
        it into 2&ndash;3 retrieval queries optimized for embedding
        similarity. This is one extra LLM call but it changes your
        recall@k dramatically. The latency cost is real; mitigate by
        running it on a cheap model (Haiku, Gemini Flash, GPT-4o-mini)
        and caching by query hash.
      </p>

      <h2 id="reranking">Rerank after retrieval, before generation</h2>
      <p>
        Pure vector similarity retrieval will miss things. It rewards
        topical overlap, not actual relevance. Two-stage retrieval is the
        standard production pattern:
      </p>
      <ol>
        <li>
          Stage 1: vector search returns the top 20&ndash;50 candidate
          chunks. Cheap, fast, recall-focused.
        </li>
        <li>
          Stage 2: a cross-encoder reranker (Cohere Rerank, BGE,
          jina-reranker) scores each candidate against the original query
          with more sophistication. Pick the top 3&ndash;8 for the model.
        </li>
      </ol>
      <p>
        Reranking is the single biggest quality jump you&rsquo;ll get for
        the lowest engineering cost. The reranker has direct access to the
        full chunk text and is trained for this exact task. Skipping it is
        leaving free quality on the table.
      </p>

      <h2 id="eval-harness-or-its-not-real">
        Without an eval harness, you don&rsquo;t have a system
      </h2>
      <p>
        This is the line that separates demos from production. You need a
        set of 50&ndash;200 question/answer pairs that represent the queries
        your users actually ask. Every change&mdash;chunking strategy,
        embedding model, prompt, reranker&mdash;gets evaluated against this
        set. No exceptions.
      </p>
      <p>
        Metrics that matter, in order:
      </p>
      <ul>
        <li>
          <strong>Recall@k.</strong> Did the right chunk make it into the
          top-k retrieved? This is a pure retrieval metric and tells you
          whether your retriever is even capable of the right answer.
        </li>
        <li>
          <strong>Faithfulness.</strong> Does the answer actually come from
          the retrieved chunks, or did the model hallucinate? You can score
          this with another LLM (LLM-as-judge) but verify a sample manually.
        </li>
        <li>
          <strong>Answer correctness.</strong> Compared to the ground truth,
          is the answer right? Use a combination of LLM-as-judge and
          ROUGE/BLEU for short factual answers.
        </li>
      </ul>
      <p>
        Build this before you tune anything. Otherwise you&rsquo;re
        navigating in fog: every change feels like an improvement because
        the demo example still works.
      </p>

      <h2 id="ship-checklist">A ship-checklist for production RAG</h2>
      <ul>
        <li>Structured logging of query, retrieved chunks, scores, output</li>
        <li>Chunking strategy tuned on your eval set, not a default</li>
        <li>Metadata on every chunk, used in retrieval filters</li>
        <li>Query rewriting step before retrieval</li>
        <li>Two-stage retrieve-then-rerank pipeline</li>
        <li>50+ question eval harness wired into CI</li>
        <li>Faithfulness check on every response (or sampled, at scale)</li>
        <li>
          Cost and latency budget per query, tracked as a histogram, not an
          average
        </li>
        <li>
          A documented fallback when retrieval returns nothing relevant
          (don&rsquo;t let the model fabricate)
        </li>
      </ul>
      <p>
        Get those right and your RAG system stops feeling like a parlor
        trick and starts feeling like a product. The model was never the
        bottleneck. The plumbing was.
      </p>
    </>
  )
}
