"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  Apple,
  Smartphone,
  Zap,
  Shield,
  Package2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type CheckStatus = "pass" | "warning" | "fail" | "pending";

interface AppStoreCheck {
  id: string;
  label: string;
  detail: string;
  status: CheckStatus;
  category: "identity" | "performance" | "permissions" | "review-guidelines" | "native-wrap";
}

// ---------------------------------------------------------------------------
// Static data — app store readiness checks
// ---------------------------------------------------------------------------
const IOS_CHECKS: AppStoreCheck[] = [
  {
    id: "ios-bundle",
    label: "Bundle ID configured",
    detail: "com.creatormarket.app — valid reverse-domain format",
    status: "pass",
    category: "identity",
  },
  {
    id: "ios-icons",
    label: "App icon set (1024×1024)",
    detail: "All required icon sizes generated via Capacitor Assets plugin",
    status: "pass",
    category: "identity",
  },
  {
    id: "ios-launch",
    label: "Launch screen configured",
    detail: "LaunchScreen.storyboard present; splash screen matches brand",
    status: "pass",
    category: "identity",
  },
  {
    id: "ios-privacy",
    label: "Privacy usage strings",
    detail: "NSCameraUsageDescription, NSPhotoLibraryUsageDescription added to Info.plist",
    status: "pass",
    category: "permissions",
  },
  {
    id: "ios-deeplinks",
    label: "Deep link / Universal Link",
    detail: "Associated Domains entitlement pending — apple-app-site-association file needed",
    status: "warning",
    category: "native-wrap",
  },
  {
    id: "ios-offline",
    label: "Offline capability (Service Worker)",
    detail: "PWA service worker registered; cache strategy covers shell + assets",
    status: "pass",
    category: "performance",
  },
  {
    id: "ios-https",
    label: "HTTPS / ATS compliance",
    detail: "All API calls use HTTPS; App Transport Security satisfied",
    status: "pass",
    category: "review-guidelines",
  },
  {
    id: "ios-sandbox",
    label: "Reviewer sandbox account",
    detail: "Test account credentials required for App Review team — not yet created",
    status: "fail",
    category: "review-guidelines",
  },
  {
    id: "ios-pwa-wrap",
    label: "Capacitor iOS project scaffold",
    detail: "`npx cap add ios` run; Xcode project builds successfully",
    status: "pass",
    category: "native-wrap",
  },
  {
    id: "ios-signing",
    label: "Provisioning profile & code signing",
    detail: "Distribution certificate uploaded; provisioning profile assigned in Xcode",
    status: "warning",
    category: "native-wrap",
  },
];

const ANDROID_CHECKS: AppStoreCheck[] = [
  {
    id: "and-bundle",
    label: "Application ID configured",
    detail: "com.creatormarket.app — matches iOS Bundle ID",
    status: "pass",
    category: "identity",
  },
  {
    id: "and-icons",
    label: "Adaptive icon set",
    detail: "Foreground + background layers generated for all densities (mdpi–xxxhdpi)",
    status: "pass",
    category: "identity",
  },
  {
    id: "and-signing",
    label: "Keystore / signing config",
    detail: "Release keystore created; storePassword and keyAlias in gradle.properties",
    status: "pass",
    category: "native-wrap",
  },
  {
    id: "and-permissions",
    label: "AndroidManifest permissions",
    detail: "CAMERA, READ_EXTERNAL_STORAGE declared; no over-requested permissions",
    status: "pass",
    category: "permissions",
  },
  {
    id: "and-deeplinks",
    label: "App Links (deep linking)",
    detail: "assetlinks.json deployed at /.well-known/ — pending verification",
    status: "warning",
    category: "native-wrap",
  },
  {
    id: "and-target-api",
    label: "Target API level ≥ 34",
    detail: "targetSdkVersion set to 34 (Android 14) per Play Store policy",
    status: "pass",
    category: "review-guidelines",
  },
  {
    id: "and-aab",
    label: "App Bundle (AAB) format",
    detail: "Build configured to output .aab not .apk for Play Store upload",
    status: "pass",
    category: "native-wrap",
  },
  {
    id: "and-data-safety",
    label: "Data Safety section completed",
    detail: "Google Play Data Safety form requires buyer PII disclosure — form pending",
    status: "fail",
    category: "review-guidelines",
  },
  {
    id: "and-offline",
    label: "Offline fallback page",
    detail: "Service worker offline.html fallback tested on Android Chrome",
    status: "pass",
    category: "performance",
  },
];

const PWA_SCORES = {
  performance: 91,
  accessibility: 88,
  bestPractices: 95,
  seo: 97,
  pwa: 100,
};

// ---------------------------------------------------------------------------
// Status icon
// ---------------------------------------------------------------------------
function StatusIcon({ status }: { status: CheckStatus }) {
  if (status === "pass")
    return <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)] shrink-0" />;
  if (status === "warning")
    return <AlertCircle className="w-3.5 h-3.5 text-[color:var(--warning)] shrink-0" />;
  if (status === "fail")
    return <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0" />;
  return <Circle className="w-3.5 h-3.5 text-muted-foreground shrink-0" />;
}

// ---------------------------------------------------------------------------
// Expandable checklist group
// ---------------------------------------------------------------------------
function ChecklistGroup({
  title,
  checks,
}: {
  title: string;
  checks: AppStoreCheck[];
}) {
  const [open, setOpen] = useState(true);
  const passing = checks.filter((c) => c.status === "pass").length;
  const hasIssues = checks.some((c) => c.status === "fail" || c.status === "warning");

  return (
    <div className="linear-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-[color:var(--surface-hover)] transition-colors duration-100"
      >
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-semibold">{title}</p>
          {hasIssues && (
            <AlertCircle className="w-3 h-3 text-[color:var(--warning)]" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground">
            {passing}/{checks.length} pass
          </span>
          {open ? (
            <ChevronUp className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-border/40">
          {checks.map((check, i) => (
            <div
              key={check.id}
              className={cn(
                "px-3 py-2 flex items-start gap-2.5 text-[10px]",
                i < checks.length - 1 && "border-b border-border/30"
              )}
            >
              <StatusIcon status={check.status} />
              <div className="min-w-0">
                <p className="font-medium leading-tight">{check.label}</p>
                {(check.status === "warning" || check.status === "fail") && (
                  <p className="text-muted-foreground mt-0.5 leading-tight">
                    {check.detail}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PWA score bar
// ---------------------------------------------------------------------------
function ScoreBar({ label, score }: { label: string; score: number }) {
  const color =
    score >= 90
      ? "text-[color:var(--success)]"
      : score >= 70
      ? "text-[color:var(--warning)]"
      : "text-destructive";
  return (
    <div className="flex items-center gap-2 text-[10px]">
      <p className="text-muted-foreground w-20 shrink-0">{label}</p>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{
            width: `${score}%`,
            background:
              score >= 90
                ? "var(--success)"
                : score >= 70
                ? "var(--warning)"
                : "var(--destructive)",
          }}
        />
      </div>
      <p className={cn("font-mono font-bold w-7 text-right", color)}>{score}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Build stage timeline
// ---------------------------------------------------------------------------
type StageStatus = "done" | "in-progress" | "pending";
const BUILD_STAGES: Array<{ label: string; detail: string; status: StageStatus }> = [
  { label: "PWA build & service worker", detail: "next build + sw.js registered", status: "done" },
  { label: "Capacitor scaffold", detail: "npx cap add ios && cap add android", status: "done" },
  { label: "Native assets (icons, splash)", detail: "capacitor-assets generate", status: "done" },
  { label: "iOS code signing", detail: "provisioning profile — needs cert", status: "in-progress" },
  { label: "App Store Connect upload", detail: "fastlane pilot upload to TestFlight", status: "pending" },
  { label: "Google Play internal track", detail: "bundle upload via Play Console", status: "pending" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function LaunchStatusPage() {
  const [platform, setPlatform] = useState<"ios" | "android">("ios");

  const iosPassCount = IOS_CHECKS.filter((c) => c.status === "pass").length;
  const andPassCount = ANDROID_CHECKS.filter((c) => c.status === "pass").length;
  const iosProgress = Math.round((iosPassCount / IOS_CHECKS.length) * 100);
  const andProgress = Math.round((andPassCount / ANDROID_CHECKS.length) * 100);

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="px-3 pt-3 pb-2 border-b border-border/50">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-base font-bold tracking-tight">Launch Status</h1>
          <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 gap-1">
            <RefreshCw className="w-2.5 h-2.5" />
            Refresh
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground">
          PWA readiness · App Store submission checklist
        </p>
      </div>

      <div className="px-3 py-3 space-y-3">
        {/* ── Platform readiness summary ─────────────────────── */}
        <div className="grid grid-cols-2 gap-2">
          {/* iOS */}
          <div
            className={cn(
              "linear-card p-2.5 cursor-pointer transition-all duration-100",
              platform === "ios" && "border-primary/40"
            )}
            onClick={() => setPlatform("ios")}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Apple className="w-3.5 h-3.5 text-foreground" />
              <p className="text-[10px] font-semibold">iOS</p>
              <Badge
                variant="outline"
                className={cn(
                  "ml-auto text-[8px] border-0 px-1.5 py-0",
                  iosProgress >= 80
                    ? "text-[color:var(--success)] bg-[color:var(--success)]/10"
                    : "text-[color:var(--warning)] bg-[color:var(--warning)]/10"
                )}
              >
                {iosProgress}%
              </Badge>
            </div>
            <Progress value={iosProgress} className="h-1" />
            <p className="text-[9px] text-muted-foreground mt-1">
              {iosPassCount}/{IOS_CHECKS.length} checks pass
            </p>
          </div>

          {/* Android */}
          <div
            className={cn(
              "linear-card p-2.5 cursor-pointer transition-all duration-100",
              platform === "android" && "border-primary/40"
            )}
            onClick={() => setPlatform("android")}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Smartphone className="w-3.5 h-3.5 text-foreground" />
              <p className="text-[10px] font-semibold">Android</p>
              <Badge
                variant="outline"
                className={cn(
                  "ml-auto text-[8px] border-0 px-1.5 py-0",
                  andProgress >= 80
                    ? "text-[color:var(--success)] bg-[color:var(--success)]/10"
                    : "text-[color:var(--warning)] bg-[color:var(--warning)]/10"
                )}
              >
                {andProgress}%
              </Badge>
            </div>
            <Progress value={andProgress} className="h-1" />
            <p className="text-[9px] text-muted-foreground mt-1">
              {andPassCount}/{ANDROID_CHECKS.length} checks pass
            </p>
          </div>
        </div>

        {/* ── PWA Lighthouse scores ─────────────────────────── */}
        <div className="linear-card p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Zap className="w-3.5 h-3.5 text-[color:var(--warning)]" />
            <p className="text-[10px] font-semibold">Lighthouse Scores</p>
          </div>
          <div className="space-y-1.5">
            <ScoreBar label="Performance" score={PWA_SCORES.performance} />
            <ScoreBar label="Accessibility" score={PWA_SCORES.accessibility} />
            <ScoreBar label="Best Practices" score={PWA_SCORES.bestPractices} />
            <ScoreBar label="SEO" score={PWA_SCORES.seo} />
            <ScoreBar label="PWA" score={PWA_SCORES.pwa} />
          </div>
        </div>

        {/* ── App store checklist ──────────────────────────── */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            {platform === "ios" ? (
              <Apple className="w-3.5 h-3.5" />
            ) : (
              <Smartphone className="w-3.5 h-3.5" />
            )}
            <p className="text-[10px] font-semibold">
              {platform === "ios" ? "iOS App Store" : "Google Play"} Checklist
            </p>
          </div>
          <ChecklistGroup
            title="App Identity"
            checks={(platform === "ios" ? IOS_CHECKS : ANDROID_CHECKS).filter(
              (c) => c.category === "identity"
            )}
          />
          <div className="h-2" />
          <ChecklistGroup
            title="Native Wrap (Capacitor)"
            checks={(platform === "ios" ? IOS_CHECKS : ANDROID_CHECKS).filter(
              (c) => c.category === "native-wrap"
            )}
          />
          <div className="h-2" />
          <ChecklistGroup
            title="Permissions & Privacy"
            checks={(platform === "ios" ? IOS_CHECKS : ANDROID_CHECKS).filter(
              (c) => c.category === "permissions"
            )}
          />
          <div className="h-2" />
          <ChecklistGroup
            title="Review Guidelines"
            checks={(platform === "ios" ? IOS_CHECKS : ANDROID_CHECKS).filter(
              (c) => c.category === "review-guidelines"
            )}
          />
          {(platform === "ios" ? IOS_CHECKS : ANDROID_CHECKS).some(
            (c) => c.category === "performance"
          ) && (
            <>
              <div className="h-2" />
              <ChecklistGroup
                title="Performance / Offline"
                checks={(platform === "ios" ? IOS_CHECKS : ANDROID_CHECKS).filter(
                  (c) => c.category === "performance"
                )}
              />
            </>
          )}
        </div>

        {/* ── Build pipeline stages ─────────────────────────── */}
        <div className="linear-card p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Package2 className="w-3.5 h-3.5 text-primary" />
            <p className="text-[10px] font-semibold">Build Pipeline</p>
          </div>
          <div className="space-y-2">
            {BUILD_STAGES.map((stage, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px]">
                <div
                  className={cn(
                    "w-3.5 h-3.5 shrink-0 rounded-full mt-0.5 flex items-center justify-center",
                    stage.status === "done"
                      ? "bg-[color:var(--success)]/20"
                      : stage.status === "in-progress"
                      ? "bg-[color:var(--warning)]/20"
                      : "bg-muted"
                  )}
                >
                  {stage.status === "done" && (
                    <CheckCircle2 className="w-3 h-3 text-[color:var(--success)]" />
                  )}
                  {stage.status === "in-progress" && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--warning)] animate-pulse" />
                  )}
                  {stage.status === "pending" && (
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <div>
                  <p
                    className={cn(
                      "font-medium",
                      stage.status === "pending" && "text-muted-foreground"
                    )}
                  >
                    {stage.label}
                  </p>
                  <p className="text-muted-foreground">{stage.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Security summary ─────────────────────────────── */}
        <div className="linear-card p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <p className="text-[10px] font-semibold">Security & Compliance</p>
          </div>
          <div className="space-y-1.5 text-[10px]">
            {[
              { label: "HTTPS enforced", ok: true },
              { label: "Content Security Policy", ok: true },
              { label: "Stripe Connect PCI scope", ok: true },
              { label: "Privacy policy URL", ok: true },
              { label: "GDPR / CCPA disclosure", ok: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.ok ? (
                  <CheckCircle2 className="w-3 h-3 text-[color:var(--success)] shrink-0" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-[color:var(--warning)] shrink-0" />
                )}
                <p className={item.ok ? "" : "text-[color:var(--warning)]"}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom banner ──────────────────────────────────────── */}
      <div
        className="px-3 py-2 mt-auto border-t border-border/40 text-center"
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
