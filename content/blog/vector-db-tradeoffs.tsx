import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "vector-db-tradeoffs",
  title: "Vector DB Trade-offs: pgvector vs Pinecone vs Weaviate for Real Production Loads",
  description:
    "Most vector DB comparisons benchmark recall on toy datasets. This one is about the trade-offs you actually feel in production — ops burden, hybrid search, metadata filtering, and the cost curve as you scale.",
  date: "2026-02-18",
  updated: "2026-04-30",
  tags: ["Vector Database", "RAG", "pgvector", "Pinecone", "Weaviate", "Infrastructure"],
  category: "AI Security",
  readingTime: 11,
  tldr:
    "Don't pick a vector DB on a recall benchmark. Pick on ops burden and ecosystem fit. pgvector is the right default until you measurably outgrow it. Pinecone if you don't want to operate anything. Weaviate if you need a real hybrid search engine.",
  faq: [
    {
      q: "When should I migrate from pgvector to a dedicated vector DB?",
      a: "When you have measured a real problem. Query latency P95 exceeding your budget, index size exceeding your RAM budget, or operational complexity (replication, sharding) becoming a burden. Don't migrate because a blog post said pgvector doesn't scale — most apps will never hit those limits.",
    },
    {
      q: "Is pgvector slower than Pinecone or Weaviate?",
      a: "Per-query latency under HNSW indexing, no — pgvector with HNSW achieves sub-50ms on millions of vectors. What pgvector doesn't have is horizontal scaling, multi-region replication, or operational tooling. The 'slower' framing is wrong; the right framing is operational vs algorithmic.",
    },
    {
      q: "How important is hybrid search (vector + keyword)?",
      a: "Critical for technical/factual retrieval. Pure vector search misses exact matches on identifiers (error codes, function names, version numbers). Hybrid combines BM25 keyword scores with vector similarity using Reciprocal Rank Fusion. If your corpus has structured terminology, hybrid will outperform pure vector by a meaningful margin.",
    },
  ],
  related: [
    "production-rag-pipeline",
    "retrieval-diagnostics-rag-hallucination",
    "observability-ai-pipelines",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Every vector database benchmark I&rsquo;ve seen measures recall on
        a toy dataset and declares a winner. That is not the choice you
        face in production. The choice in production is between three
        different shapes of operational burden, ecosystem assumptions, and
        cost curves. Recall numbers under HNSW are roughly equivalent
        across all of them at the scales most teams operate at.
      </p>
      <p>
        This post is what I&rsquo;d actually want to know before picking
        one, written from the perspective of having built RAG features on
        all three.
      </p>

      <h2 id="default-pgvector">Default: pgvector</h2>
      <p>
        If you already run Postgres, your vector DB is Postgres. Install
        the <code>pgvector</code> extension, add a column with the right
        type, create an HNSW index. You&rsquo;re done. Total operational
        complexity added: a few lines of migration.
      </p>
      <pre>
        <code>{`CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

CREATE INDEX ON documents
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);`}</code>
      </pre>
      <p>What you get for free:</p>
      <ul>
        <li>
          ACID transactions across documents + embeddings. Insert a row and
          its embedding atomically; no two-system consistency problem.
        </li>
        <li>
          Rich metadata filtering with the SQL you already know. Filter by
          tenant, date range, document type, access scope&mdash;all in the
          same query as the vector search.
        </li>
        <li>
          Replication, backups, point-in-time recovery, RBAC, audit
          logs&mdash;all the operational maturity of Postgres applies.
        </li>
        <li>
          Hybrid search is one <code>ts_rank</code> call away. Combine
          full-text and vector scores in a single SQL query.
        </li>
      </ul>
      <p>
        What you give up: nothing measurable until you&rsquo;re past about
        10 million vectors or under 50ms P95 latency requirements with
        complex filters. Most teams never hit those limits.
      </p>

      <Callout label="The 'pgvector doesn't scale' myth">
        The original IVFFlat index in early pgvector was slow. With HNSW
        (added 2023+), pgvector handles millions of vectors at sub-50ms
        latency on modest hardware. The blog posts arguing otherwise were
        written against the old index. Read the date stamp before
        believing the benchmark.
      </Callout>

      <h2 id="pinecone-when">Pinecone: when you don&rsquo;t want to operate anything</h2>
      <p>
        Pinecone is the &ldquo;managed and that&rsquo;s the point&rdquo;
        choice. You get a REST API, you get auto-scaling, you get the
        operational burden of nothing. For a small team or solo founder
        building an AI product, this is genuine leverage.
      </p>
      <p>What Pinecone is good at:</p>
      <ul>
        <li>Zero ops. Provision, get an API key, start writing.</li>
        <li>Predictable performance. The latency floor is excellent.</li>
        <li>
          Namespace isolation for multi-tenant apps without joining tables.
        </li>
        <li>
          Sparse-dense hybrid indexes (their newer feature) actually work
          well.
        </li>
      </ul>
      <p>Where Pinecone bites you:</p>
      <ul>
        <li>
          <strong>Cost at scale.</strong> Pinecone&rsquo;s pricing is fine
          until you have a lot of vectors, then it&rsquo;s very much not
          fine. Model the cost at your projected scale before you commit.
        </li>
        <li>
          <strong>Consistency with your primary DB.</strong> Your docs are
          in Postgres, your vectors are in Pinecone. Now you have a dual-write
          problem. Use a transactional outbox pattern or accept eventual
          consistency.
        </li>
        <li>
          <strong>Vendor lock-in.</strong> Their API is proprietary;
          migrating off Pinecone means reindexing in another system.
        </li>
        <li>
          <strong>Metadata filtering is limited.</strong> You can filter on
          metadata, but expressiveness is far below SQL. Complex filters
          (date ranges combined with hierarchical tags combined with access
          rules) get awkward fast.
        </li>
      </ul>

      <h2 id="weaviate-when">Weaviate: when you need a real search engine</h2>
      <p>
        Weaviate sits in the middle. Self-hostable or managed cloud, GraphQL
        and REST APIs, first-class hybrid search, multi-tenancy as a real
        feature. It feels less like a vector DB and more like a modern
        search engine that happens to do vector queries well.
      </p>
      <p>Strengths:</p>
      <ul>
        <li>
          Hybrid search is first-class and properly tuned. BM25 and vector
          scores combine with configurable fusion. For mixed-content
          retrieval (technical docs, code, narrative), this matters a lot.
        </li>
        <li>
          Multi-tenancy is real. Each tenant gets its own shard. Cleaner
          than namespace-based isolation.
        </li>
        <li>
          Built-in modules for common embedding providers. You can offload
          embedding generation to Weaviate if you want; useful for prototyping.
        </li>
        <li>
          GraphQL API is genuinely nice for complex retrieval shapes.
        </li>
      </ul>
      <p>Weaknesses:</p>
      <ul>
        <li>
          Self-hosted Weaviate is non-trivial to operate at scale. Cluster
          management, version upgrades, persistent volumes&mdash;you&rsquo;re
          running infrastructure.
        </li>
        <li>
          Managed Weaviate cost is in the same range as Pinecone with
          slightly different tradeoffs.
        </li>
        <li>
          Ecosystem smaller than pgvector or Pinecone. Fewer integrations,
          fewer Stack Overflow answers.
        </li>
      </ul>

      <h2 id="decision-table">Decision table</h2>
      <table>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Pick</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>You already run Postgres, &lt; 5M vectors</td>
            <td>pgvector</td>
          </tr>
          <tr>
            <td>Solo founder / small team, want zero ops</td>
            <td>Pinecone</td>
          </tr>
          <tr>
            <td>Need real hybrid search across mixed content</td>
            <td>Weaviate</td>
          </tr>
          <tr>
            <td>Multi-region replication is a hard requirement</td>
            <td>Pinecone or managed Weaviate</td>
          </tr>
          <tr>
            <td>Hard cost ceiling, willing to operate infra</td>
            <td>pgvector or self-hosted Weaviate</td>
          </tr>
          <tr>
            <td>Strict consistency with primary data</td>
            <td>pgvector</td>
          </tr>
          <tr>
            <td>Building for tens of millions of vectors from day one</td>
            <td>Pinecone or Weaviate; measure both</td>
          </tr>
        </tbody>
      </table>

      <h2 id="dont-overoptimize-early">Don&rsquo;t over-optimize early</h2>
      <p>
        The most common mistake I see: teams picking Pinecone on day one
        because they read it&rsquo;s &ldquo;the production vector DB,&rdquo;
        then spending months building around its limitations. They had
        Postgres already. They never measured pgvector. They paid for
        Pinecone for a year before realizing it was overkill.
      </p>
      <p>
        Start with pgvector. If you outgrow it&mdash;and you&rsquo;ll know
        because you&rsquo;ll have metrics telling you exactly
        which limit you hit&mdash;migrate. The migration is unpleasant but
        bounded; the alternative is solving a problem you don&rsquo;t have.
      </p>
    </>
  )
}
