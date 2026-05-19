"use client"

/**
 * Capability marks — bespoke dotted SVG diagrams, one per capability
 * domain in the Skills section. Same dotted vocabulary as the hero
 * canvas so the site reads of-a-piece.
 *
 * The parent row uses `group/cap` and each animated element opts into
 * `group-hover/cap:` Tailwind classes — no idle motion, no fragile
 * inline <style> blocks. 48×48 viewBox.
 */

type Variant = "genai" | "backend" | "fullstack" | "ml"

interface Props {
  variant: Variant
  className?: string
}

export function CapabilityMark({ variant, className }: Props) {
  const common = `w-12 h-12 shrink-0 ${className ?? ""}`

  if (variant === "genai") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden className={common}>
        {/* Outer ring — rotates +360 on hover */}
        <g
          className="origin-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cap:rotate-[360deg]"
          style={{ transformOrigin: "24px 24px" }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2
            return (
              <circle
                key={i}
                cx={24 + Math.cos(a) * 20}
                cy={24 + Math.sin(a) * 20}
                r={0.9}
                fill="hsl(var(--ink-3))"
              />
            )
          })}
        </g>
        {/* Middle ring — rotates -360 on hover */}
        <g
          className="origin-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cap:-rotate-[360deg]"
          style={{ transformOrigin: "24px 24px" }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 8
            return (
              <circle
                key={i}
                cx={24 + Math.cos(a) * 13}
                cy={24 + Math.sin(a) * 13}
                r={1.1}
                fill="hsl(var(--ink-2))"
              />
            )
          })}
        </g>
        {/* Inner ring — rotates +360 on hover */}
        <g
          className="origin-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cap:rotate-[360deg]"
          style={{ transformOrigin: "24px 24px" }}
        >
          {Array.from({ length: 4 }).map((_, i) => {
            const a = (i / 4) * Math.PI * 2 + Math.PI / 4
            return (
              <circle
                key={i}
                cx={24 + Math.cos(a) * 6}
                cy={24 + Math.sin(a) * 6}
                r={1.3}
                fill="hsl(var(--ink))"
              />
            )
          })}
        </g>
        <circle cx={24} cy={24} r={1.6} fill="hsl(var(--accent))" />
      </svg>
    )
  }

  if (variant === "backend") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden className={common}>
        <line
          x1={10}
          y1={36}
          x2={38}
          y2={36}
          stroke="hsl(var(--ink-3))"
          strokeDasharray="1 3"
          strokeWidth={1}
        />
        <line
          x1={10}
          y1={36}
          x2={24}
          y2={12}
          stroke="hsl(var(--ink-3))"
          strokeDasharray="1 3"
          strokeWidth={1}
        />
        <line
          x1={38}
          y1={36}
          x2={24}
          y2={12}
          stroke="hsl(var(--ink-3))"
          strokeDasharray="1 3"
          strokeWidth={1}
        />
        {[
          [24, 12],
          [10, 36],
          [38, 36],
        ].map(([x, y], i) => (
          <g
            key={i}
            className="transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cap:scale-110"
            style={{ transformOrigin: `${x}px ${y}px`, transitionDelay: `${i * 90}ms` }}
          >
            <circle
              cx={x}
              cy={y}
              r={3}
              fill="none"
              stroke="hsl(var(--ink-2))"
              strokeWidth={1}
            />
            <circle cx={x} cy={y} r={0.9} fill="hsl(var(--ink))" />
          </g>
        ))}
        {/* Center accent dot — appears only on hover */}
        <circle
          cx={24}
          cy={28}
          r={1.4}
          fill="hsl(var(--accent))"
          className="opacity-0 transition-opacity duration-500 group-hover/cap:opacity-100"
        />
      </svg>
    )
  }

  if (variant === "fullstack") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden className={common}>
        {[12, 22, 32, 42].map((y, layerIdx) => {
          // Top layers shift up on hover; bottom stays as the foundation.
          const shift = 3 - layerIdx // 3,2,1,0
          return (
            <g
              key={y}
              className="transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transitionDelay: `${(3 - layerIdx) * 60}ms`,
              }}
              data-shift={shift}
            >
              <g
                className={`transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  shift === 3
                    ? "group-hover/cap:-translate-y-[3px]"
                    : shift === 2
                      ? "group-hover/cap:-translate-y-[2px]"
                      : shift === 1
                        ? "group-hover/cap:-translate-y-[1px]"
                        : ""
                }`}
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={6 + i * 4.5}
                    cy={y}
                    r={layerIdx === 0 ? 1.1 : 1}
                    fill={
                      layerIdx === 0
                        ? "hsl(var(--ink))"
                        : layerIdx === 1
                          ? "hsl(var(--ink-2))"
                          : "hsl(var(--ink-3))"
                    }
                  />
                ))}
              </g>
            </g>
          )
        })}
      </svg>
    )
  }

  // ml — ascending sparkline of dots
  const points = [
    { x: 6, y: 40 },
    { x: 12, y: 37 },
    { x: 18, y: 33 },
    { x: 24, y: 27 },
    { x: 30, y: 20 },
    { x: 36, y: 12 },
    { x: 42, y: 6 },
  ]
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={common}>
      <line
        x1={4}
        y1={42}
        x2={44}
        y2={42}
        stroke="hsl(var(--hairline))"
        strokeWidth={1}
      />
      {[12, 24, 36].map((x) => (
        <line
          key={x}
          x1={x}
          y1={40}
          x2={x}
          y2={42}
          stroke="hsl(var(--ink-4))"
          strokeWidth={1}
        />
      ))}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={1 + (i / points.length) * 0.8}
          fill={
            i === points.length - 1
              ? "hsl(var(--accent))"
              : "hsl(var(--ink-3))"
          }
          className="transition-transform duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cap:scale-[1.4]"
          style={{
            transformOrigin: `${p.x}px ${p.y}px`,
            transitionDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </svg>
  )
}
