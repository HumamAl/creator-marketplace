"use client";

import { useState } from "react";
import { Truck, AlertCircle, CheckCircle2, Clock, Package, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";

const STATUS_FILTERS: OrderStatus[] = [
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Disputed",
  "Refunded",
  "Cancelled",
];

function statusBadgeClass(status: OrderStatus) {
  switch (status) {
    case "Processing": return "bg-primary/12 text-primary";
    case "Shipped": return "bg-[oklch(0.55_0.18_240)]/12 text-[oklch(0.45_0.18_240)]";
    case "Out for Delivery": return "bg-[oklch(0.55_0.18_240)]/12 text-[oklch(0.45_0.18_240)]";
    case "Delivered": return "bg-[color:var(--success)]/12 text-[color:var(--success)]";
    case "Disputed": return "bg-destructive/12 text-destructive";
    case "Refunded": return "bg-warning/12 text-warning";
    case "Cancelled": return "bg-muted text-muted-foreground";
    case "Pending Payment": return "bg-warning/12 text-warning";
    default: return "bg-muted text-muted-foreground";
  }
}

function statusIcon(status: OrderStatus) {
  switch (status) {
    case "Processing": return <Clock className="w-3 h-3" />;
    case "Shipped": return <Truck className="w-3 h-3" />;
    case "Out for Delivery": return <Truck className="w-3 h-3" />;
    case "Delivered": return <CheckCircle2 className="w-3 h-3" />;
    case "Disputed": return <AlertCircle className="w-3 h-3" />;
    case "Refunded": return <AlertCircle className="w-3 h-3" />;
    default: return <Package className="w-3 h-3" />;
  }
}

function OrderImageThumb({ imageColor }: { imageColor: string }) {
  const colorMap: Record<string, string> = {
    "bg-pink-100": "from-pink-100 to-rose-200",
    "bg-slate-200": "from-slate-200 to-gray-300",
    "bg-yellow-100": "from-yellow-100 to-amber-200",
    "bg-yellow-50": "from-yellow-50 to-amber-100",
    "bg-indigo-100": "from-indigo-100 to-violet-200",
    "bg-blue-50": "from-blue-50 to-indigo-100",
    "bg-green-100": "from-green-100 to-emerald-200",
    "bg-gray-50": "from-gray-50 to-slate-100",
    "bg-amber-50": "from-amber-50 to-yellow-100",
    "bg-amber-200": "from-amber-200 to-orange-300",
    "bg-amber-100": "from-amber-100 to-orange-200",
    "bg-orange-100": "from-orange-100 to-amber-200",
    "bg-slate-50": "from-slate-50 to-gray-100",
    "bg-yellow-200": "from-yellow-200 to-amber-300",
  };
  const gradient = colorMap[imageColor] ?? "from-rose-100 to-pink-200";
  return (
    <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-br shrink-0 flex items-center justify-center", gradient)}>
      <span className="text-sm opacity-60 select-none">✦</span>
    </div>
  );
}

function OrderCard({ order, onMarkShipped }: { order: Order; onMarkShipped: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const placedDate = new Date(order.placedAt);
  const daysSince = Math.floor((Date.now() - placedDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="border border-border/40 rounded-xl overflow-hidden mb-2">
      {/* Card header */}
      <div className="p-3">
        <div className="flex items-start gap-2.5">
          <OrderImageThumb imageColor={order.listingImageColor} />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground font-medium">{order.orderNumber}</p>
                <p className="text-[11px] font-semibold text-foreground leading-tight line-clamp-2 mt-0.5">
                  {order.listingTitle}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide ml-1",
                  statusBadgeClass(order.status)
                )}
              >
                {statusIcon(order.status)}
                {order.status}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] text-muted-foreground">
                {order.buyerName} · {order.buyerLocation}
              </span>
            </div>

            <div className="flex items-center justify-between mt-1.5">
              <div>
                <span className="text-[11px] font-bold text-foreground">${order.creatorEarnings.toFixed(2)}</span>
                <span className="text-[9px] text-muted-foreground ml-1">your earnings</span>
              </div>
              <span className="text-[9px] text-muted-foreground">
                {daysSince === 0 ? "Today" : `${daysSince}d ago`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dispute warning */}
      {order.status === "Disputed" && order.disputeReason && (
        <div className="mx-3 mb-2 flex items-start gap-1.5 rounded-lg bg-destructive/8 border border-destructive/20 p-2">
          <AlertCircle className="w-3 h-3 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-semibold text-destructive">Dispute Opened</p>
            <p className="text-[9px] text-destructive/80 mt-0.5">{order.disputeReason}</p>
            <button className="text-[10px] font-semibold text-destructive mt-1">
              Respond to Dispute →
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="border-t border-border/30 px-3 py-2 flex items-center justify-between gap-2">
        {order.status === "Processing" && (
          <button
            onClick={() => onMarkShipped(order.id)}
            className="flex items-center gap-1.5 text-[10px] font-semibold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg"
          >
            <Truck className="w-3 h-3" />
            Mark as Shipped
          </button>
        )}
        {order.status === "Shipped" && order.trackingNumber && (
          <div className="flex items-center gap-1.5">
            <Truck className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[140px]">
              {order.trackingNumber}
            </span>
          </div>
        )}
        {order.status === "Delivered" && (
          <span className="text-[10px] text-[color:var(--success)] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Delivered
            {order.actualDelivery && ` · ${new Date(order.actualDelivery).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
          </span>
        )}
        {!["Processing", "Shipped", "Delivered", "Disputed"].includes(order.status) && (
          <span className="text-[10px] text-muted-foreground capitalize">{order.status}</span>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-auto flex items-center gap-0.5 text-[10px] text-muted-foreground"
        >
          Details
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-3 pb-3 pt-0 border-t border-border/20 space-y-1.5">
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p className="text-[9px] text-muted-foreground">Subtotal</p>
              <p className="text-[11px] font-semibold">${order.subtotal.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground">Platform Fee</p>
              <p className="text-[11px] font-semibold text-muted-foreground">−${order.platformFee.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground">Shipping</p>
              <p className="text-[11px] font-semibold">${order.shippingCost.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[9px] text-muted-foreground">Tax (platform)</p>
              <p className="text-[11px] font-semibold text-muted-foreground">${order.taxCollectedByPlatform.toFixed(2)}</p>
            </div>
          </div>
          {order.processingTimeDays > 0 && (
            <p className="text-[9px] text-muted-foreground">
              Processing: {order.processingTimeDays} business days · Carrier: {order.carrier ?? "—"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface OrdersScreenProps {
  orders: Order[];
}

export function OrdersScreen({ orders }: OrdersScreenProps) {
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "All">("All");
  const [shippedIds, setShippedIds] = useState<Set<string>>(new Set());

  const handleMarkShipped = (id: string) => {
    setShippedIds((prev) => new Set(prev).add(id));
  };

  const displayOrders = orders.map((o) =>
    shippedIds.has(o.id) ? { ...o, status: "Shipped" as OrderStatus } : o
  );

  const filtered = displayOrders.filter((o) =>
    activeFilter === "All" ? true : o.status === activeFilter
  );

  const pendingCount = displayOrders.filter(
    (o) => o.status === "Processing"
  ).length;

  const disputeCount = displayOrders.filter(
    (o) => o.status === "Disputed"
  ).length;

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b border-border/30">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Orders</h2>
          <div className="flex items-center gap-1.5">
            {pendingCount > 0 && (
              <span className="text-[10px] font-bold text-primary-foreground bg-primary px-2 py-0.5 rounded-full">
                {pendingCount} to ship
              </span>
            )}
            {disputeCount > 0 && (
              <span className="text-[10px] font-bold text-destructive bg-destructive/12 px-2 py-0.5 rounded-full">
                {disputeCount} dispute{disputeCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {orders.length} total orders this period
        </p>
      </div>

      {/* Status Filter */}
      <div className="flex gap-1.5 px-3 py-2 overflow-x-auto scrollbar-hide border-b border-border/30">
        <button
          onClick={() => setActiveFilter("All")}
          className={cn(
            "shrink-0 px-3 py-1.5 text-[10px] font-semibold rounded-lg transition-colors duration-100",
            activeFilter === "All"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          All ({orders.length})
        </button>
        {STATUS_FILTERS.filter((s) =>
          displayOrders.some((o) => o.status === s)
        ).map((status) => {
          const count = displayOrders.filter((o) => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={cn(
                "shrink-0 px-3 py-1.5 text-[10px] font-semibold rounded-lg transition-colors duration-100 flex items-center gap-1",
                activeFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {status === "Disputed" && (
                <AlertCircle className="w-2.5 h-2.5" />
              )}
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="px-3 pt-2 pb-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Package className="w-8 h-8 text-muted-foreground/40 mb-2" />
            <p className="text-[13px] font-medium text-foreground">No orders here</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Orders will appear as buyers purchase your listings
            </p>
          </div>
        ) : (
          filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onMarkShipped={handleMarkShipped}
            />
          ))
        )}
      </div>
    </div>
  );
}
