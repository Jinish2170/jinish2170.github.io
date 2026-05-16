import type { ReactNode } from "react"

/**
 * Editorial prose container — typography for long-form blog content.
 * Uses Tailwind's @apply-style classes inline so we don't need the
 * @tailwindcss/typography plugin (keeps build deps minimal).
 *
 * Headings get stable IDs via children-as-text so JSON-LD breadcrumbs
 * and TOCs can deep-link. AEO benefit: scrapers love hash anchors.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        max-w-[68ch]
        text-[17px] leading-[1.75] text-[hsl(var(--ink-2))]
        [&_p]:my-5
        [&_a]:text-[hsl(var(--ink))] [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:decoration-[hsl(var(--hairline))] hover:[&_a]:decoration-[hsl(var(--ink))]
        [&_strong]:text-[hsl(var(--ink))] [&_strong]:font-medium
        [&_em]:text-[hsl(var(--ink))] [&_em]:not-italic [&_em]:font-medium
        [&_code]:font-mono [&_code]:text-[0.92em] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:bg-[hsl(var(--secondary))] [&_code]:border [&_code]:border-[hsl(var(--hairline))] [&_code]:rounded [&_code]:text-[hsl(var(--ink))]
        [&_pre]:my-7 [&_pre]:p-5 [&_pre]:bg-[hsl(var(--secondary))] [&_pre]:border [&_pre]:border-[hsl(var(--hairline))] [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre]:text-[14px] [&_pre]:leading-[1.6]
        [&_pre_code]:bg-transparent [&_pre_code]:border-0 [&_pre_code]:p-0 [&_pre_code]:text-[hsl(var(--ink))]
        [&_h2]:font-display [&_h2]:text-[clamp(1.75rem,3vw,2.25rem)] [&_h2]:font-medium [&_h2]:tracking-[-0.025em] [&_h2]:leading-[1.15] [&_h2]:text-[hsl(var(--ink))] [&_h2]:mt-16 [&_h2]:mb-5 [&_h2]:scroll-mt-28
        [&_h3]:font-display [&_h3]:text-[1.35rem] [&_h3]:font-medium [&_h3]:tracking-[-0.02em] [&_h3]:text-[hsl(var(--ink))] [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:scroll-mt-28
        [&_h4]:text-[1.1rem] [&_h4]:font-medium [&_h4]:tracking-[-0.015em] [&_h4]:text-[hsl(var(--ink))] [&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:scroll-mt-28
        [&_ul]:my-5 [&_ul]:pl-0 [&_ul]:space-y-2
        [&_ol]:my-5 [&_ol]:pl-0 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:list-inside
        [&_ul>li]:relative [&_ul>li]:pl-6
        [&_ul>li]:before:content-['─'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-0 [&_ul>li]:before:text-[hsl(var(--ink-4))] [&_ul>li]:before:font-mono
        [&_blockquote]:my-7 [&_blockquote]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[hsl(var(--accent))] [&_blockquote]:italic [&_blockquote]:text-[hsl(var(--ink))]
        [&_hr]:my-12 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[hsl(var(--hairline))]
        [&_table]:my-7 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[15px]
        [&_th]:text-left [&_th]:font-medium [&_th]:text-[hsl(var(--ink))] [&_th]:py-2 [&_th]:px-3 [&_th]:border-b [&_th]:border-[hsl(var(--hairline))]
        [&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-[hsl(var(--hairline))]
      "
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </div>
  )
}

/**
 * Aside callout — used inline within posts for key insights / warnings.
 * Renders as a small, hairline-bordered block. No emoji, no color noise.
 */
export function Callout({
  label = "Note",
  children,
}: {
  label?: string
  children: ReactNode
}) {
  return (
    <aside className="my-7 border-l-2 border-[hsl(var(--accent))] bg-[hsl(var(--secondary))]/40 px-5 py-4 rounded-r">
      <div className="label mb-1">{label}</div>
      <div className="text-[15px] text-[hsl(var(--ink-2))] leading-relaxed [&>p]:m-0">
        {children}
      </div>
    </aside>
  )
}

/** Used inside posts for emphasized key-value rows. */
export function KV({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-2 border-b border-[hsl(var(--hairline))] text-[14px]">
      <div className="label mono">{k}</div>
      <div className="text-[hsl(var(--ink))]">{v}</div>
    </div>
  )
}
