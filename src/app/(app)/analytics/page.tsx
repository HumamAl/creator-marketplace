"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  dashboardStats,
  earningsByMonth,
  listingsByCategory,
  ordersByStatus,
} from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// Dynamic imports for SSR safety (Recharts)
const EarningsChart = dynamic(
  () => import("@/components/analytics/earnings-chart").then((m) => m.EarningsChart),
  { ssr: false, loading: () => <div className="h-[120px] animate-pulse bg-muted/60 rounded" /> }
);
const GmvOrdersChart = dynamic(
  () => import("@/components/analytics/earnings-chart").then((m) => m.GmvOrdersChart),
  { ssr: false, loading: () => <div className="h-[100px] animate-pulse bg-muted/60 rounded" /> }
);
const CategoryPieChart = dynamic(
  () => import("@/components/analytics/earnings-chart").then((m) => m.CategoryPieChart),
  { ssr: false, loading: () => <div className="h-[100px] animate-pulse bg-muted/60 rounded" /> }
);

// ---------------------------------------------------------------------------
// Trend indicator
// ---------------------------------------------------------------------------
function Trend({ change }: { change: number }) {
  if (change > 0)
    return (
      <span className="flex items-center gap-0.5 text-[9px] text-[color:var(--success)]">
        <TrendingUp className="w-2.5 h-2.5" />+{change.toFixed(1)}%
      </span>
    );
  if (change < 0)
    return (
      <span className="flex items-center gap-0.5 text-[9px] text-destructive">
        <TrendingDown className="w-2.5 h-2.5" />{change.toFixed(1)}%
      </span>
    );
  return (
    <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
      <Minus className="w-2.5 h-2.5" />0%
    </span>
  );
}

// ---------------------------------------------------------------------------
// Stat tile
// ---------------------------------------------------------------------------
function StatTile({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: number;
}) {
  return (
    <div className="linear-card p-2.5 flex flex-col gap-1">
      <p className="text-[9px] text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm font-bold font-mono tracking-tight">{value}</p>
      <Trend change={change} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chart view toggle
// ---------------------------------------------------------------------------
type ChartView = "earnings" | "gmv" | "categories";
const CHART_TABS: Array<{ value: ChartView; label: string }> = [
  { value: "earnings", label: "Earnings" },
  { value: "gmv", label: "GMV" },
  { value: "categories", label: "Categories" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AnalyticsPage() {
  const [chartView, setChartView] = useState<ChartView>("earnings");

  const stats = dashboardStats;

  // Derive period-over-period label for last month
  const lastMonth = earningsByMonth[earningsByMonth.length - 2];
  const currentMonth = earningsByMonth[earningsByMonth.length - 1];

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="px-3 pt-3 pb-2 border-b border-border/50">
        <h1 className="text-base font-bold tracking-tight">Earnings Analytics</h1>
        <p className="text-[10px] text-muted-foreground">
          Sundial Studio · Feb 2026
        </p>
      </div>

      <div className="px-3 py-3 space-y-3">
        {/* ── KPI grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-2">
          <StatTile
            label="Earnings"
            value={`$${stats.earningsThisMonth.toLocaleString("en-US", { minimumFractionDigits: 0 })}`}
            change={stats.earningsChange}
          />
          <StatTile
            label="GMV"
            value={`$${stats.gmvThisMonth.toLocaleString("en-US", { minimumFractionDigits: 0 })}`}
            change={stats.gmvChange}
          />
          <StatTile
            label="Orders"
            value={stats.ordersThisMonth.toString()}
            change={stats.ordersChange}
          />
          <StatTile
            label="Avg Order"
            value={`$${stats.aov.toFixed(0)}`}
            change={stats.aovChange}
          />
        </div>

        {/* ── Chart selector ──────────────────────────────────── */}
        <div className="linear-card p-3">
          <div className="flex gap-1.5 mb-3">
            {CHART_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setChartView(tab.value)}
                className={cn(
                  "flex-1 py-1 rounded text-[10px] font-medium transition-colors duration-100",
                  chartView === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {chartView === "earnings" && (
            <div>
              <p className="text-[9px] text-muted-foreground mb-1">
                Monthly earnings · 12 months
              </p>
              <EarningsChart />
            </div>
          )}
          {chartView === "gmv" && (
            <div>
              <p className="text-[9px] text-muted-foreground mb-1">
                GMV last 6 months
              </p>
              <GmvOrdersChart />
            </div>
          )}
          {chartView === "categories" && (
            <div>
              <p className="text-[9px] text-muted-foreground mb-1">
                Listings by category
              </p>
              <div className="flex items-center gap-2">
                <CategoryPieChart />
                <div className="flex flex-col gap-1 text-[9px]">
                  {listingsByCategory.slice(0, 5).map((cat, i) => (
                    <div key={cat.category} className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          background: [
                            "var(--chart-1)",
                            "var(--chart-2)",
                            "var(--chart-3)",
                            "var(--chart-4)",
                            "var(--chart-5)",
                          ][i],
                        }}
                      />
                      <span className="text-muted-foreground truncate max-w-[80px]">
                        {cat.category.split(" ")[0]}
                      </span>
                      <span className="font-mono font-medium ml-auto">
                        {cat.listingCount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Month comparison ─────────────────────────────────── */}
        <div className="linear-card p-3">
          <p className="text-[10px] font-semibold mb-2">vs. Last Month</p>
          <div className="space-y-2">
            {[
              {
                label: "Earnings",
                curr: `$${currentMonth.earnings.toFixed(0)}`,
                prev: `$${lastMonth.earnings.toFixed(0)}`,
                delta: ((currentMonth.earnings - lastMonth.earnings) / lastMonth.earnings) * 100,
              },
              {
                label: "Orders",
                curr: currentMonth.orders.toString(),
                prev: lastMonth.orders.toString(),
                delta: ((currentMonth.orders - lastMonth.orders) / lastMonth.orders) * 100,
              },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2 text-[10px]">
                <p className="text-muted-foreground w-12 shrink-0">{row.label}</p>
                <p className="font-mono font-medium">{row.curr}</p>
                <p className="text-muted-foreground">vs {row.prev}</p>
                <Trend change={row.delta} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Order status breakdown ───────────────────────────── */}
        <div className="linear-card p-3">
          <p className="text-[10px] font-semibold mb-2">Order Status Mix</p>
          <div className="space-y-1.5">
            {ordersByStatus.slice(0, 5).map((s) => (
              <div key={s.status} className="flex items-center gap-2 text-[10px]">
                <p className="text-muted-foreground w-20 shrink-0 truncate">{s.status}</p>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-200"
                    style={{ width: `${s.percentage}%` }}
                  />
                </div>
                <p className="font-mono font-medium w-6 text-right">{s.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Payout balance ───────────────────────────────────── */}
        <div className="linear-card p-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wide">
              Available balance
            </p>
            <p className="text-base font-bold font-mono text-[color:var(--success)]">
              ${stats.availableBalance.toFixed(2)}
            </p>
          </div>
          {stats.balanceOnHold > 0 && (
            <div className="text-right">
              <p className="text-[9px] text-muted-foreground">On hold</p>
              <p className="text-sm font-semibold font-mono text-[color:var(--warning)]">
                ${stats.balanceOnHold.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom banner ──────────────────────────────────────── */}
      <div
        className="px-3 py-2 mt-auto border-t border-border/40 text-center"
        style={{ background: "var(--section-dark)" }}
      >
        <p className="text-[9px] text-white/60">
          Live demo for your project ·{" "}
          <a href="/challenges" className="text-primary hover:underline">My Approach</a>
          {" · "}
          <a href="/proposal" className="text-primary hover:underline">Work With Me</a>
        </p>
      </div>
    </div>
  );
}
