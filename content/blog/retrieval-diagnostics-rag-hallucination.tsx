import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "retrieval-diagnostics-rag-hallucination",
  title: "Why Your RAG System Is Hallucinating: Retrieval Diagnostics for Production",
  description:
    "Most RAG hallucinations aren't a generation problem — they're a retrieval problem masquerading as one. Here's how to diagnose which is which and fix it at the actual source.",
  date: "2025-12-15",
  updated: "2026-04-02",
  tags: ["RAG", "Hallucination", "LLM", "Debugging", "Vector Search"],
  category: "GenAI Engineering",
  readingTime: 8,
  tldr:
    "When RAG hallucinates, it's almost always because retrieval returned irrelevant chunks and the model filled the gap from its weights. Log the chunks alongside the answer, score relevance, and you'll fix 80% of hallucinations without touching prompts.",
  faq: [
    {
      q: "Why does my RAG answer correctly sometimes and hallucinate on similar queries?",
      a: "You're seeing retrieval variance. Two similar queries produce slightly different embeddings; one retrieves the right chunk, the other doesn't. The model behaves identically; the inputs differ. Fix by improving retrieval consistency — query rewriting, reranking, or wider top-k retrieval with a reranker.",
    },
    {
      q: "How do I tell if a hallucination is a retrieval bug or a generation bug?",
      a: "Inspect the retrieved chunks. If the right information was retrieved and the model still made up an answer, it's generation. If the retrieved chunks don't contain the answer, it's retrieval — and 80%+ of the time, it's retrieval.",
    },
    {
      q: "Will a better LLM fix RAG hallucinations?",
      a: "Marginally. A stronger model is slightly more disciplined about saying 'I don't know' instead of fabricating. But if your retrieval is broken, even GPT-7 will struggle — it has nothing to answer from. Fix retrieval first.",
    },
  ],
  related: [
    "production-rag-pipeline",
    "vector-db-tradeoffs",
    "eval-harnesses-llm-features",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Every team running RAG eventually files the same bug: &ldquo;the
        LLM is hallucinating.&rdquo; The triage instinct is to tweak the
        prompt. Add &ldquo;only answer from the provided context.&rdquo;
        Add &ldquo;if you don&rsquo;t know, say so.&rdquo; Watch nothing
        change.
      </p>
      <p>
        The reason nothing changes is that the LLM isn&rsquo;t the
        problem. The model dutifully synthesized whatever you handed it.
        The bug is upstream, in retrieval. Until you can diagnose which
        is which, you&rsquo;re tuning the wrong variable.
      </p>

      <h2 id="anatomy">Anatomy of a hallucination in RAG</h2>
      <p>
        When a RAG answer is wrong, exactly one of three things happened:
      </p>
      <ol>
        <li>
          <strong>The retriever missed.</strong> The right chunk exists in
          the corpus but wasn&rsquo;t in the top-k retrieved. The model
          had to guess.
        </li>
        <li>
          <strong>The retriever lied.</strong> Irrelevant chunks were
          retrieved and looked relevant enough that the model treated them
          as authoritative.
        </li>
        <li>
          <strong>The model ignored context.</strong> The right chunk was
          retrieved and the model didn&rsquo;t use it&mdash;answering from
          its weights instead.
        </li>
      </ol>
      <p>
        In my experience: case 1 is about 50% of hallucinations, case 2 is
        about 35%, case 3 is the remaining 15%. People spend their time
        on case 3 because it&rsquo;s the most visible, while the other 85%
        rots.
      </p>

      <h2 id="diagnostic-log">The diagnostic log</h2>
      <p>
        You cannot fix what you cannot see. The single highest-leverage
        thing to do, before any other intervention:
      </p>
      <p>
        For every RAG response, log a structured record containing the
        query, the retrieved chunk IDs, their similarity scores, the full
        chunk text, and the final answer. Store these in a queryable
        system (BigQuery, ClickHouse, even a Postgres table).
      </p>
      <pre>
        <code>{`{
  "request_id": "r-abc-123",
  "query": "How do I rotate JWT refresh tokens?",
  "retrieved": [
    {"chunk_id": "auth-doc-§3.2", "score": 0.87, "tokens": 240},
    {"chunk_id": "auth-doc-§4.1", "score": 0.76, "tokens": 180},
    {"chunk_id": "session-doc-§1", "score": 0.71, "tokens": 320}
  ],
  "answer": "...",
  "tokens_used": 1840,
  "latency_ms": 2104,
  "feedback": null
}`}</code>
      </pre>
      <p>
        Now you can answer the diagnostic question: for a given bad
        response, what did the retriever return?
      </p>

      <Callout label="The five-minute hallucination audit">
        Sample twenty production responses that users flagged as wrong.
        For each, manually inspect the retrieved chunks. You will
        immediately see the distribution of failure modes&mdash;and which
        one to fix first.
      </Callout>

      <h2 id="case-1-misses">Case 1 fixes: the retriever missed</h2>
      <p>
        The right chunk exists in your corpus but didn&rsquo;t make
        top-k. Causes:
      </p>
      <ul>
        <li>
          <strong>Query / document vocabulary mismatch.</strong> User says
          &ldquo;login is broken,&rdquo; docs say &ldquo;authentication
          failure.&rdquo; Embeddings are good at semantics but not magic;
          they sometimes need help. Add query rewriting to expand the
          query into multiple semantic variants.
        </li>
        <li>
          <strong>Chunk too small or split badly.</strong> The answer
          spans a paragraph break and your chunks split mid-thought. Fix
          chunking strategy and re-embed.
        </li>
        <li>
          <strong>Top-k too narrow.</strong> Increase from 3 to 20 with a
          reranker. The reranker filters back down to 3 with much better
          precision.
        </li>
        <li>
          <strong>Missing hybrid search.</strong> Queries with specific
          identifiers (error codes, function names, IDs) get poor vector
          matches. Add BM25 keyword search alongside vector and fuse
          scores.
        </li>
      </ul>

      <h2 id="case-2-lies">Case 2 fixes: the retriever lied</h2>
      <p>
        Irrelevant chunks ranked high. The model treats them as
        authoritative and hallucinates plausibly. Causes:
      </p>
      <ul>
        <li>
          <strong>Embedding model not specialized.</strong> A general-
          purpose embedding model retrieves topically similar but
          factually unrelated content. Try a domain-tuned model or
          fine-tune the embedding model on your corpus.
        </li>
        <li>
          <strong>No relevance threshold.</strong> If all retrieved chunks
          score below 0.7, retrieval probably failed. Either expand the
          search or fall back gracefully (&ldquo;I don&rsquo;t have
          documentation on that&rdquo;) instead of feeding garbage to the
          model.
        </li>
        <li>
          <strong>Reranker missing.</strong> Cross-encoder rerankers
          (Cohere Rerank, jina-reranker, BGE) directly score relevance
          and aggressively demote false positives. Skipping this step is
          the single most common reason for case 2.
        </li>
      </ul>

      <h2 id="case-3-ignored">Case 3 fixes: the model ignored context</h2>
      <p>
        The retrieved chunks contained the answer; the model answered
        differently. This is rare with strong models. Fixes:
      </p>
      <ul>
        <li>
          <strong>Prompt structure.</strong> Put context before the
          question, not after. Use clear delimiters. Make the instruction
          explicit: &ldquo;Answer using only the context below. If the
          context doesn&rsquo;t contain the answer, say so.&rdquo;
        </li>
        <li>
          <strong>Citation requirement.</strong> Force the model to cite
          which chunk it used: &ldquo;After each claim, cite [chunk_id].
          If no chunk supports a claim, omit it.&rdquo; This dramatically
          reduces fabrication because the model has to anchor every
          assertion.
        </li>
        <li>
          <strong>Model upgrade.</strong> Smaller models hallucinate more
          freely. If you&rsquo;re on a small model for cost reasons, try
          a medium model on the same query and see if the behavior
          changes. If it does, you have a model-tier problem, not a
          prompt problem.
        </li>
      </ul>

      <h2 id="systemize-it">Systemize the diagnosis</h2>
      <p>
        Once you&rsquo;re logging retrieval, build a small dashboard:
      </p>
      <ul>
        <li>
          Distribution of similarity scores per query. A long tail of
          low-scoring queries is a sign your retriever isn&rsquo;t
          covering those topics.
        </li>
        <li>
          Recall@k on your eval set, tracked over time. A drop here
          predicts user-reported hallucinations.
        </li>
        <li>
          Fallback rate&mdash;how often retrieval scored too low and you
          returned &ldquo;I don&rsquo;t know.&rdquo; Higher than 5&ndash;
          10% means your corpus has gaps.
        </li>
        <li>
          User feedback (thumbs up/down) joined with retrieval logs. The
          bad responses, with chunks attached, are your debug queue.
        </li>
      </ul>
      <p>
        With this in place, &ldquo;the LLM is hallucinating&rdquo; stops
        being a vague complaint and starts being a specific question with
        a specific answer. The diagnostic loop gets short. The fixes
        target the actual bug. Quality compounds.
      </p>
    </>
  )
}
