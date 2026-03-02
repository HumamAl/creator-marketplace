"use client";

import type { ReactNode } from "react";
import { ChallengeCardNew } from "./challenge-card";
import type { ChallengeData } from "@/data/challenges";

interface ChallengeListProps {
  challenges: ChallengeData[];
  visualizations?: Record<string, ReactNode>;
}

export function ChallengeList({ challenges, visualizations = {} }: ChallengeListProps) {
  return (
    <div className="flex flex-col gap-4">
      {challenges.map((challenge, index) => (
        <ChallengeCardNew
          key={challenge.id}
          id={challenge.id}
          index={index}
          visualization={visualizations[challenge.id]}
          title={challenge.title}
          description={challenge.description}
          outcome={challenge.outcome}
        />
      ))}
    </div>
  );
}
