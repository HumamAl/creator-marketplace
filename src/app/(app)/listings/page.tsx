"use client";

import { useState, useMemo } from "react";
import { listings } from "@/data/mock-data";
import type { ListingStatus, ListingCategory } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Eye,
  Heart,
  ShoppingBag,
  AlertCircle,
  Clock,
  Edit2,
  Pause,
  Play,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------
function StatusBadge({ status }: { status: ListingStatus }) {
  const config: Record<ListingStatus, { label: string; colorClass: string }> = {
    Active:    { label: "Active",    colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    Draft:     { label: "Draft",     colorClass: "text-muted-foreground bg-muted" },
    Paused:    { label: "Paused",    colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    "Sold Out":{ label: "Sold Out",  colorClass: "text-destructive bg-destructive/10" },
    Expired:   { label: "Expired",   colorClass: "text-muted-foreground bg-muted" },
    Removed:   { label: "Removed",   colorClass: "text-destructive bg-destructive/10" },
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
// Compact listing row
// ---------------------------------------------------------------------------
function ListingRow({
  listing,
  onTogglePause,
}: {
  listing: (typeof listings)[0];
  onTogglePause: (id: string) => void;
}) {
  return (
    <div className="px-3 py-2.5 border-b border-border/50 last:border-0 hover:bg-[color:var(--surface-hover)] transition-colors duration-100">
      {/* Top row */}
      <div className="flex items-start gap-2.5">
        {/* Colour swatch thumbnail */}
        <div
          className={cn(
            "w-9 h-9 shrink-0 rounded-md border border-border/40",
            listing.imageColor
          )}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium leading-tight line-clamp-1">
            {listing.title}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{listing.category}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xs font-semibold font-mono">
            ${listing.price.toFixed(2)}
          </span>
          <StatusBadge status={listing.status} />
        </div>
      </div>

      {/* Funnel metrics row */}
      <div className="flex items-center gap-3 mt-1.5 pl-11">
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Eye className="w-2.5 h-2.5" />
          {listing.views.toLocaleString()}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Heart className="w-2.5 h-2.5" />
          {listing.saves}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <ShoppingBag className="w-2.5 h-2.5" />
          {listing.orders}
        </span>
        {listing.conversionAlert && (
          <span className="flex items-center gap-1 text-[10px] text-[color:var(--warning)]">
            <AlertCircle className="w-2.5 h-2.5" />
            Low CVR
          </span>
        )}
        {/* Expiry warning if within 14 days */}
        {(() => {
          const daysLeft = Math.ceil(
            (new Date(listing.expiresAt).getTime() - Date.now()) / 86400000
          );
          if (daysLeft <= 14 && daysLeft > 0 && listing.status === "Active") {
            return (
              <span className="flex items-center gap-1 text-[10px] text-[color:var(--warning)] ml-auto">
                <Clock className="w-2.5 h-2.5" />
                {daysLeft}d left
              </span>
            );
          }
          return null;
        })()}

        {/* Action buttons */}
        <div className="flex items-center gap-1 ml-auto">
          <button className="p-1 rounded hover:bg-[color:var(--surface-active)] transition-colors duration-100">
            <Edit2 className="w-3 h-3 text-muted-foreground" />
          </button>
          {(listing.status === "Active" || listing.status === "Paused") && (
            <button
              onClick={() => onTogglePause(listing.id)}
              className="p-1 rounded hover:bg-[color:var(--surface-active)] transition-colors duration-100"
            >
              {listing.status === "Active" ? (
                <Pause className="w-3 h-3 text-muted-foreground" />
              ) : (
                <Play className="w-3 h-3 text-[color:var(--success)]" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const STATUS_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "all", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Paused", label: "Paused" },
  { value: "Draft", label: "Draft" },
  { value: "Sold Out", label: "Sold Out" },
  { value: "Expired", label: "Expired" },
];

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [localListings, setLocalListings] = useState(listings);

  const displayed = useMemo(() => {
    return localListings.filter((l) => {
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        q === "" ||
        l.title.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter, localListings]);

  function handleTogglePause(id: string) {
    setLocalListings((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: l.status === "Active" ? "Paused" : "Active" as ListingStatus }
          : l
      )
    );
  }

  const activeCnt = localListings.filter((l) => l.status === "Active").length;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="px-3 pt-3 pb-2 border-b border-border/50">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-base font-bold tracking-tight">My Listings</h1>
            <p className="text-[10px] text-muted-foreground">
              {activeCnt} active · {localListings.length} total
            </p>
          </div>
          <Button size="sm" className="h-7 text-[11px] px-2.5 gap-1">
            <Plus className="w-3 h-3" />
            Add Listing
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-7 h-7 text-[11px]"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={cn(
                "shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-medium border transition-colors duration-100",
                statusFilter === opt.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border/60 hover:border-primary/40"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── List ───────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center px-4">
            <p className="text-xs text-muted-foreground">
              No listings match this filter.
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-2 text-[11px] text-primary underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          displayed.map((listing) => (
            <ListingRow
              key={listing.id}
              listing={listing}
              onTogglePause={handleTogglePause}
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
