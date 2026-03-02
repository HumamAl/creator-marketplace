"use client";

import { useState } from "react";
import { Plus, Eye, Heart, ShoppingBag, MoreHorizontal, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Listing, ListingStatus } from "@/lib/types";

const STATUS_FILTERS: ListingStatus[] = [
  "Active",
  "Draft",
  "Paused",
  "Sold Out",
];

function statusColor(status: ListingStatus) {
  switch (status) {
    case "Active": return "bg-[color:var(--success)]/15 text-[color:var(--success)]";
    case "Draft": return "bg-muted text-muted-foreground";
    case "Paused": return "bg-warning/15 text-warning";
    case "Sold Out": return "bg-destructive/15 text-destructive";
    case "Expired": return "bg-muted text-muted-foreground";
    case "Removed": return "bg-destructive/15 text-destructive";
    default: return "bg-muted text-muted-foreground";
  }
}

function ListingThumbnail({ imageColor }: { imageColor: string }) {
  const colorMap: Record<string, string> = {
    "bg-pink-100": "from-pink-100 to-rose-200",
    "bg-slate-200": "from-slate-200 to-gray-300",
    "bg-yellow-100": "from-yellow-100 to-amber-200",
    "bg-yellow-50": "from-yellow-50 to-amber-100",
    "bg-indigo-100": "from-indigo-100 to-violet-200",
    "bg-blue-50": "from-blue-50 to-indigo-100",
    "bg-green-100": "from-green-100 to-emerald-200",
    "bg-green-200": "from-green-200 to-emerald-300",
    "bg-orange-200": "from-orange-200 to-amber-300",
    "bg-amber-100": "from-amber-100 to-orange-200",
    "bg-orange-100": "from-orange-100 to-amber-200",
    "bg-teal-100": "from-teal-100 to-cyan-200",
    "bg-purple-100": "from-purple-100 to-violet-200",
    "bg-rose-100": "from-rose-100 to-pink-200",
    "bg-lime-100": "from-lime-100 to-green-200",
    "bg-gray-50": "from-gray-50 to-slate-100",
    "bg-gray-200": "from-gray-200 to-slate-300",
    "bg-blue-200": "from-blue-200 to-indigo-300",
    "bg-neutral-200": "from-neutral-200 to-gray-300",
    "bg-amber-50": "from-amber-50 to-yellow-100",
    "bg-amber-200": "from-amber-200 to-orange-300",
    "bg-slate-50": "from-slate-50 to-gray-100",
    "bg-yellow-200": "from-yellow-200 to-amber-300",
  };
  const gradient = colorMap[imageColor] ?? "from-rose-100 to-pink-200";

  return (
    <div
      className={cn(
        "w-12 h-12 rounded-lg bg-gradient-to-br shrink-0 flex items-center justify-center",
        gradient
      )}
    >
      <span className="text-base opacity-60 select-none">✦</span>
    </div>
  );
}

interface ListingRowProps {
  listing: Listing;
  onTogglePause: (id: string) => void;
}

function ListingRow({ listing, onTogglePause }: ListingRowProps) {
  const daysUntilExpiry = Math.ceil(
    (new Date(listing.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const isExpiringSoon = daysUntilExpiry <= 14 && daysUntilExpiry > 0;

  return (
    <div className="py-2.5 border-b border-border/30 last:border-0">
      <div className="flex items-start gap-2.5">
        <ListingThumbnail imageColor={listing.imageColor} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <p className="text-[11px] font-semibold text-foreground leading-tight line-clamp-2 flex-1">
              {listing.title}
            </p>
            <button className="shrink-0 text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span
              className={cn(
                "text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide",
                statusColor(listing.status)
              )}
            >
              {listing.status}
            </span>
            {listing.onSale && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary uppercase tracking-wide">
                ON SALE
              </span>
            )}
            <span className="text-[11px] font-bold text-foreground ml-auto">
              ${listing.price.toFixed(2)}
            </span>
          </div>

          {/* Funnel metrics */}
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="w-2.5 h-2.5" />
              <span className="text-[9px]">{listing.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart className="w-2.5 h-2.5" />
              <span className="text-[9px]">{listing.saves}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <ShoppingBag className="w-2.5 h-2.5" />
              <span className="text-[9px]">{listing.orders} orders</span>
            </div>
          </div>

          {/* Expiry warning */}
          {isExpiringSoon && listing.status === "Active" && (
            <div className="flex items-center gap-1 mt-1">
              <AlertTriangle className="w-2.5 h-2.5 text-warning" />
              <span className="text-[9px] text-warning font-medium">
                Expires in {daysUntilExpiry} days — renew listing
              </span>
            </div>
          )}

          {/* Conversion alert */}
          {listing.conversionAlert && (
            <div className="flex items-center gap-1 mt-1">
              <AlertTriangle className="w-2.5 h-2.5 text-warning" />
              <span className="text-[9px] text-warning font-medium">
                High views, 0 orders — check pricing or photos
              </span>
            </div>
          )}

          {/* Actions row */}
          <div className="flex items-center gap-2 mt-1.5">
            <button className="text-[10px] font-medium text-primary">Edit</button>
            <span className="text-border">·</span>
            {listing.status === "Active" ? (
              <button
                onClick={() => onTogglePause(listing.id)}
                className="text-[10px] font-medium text-muted-foreground hover:text-warning transition-colors duration-100"
              >
                Pause
              </button>
            ) : listing.status === "Paused" ? (
              <button
                onClick={() => onTogglePause(listing.id)}
                className="text-[10px] font-medium text-[color:var(--success)]"
              >
                Republish
              </button>
            ) : listing.status === "Draft" ? (
              <button className="text-[10px] font-medium text-primary">
                Publish Listing
              </button>
            ) : null}
            <span className="text-border">·</span>
            <button className="text-[10px] font-medium text-muted-foreground">Duplicate</button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MyListingsScreenProps {
  listings: Listing[];
}

export function MyListingsScreen({ listings }: MyListingsScreenProps) {
  const [activeFilter, setActiveFilter] = useState<ListingStatus | "All">("All");
  const [pausedIds, setPausedIds] = useState<Set<string>>(new Set());

  const myListings = listings.filter((l) => {
    if (activeFilter === "All") return true;
    // Handle locally toggled pause state
    if (activeFilter === "Paused" && pausedIds.has(l.id)) return true;
    if (activeFilter === "Active" && pausedIds.has(l.id)) return false;
    return l.status === activeFilter;
  });

  const handleTogglePause = (id: string) => {
    setPausedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Counts
  const counts: Record<string, number> = {
    All: listings.length,
    Active: listings.filter((l) => l.status === "Active" && !pausedIds.has(l.id)).length,
    Draft: listings.filter((l) => l.status === "Draft").length,
    Paused: listings.filter((l) => l.status === "Paused" || pausedIds.has(l.id)).length,
    "Sold Out": listings.filter((l) => l.status === "Sold Out").length,
    Expired: listings.filter((l) => l.status === "Expired").length,
    Removed: listings.filter((l) => l.status === "Removed").length,
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b border-border/30">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">My Listings</h2>
          <button className="flex items-center gap-1 text-[11px] font-semibold text-primary-foreground bg-primary px-2.5 py-1.5 rounded-lg">
            <Plus className="w-3 h-3" />
            Add Listing
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {counts.Active} active · {counts.Draft} draft · {counts["Sold Out"]} sold out
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-1 px-3 py-2 overflow-x-auto scrollbar-hide border-b border-border/30">
        {(["All", ...STATUS_FILTERS] as const).map((filter) => {
          const count = counts[filter] ?? 0;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "shrink-0 flex items-center gap-1 px-3 py-1.5 text-[10px] font-semibold rounded-lg transition-colors duration-100",
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {filter}
              <span
                className={cn(
                  "text-[9px] font-bold px-1 py-0.5 rounded-full min-w-[16px] text-center",
                  activeFilter === filter
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Listings */}
      <div className="px-3 pb-3">
        {myListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-[13px] font-medium text-foreground">No listings in this category</p>
            <button className="mt-3 text-[11px] font-semibold text-primary-foreground bg-primary px-4 py-2 rounded-lg flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Publish listing
            </button>
          </div>
        ) : (
          myListings.map((listing) => {
            const displayListing = pausedIds.has(listing.id)
              ? { ...listing, status: "Paused" as const }
              : listing;
            return (
              <ListingRow
                key={listing.id}
                listing={displayListing}
                onTogglePause={handleTogglePause}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
