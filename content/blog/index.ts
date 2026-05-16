import * as productionRagPipeline from "./production-rag-pipeline"
import * as streamingLlmResponses from "./streaming-llm-responses"
import * as vectorDbTradeoffs from "./vector-db-tradeoffs"
import * as evalHarnessesLlmFeatures from "./eval-harnesses-llm-features"
import * as costOptimizingLlmInference from "./cost-optimizing-llm-inference"
import * as retrievalDiagnosticsRagHallucination from "./retrieval-diagnostics-rag-hallucination"
import * as promptEngineeringTypeSystem from "./prompt-engineering-type-system"
import * as jwtRefreshTokenRotation from "./jwt-refresh-token-rotation"
import * as idempotencyKeysLlmApis from "./idempotency-keys-llm-apis"
import * as rbacMultiTenantPostgres from "./rbac-multi-tenant-postgres"
import * as backpressureStreamingApis from "./backpressure-streaming-apis"
import * as notebookToProductionMl from "./notebook-to-production-ml"
import * as promptInjectionDefense from "./prompt-injection-defense"
import * as observabilityAiPipelines from "./observability-ai-pipelines"
import * as edgeVsOriginGenai from "./edge-vs-origin-genai"

import type { BlogPost } from "./types"

const modules = [
  productionRagPipeline,
  streamingLlmResponses,
  vectorDbTradeoffs,
  evalHarnessesLlmFeatures,
  costOptimizingLlmInference,
  retrievalDiagnosticsRagHallucination,
  promptEngineeringTypeSystem,
  jwtRefreshTokenRotation,
  idempotencyKeysLlmApis,
  rbacMultiTenantPostgres,
  backpressureStreamingApis,
  notebookToProductionMl,
  promptInjectionDefense,
  observabilityAiPipelines,
  edgeVsOriginGenai,
] as unknown as BlogPost[]

/** All posts, sorted by most-recent first. */
export const posts: BlogPost[] = [...modules].sort((a, b) =>
  b.meta.date.localeCompare(a.meta.date),
)

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.meta.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.meta.slug)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return posts.filter((p) => p.meta.category === category)
}

export function getRelated(slug: string, n = 3): BlogPost[] {
  const post = getPostBySlug(slug)
  if (!post) return []
  // Prefer explicit related; fall back to same category.
  const explicit =
    post.meta.related
      ?.map((s) => getPostBySlug(s))
      .filter((p): p is BlogPost => Boolean(p)) ?? []
  if (explicit.length >= n) return explicit.slice(0, n)
  const sameCategory = posts
    .filter((p) => p.meta.category === post.meta.category && p.meta.slug !== slug)
    .filter((p) => !explicit.some((e) => e.meta.slug === p.meta.slug))
  return [...explicit, ...sameCategory].slice(0, n)
}

export const CATEGORIES = [
  "GenAI Engineering",
  "Backend Systems",
  "AI Security",
  "ML Systems",
] as const
