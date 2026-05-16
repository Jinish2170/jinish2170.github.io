"use client"

import Link from "next/link"

/**
 * Footer — minimal editorial.
 *
 * One row of links, a colophon, a hairline. Mono labels. No icons in tinted
 * boxes, no "made with ❤️". The site has spoken; the footer just signs it.
 */
const FooterPremium = () => {
  const year = new Date().getFullYear()

  const linkRows: { label: string; items: { name: string; href: string; external?: boolean }[] }[] = [
    {
      label: "Site",
      items: [
        { name: "Home", href: "/" },
        { name: "About", href: "/#about" },
        { name: "Work", href: "/#projects" },
        { name: "Contact", href: "/#contact" },
      ],
    },
    {
      label: "Elsewhere",
      items: [
        { name: "GitHub", href: "https://github.com/Jinish2170", external: true },
        { name: "LinkedIn", href: "https://linkedin.com/in/jinish-kathiriya", external: true },
        { name: "Twitter", href: "https://twitter.com/JinishKathiriya", external: true },
        { name: "Email", href: "mailto:jinishkathiriya@gmail.com" },
      ],
    },
    {
      label: "Resources",
      items: [
        { name: "Résumé", href: "/resume/jinish Kathiriya (F-FullStack).pdf", external: true },
        {
          name: "Certificates",
          href: "https://drive.google.com/drive/folders/1D9jfqQjSJOml3BCKD-D6V79hVUFlVZXG?usp=sharing",
          external: true,
        },
      ],
    },
  ]

  return (
    <footer className="border-t border-[hsl(var(--hairline))] mt-12">
      <div className="editorial-container py-16 md:py-20">
        {/* === Top — mark + columns === */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Mark + line */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-block text-[40px] leading-none tracking-[-0.04em] font-medium text-[hsl(var(--ink))]"
            >
              Jinish<span className="text-[hsl(var(--accent))]">.</span>
            </Link>
            <p className="mt-6 max-w-sm text-[hsl(var(--ink-2))] text-[15px] leading-relaxed">
              Backend systems and GenAI engineer. Currently leading technical
              work at GDG CKPCET and looking for serious collaborations.
            </p>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-8">
            {linkRows.map((col) => (
              <div key={col.label}>
                <div className="label mb-4">{col.label}</div>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="text-[14px] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* === Colophon === */}
        <div className="pt-8 border-t border-[hsl(var(--hairline))] grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5 label tnum">
            © {year} Jinish Kathiriya — Surat, IN
          </div>
          <div className="lg:col-span-7 grid grid-cols-3 gap-8 text-[hsl(var(--ink-3))]">
            <div className="label">
              <span className="text-[hsl(var(--ink-4))]">Built with</span>
              <br />
              Next.js · TypeScript · Tailwind
            </div>
            <div className="label">
              <span className="text-[hsl(var(--ink-4))]">Type</span>
              <br />
              Space Grotesk · Inter · JetBrains Mono
            </div>
            <div className="label">
              <span className="text-[hsl(var(--ink-4))]">Version</span>
              <br />
              <span className="mono tnum text-[hsl(var(--ink))]">v0.4</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterPremium
