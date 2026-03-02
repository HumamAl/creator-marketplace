"use client";

import { useState } from "react";

interface MetricItem {
  label: string;
  beforeValue: number;
  afterValue: number;
  maxValue: number;
  unit: string;
  targetLabel: string;
  // "lower-is-better": good = low value (e.g. LCP seconds)
  // "higher-is-better": good = high value (e.g. compliance %)
  direction: "lower-is-better" | "higher-is-better";
  description: string;
}

const metrics: MetricItem[] = [
  {
    label: "LCP (Largest Contentful Paint)",
    beforeValue: 4.2,
    afterValue: 1.9,
    maxValue: 5.0,
    unit: "s",
    targetLabel: "< 2.5s",
    direction: "lower-is-better",
    description:
      "WebView-optimized image loading and font preloading reduces LCP below Apple's recommended threshold.",
  },
  {
    label: "App Store Compliance Score",
    beforeValue: 58,
    afterValue: 97,
    maxValue: 100,
    unit: "%",
    targetLabel: "> 90%",
    direction: "higher-is-better",
    description:
      "Icon sizes, deep links, offline support, and permissions declarations all validated before submission.",
  },
  {
    label: "Offline Capability Coverage",
    beforeValue: 10,
    afterValue: 85,
    maxValue: 100,
    unit: "%",
    targetLabel: "> 80%",
    direction: "higher-is-better",
    description:
      "Service worker caches creator storefronts and buyer discovery feed so the app works offline.",
  },
];

function isGoodValue(value: number, direction: MetricItem["direction"], targetLabel: string): boolean {
  const num = parseFloat(targetLabel.replace(/[<>%s ]/g, ""));
  if (direction === "lower-is-better") return value <= num;
  return value >= num;
}

export function VizAppStoreMetrics() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          Mobile performance targets
        </p>
        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="text-xs font-medium px-3 py-1.5 rounded-md border transition-all duration-150"
            style={{
              backgroundColor: "color-mix(in oklch, var(--primary) 8%, transparent)",
              borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
              color: "var(--primary)",
            }}
          >
            Show the improvement
          </button>
        ) : (
          <span
            className="text-xs font-medium px-2 py-1 rounded-md"
            style={{
              backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
              color: "var(--success)",
            }}
          >
            After optimization
          </span>
        )}
      </div>

      <div className="space-y-5">
        {metrics.map((metric) => {
          const beforePct = Math.round((metric.beforeValue / metric.maxValue) * 100);
          const afterPct = Math.round((metric.afterValue / metric.maxValue) * 100);
          const beforeGood = isGoodValue(metric.beforeValue, metric.direction, metric.targetLabel);
          const afterGood = isGoodValue(metric.afterValue, metric.direction, metric.targetLabel);

          // For lower-is-better: bar fill shows how "full" the bad range is (higher bar = worse)
          // For higher-is-better: bar fill shows progress toward 100% (higher bar = better)
          const beforeBarWidth = metric.direction === "lower-is-better" ? beforePct : beforePct;
          const afterBarWidth = afterPct;

          return (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground leading-tight">{metric.label}</p>
                <span
                  className="text-xs px-2 py-0.5 rounded font-mono shrink-0"
                  style={{
                    backgroundColor: "color-mix(in oklch, var(--muted), transparent 50%)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Target: {metric.targetLabel}
                </span>
              </div>

              {/* Before row */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Before</span>
                  <span
                    className="text-xs font-mono font-semibold"
                    style={{ color: beforeGood ? "var(--success)" : "var(--destructive)" }}
                  >
                    {metric.beforeValue}
                    {metric.unit}
                  </span>
                </div>
                <div
                  className="h-2 rounded-full w-full overflow-hidden"
                  style={{ backgroundColor: "color-mix(in oklch, var(--muted), transparent 30%)" }}
                >
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${beforeBarWidth}%`,
                      backgroundColor: beforeGood ? "var(--success)" : "var(--destructive)",
                    }}
                  />
                </div>
              </div>

              {/* After row — revealed on click */}
              {revealed && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">After</span>
                    <span
                      className="text-xs font-mono font-semibold"
                      style={{ color: afterGood ? "var(--success)" : "var(--warning)" }}
                    >
                      {metric.afterValue}
                      {metric.unit}
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full w-full overflow-hidden"
                    style={{ backgroundColor: "color-mix(in oklch, var(--muted), transparent 30%)" }}
                  >
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{
                        width: `${afterBarWidth}%`,
                        backgroundColor: afterGood ? "var(--success)" : "var(--warning)",
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
