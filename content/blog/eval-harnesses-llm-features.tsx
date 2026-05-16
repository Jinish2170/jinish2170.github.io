import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "eval-harnesses-llm-features",
  title: "Eval Harnesses for LLM Features: Beyond Eyeballing the Output",
  description:
    "If you ship LLM features and you don't have an eval harness, you don't have a system — you have luck. Here's what an actually useful eval harness looks like and how to build one without buying a vendor.",
  date: "2026-01-29",
  updated: "2026-04-20",
  tags: ["LLM", "Evaluation", "Testing", "GenAI", "MLOps"],
  category: "GenAI Engineering",
  readingTime: 9,
  tldr:
    "An eval harness for LLM features needs three things: a curated test set tied to real user behavior, automated scoring that mixes deterministic checks with LLM-as-judge, and CI integration that blocks regressions. Without these, every change is a vibe-based gamble.",
  faq: [
    {
      q: "Do I really need an eval harness for a small LLM feature?",
      a: "Yes, even for small features. Without one, you can't tell whether your prompt change improved things or made them worse — you just have a feeling. An eval set of 30 carefully curated examples is enough to start and pays for itself the first time it catches a regression.",
    },
    {
      q: "Is LLM-as-judge actually reliable?",
      a: "It's reliable enough when you scope it tightly. Ask it to judge one specific dimension (faithfulness, format compliance, refusal correctness) per call, not 'is this good overall.' Calibrate against human-labeled samples and you'll get agreement rates in the 85-90% range, which is more than enough to catch regressions.",
    },
    {
      q: "How big should my eval set be?",
      a: "Start at 30-50 examples covering your most common query types. Grow it as you discover failure modes — every production bug should generate a regression test added to the set. Hundreds is plenty; thousands becomes a maintenance burden without much marginal benefit unless you're training models.",
    },
  ],
  related: [
    "production-rag-pipeline",
    "retrieval-diagnostics-rag-hallucination",
    "prompt-engineering-type-system",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Every team that ships LLM features eventually has the same
        conversation. Someone changes a prompt. A reviewer reads three
        outputs, says &ldquo;looks good,&rdquo; and approves the PR. Two
        weeks later, support tickets show a regression that nobody caught.
        Nobody can confidently say when it started.
      </p>
      <p>
        The fix is an eval harness. Not a vendor tool, not a paid platform,
        not a Jupyter notebook&mdash;a real eval harness that runs in CI
        and blocks regressions. It&rsquo;s the single highest-leverage
        engineering investment you can make for an LLM feature, and almost
        nobody builds one until they&rsquo;ve been bitten.
      </p>

      <h2 id="three-parts">The three parts of a useful eval harness</h2>
      <p>An eval harness that actually works has three parts:</p>
      <ol>
        <li>
          <strong>A curated test set.</strong> Inputs that represent what
          your users actually do, paired with what a correct response looks
          like.
        </li>
        <li>
          <strong>Automated scoring.</strong> A function that takes the
          model&rsquo;s output and returns a score, deterministically or
          with another LLM as a judge.
        </li>
        <li>
          <strong>CI integration.</strong> The harness runs on every PR
          and surfaces deltas. Below a threshold, the build fails.
        </li>
      </ol>
      <p>Skip any one of these and you don&rsquo;t have evals. You have a script.</p>

      <h2 id="curating-the-set">Curating the test set</h2>
      <p>
        This is where most teams go wrong. They write a test set from
        their imagination of what users do. The result is a test set that
        scores well and reality that doesn&rsquo;t. The right way is to
        seed from production:
      </p>
      <ul>
        <li>
          Sample real user queries from logs (anonymize as needed). Cluster
          them by topic. Pick representative examples per cluster.
        </li>
        <li>
          Add every production bug as a regression test. If a user
          complained about a hallucination on query X, X is in the eval
          set forever.
        </li>
        <li>
          Include edge cases on purpose: very short queries, very long
          queries, queries in mixed languages, queries with typos, queries
          that should fail gracefully (out-of-scope, harmful, ambiguous).
        </li>
      </ul>
      <p>
        Aim for 50&ndash;200 examples to start. Each example needs a query,
        an expected response shape (full text, structured fields, or a
        rubric), and metadata (category, difficulty, source).
      </p>

      <Callout label="The categorization habit">
        Tag every eval example with a category and a difficulty. When a
        regression hits, you want to know &ldquo;easy queries got worse on
        edge-case category Y&rdquo;&mdash;not &ldquo;something got
        slightly worse on average.&rdquo; The first is actionable, the
        second isn&rsquo;t.
      </Callout>

      <h2 id="scoring">Automated scoring without buying a vendor</h2>
      <p>
        For factual queries with a single right answer, scoring is easy:
        substring match, regex, JSON-schema validation. Use these wherever
        possible. They&rsquo;re fast, free, and deterministic.
      </p>
      <p>
        For open-ended responses, you need LLM-as-judge. The trick is
        scoping. Don&rsquo;t ask the judge model &ldquo;is this answer
        good?&rdquo;&mdash;that&rsquo;s asking for noise. Ask narrow
        questions:
      </p>
      <ul>
        <li>
          <strong>Faithfulness:</strong> &ldquo;Does this response only use
          information from the provided context? Yes/no.&rdquo;
        </li>
        <li>
          <strong>Format compliance:</strong> &ldquo;Does this response
          follow the requested JSON structure? Yes/no.&rdquo;
        </li>
        <li>
          <strong>Refusal correctness:</strong> &ldquo;Should this query
          have been refused? Was it?&rdquo;
        </li>
        <li>
          <strong>Answer relevance:</strong> &ldquo;Does this response
          address what was asked? Score 1&ndash;5 with reasoning.&rdquo;
        </li>
      </ul>
      <p>
        Use the strongest model you have access to as the judge, with a
        cheap one for cost-sensitive bulk scoring. Always have the judge
        return a short reasoning string&mdash;not because you&rsquo;ll
        read every one, but because when a regression hits, the reasoning
        is half the debug work.
      </p>

      <h3 id="calibrate-judge">Calibrate the judge</h3>
      <p>
        Before trusting the judge, calibrate it. Label 50 examples
        manually. Run the judge. Compute agreement. If you&rsquo;re below
        ~85% agreement on a binary task, your judge prompt is too vague
        or the task is too subjective&mdash;narrow it.
      </p>
      <p>
        Recalibrate every few months as you change models or the test set
        drifts.
      </p>

      <h2 id="wire-into-ci">Wire it into CI</h2>
      <p>
        Run the harness on every PR that touches prompts, retrieval, or
        models. Output a structured report comparing the new branch to
        main:
      </p>
      <pre>
        <code>{`eval report: feature/new-rewrite-prompt vs main

category          baseline   new      delta
factual-easy      94%        93%      -1%
factual-hard      71%        78%      +7%
out-of-scope      88%        85%      -3%
hallucination     0.04       0.03     -0.01
format-compliance 99%        99%       0%

p95 latency        2.4s      3.1s     +0.7s   ⚠ regression`}</code>
      </pre>
      <p>
        Two thresholds matter: a fail-the-build threshold (significant
        regression in any category) and a flag-for-review threshold (small
        regressions that may be acceptable tradeoffs). The build should
        actually fail&mdash;not just warn&mdash;or it becomes noise.
      </p>

      <h2 id="anti-patterns">Anti-patterns I keep seeing</h2>
      <ul>
        <li>
          <strong>Evals run only on releases.</strong> By release time,
          half the regressions have shipped. Run on every PR or
          don&rsquo;t bother.
        </li>
        <li>
          <strong>Single-score evals.</strong> &ldquo;Our model scored
          0.82.&rdquo; Eighty-two on what? Per category, per difficulty,
          or you&rsquo;re hiding the failure.
        </li>
        <li>
          <strong>Eval set unchanged for months.</strong> Your product
          evolves; your eval set should too. If a class of queries grew
          5x in production, it should grow in your eval set.
        </li>
        <li>
          <strong>No latency or cost tracking.</strong> A new prompt that
          improves quality but doubles latency might be a regression
          depending on your product. Track both.
        </li>
      </ul>

      <h2 id="closing">The compounding value</h2>
      <p>
        An eval harness is a flywheel. Every production bug adds a
        regression test. Every prompt experiment compares against a real
        baseline. Every model migration becomes a measurable decision
        instead of a leap of faith.
      </p>
      <p>
        After six months of compounding, your eval set is the most
        valuable artifact in your LLM stack&mdash;more valuable than the
        prompts themselves. It encodes what you&rsquo;ve learned about
        what &ldquo;good&rdquo; means for your product. Don&rsquo;t skip
        it.
      </p>
    </>
  )
}
