"use client";

import { useState } from "react";
import { LayoutDashboard, Compass, List, ShoppingBag, TrendingUp } from "lucide-react";
import { ScreenNavigator } from "@/components/interactions/screen-navigator";
import { ShopOverviewScreen } from "@/components/screens/shop-overview-screen";
import { DiscoveryFeedScreen } from "@/components/screens/discovery-feed-screen";
import { MyListingsScreen } from "@/components/screens/my-listings-screen";
import { OrdersScreen } from "@/components/screens/orders-screen";
import { EarningsScreen } from "@/components/screens/earnings-screen";
import {
  currentCreator,
  creators,
  listings,
  orders,
  payouts,
  dashboardStats,
  earningsByMonth,
  starSellerProgress,
  discoverFeed,
} from "@/data/mock-data";

// My Listings — only current creator's listings
const myListings = listings.filter((l) => l.creatorId === currentCreator.id);

const SCREENS = [
  {
    id: "shop",
    label: "Shop",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "discover",
    label: "Discover",
    icon: <Compass className="w-4 h-4" />,
  },
  {
    id: "listings",
    label: "Listings",
    icon: <List className="w-4 h-4" />,
  },
  {
    id: "orders",
    label: "Orders",
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    id: "earnings",
    label: "Earnings",
    icon: <TrendingUp className="w-4 h-4" />,
  },
];

export default function DemoPage() {
  const [activeScreen, setActiveScreen] = useState("shop");

  return (
    <ScreenNavigator
      screens={SCREENS}
      activeScreen={activeScreen}
      onScreenChange={setActiveScreen}
      variant="bottom-tabs"
      transition="fade"
    >
      {activeScreen === "shop" && (
        <ShopOverviewScreen
          stats={dashboardStats}
          earningsByMonth={earningsByMonth}
          creatorName={currentCreator.name}
          shopName={currentCreator.shopName}
          starRating={currentCreator.starRating}
        />
      )}
      {activeScreen === "discover" && (
        <DiscoveryFeedScreen
          listings={discoverFeed}
          creators={creators}
        />
      )}
      {activeScreen === "listings" && (
        <MyListingsScreen listings={myListings} />
      )}
      {activeScreen === "orders" && (
        <OrdersScreen orders={orders} />
      )}
      {activeScreen === "earnings" && (
        <EarningsScreen
          earningsByMonth={earningsByMonth}
          payouts={payouts}
          starSellerProgress={starSellerProgress}
          availableBalance={dashboardStats.availableBalance}
          balanceOnHold={dashboardStats.balanceOnHold}
        />
      )}
    </ScreenNavigator>
  );
}
