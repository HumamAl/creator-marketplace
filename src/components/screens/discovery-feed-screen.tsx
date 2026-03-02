"use client";

import { useState } from "react";
import { Search, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Listing, Creator } from "@/lib/types";

const CATEGORY_FILTERS = [
  "All",
  "Jewelry",
  "Vintage",
  "Ceramics",
  "Art Prints",
  "Candles",
  "Digital",
];

const CATEGORY_MAP: Record<string, string> = {
  "Jewelry": "Jewelry & Accessories",
  "Vintage": "Clothing & Vintage",
  "Ceramics": "Ceramics & Pottery",
  "Art Prints": "Art & Prints",
  "Candles": "Candles & Fragrance",
  "Digital": "Digital Downloads",
};

// Product image placeholder — colored gradient based on listing imageColor
function ListingImage({
  imageColor,
  isDigital,
  title,
}: {
  imageColor: string;
  isDigital: boolean;
  title: string;
}) {
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
        "w-full aspect-square rounded-lg bg-gradient-to-br flex items-center justify-center overflow-hidden",
        gradient
      )}
    >
      <span className="text-2xl select-none opacity-60">
        {isDigital ? "⬇" : "✦"}
      </span>
    </div>
  );
}

function ListingCard({
  listing,
  creator,
  onSave,
  isSaved,
}: {
  listing: Listing;
  creator: Creator | undefined;
  onSave: (id: string) => void;
  isSaved: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <ListingImage
          imageColor={listing.imageColor}
          isDigital={listing.isDigitalDownload}
          title={listing.title}
        />
        {listing.onSale && (
          <span className="absolute top-1.5 left-1.5 text-[9px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md">
            SALE
          </span>
        )}
        {listing.isDigitalDownload && (
          <span className="absolute top-1.5 left-1.5 text-[9px] font-bold bg-foreground text-background px-1.5 py-0.5 rounded-md">
            DIGITAL
          </span>
        )}
        <button
          onClick={() => onSave(listing.id)}
          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-background/90 flex items-center justify-center shadow-sm"
        >
          <Heart
            className={cn(
              "w-3 h-3",
              isSaved ? "fill-primary text-primary" : "text-muted-foreground"
            )}
          />
        </button>
      </div>

      <div className="px-0.5">
        {creator && (
          <div className="flex items-center gap-1 mb-0.5">
            <div className="w-3.5 h-3.5 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
              {creator.shopName.charAt(0)}
            </div>
            <span className="text-[9px] text-muted-foreground truncate font-medium">
              {creator.shopName}
            </span>
          </div>
        )}
        <p className="text-[11px] font-medium text-foreground leading-tight line-clamp-2">
          {listing.title}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          {listing.onSale && listing.originalPrice ? (
            <>
              <span className="text-[12px] font-bold text-primary">${listing.price}</span>
              <span className="text-[10px] text-muted-foreground line-through">${listing.originalPrice}</span>
            </>
          ) : (
            <span className="text-[12px] font-bold text-foreground">${listing.price}</span>
          )}
        </div>
        {listing.saves > 50 && (
          <p className="text-[9px] text-muted-foreground mt-0.5">{listing.saves} saves</p>
        )}
      </div>
    </div>
  );
}

interface DiscoveryFeedScreenProps {
  listings: Listing[];
  creators: Creator[];
}

export function DiscoveryFeedScreen({ listings, creators }: DiscoveryFeedScreenProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const filteredListings = listings.filter((l) => {
    const matchesFilter =
      activeFilter === "All" || l.category === CATEGORY_MAP[activeFilter];
    const matchesSearch =
      searchQuery === "" ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch && l.status === "Active";
  });

  const handleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getCreator = (creatorId: string) =>
    creators.find((c) => c.id === creatorId);

  // Featured creator banner
  const featuredCreator = creators.find((c) => c.isTopSeller);

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-3 pt-3 pb-2 border-b border-border/30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search listings, creators..."
            className="w-full pl-8 pr-3 py-2 text-[12px] bg-muted/60 border border-border/40 rounded-lg outline-none focus:border-primary/50 transition-colors duration-100"
          />
        </div>
      </div>

      {/* Featured Creator Banner */}
      {featuredCreator && activeFilter === "All" && searchQuery === "" && (
        <div className="mx-3 mt-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-warning/10 border border-primary/20 p-3 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary shrink-0">
            {featuredCreator.shopName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-bold text-foreground truncate">
                {featuredCreator.shopName}
              </p>
              <span className="text-[9px] font-bold bg-warning/20 text-warning px-1 rounded">TOP SELLER</span>
            </div>
            <p className="text-[10px] text-muted-foreground truncate mt-0.5">
              {featuredCreator.bio}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-2.5 h-2.5 fill-warning text-warning" />
              <span className="text-[10px] font-semibold">{featuredCreator.starRating}</span>
              <span className="text-[10px] text-muted-foreground">· {featuredCreator.totalReviews} reviews</span>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Chips */}
      <div className="flex gap-2 px-3 pt-2.5 pb-2 overflow-x-auto scrollbar-hide">
        {CATEGORY_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "shrink-0 px-3 py-1 text-[10px] font-semibold rounded-full border transition-colors duration-100",
              activeFilter === filter
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border/50 text-muted-foreground hover:border-primary/40"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="px-3 mb-2">
        <p className="text-[10px] text-muted-foreground">
          {filteredListings.length} listings
          {activeFilter !== "All" && ` in ${activeFilter}`}
        </p>
      </div>

      {/* Product Grid — 2 columns */}
      <div className="px-3 pb-3">
        {filteredListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-[13px] font-medium text-foreground">No listings found</p>
            <p className="text-[11px] text-muted-foreground mt-1">Try a different category or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredListings.slice(0, 16).map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                creator={getCreator(listing.creatorId)}
                onSave={handleSave}
                isSaved={savedIds.has(listing.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
