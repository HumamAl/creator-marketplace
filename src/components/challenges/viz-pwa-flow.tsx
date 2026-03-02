"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight, Smartphone, PackageCheck, Store } from "lucide-react";

const steps = [
  {
    id: "audit",
    icon: AlertCircle,
    label: "PWA Audit",
    description: "Check icons, manifest, offline support, and WebView compatibility before wrapping.",
    highlight: false,
    status: "issue" as const,
  },
  {
    id: "fix",
    icon: CheckCircle,
    label: "Compliance Fixes",
    description: "Fix icon sizes (1024×1024 required), add service worker, resolve WebView layout bugs. Most devs skip this.",
    highlight: true,
    status: "fix" as const,
  },
  {
    id: "wrap",
    icon: Smartphone,
    label: "Capacitor Wrap",
    description: "Bundle React app inside Capacitor shell with correct bundle ID, entitlements, and native plugin config.",
    highlight: false,
    status: "normal" as const,
  },
  {
    id: "sign",
    icon: PackageCheck,
    label: "Sign & Test",
    description: "Provisioning profiles, code signing, TestFlight (iOS) and internal track (Android) testing.",
    highlight: false,
    status: "normal" as const,
  },
  {
    id: "submit",
    icon: Store,
    label: "App Store Submit",
    description: "App Store + Google Play submission with pre-vetted compliance checklist. Target 2–3 week timeline.",
    highlight: false,
    status: "success" as const,
  },
];

function getStepStyle(status: string, highlight: boolean) {
  if (highlight) {
    return {
      backgroundColor: "color-mix(in oklch, var(--primary) 8%, transparent)",
      borderColor: "color-mix(in oklch, var(--primary) 30%, transparent)",
    };
  }
  if (status === "success") {
    return {
      backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
      borderColor: "color-mix(in oklch, var(--success) 20%, transparent)",
    };
  }
  if (status === "issue") {
    return {
      backgroundColor: "color-mix(in oklch, var(--destructive) 5%, transparent)",
      borderColor: "color-mix(in oklch, var(--destructive) 15%, transparent)",
    };
  }
  return {
    backgroundColor: "var(--card)",
    borderColor: "color-mix(in oklch, var(--border), transparent 40%)",
  };
}

function getIconColor(status: string, highlight: boolean): string {
  if (highlight) return "var(--primary)";
  if (status === "success") return "var(--success)";
  if (status === "issue") return "var(--destructive)";
  return "var(--muted-foreground)";
}

export function VizPwaFlow() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
        Capacitor deployment path
      </p>

      {/* Mobile: vertical list of steps */}
      <div className="flex flex-col gap-2 sm:hidden">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          const style = getStepStyle(step.status, step.highlight);
          const iconColor = getIconColor(step.status, step.highlight);

          return (
            <div key={step.id}>
              <button
                type="button"
                onClick={() => setActiveStep(isActive ? null : step.id)}
                className="flex items-center gap-2 p-2.5 rounded-lg border transition-all duration-150 w-full text-left"
                style={style}
              >
                <Icon className="h-4 w-4 shrink-0" style={{ color: iconColor }} />
                <span
                  className="text-xs font-semibold"
                  style={step.highlight ? { color: "var(--primary)" } : { color: "var(--foreground)" }}
                >
                  {step.label}
                </span>
              </button>
              {isActive && (
                <div
                  className="mt-1 p-2 rounded-md text-xs text-muted-foreground border"
                  style={{
                    backgroundColor: "color-mix(in oklch, var(--muted), transparent 50%)",
                    borderColor: "color-mix(in oklch, var(--border), transparent 40%)",
                  }}
                >
                  {step.description}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: horizontal row of step boxes + arrows */}
      <div className="hidden sm:flex items-start gap-1">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          const style = getStepStyle(step.status, step.highlight);
          const iconColor = getIconColor(step.status, step.highlight);

          return (
            <div key={step.id} className="flex items-start flex-1 gap-1">
              <div className="flex-1 space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveStep(isActive ? null : step.id)}
                  className="flex flex-col items-center gap-1 p-2.5 rounded-lg border transition-all duration-150 w-full text-center min-h-[76px] justify-center"
                  style={style}
                >
                  <Icon className="h-4 w-4" style={{ color: iconColor }} />
                  <span
                    className="text-xs font-semibold leading-tight"
                    style={step.highlight ? { color: "var(--primary)" } : { color: "var(--foreground)" }}
                  >
                    {step.label}
                  </span>
                </button>
                {isActive && (
                  <div
                    className="p-2 rounded-md text-xs text-muted-foreground border"
                    style={{
                      backgroundColor: "color-mix(in oklch, var(--muted), transparent 50%)",
                      borderColor: "color-mix(in oklch, var(--border), transparent 40%)",
                    }}
                  >
                    {step.description}
                  </div>
                )}
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center h-[76px] w-4 shrink-0">
                  <ArrowRight className="h-3 w-3 text-muted-foreground/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Tap any step to see details.{" "}
        <span className="text-primary font-medium">Compliance Fixes</span> is the step most developers skip — it&apos;s what causes rejected builds.
      </p>
    </div>
  );
}
