"use client";

import { useState, useMemo } from "react";
import { orders } from "@/data/mock-data";
import type { OrderStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Package,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Truck,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------
function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config: Record<OrderStatus, { label: string; colorClass: string }> = {
    "Pending Payment": { label: "Pending",      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    Processing:        { label: "Processing",   colorClass: "text-primary bg-primary/10" },
    Shipped:           { label: "Shipped",      colorClass: "text-primary bg-primary/10" },
    "Out for Delivery":{ label: "Out for Del.", colorClass: "text-primary bg-primary/10" },
    Delivered:         { label: "Delivered",    colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    Disputed:          { label: "Disputed",     colorClass: "text-destructive bg-destructive/10" },
    Refunded:          { label: "Refunded",     colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    Cancelled:         { label: "Cancelled",    colorClass: "text-muted-foreground bg-muted" },
  };
  const c = config[status] ?? { label: status, colorClass: "text-muted-foreground bg-muted" };
  return (
    <Badge
      variant="outline"
      className={cn("text-[10px] font-medium border-0 rounded-full px-2 py-0.5 shrink-0", c.colorClass)}
    >
      {c.label}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Compact order card — expandable
// ---------------------------------------------------------------------------
function OrderCard({
  order,
  expanded,
  onToggle,
  onMarkShipped,
}: {
  order: (typeof orders)[0];
  expanded: boolean;
  onToggle: () => void;
  onMarkShipped: (id: string) => void;
}) {
  const placedDate = new Date(order.placedAt);
  const daysAgo = Math.floor((Date.now() - placedDate.getTime()) / 86400000);

  return (
    <div className="border-b border-border/50 last:border-0">
      {/* Main row */}
      <div
        className="px-3 py-2.5 cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors duration-100"
        onClick={onToggle}
      >
        <div className="flex items-start gap-2.5">
          {/* Listing image swatch */}
          <div
            className={cn(
              "w-9 h-9 shrink-0 rounded-md border border-border/40",
              order.listingImageColor
            )}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold leading-tight line-clamp-1">
              {order.listingTitle}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {order.buyerName} · {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-[11px] font-semibold font-mono">
              ${order.subtotal.toFixed(2)}
            </span>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="self-center ml-0.5">
            {expanded ? (
              <ChevronUp className="w-3 h-3 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Disputed warning inline */}
        {order.status === "Disputed" && (
          <div className="flex items-center gap-1.5 mt-1.5 pl-11 text-[10px] text-destructive">
            <AlertTriangle className="w-2.5 h-2.5" />
            {order.disputeReason ?? "Dispute opened"}
          </div>
        )}
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-3 pb-3 bg-muted/30 border-t border-border/30">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 text-[10px]">
            <div>
              <p className="text-muted-foreground">Order #</p>
              <p className="font-mono font-medium">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Qty</p>
              <p className="font-medium">{order.quantity}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Buyer location</p>
              <p className="font-medium flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5 text-muted-foreground" />
                {order.buyerLocation}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">You earn</p>
              <p className="font-semibold text-[color:var(--success)] font-mono">
                ${order.creatorEarnings.toFixed(2)}
              </p>
            </div>
            {order.carrier && (
              <div>
                <p className="text-muted-foreground">Carrier</p>
                <p className="font-medium">{order.carrier}</p>
              </div>
            )}
            {order.trackingNumber && (
              <div>
                <p className="text-muted-foreground">Tracking</p>
                <p className="font-mono font-medium truncate">{order.trackingNumber}</p>
              </div>
            )}
            {order.estimatedDelivery && (
              <div className="col-span-2">
                <p className="text-muted-foreground">Est. delivery</p>
                <p className="font-medium flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                  {new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
            {order.resolutionNote && (
              <div className="col-span-2">
                <p className="text-muted-foreground">Note</p>
                <p className="italic text-muted-foreground">{order.resolutionNote}</p>
              </div>
            )}
          </div>

          {/* Action: Mark as shipped */}
          {order.status === "Processing" && (
            <Button
              size="sm"
              className="w-full mt-3 h-7 text-[11px] gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                onMarkShipped(order.id);
              }}
            >
              <Truck className="w-3 h-3" />
              Mark as Shipped
            </Button>
          )}
          {order.status === "Delivered" && (
            <div className="flex items-center gap-1.5 mt-3 text-[11px] text-[color:var(--success)]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Delivered · Payout scheduled
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Status filter tab
// ---------------------------------------------------------------------------
const FILTER_TABS: Array<{ value: string; label: string }> = [
  { value: "all", label: "All" },
  { value: "Processing", label: "Processing" },
  { value: "Shipped", label: "Shipped" },
  { value: "Delivered", label: "Delivered" },
  { value: "Disputed", label: "Disputed" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [localOrders, setLocalOrders] = useState(orders);

  const displayed = useMemo(() => {
    return localOrders.filter((o) => statusFilter === "all" || o.status === statusFilter);
  }, [statusFilter, localOrders]);

  function handleMarkShipped(id: string) {
    setLocalOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: "Shipped" as OrderStatus, shippedAt: new Date().toISOString() }
          : o
      )
    );
  }

  const processingCnt = localOrders.filter((o) => o.status === "Processing").length;
  const disputedCnt = localOrders.filter((o) => o.status === "Disputed").length;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="px-3 pt-3 pb-2 border-b border-border/50">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-base font-bold tracking-tight">Orders</h1>
            <p className="text-[10px] text-muted-foreground">
              {processingCnt > 0 && (
                <span className="text-primary font-medium">{processingCnt} need action · </span>
              )}
              {localOrders.length} total
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Package className="w-4 h-4 text-muted-foreground" />
            {disputedCnt > 0 && (
              <Badge
                variant="outline"
                className="text-[10px] border-0 bg-destructive/10 text-destructive px-1.5 py-0"
              >
                {disputedCnt} disputed
              </Badge>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                "shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-medium border transition-colors duration-100",
                statusFilter === tab.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border/60 hover:border-primary/40"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Order list ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center px-4">
            <Package className="w-6 h-6 text-muted-foreground/40 mb-2" />
            <p className="text-xs text-muted-foreground">
              No orders with this status.
            </p>
          </div>
        ) : (
          displayed.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              expanded={expandedId === order.id}
              onToggle={() =>
                setExpandedId((prev) => (prev === order.id ? null : order.id))
              }
              onMarkShipped={handleMarkShipped}
            />
          ))
        )}
      </div>

      {/* ── Bottom banner ──────────────────────────────────────── */}
      <div
        className="px-3 py-2 border-t border-border/40 text-center"
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
