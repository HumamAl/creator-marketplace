"use client";

import { useState } from "react";
import { User, Brush, ShoppingBag, Shield, ArrowDown } from "lucide-react";

type ViewMode = "problem" | "solution";

const problemItems = [
  { label: "Single auth session", note: "Creator & buyer share same state" },
  { label: "Mixed role routing", note: "Cart state leaks into seller dashboard" },
  { label: "Role check in components", note: "if (user.isCreator) scattered everywhere" },
  { label: "GTM UX failures", note: "Creators see buyer UI mid-session" },
];

const solutionLayers = [
  {
    icon: Shield,
    label: "Auth Layer",
    description: "Role resolved at login — token contains context: 'creator' | 'buyer'",
    type: "auth" as const,
  },
  {
    icon: Brush,
    label: "Creator Context",
    description: "Isolated session: shop dashboard, listings, orders, earnings — no cart state",
    type: "creator" as const,
  },
  {
    icon: ShoppingBag,
    label: "Buyer Context",
    description: "Isolated session: discover feed, wishlist, cart, order history — no seller view",
    type: "buyer" as const,
  },
  {
    icon: User,
    label: "Context Switch",
    description: "A creator can switch to buyer mode explicitly — clean context reset, no bleed",
    type: "switch" as const,
  },
];

export function VizAuthArchitecture() {
  const [view, setView] = useState<ViewMode>("problem");

  return (
    <div className="space-y-3">
      {/* Toggle */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setView("problem")}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 border"
          style={
            view === "problem"
              ? {
                  backgroundColor: "color-mix(in oklch, var(--destructive) 10%, transparent)",
                  borderColor: "color-mix(in oklch, var(--destructive) 25%, transparent)",
                  color: "var(--destructive)",
                }
              : {
                  backgroundColor: "transparent",
                  borderColor: "color-mix(in oklch, var(--border), transparent 40%)",
                  color: "var(--muted-foreground)",
                }
          }
        >
          Problem
        </button>
        <button
          type="button"
          onClick={() => setView("solution")}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 border"
          style={
            view === "solution"
              ? {
                  backgroundColor: "color-mix(in oklch, var(--success) 10%, transparent)",
                  borderColor: "color-mix(in oklch, var(--success) 25%, transparent)",
                  color: "var(--success)",
                }
              : {
                  backgroundColor: "transparent",
                  borderColor: "color-mix(in oklch, var(--border), transparent 40%)",
                  color: "var(--muted-foreground)",
                }
          }
        >
          Solution
        </button>
      </div>

      {/* Problem view */}
      {view === "problem" && (
        <div className="space-y-2">
          {problemItems.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-3 py-2 rounded-md border"
              style={{
                backgroundColor: "color-mix(in oklch, var(--destructive) 4%, transparent)",
                borderColor: "color-mix(in oklch, var(--destructive) 12%, transparent)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: "var(--destructive)" }}
              />
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Solution view */}
      {view === "solution" && (
        <div className="space-y-2">
          {solutionLayers.map((layer, i) => {
            const Icon = layer.icon;
            const isAuth = layer.type === "auth";
            const isSwitch = layer.type === "switch";
            const isCreator = layer.type === "creator";

            return (
              <div key={i} className="space-y-1">
                <div
                  className="flex items-start gap-3 px-3 py-2.5 rounded-md border"
                  style={
                    isAuth
                      ? {
                          backgroundColor: "color-mix(in oklch, var(--primary) 6%, transparent)",
                          borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
                        }
                      : isSwitch
                      ? {
                          backgroundColor: "color-mix(in oklch, var(--warning) 5%, transparent)",
                          borderColor: "color-mix(in oklch, var(--warning) 15%, transparent)",
                        }
                      : isCreator
                      ? {
                          backgroundColor: "color-mix(in oklch, var(--success) 5%, transparent)",
                          borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
                        }
                      : {
                          backgroundColor: "color-mix(in oklch, var(--primary) 4%, transparent)",
                          borderColor: "color-mix(in oklch, var(--border), transparent 40%)",
                        }
                  }
                >
                  <Icon
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={
                      isAuth
                        ? { color: "var(--primary)" }
                        : isSwitch
                        ? { color: "var(--warning)" }
                        : { color: "var(--success)" }
                    }
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{layer.label}</p>
                    <p className="text-xs text-muted-foreground">{layer.description}</p>
                  </div>
                </div>
                {i < solutionLayers.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowDown className="h-3 w-3 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
