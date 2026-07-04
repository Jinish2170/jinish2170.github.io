"use client"

/**
 * Capability marks — 72px bespoke instrument drawings, one per capability
 * domain in the Capabilities section. Same dotted/hairline vocabulary as
 * the hero signal panel and the small RegistrationMark glyphs, scaled up
 * and given continuous (not hover-gated) motion — these read as always-on
 * instruments, not decorative hover states.
 */

type Variant = "compass" | "target3" | "dotgrid" | "scatter"

interface Props {
  variant: Variant
  className?: string
}

const ANIMS = `
  @keyframes cmRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes cmPulse  { 0%,100% { r: 3.5; opacity: 1; } 55% { r: 6; opacity: 0.35; } }
  @keyframes cmRipple { 0%,100% { r: 2.8; opacity: 1; } 50% { r: 4.5; opacity: 0.5; } }
  @keyframes cmFade   { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
`

export function CapabilityMark({ variant, className }: Props) {
  const S = 72
  const V = 80
  const C = V / 2
  const wrap = `shrink-0 ${className ?? ""}`

  if (variant === "compass") {
    const cardinals = [
      { d: 0, l: "N" },
      { d: 90, l: "E" },
      { d: 180, l: "S" },
      { d: 270, l: "W" },
    ]
    return (
      <svg
        width={S}
        height={S}
        viewBox={`0 0 ${V} ${V}`}
        aria-hidden
        className={wrap}
        style={{ overflow: "visible" }}
      >
        <style>{ANIMS}</style>
        <circle cx={C} cy={C} r="37" fill="none" stroke="hsl(var(--ink-4))" strokeWidth="0.7" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = ((deg - 90) * Math.PI) / 180
          const major = deg % 90 === 0
          return (
            <line
              key={deg}
              x1={C + (major ? 29 : 32) * Math.cos(rad)}
              y1={C + (major ? 29 : 32) * Math.sin(rad)}
              x2={C + 37 * Math.cos(rad)}
              y2={C + 37 * Math.sin(rad)}
              stroke={major ? "hsl(var(--ink-3))" : "hsl(var(--ink-4))"}
              strokeWidth={major ? 1.5 : 0.75}
            />
          )
        })}
        {cardinals.map(({ d, l }) => {
          const rad = ((d - 90) * Math.PI) / 180
          return (
            <text
              key={d}
              x={C + 24 * Math.cos(rad)}
              y={C + 24 * Math.sin(rad)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono, monospace)"
              fontSize="7"
              fontWeight="500"
              fill={l === "N" ? "hsl(var(--ink))" : "hsl(var(--ink-3))"}
            >
              {l}
            </text>
          )
        })}
        <circle cx={C} cy={C} r="8" fill="none" stroke="hsl(var(--ink-4))" strokeWidth="0.7" />
        <g style={{ animation: "cmRotate 14s linear infinite", transformOrigin: `${C}px ${C}px` }}>
          <polygon
            points={`${C},${C - 30} ${C + 5},${C} ${C},${C + 10} ${C - 5},${C}`}
            fill="hsl(var(--accent))"
            opacity="0.92"
          />
          <polygon
            points={`${C},${C + 10} ${C + 5},${C} ${C},${C + 30} ${C - 5},${C}`}
            fill="hsl(var(--ink-4))"
          />
        </g>
        <circle cx={C} cy={C} r="4" fill="hsl(var(--card))" stroke="hsl(var(--ink-3))" strokeWidth="1" />
        <circle
          cx={C}
          cy={C}
          r="1.8"
          fill="hsl(var(--ink))"
          style={{ animation: "cmFade 2s ease-in-out infinite" }}
        />
      </svg>
    )
  }

  if (variant === "target3") {
    return (
      <svg
        width={S}
        height={S}
        viewBox={`0 0 ${V} ${V}`}
        aria-hidden
        className={wrap}
        style={{ overflow: "visible" }}
      >
        <style>{ANIMS}</style>
        <line x1="40" y1="0" x2="40" y2="34" stroke="hsl(var(--ink-4))" strokeWidth="0.6" strokeDasharray="2,4" />
        <line x1="40" y1="48" x2="40" y2="80" stroke="hsl(var(--ink-4))" strokeWidth="0.6" strokeDasharray="2,4" />
        <line x1="0" y1="40" x2="30" y2="40" stroke="hsl(var(--ink-4))" strokeWidth="0.6" strokeDasharray="2,4" />
        <line x1="52" y1="40" x2="80" y2="40" stroke="hsl(var(--ink-4))" strokeWidth="0.6" strokeDasharray="2,4" />
        <line x1="40" y1="41" x2="22" y2="58" stroke="hsl(var(--ink-3))" strokeWidth="0.8" />
        <line x1="40" y1="41" x2="60" y2="58" stroke="hsl(var(--ink-3))" strokeWidth="0.8" />
        <line x1="24" y1="58" x2="58" y2="58" stroke="hsl(var(--ink-3))" strokeWidth="0.8" />
        <circle cx={C} cy={C} r="26" fill="none" stroke="hsl(var(--ink-4))" strokeWidth="0.5" strokeDasharray="3,6" />
        <circle cx="22" cy="58" r="2.2" fill="hsl(var(--ink-3))" />
        <circle cx="58" cy="58" r="2.2" fill="hsl(var(--ink-3))" />
        <circle
          cx={C}
          cy={C}
          r="3.5"
          fill="hsl(var(--accent))"
          style={{ animation: "cmPulse 2.4s ease-in-out infinite", transformOrigin: `${C}px ${C}px` }}
        />
        {[0, 90, 180, 270].map((deg) => {
          const rad = ((deg - 90) * Math.PI) / 180
          return (
            <line
              key={deg}
              x1={C + 24 * Math.cos(rad)}
              y1={C + 24 * Math.sin(rad)}
              x2={C + 28 * Math.cos(rad)}
              y2={C + 28 * Math.sin(rad)}
              stroke="hsl(var(--ink-4))"
              strokeWidth="0.75"
            />
          )
        })}
      </svg>
    )
  }

  if (variant === "scatter") {
    const dots = [
      { x: 36, y: 40, r: 2.0, accent: true },
      { x: 44, y: 38, r: 1.5, accent: false },
      { x: 40, y: 46, r: 1.6, accent: false },
      { x: 32, y: 44, r: 1.2, accent: false },
      { x: 46, y: 46, r: 1.0, accent: true },
      { x: 38, y: 32, r: 1.3, accent: false },
      { x: 26, y: 38, r: 1.0, accent: false },
      { x: 28, y: 52, r: 1.4, accent: false },
      { x: 42, y: 54, r: 0.9, accent: false },
      { x: 52, y: 44, r: 1.1, accent: false },
      { x: 50, y: 32, r: 1.2, accent: false },
      { x: 34, y: 26, r: 0.8, accent: false },
      { x: 18, y: 46, r: 0.7, accent: false },
      { x: 22, y: 28, r: 0.8, accent: false },
      { x: 56, y: 26, r: 0.7, accent: false },
      { x: 60, y: 50, r: 0.9, accent: true },
      { x: 46, y: 62, r: 0.7, accent: false },
      { x: 32, y: 62, r: 0.6, accent: false },
      { x: 62, y: 36, r: 0.7, accent: false },
      { x: 20, y: 60, r: 0.6, accent: false },
    ]
    return (
      <svg
        width={S}
        height={S}
        viewBox={`0 0 ${V} ${V}`}
        aria-hidden
        className={wrap}
        style={{ overflow: "visible" }}
      >
        <style>{ANIMS}</style>
        <circle
          cx={C}
          cy={C}
          r="36"
          fill="none"
          stroke="hsl(var(--ink-4))"
          strokeWidth="0.4"
          strokeDasharray="2,6"
          style={{ animation: "cmFade 4s ease-in-out infinite" }}
        />
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={d.accent ? "hsl(var(--accent))" : "hsl(var(--ink-3))"}
            style={
              d.accent
                ? {
                    animation: `cmRipple ${1.8 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                    transformOrigin: `${d.x}px ${d.y}px`,
                  }
                : undefined
            }
          />
        ))}
        <line x1="36" y1="40" x2="44" y2="38" stroke="hsl(var(--ink-4))" strokeWidth="0.45" />
        <line x1="44" y1="38" x2="46" y2="46" stroke="hsl(var(--ink-4))" strokeWidth="0.45" />
        <line x1="36" y1="40" x2="40" y2="46" stroke="hsl(var(--ink-4))" strokeWidth="0.45" />
        <line x1="40" y1="46" x2="46" y2="46" stroke="hsl(var(--ink-4))" strokeWidth="0.45" />
        <line x1="36" y1="40" x2="32" y2="44" stroke="hsl(var(--ink-4))" strokeWidth="0.45" />
        <line x1="44" y1="38" x2="50" y2="32" stroke="hsl(var(--hairline))" strokeWidth="0.4" />
        <line x1="32" y1="44" x2="28" y2="52" stroke="hsl(var(--hairline))" strokeWidth="0.4" />
      </svg>
    )
  }

  // dotgrid — 5×5 heat-map-style cluster with ripple accents
  const gridDots: { x: number; y: number; r: number; accent: boolean; delay: number }[] = []
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++) {
      const x = 8 + c * 16
      const y = 8 + r * 16
      const dist = Math.hypot(c - 2, r - 2) / 2.83
      const size = 2.8 - dist * 1.4
      const accent = (r === 2 && c === 3) || (r === 1 && c === 2) || (r === 3 && c === 1)
      gridDots.push({ x, y, r: Math.max(0.8, size), accent, delay: (r * 5 + c) * 0.08 })
    }

  return (
    <svg width={S} height={S} viewBox={`0 0 ${V} ${V}`} aria-hidden className={wrap} style={{ overflow: "visible" }}>
      <style>{ANIMS}</style>
      {[8, 24, 40, 56, 72].map((p) => (
        <g key={p}>
          <line x1={p} y1="8" x2={p} y2="72" stroke="hsl(var(--hairline))" strokeWidth="0.5" />
          <line x1="8" y1={p} x2="72" y2={p} stroke="hsl(var(--hairline))" strokeWidth="0.5" />
        </g>
      ))}
      {gridDots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill={d.accent ? "hsl(var(--accent))" : "hsl(var(--ink-3))"}
          style={
            d.accent
              ? {
                  animation: `cmRipple ${1.6 + d.delay}s ease-in-out infinite`,
                  animationDelay: `${d.delay}s`,
                  transformOrigin: `${d.x}px ${d.y}px`,
                }
              : undefined
          }
        />
      ))}
    </svg>
  )
}
