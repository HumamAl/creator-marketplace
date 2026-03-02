export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export interface ChallengeData {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers handed an existing React/PWA treat the App Store submission as an afterthought — they wire up Capacitor in an afternoon, hit a wall of rejected builds and missing entitlements, and end up delaying the GTM launch by weeks. The two-sided routing gets handled with a single auth check that mixes creator and buyer states, leading to UX failures that surface in production.",
  differentApproach:
    "I approach this as a native-deployment project from the start: validating the PWA against App Store review guidelines before wrapping, separating creator and buyer sessions at the auth layer, and optimizing Core Web Vitals specifically for Capacitor's WebView — so the app ships in 2–3 weeks, not 6.",
  accentWord: "native-deployment",
};

export const challenges: ChallengeData[] = [
  {
    id: "challenge-1",
    title: "PWA-to-App-Store Wrapping Without a Native Rewrite",
    description:
      "Most PWAs aren't immediately wrappable — missing icon sizes, inadequate offline support, and WebView-specific layout bugs will cause Apple and Google to reject the build. The key is validating compliance before Capacitor enters the picture, not after.",
    outcome:
      "Could ship to both iOS App Store and Google Play within 2–3 weeks using Capacitor — without discarding the existing React codebase or incurring rebuild costs.",
  },
  {
    id: "challenge-2",
    title: "Two-Sided Session Routing: Creator vs. Buyer Contexts",
    description:
      "Creator marketplaces with both seller dashboards and buyer discovery feeds fail in subtle ways when role routing is bolted on top of a single session. A creator viewing their earnings page shouldn't inherit the buyer's cart state — and vice versa.",
    outcome:
      "Could eliminate the routing conflicts that plague two-sided apps by separating creator and buyer contexts at the auth layer, preventing mixed-role UX failures that erode trust before GTM launch.",
  },
  {
    id: "challenge-3",
    title: "App Store Approval Criteria and Mobile Performance",
    description:
      "App Store reviews check more than code — icon sizing, deep link configuration, permissions declarations, and offline behavior are all evaluated. On top of that, Capacitor's WebView amplifies LCP issues that were acceptable in a browser but fail Core Web Vitals on mobile.",
    outcome:
      "Could reduce app store rejection risk significantly by meeting iOS and Android review guidelines before submission — addressing offline behavior, deep links, icon sizing, and permissions upfront.",
  },
];
