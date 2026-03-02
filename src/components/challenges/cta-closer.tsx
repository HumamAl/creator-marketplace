// NO "use client" — pure JSX, no hooks

import Link from "next/link";

export function CtaCloser() {
  return (
    <section
      className="rounded-lg p-6 border"
      style={{
        background:
          "linear-gradient(to bottom right, color-mix(in oklch, var(--primary) 5%, transparent), var(--background))",
        borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold mb-1">
            Ready to cross the GTM finish line?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            I&apos;ve thought through the PWA wrapping, the role routing, and the App Store checklist. Happy to walk through any of this on a call — or jump into your GitHub repo today.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/proposal"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            See the proposal →
          </Link>
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-lg border"
            style={{
              background:
                "linear-gradient(to bottom right, color-mix(in oklch, var(--primary) 10%, transparent), color-mix(in oklch, var(--primary) 5%, transparent))",
              borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
              color: "var(--primary)",
            }}
          >
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </section>
  );
}
