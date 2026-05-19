/**
 * Registration marks — tiny architectural/print-style glyphs for
 * deliberately-chosen empty corners. Dotted vocabulary matches the
 * hero canvas. Used 3-4 times total across the site, not everywhere.
 */

type Variant = "crosshair" | "corner" | "dotgrid" | "compass"

interface Props {
  variant?: Variant
  size?: number
  className?: string
}

export function RegistrationMark({
  variant = "crosshair",
  size = 22,
  className,
}: Props) {
  const stroke = "hsl(var(--ink-4))"
  const fill = "hsl(var(--ink-3))"

  if (variant === "crosshair") {
    return (
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
      >
        <circle cx={12} cy={12} r={6} fill="none" stroke={stroke} strokeWidth={0.6} />
        <circle cx={12} cy={2} r={0.9} fill={fill} />
        <circle cx={12} cy={22} r={0.9} fill={fill} />
        <circle cx={2} cy={12} r={0.9} fill={fill} />
        <circle cx={22} cy={12} r={0.9} fill={fill} />
        <circle cx={12} cy={12} r={1.1} fill="hsl(var(--accent))" />
      </svg>
    )
  }

  if (variant === "corner") {
    // L-shaped corner registration — like a print crop mark.
    return (
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
      >
        <line x1={2} y1={2} x2={10} y2={2} stroke={stroke} strokeWidth={0.8} />
        <line x1={2} y1={2} x2={2} y2={10} stroke={stroke} strokeWidth={0.8} />
        {/* Inner dot trio (dotted) */}
        <circle cx={5} cy={5} r={0.7} fill={fill} />
        <circle cx={8} cy={5} r={0.7} fill={fill} />
        <circle cx={5} cy={8} r={0.7} fill={fill} />
      </svg>
    )
  }

  if (variant === "dotgrid") {
    // A small 4×4 dot grid — fragment of the hero canvas vocabulary.
    return (
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
      >
        {Array.from({ length: 4 }).map((_, i) =>
          Array.from({ length: 4 }).map((_, j) => (
            <circle
              key={`${i}-${j}`}
              cx={4 + i * 5.3}
              cy={4 + j * 5.3}
              r={0.85}
              fill={i === 0 && j === 0 ? "hsl(var(--accent))" : fill}
            />
          )),
        )}
      </svg>
    )
  }

  // compass — a tiny N/E/S/W dotted compass with center dot
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <line x1={12} y1={3} x2={12} y2={21} stroke={stroke} strokeWidth={0.5} strokeDasharray="1 2" />
      <line x1={3} y1={12} x2={21} y2={12} stroke={stroke} strokeWidth={0.5} strokeDasharray="1 2" />
      <circle cx={12} cy={3} r={1.1} fill="hsl(var(--ink))" />
      <circle cx={12} cy={21} r={0.7} fill={fill} />
      <circle cx={3} cy={12} r={0.7} fill={fill} />
      <circle cx={21} cy={12} r={0.7} fill={fill} />
      <circle cx={12} cy={12} r={1.3} fill="hsl(var(--accent))" />
    </svg>
  )
}
