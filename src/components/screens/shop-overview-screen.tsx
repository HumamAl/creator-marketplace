"use client";

import { useState, useEffect, useRef } from "react";
import { TrendingUp, ShoppingBag, Eye, Star, ChevronRight, Package, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardStats, EarningsDataPoint } from "@/lib/types";

function useCountUp(target: number, duration = 1000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// Minimal sparkline chart — inline SVG, no library needed
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 24;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline
        points={points.join(" ")}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  format: "currency" | "integer" | "decimal";
  change: number;
  icon: React.ReactNode;
  sparkData: number[];
  index: number;
}

function StatCard({ label, value, format, change, icon, sparkData, index }: StatCardProps) {
  const { count, ref } = useCountUp(Math.round(value), 1000 + index * 100);

  const formatted =
    format === "currency"
      ? `$${count.toLocaleString()}`
      : format === "decimal"
      ? (value).toFixed(1)
      : count.toLocaleString();

  const isPositive = change >= 0;

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border/50 bg-card p-3 flex flex-col gap-2"
      style={{
        animationName: "fadeUpIn",
        animationDuration: "200ms",
        animationDelay: `${index * 50}ms`,
        animationFillMode: "both",
        animationTimingFunction: "ease-out",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-muted-foreground leading-tight">{label}</span>
        <span className="text-muted-foreground/60">{icon}</span>
      </div>
      <div className="font-bold text-lg font-mono tabular-nums text-foreground leading-none">
        {formatted}
      </div>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-[10px] font-medium",
            isPositive ? "text-[color:var(--success)]" : "text-destructive"
          )}
        >
          {isPositive ? "+" : ""}{change}% vs last month
        </span>
        <Sparkline data={sparkData} color={isPositive ? "var(--success)" : "var(--destructive)"} />
      </div>
    </div>
  );
}

interface ShopOverviewScreenProps {
  stats: DashboardStats;
  earningsByMonth: EarningsDataPoint[];
  creatorName: string;
  shopName: string;
  starRating: number | null;
}

export function ShopOverviewScreen({
  stats,
  earningsByMonth,
  creatorName,
  shopName,
  starRating,
}: ShopOverviewScreenProps) {
  const earningsSpark = earningsByMonth.slice(-6).map((d) => d.earnings);
  const ordersSpark = earningsByMonth.slice(-6).map((d) => d.orders * 50);
  const gmvSpark = earningsByMonth.slice(-6).map((d) => d.gmv);

  const quickActions = [
    { label: "Add Listing", icon: "＋", color: "bg-primary text-primary-foreground" },
    { label: "View Orders", icon: "📦", color: "bg-muted text-foreground" },
    { label: "Run Sale", icon: "🏷", color: "bg-muted text-foreground" },
  ];

  const recentActivity = [
    { text: "New order from Claire W.", time: "2m ago", type: "order" },
    { text: "Listing saved · Moonstone Ring", time: "8m ago", type: "save" },
    { text: "Review received · 5 stars", time: "1h ago", type: "review" },
    { text: "Payout scheduled · $638.40", time: "2h ago", type: "payout" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 bg-gradient-to-br from-primary/8 to-primary/3 border-b border-border/30">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Shop Overview</p>
            <h2 className="text-base font-bold text-foreground leading-tight">{shopName}</h2>
          </div>
          <div className="flex items-center gap-1 bg-warning/15 rounded-full px-2 py-0.5">
            <Star className="w-3 h-3 text-warning fill-warning" />
            <span className="text-[11px] font-semibold text-warning">
              {starRating?.toFixed(1) ?? "New"}
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono text-primary">
            ${stats.earningsThisMonth.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-muted-foreground">earnings this month</span>
          <span className="text-[10px] text-[color:var(--success)] font-semibold">+{stats.earningsChange}%</span>
        </div>
      </div>

      {/* Stat Cards 2×2 grid */}
      <div className="px-3 pt-3 grid grid-cols-2 gap-2">
        <StatCard
          label="GMV This Month"
          value={stats.gmvThisMonth}
          format="currency"
          change={stats.gmvChange}
          icon={<TrendingUp className="w-3.5 h-3.5" />}
          sparkData={gmvSpark}
          index={0}
        />
        <StatCard
          label="Orders"
          value={stats.ordersThisMonth}
          format="integer"
          change={stats.ordersChange}
          icon={<ShoppingBag className="w-3.5 h-3.5" />}
          sparkData={ordersSpark}
          index={1}
        />
        <StatCard
          label="Active Listings"
          value={stats.activeListings}
          format="integer"
          change={stats.activeListingsChange}
          icon={<Package className="w-3.5 h-3.5" />}
          sparkData={[18, 19, 20, 20, 21, 22]}
          index={2}
        />
        <StatCard
          label="Avg Order Value"
          value={stats.aov}
          format="currency"
          change={stats.aovChange}
          icon={<DollarSign className="w-3.5 h-3.5" />}
          sparkData={[72, 78, 81, 83, 85, 87]}
          index={3}
        />
      </div>

      {/* Available Balance */}
      <div className="mx-3 mt-2 rounded-xl border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground font-medium">Available Balance</p>
            <p className="text-lg font-bold font-mono text-primary">
              ${stats.availableBalance.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-medium">On Hold</p>
            <p className="text-sm font-semibold font-mono text-warning">
              ${stats.balanceOnHold.toFixed(2)}
            </p>
          </div>
          <button className="text-[11px] font-semibold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg">
            Request Payout
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-3 pt-3">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Quick Actions</p>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 rounded-xl py-2.5 text-[10px] font-semibold border border-border/40",
                action.color
              )}
            >
              <span className="text-base">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-3 pt-3 pb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Recent Activity</p>
          <button className="text-[10px] text-primary font-medium flex items-center gap-0.5">
            All <ChevronRight className="w-2.5 h-2.5" />
          </button>
        </div>
        <div className="space-y-0.5">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full shrink-0",
                  item.type === "order" ? "bg-primary" :
                  item.type === "review" ? "bg-[color:var(--success)]" :
                  item.type === "payout" ? "bg-warning" :
                  "bg-muted-foreground/40"
                )} />
                <span className="text-[11px] text-foreground truncate">{item.text}</span>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
