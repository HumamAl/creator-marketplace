// NO "use client" — pure JSX, no hooks

import type { ReactNode } from "react";
import { OutcomeStatement } from "./outcome-statement";

interface ChallengeCardProps {
  id?: string;
  title: string;
  description: string;
  outcome: string;
  index: number;
  visualization?: ReactNode;
}

export function ChallengeCardNew({
  title,
  description,
  outcome,
  index,
  visualization,
}: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className="bg-card border border-border/60 rounded-lg p-5 space-y-4"
      style={{
        boxShadow: "0 1px 3px oklch(0 0 0 / 0.06)",
        transition: "border-color 150ms, box-shadow 150ms",
      }}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm font-medium text-primary/70 w-6 shrink-0 tabular-nums">
          {stepNumber}
        </span>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {visualization && <div className="pl-[calc(1.5rem+0.75rem)]">{visualization}</div>}

      <div className="pl-[calc(1.5rem+0.75rem)]">
        <OutcomeStatement outcome={outcome} index={index} />
      </div>
    </div>
  );
}
