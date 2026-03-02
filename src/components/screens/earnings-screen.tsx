"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EarningsDataPoint, Payout, StarSellerCriteria } from "@/lib/types";

const EarningsChart = dynamic(
  () => import("./earnings-chart").then((m) => ({ default: m.EarningsChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[120px] bg-muted/30 rounded-lg animate-pulse" />
    ),
  }
);

function payoutStatusBadge(status: Payout["status"]) {
  switch (status) {
    case "Paid":
      return "bg-[color:var(--success)]/12 text-[color:var(--success)]";
    case "Scheduled":
      return "bg-primary/12 text-primary";
    case "Processing":
      return "bg-warning/12 text-warning";
    case "On Hold":
      return "bg-destructive/12 text-destructive";
    case "Failed":
      return "bg-destructive/12 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function PayoutRow({ payout }: { payout: Payout }) {
  return (
    <div className="py-2.5 border-b border-border/30 last:border-0">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-foreground">{payout.period}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {payout.orderCount} order{payout.orderCount !== 1 ? "s" : ""}
            {" · "}
            Platform fee: −${payout.platformFee.toFixed(2)}
          </p>
          {payout.holdReason && (
            <div className="flex items-start gap-1 mt-1">
              <AlertTriangle className="w-2.5 h-2.5 text-destructive shrink-0 mt-0.5" />
              <p className="text-[9px] text-destructive leading-tight">
                {payout.holdReason}
                {payout.holdReleaseDate && (
                  <span className="ml-1">
                    · Available{" "}
                    {new Date(payout.holdReleaseDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[12px] font-bold font-mono text-foreground">
            ${payout.amount.toFixed(2)}
          </p>
          <span
            className={cn(
              "inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide mt-0.5",
              payoutStatusBadge(payout.status)
            )}
          >
            {payout.status}
          </span>
        </div>
      </div>
    </div>
  );
}

interface StarSellerProgressProps {
  criteria: StarSellerCriteria[];
}

function StarSellerProgress({ criteria }: StarSellerProgressProps) {
  const metCount = criteria.filter((c) => c.met).length;
  const totalCount = criteria.length;

  return (
    <div className="rounded-xl border border-border/40 bg-card p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[11px] font-bold text-foreground flex items-center gap-1">
            ⭐ Star Seller Progress
          </p>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            {metCount}/{totalCount} criteria met
          </p>
        </div>
        <div className="text-right">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold border-2 border-primary"
            style={{
              background: `conic-gradient(var(--primary) ${(metCount / totalCount) * 360}deg, var(--muted) 0deg)`,
            }}
          >
            <span className="bg-card rounded-full w-7 h-7 flex items-center justify-center text-[10px] font-bold text-primary">
              {Math.round((metCount / totalCount) * 100)}%
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        {criteria.map((criterion, i) => (
          <div key={i} className="flex items-center gap-2">
            {criterion.met ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)] shrink-0" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-[10px] font-medium leading-tight",
                  criterion.met ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {criterion.label}
              </p>
              <p className="text-[9px] text-muted-foreground">
                {criterion.value} · target: {criterion.target}
              </p>
            </div>
          </div>
        ))}
      </div>
      {metCount < totalCount && (
        <p className="text-[9px] text-primary font-medium mt-2">
          {totalCount - metCount} more criteria to earn Star Seller badge
        </p>
      )}
    </div>
  );
}

type ChartView = "earnings" | "gmv" | "orders";

interface EarningsScreenProps {
  earningsByMonth: EarningsDataPoint[];
  payouts: Payout[];
  starSellerProgress: StarSellerCriteria[];
  availableBalance: number;
  balanceOnHold: number;
}

export function EarningsScreen({
  earningsByMonth,
  payouts,
  starSellerProgress,
  availableBalance,
  balanceOnHold,
}: EarningsScreenProps) {
  const [chartView, setChartView] = useState<ChartView>("earnings");

  const totalEarningsYTD = earningsByMonth
    .filter((d) => d.month.includes("26"))
    .reduce((sum, d) => sum + d.earnings, 0);

  const totalGMVYTD = earningsByMonth
    .filter((d) => d.month.includes("26"))
    .reduce((sum, d) => sum + d.gmv, 0);

  const chartViews: { key: ChartView; label: string }[] = [
    { key: "earnings", label: "Earnings" },
    { key: "gmv", label: "GMV" },
    { key: "orders", label: "Orders" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b border-border/30">
        <h2 className="text-base font-bold text-foreground">Earnings</h2>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          YTD Earnings: <span className="font-semibold text-foreground">${totalEarningsYTD.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          {" · "}
          GMV: <span className="font-semibold text-foreground">${totalGMVYTD.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        </p>
      </div>

      {/* Balance Cards */}
      <div className="px-3 pt-2.5 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-2.5">
          <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wide">Available</p>
          <p className="text-[15px] font-bold font-mono text-primary mt-0.5">
            ${availableBalance.toFixed(2)}
          </p>
          <button className="mt-1.5 text-[9px] font-semibold text-primary-foreground bg-primary px-2 py-1 rounded-lg w-full">
            Request Payout
          </button>
        </div>
        <div className="rounded-xl border border-warning/20 bg-warning/5 p-2.5">
          <div className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-warning" />
            <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wide">On Hold</p>
          </div>
          <p className="text-[15px] font-bold font-mono text-warning mt-0.5">
            ${balanceOnHold.toFixed(2)}
          </p>
          <p className="text-[9px] text-muted-foreground mt-1">
            Pending dispute resolution
          </p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
            12-Month Trend
          </p>
          <div className="flex gap-0.5">
            {chartViews.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setChartView(key)}
                className={cn(
                  "px-2 py-0.5 text-[9px] font-semibold rounded transition-colors duration-100",
                  chartView === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-2">
          <EarningsChart
            data={earningsByMonth.map((d) => ({
              ...d,
              earnings:
                chartView === "earnings"
                  ? d.earnings
                  : chartView === "gmv"
                  ? d.gmv
                  : d.orders * 50, // scale orders for visual
            }))}
          />
        </div>
      </div>

      {/* Star Seller Progress */}
      <div className="px-3 pt-3">
        <StarSellerProgress criteria={starSellerProgress} />
      </div>

      {/* Payout History */}
      <div className="px-3 pt-3 pb-3">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Payout History
        </p>
        <div className="rounded-xl border border-border/40 bg-card px-3 py-1">
          {payouts.slice(0, 5).map((payout) => (
            <PayoutRow key={payout.id} payout={payout} />
          ))}
        </div>
      </div>
    </div>
  );
}
