"use client";

import type { ReactNode } from "react";
import { ChallengeList } from "./challenge-list";
import { VizPwaFlow } from "./viz-pwa-flow";
import { VizAuthArchitecture } from "./viz-auth-architecture";
import { VizAppStoreMetrics } from "./viz-app-store-metrics";
import type { ChallengeData } from "@/data/challenges";

interface ChallengePageContentProps {
  challenges: ChallengeData[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "challenge-1": <VizPwaFlow />,
    "challenge-2": <VizAuthArchitecture />,
    "challenge-3": <VizAppStoreMetrics />,
  };

  return <ChallengeList challenges={challenges} visualizations={visualizations} />;
}
