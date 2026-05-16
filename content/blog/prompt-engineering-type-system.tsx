import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "prompt-engineering-type-system",
  title: "Prompt Engineering Has a Type System Problem",
  description:
    "Prompts are code that runs on a non-deterministic interpreter. Treat them like strings and you get bugs that nobody can reproduce. Treat them like typed contracts and most of the bad behavior goes away.",
  date: "2025-11-26",
  updated: "2026-03-28",
  tags: ["LLM", "Prompt Engineering", "Types", "GenAI", "Architecture"],
  category: "GenAI Engineering",
  readingTime: 8,
  tldr:
    "Treat prompts as typed contracts: typed input variables, schema-constrained outputs, version pinning, and snapshot tests. Once you do, prompt engineering goes from craft to engineering.",
  faq: [
    {
      q: "What does it mean to give prompts a type system?",
      a: "Treating the prompt as a function with typed inputs (variables that must be present and well-formed) and a typed output (JSON schema or constrained format). The 'type system' is the validation layer around the LLM call that fails fast on bad inputs and rejects malformed outputs.",
    },
    {
      q: "Why not just use structured outputs from OpenAI/Anthropic?",
      a: "You should — that's part of the answer. But provider structured outputs only solve the output side. The input side (template variables, required fields, escaping) still needs discipline. The type system is the whole contract, not just the JSON schema.",
    },
    {
      q: "Should I use Pydantic / Zod for LLM I/O?",
      a: "Yes. Define the input shape with a schema validator, define the output shape with one, and serialize through them on both ends. This is the cheapest, highest-leverage thing you can do to stabilize prompt behavior.",
    },
  ],
  related: [
    "eval-harnesses-llm-features",
    "production-rag-pipeline",
    "streaming-llm-responses",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Prompts are code. Treating them like strings is the source of most
        of the worst bugs in production LLM apps&mdash;the ones that only
        appear in production, that don&rsquo;t reproduce, that change
        subtly when you change the model. A prompt is a function: it has
        inputs, it produces an output, and the contract between those is
        what determines whether your feature works.
      </p>
      <p>
        The mainstream prompt engineering literature is all about the
        text. Add a few-shot example. Try chain-of-thought. Ask the model
        to think step by step. These help. They&rsquo;re also not where
        the engineering rigor is.
      </p>

      <h2 id="prompt-as-function">A prompt is a typed function</h2>
      <p>
        Think of every prompt as a function signature:
      </p>
      <pre>
        <code>{`type ClassifyTicketInput = {
  ticket_text: string         // required, 1-4000 chars
  product: 'web' | 'mobile' | 'api'
  user_tier: 'free' | 'pro' | 'enterprise'
  history?: { role: string; content: string }[]
}

type ClassifyTicketOutput = {
  category: 'auth' | 'billing' | 'bug' | 'feature' | 'other'
  urgency: 1 | 2 | 3 | 4 | 5
  needs_human: boolean
  reasoning: string  // 1-2 sentences
}

function classifyTicket(input: ClassifyTicketInput): ClassifyTicketOutput`}</code>
      </pre>
      <p>
        That signature is the prompt&rsquo;s contract. The prompt text is
        the implementation. Once you see it this way, all the engineering
        discipline you apply to functions applies to prompts.
      </p>

      <h2 id="input-validation">Validate inputs at the boundary</h2>
      <p>
        Half the &ldquo;the LLM gave a weird answer&rdquo; bugs are
        actually bad inputs. Empty strings where you expected text. Nulls
        where you expected enums. Unescaped braces in user input that
        broke your template syntax.
      </p>
      <p>
        Use a schema validator (Zod, Pydantic, io-ts) on every prompt
        input. Reject malformed inputs before they ever reach the LLM:
      </p>
      <pre>
        <code>{`import { z } from 'zod'

const ClassifyInputSchema = z.object({
  ticket_text: z.string().min(1).max(4000),
  product: z.enum(['web', 'mobile', 'api']),
  user_tier: z.enum(['free', 'pro', 'enterprise']),
  history: z.array(z.object({
    role: z.string(),
    content: z.string()
  })).optional()
})

async function classifyTicket(raw: unknown) {
  const input = ClassifyInputSchema.parse(raw)
  // From here on, types are guaranteed
  const prompt = buildPrompt(input)
  // ...
}`}</code>
      </pre>
      <p>
        This catches bugs at the boundary, before they manifest as model
        misbehavior. It also makes errors actionable: &ldquo;ticket_text
        too long&rdquo; is a fixable bug. &ldquo;the model gave a weird
        answer&rdquo; is not.
      </p>

      <h2 id="output-constraints">Constrain outputs with a schema</h2>
      <p>
        OpenAI&rsquo;s <code>response_format</code>, Anthropic&rsquo;s tool
        use, and Gemini&rsquo;s JSON mode all let you constrain output to
        a JSON schema. Use them. Skipping this and parsing JSON out of
        free text is amateur hour&mdash;and where most production bugs
        live.
      </p>
      <pre>
        <code>{`const completion = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [...],
  response_format: {
    type: 'json_schema',
    json_schema: {
      name: 'ticket_classification',
      schema: {
        type: 'object',
        required: ['category', 'urgency', 'needs_human', 'reasoning'],
        properties: {
          category: { enum: ['auth', 'billing', 'bug', 'feature', 'other'] },
          urgency: { type: 'integer', minimum: 1, maximum: 5 },
          needs_human: { type: 'boolean' },
          reasoning: { type: 'string', maxLength: 300 }
        },
        additionalProperties: false
      },
      strict: true
    }
  }
})

const output = ClassifyOutputSchema.parse(JSON.parse(completion.choices[0].message.content!))`}</code>
      </pre>
      <p>
        Two layers of validation: the provider enforces the schema during
        generation; you re-validate after parsing in case anything slipped
        through. Belt and suspenders. Both are cheap.
      </p>

      <Callout label="When structured outputs aren't supported">
        Some models / providers don&rsquo;t support strict structured
        output. The workaround: ask for JSON, parse it, validate with
        your schema, and retry once with the error if validation fails.
        That retry catches 90%+ of malformed outputs. After that, raise
        a structured error&mdash;don&rsquo;t silently truncate or guess.
      </Callout>

      <h2 id="version-pinning">Version pin everything</h2>
      <p>
        Prompts change behavior subtly when models update. <code>gpt-4o</code>{" "}
        is not a stable target&mdash;it&rsquo;s an alias that points at
        whatever OpenAI&rsquo;s current snapshot is. Pin to the dated
        snapshot:
      </p>
      <pre>
        <code>{`model: 'gpt-4o-2024-11-20'  // pinned
// not
model: 'gpt-4o'  // moves under your feet`}</code>
      </pre>
      <p>
        Now upgrades are intentional. You bump the snapshot, run your
        eval harness (you have one, right?), see the delta, decide. The
        alternative is your feature behaving differently next Tuesday
        without warning.
      </p>

      <h2 id="prompt-snapshots">Snapshot test your prompts</h2>
      <p>
        Treat prompts like UI components: snapshot test them. Capture the
        full rendered prompt (system + user + variables interpolated) and
        compare against a stored snapshot. When the snapshot changes, you
        review it in code review.
      </p>
      <p>
        This catches the silent bug where someone added a variable to the
        template and broke an unused branch. It also documents what the
        prompt actually does in a form humans can read.
      </p>

      <h2 id="separate-text-from-logic">Separate text from logic</h2>
      <p>
        Don&rsquo;t inline prompt strings throughout your code. Centralize
        them as named constants, ideally in a single file or directory.
        This makes them findable, reviewable, and lets non-engineers
        contribute changes without touching the rest of the codebase.
      </p>
      <pre>
        <code>{`// prompts/classify-ticket.ts
export const CLASSIFY_TICKET_SYSTEM = \`
You are a support ticket classifier.
Output JSON matching the provided schema.
Be concise; reasoning is 1-2 sentences max.
\`.trim()

export const CLASSIFY_TICKET_USER_TEMPLATE = (input: ClassifyInput) => \`
Product: \${input.product}
User tier: \${input.user_tier}
Ticket:
"""
\${input.ticket_text}
"""
\`.trim()`}</code>
      </pre>
      <p>
        Now prompts are auditable. You can grep for them, diff them, and
        version them. A new hire can find every prompt in the codebase in
        thirty seconds.
      </p>

      <h2 id="closing">Closing: prompts are part of the surface area</h2>
      <p>
        A prompt is a public interface between your code and a
        non-deterministic interpreter. The fact that the interpreter is a
        neural network doesn&rsquo;t exempt it from the engineering
        discipline you&rsquo;d apply to any other dependency. Type the
        boundary. Validate inputs. Constrain outputs. Pin versions.
        Snapshot test. Now you have prompt engineering. Before that, you
        had wishful prompting.
      </p>
    </>
  )
}
