import { ExternalLink, TrendingUp, CheckCircle2 } from "lucide-react";
import { profile, portfolioProjects, proposalData } from "@/data/proposal";
import { SkillsGrid } from "@/components/proposal/skills-grid";

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

        {/* ── Section 1: Hero (Project Brief) ── */}
        <section
          className="relative rounded-xl overflow-hidden"
          style={{ background: `oklch(0.10 0.02 var(--primary-h, 20))` }}
        >
          {/* Warm radial highlight from top */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.56 0.18 20 / 0.12), transparent 70%)",
            }}
          />

          <div className="relative z-10 p-8 md:p-12 space-y-5">
            {/* "Built this demo for your project" badge — mandatory */}
            <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/10 border border-white/10 text-white/80 px-3 py-1.5 rounded-full">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              {proposalData.hero.badge}
            </span>

            {/* Role prefix */}
            <p className="font-mono text-xs tracking-widest uppercase text-white/40">
              Full-Stack Developer · Marketplace &amp; Mobile Specialist
            </p>

            {/* Name with weight contrast */}
            <h1 className="text-5xl md:text-6xl tracking-tight leading-none">
              <span className="font-light text-white/70">Hi, I&apos;m</span>{" "}
              <span className="font-black text-white">{proposalData.hero.name}</span>
            </h1>

            {/* Value prop — tailored to this specific job */}
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              {proposalData.hero.valueProp}
            </p>
          </div>

          {/* Stats shelf */}
          <div className="relative z-10 border-t border-white/10 bg-white/5 px-8 py-4">
            <div className="grid grid-cols-3 gap-4">
              {proposalData.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-bold"
                    style={{
                      background: "linear-gradient(to right, white, oklch(1 0 0 / 0.6))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Proof of Work ── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Proof of Work
            </p>
            <h2 className="text-2xl font-bold tracking-tight">Relevant Projects</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {portfolioProjects.map((project) => (
              <div
                key={project.id}
                className="aesthetic-card p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold leading-snug">{project.title}</h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary shrink-0 transition-colors"
                      style={{ transition: "color var(--t-interactive)" }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Outcome badge — always present */}
                {project.outcome && (
                  <div className="flex items-start gap-2 text-sm text-[color:var(--success)]">
                    <TrendingUp className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span className="leading-snug">{project.outcome}</span>
                  </div>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-primary/10 text-xs font-mono text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Relevance note */}
                {project.relevance && (
                  <p className="text-xs text-primary/70 italic leading-relaxed pt-1 border-t border-border/40">
                    {project.relevance}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: How I Work ── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Process
            </p>
            <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Customized for codebase-takeover and PWA-to-native shipping.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {profile.approach.map((step, i) => (
              <div key={step.title} className="aesthetic-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                    Step 0{i + 1}
                  </span>
                  {/* Timeline labels per step */}
                  <span className="font-mono text-xs text-muted-foreground/50">
                    {i === 0
                      ? "Day 1–2"
                      : i === 1
                      ? "Week 1–2"
                      : i === 2
                      ? "Week 2–3"
                      : "Week 3+"}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Skills Grid ── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Tech Stack
            </p>
            <h2 className="text-2xl font-bold tracking-tight">What I Build With</h2>
          </div>

          <SkillsGrid categories={profile.skillCategories} />
        </section>

        {/* ── Section 5: CTA (Dark Panel) ── */}
        <section
          className="relative rounded-xl overflow-hidden text-center"
          style={{ background: `oklch(0.10 0.02 var(--primary-h, 20))` }}
        >
          {/* Warm bottom glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 100%, oklch(0.56 0.18 20 / 0.10), transparent 70%)",
            }}
          />

          <div className="relative z-10 p-8 md:p-12 space-y-5">
            {/* Pulsing availability indicator — mandatory */}
            <div className="flex items-center justify-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: "var(--success)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: "var(--success)" }}
                />
              </span>
              <span
                className="text-sm"
                style={{
                  color: "color-mix(in oklch, var(--success) 80%, white)",
                }}
              >
                {proposalData.cta.availability}
              </span>
            </div>

            {/* Headline — tailored to this project */}
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
              {proposalData.cta.headline}
            </h2>

            {/* Body — specific to this demo and job */}
            <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
              {proposalData.cta.body}
            </p>

            {/* What's already solved — quick trust signals */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
              {[
                "Marketplace architecture done",
                "Stripe Connect flow built",
                "Capacitor wrapping ready",
              ].map((signal) => (
                <span
                  key={signal}
                  className="inline-flex items-center gap-1.5 text-xs text-white/60"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  {signal}
                </span>
              ))}
            </div>

            {/* Primary action — text, not a dead-end button */}
            <p className="text-lg font-semibold text-white pt-2">
              {proposalData.cta.action}
            </p>

            {/* Secondary — back to demo */}
            <a
              href="/"
              className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/60"
              style={{ transition: "color var(--t-interactive)" }}
            >
              ← Back to the demo
            </a>

            {/* Signature */}
            <p className="pt-4 text-sm text-white/30 border-t border-white/10">
              — Humam
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
