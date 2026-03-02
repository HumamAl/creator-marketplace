import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "Full-stack developer who builds marketplaces and e-commerce tools — listings, payments, vendor management, the works.",
  bio: "I build MVPs and production apps that solve real operational problems — creator platforms, two-sided marketplaces, and mobile-first PWAs. My approach is straightforward: understand the codebase, close the gaps, and ship.",
  approach: [
    {
      title: "Audit",
      description:
        "Jump into the repo on day one — map what's 80% done, identify what still needs work, and surface any PWA gaps that would block app store approval. No dark period, just a clear report of where things stand.",
    },
    {
      title: "Polish",
      description:
        "Complete the UI/UX gaps, fix edge cases in creator and buyer flows, and make the experience feel seamless end-to-end. Creator onboarding, listing management, and checkout all need to feel native — not \"almost done\".",
    },
    {
      title: "Wrap",
      description:
        "Configure Capacitor, build the iOS and Android native shells, handle provisioning profiles, bundle IDs, deep links, icon sizing, and offline behavior — everything App Store reviewers check before approving.",
    },
    {
      title: "Launch",
      description:
        "Submit to App Store and Google Play with the right metadata and screenshots. Monitor the review process, handle any rejection feedback fast, and be available for post-launch fixes. First build in-store within 2–3 weeks.",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui", "PWA"],
    },
    {
      name: "Mobile & Native",
      skills: ["Capacitor", "iOS App Store", "Google Play", "App Store Deployment", "Deep Links"],
    },
    {
      name: "Payments & APIs",
      skills: ["Stripe Connect", "Stripe Split Payments", "REST APIs", "Webhook Handling"],
    },
    {
      name: "DevOps & Tooling",
      skills: ["Vercel", "GitHub Actions", "TypeScript Strict Mode", "Git Workflows"],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "lynt-marketplace",
    title: "Lynt Marketplace",
    description:
      "Digital marketplace platform with product listings, vendor management, and transaction tracking — full marketplace architecture ready for production.",
    outcome:
      "Full marketplace architecture — vendor onboarding, listing management, and transaction tracking ready for production",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    relevance:
      "Direct marketplace architecture match — vendor onboarding and listing management are the same core problems your creator platform needs solved.",
    liveUrl: "https://lynt-marketplace.vercel.app",
  },
  {
    id: "tri-gear-market",
    title: "Tri-Gear Market",
    description:
      "Verified triathlon equipment marketplace with gear listings, seller verification flows, and category browsing — niche two-sided marketplace with real operational depth.",
    outcome:
      "Niche marketplace with seller verification, gear categorization, and listing management",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    relevance:
      "Shows I can build seller verification and listing management flows — the same flows your creator onboarding needs to support.",
    liveUrl: "https://tri-gear-market.vercel.app",
  },
  {
    id: "creator-economy-app",
    title: "Creator Economy App",
    description:
      "Creator economy livestreaming platform with Stripe Connect payments — end-to-end payment flow from viewer tip to creator payout via split payments.",
    outcome:
      "End-to-end payment flow from viewer tip to creator payout via Stripe Connect split payments",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe Connect"],
    relevance:
      "Stripe Connect split payments are the exact payment infrastructure a two-sided creator marketplace needs — I've already built this flow.",
  },
  {
    id: "rental-pm-connect",
    title: "Rental PM Connect",
    description:
      "Two-sided SaaS platform connecting property owners with vetted property managers — separate role dashboards, matching algorithms, and review systems.",
    outcome:
      "Two-sided matching platform with vetting workflows, review tracking, and separate owner/PM dashboards",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    relevance:
      "Two-sided platform architecture with separate creator and buyer contexts mirrors the role-routing complexity your marketplace needs at the auth layer.",
    liveUrl: "https://rental-pm-connect.vercel.app",
  },
];

export const proposalData = {
  hero: {
    name: "Humam",
    valueProp:
      "I build and ship creator marketplaces — and I've already built the mobile demo you can browse in Tab 1, showing exactly what your PWA would look like wrapped and running as a native app.",
    badge: "Built this demo for your project",
    stats: [
      { value: "24+", label: "Projects Shipped" },
      { value: "< 48hr", label: "Demo Turnaround" },
      { value: "15+", label: "Industries" },
    ],
  },
  cta: {
    headline: "Ready to cross the finish line with you.",
    body: "The hard parts — marketplace architecture, Stripe Connect payouts, and the Capacitor native shell — are problems I've already solved. The demo in Tab 1 shows what your app looks like wrapped for mobile. Reply on Upwork and I'll be in your repo within the first week.",
    action: "Reply on Upwork to start",
    availability: "Currently available for new projects",
  },
};
