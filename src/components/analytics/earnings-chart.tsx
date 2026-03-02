"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { earningsByMonth, listingsByCategory } from "@/data/mock-data";

// ---------------------------------------------------------------------------
// Earnings area chart
// ---------------------------------------------------------------------------
export function EarningsChart() {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={earningsByMonth} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="month"
          tick={{ fontSize: 8, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 8, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(1)}k`}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            fontSize: "10px",
            padding: "6px 8px",
          }}
          formatter={(value) => [`$${(value as number).toFixed(0)}`, "Earnings"]}
        />
        <Area
          type="monotone"
          dataKey="earnings"
          stroke="var(--chart-1)"
          strokeWidth={1.5}
          fill="url(#earningsGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ---------------------------------------------------------------------------
// GMV vs orders bar chart
// ---------------------------------------------------------------------------
export function GmvOrdersChart() {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={earningsByMonth.slice(-6)} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="month"
          tick={{ fontSize: 8, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 8, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            fontSize: "10px",
            padding: "6px 8px",
          }}
          formatter={(value) => [`$${(value as number).toFixed(0)}`, "GMV"]}
        />
        <Bar dataKey="gmv" fill="var(--chart-2)" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ---------------------------------------------------------------------------
// Category breakdown pie chart
// ---------------------------------------------------------------------------
const CATEGORY_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function CategoryPieChart() {
  const data = listingsByCategory.slice(0, 5);
  return (
    <ResponsiveContainer width="100%" height={100}>
      <PieChart>
        <Pie
          data={data}
          dataKey="listingCount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={40}
          innerRadius={22}
          strokeWidth={0}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            fontSize: "10px",
            padding: "6px 8px",
          }}
          formatter={(value, name) => [value, name]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
