# Domain Knowledge Brief — Creator-Led B2C E-Commerce Marketplace

## Sub-Domain Classification

Independent creator-run two-sided product marketplace (physical + digital goods), consumer mobile-first, PWA-wrapped for native iOS/Android. Analogous to Etsy/Depop tier: individual creators and small shops selling directly to shoppers, with platform as intermediary. Scale: 500–50,000 active creators, 10K–500K monthly active buyers. The distinguishing characteristic versus generic e-commerce: the creator IS the brand — their persona, story, and style drive buyer loyalty more than the individual products.

---

## Job Analyst Vocabulary — Confirmed and Extended

This is a two-sided marketplace with two distinct user surfaces: (1) **Creator/Seller side** — the merchant interface where creators manage their shop, listings, orders, and payouts; (2) **Buyer/Shopper side** — the discovery and purchase interface. The demo should likely focus on the **creator/seller dashboard** view (admin console / seller portal), which is where the operational complexity lives and where the client's app logic is most complex.

### Confirmed Primary Entity Names

These are the words that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, search placeholders.

- **Primary seller record type**: "shop" (not "store", not "account" — "shop" is the universal term on Etsy, Depop, Poshmark)
- **Primary commerce record type**: "listing" (not "product", not "item", not "SKU" — every creator marketplace uses "listing")
- **Primary transaction record type**: "order" (standard across all platforms)
- **Buyer role**: "shopper" or "buyer" (not "customer" — "customer" is generic B2B; "shopper" or "buyer" is marketplace-native)
- **Seller role**: "creator" or "seller" (use "creator" when emphasizing persona; "seller" for operational/transactional contexts)
- **Payment to seller**: "payout" (not "payment", not "transfer" — "payout" is the standard marketplace term for funds released to sellers)
- **Platform's revenue**: "commission" or "platform fee" (not "markup")
- **Buyer intent list**: "wishlist" or "saved items" (not "favorites" unless the platform uses hearts)
- **Social follow unit**: "followers" (buyers follow creators/shops, not "subscribing" or "liking")
- **Shop front page**: "storefront" (not "profile" — though "shop page" also works)
- **Creator's curated selection**: "collection" (not "category" — Etsy, Depop both use "collection" for seller-curated groups)
- **Financial tracking**: "earnings" (not "revenue" — "earnings" is the creator-facing term; "GMV" is the platform-facing metric)
- **Shipping info on an order**: "tracking" or "shipment" (not "delivery record")

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| GMV (Gross Merchandise Value) | Total dollar value of all sales processed on the platform before fees | $ (e.g., $1.24M) |
| Take Rate | Platform commission as % of GMV (marketplace revenue / GMV) | % (e.g., 12.5%) |
| Active Listings | Number of published, non-draft, non-expired listings currently available to buyers | count |
| Listing Views | Total page views across all product listings in a period | count |
| Orders Placed | Number of completed checkout events | count |
| Order Conversion Rate | Orders / unique listing views (approximation of purchase funnel) | % (e.g., 2.3%) |
| AOV (Average Order Value) | Total GMV / total orders — what an average buyer spends per transaction | $ (e.g., $47.80) |
| Payout Amount | Funds released to creator after platform fee deduction and hold period | $ |
| Repeat Purchase Rate | % of buyers who have placed 2+ orders | % (e.g., 34%) |
| Creator Retention Rate | % of active sellers from last month still active this month | % (e.g., 82%) |
| Time to First Sale | Average days from a new creator opening a shop to receiving their first order | days (e.g., 14 days) |
| Shop Star Rating | Weighted avg review score across all creator's completed orders | 0–5.0 (e.g., 4.8) |
| Refund Rate | Refunded orders / total orders | % (e.g., 3.1%) |
| Dispute Rate | Orders with an opened dispute / total orders | % (e.g., 0.8%) |

### Status Label Vocabulary

Exact status strings used in this domain — these go directly into data tables, badges, and filter dropdowns.

**Listing statuses:**
- Active (green) — published and visible to buyers
- Draft (gray) — created but not published
- Paused (amber) — temporarily hidden by creator
- Sold Out (red/amber) — zero inventory remaining
- Expired (gray) — listing removed due to age/renewal lapse
- Removed (red) — taken down by platform moderation

**Order statuses:**
- Pending Payment (amber) — checkout initiated, payment not confirmed
- Processing (blue) — payment confirmed, awaiting creator action
- Shipped (blue) — tracking number added
- Out for Delivery (blue) — carrier last-mile scan
- Delivered (green) — delivery confirmed
- Disputed (red) — buyer opened a dispute
- Refunded (amber) — full or partial refund issued
- Cancelled (gray) — order voided before shipment

**Creator/Shop statuses:**
- Active (green)
- New Creator (blue badge, first 30 days)
- Top Seller (gold badge, top 5% GMV)
- On Vacation (gray) — shop temporarily paused
- Under Review (amber) — moderation flag triggered
- Suspended (red) — platform-initiated suspension
- Verified (blue checkmark) — identity verified

**Payout statuses:**
- Scheduled (blue)
- Processing (amber)
- Paid (green)
- On Hold (red) — funds withheld pending dispute resolution
- Failed (red) — bank transfer failure

### Workflow and Action Vocabulary

Verbs used in this domain — these become button labels, action menu items, and empty state messages.

- **Primary actions**: "Publish listing", "Mark as shipped", "Issue refund", "Add tracking", "Message buyer", "Renew listing", "Pause shop"
- **Secondary actions**: "Feature listing", "Run sale", "Duplicate listing", "Escalate dispute", "Flag content", "Verify identity", "Release payout", "Put on hold"
- **Buyer actions**: "Add to wishlist", "Follow shop", "Leave review", "Open dispute", "Request return"
- **Platform/admin actions**: "Review flagged content", "Suspend shop", "Override payout hold", "Approve appeal"

### Sidebar Navigation Candidates

Navigation items using domain vocabulary for the **creator seller dashboard** view:

1. **Shop Overview** (not "Dashboard" — "Shop Overview" is Etsy/Depop language)
2. **My Listings** (not "Products" or "Items")
3. **Orders** (universal term, context: pending/shipped/completed)
4. **Earnings** (not "Finance" or "Revenue" — "Earnings" is creator-facing)
5. **Shop Reviews** (not "Feedback" — "Reviews" is the platform standard)
6. **Buyers** (not "Customers" — "Buyers" is marketplace terminology)
7. **Promotions** (or "Sales & Discounts" — where creators run timed sales)
8. **Shop Settings** (not just "Settings" — scoped to their shop identity)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

Creator marketplace platforms have two distinct visual personalities: the **buyer-facing discovery experience** (visual-first, image-heavy, magazine-like, warm and inviting) and the **seller/creator dashboard experience** (functional, data-clear, SaaS-like but with warmth). The job is about the full PWA — so both surfaces matter, but the demo should primarily demonstrate the seller dashboard since that's where technical complexity lives.

For the **seller dashboard aesthetic**, the reference is Etsy's Shop Manager: card-based layouts, soft borders, generous whitespace, a warm neutral background (off-white, not stark white), colored status badges, stat cards with period comparisons, and an approachable but professional feel. This is not a cold enterprise tool — the creator is a small business owner who cares about their brand. The software should feel like it respects their creative identity.

For the **buyer discovery experience** (if shown), the reference is Depop's feed: full-bleed product photography, infinite scroll card grid, creator avatars prominently displayed, social follow mechanics prominently featured, bold typography for shop names. Heavily visual, lifestyle-forward, with a "social platform that happens to sell things" energy.

The color palette leans warm: coral, dusty rose, amber, sage green, and terracotta are common creator marketplace accent colors — they signal "made by people, for people" vs. the cold blue/gray of enterprise SaaS. Shopify-style merchant green is another valid direction for seller dashboards specifically.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Etsy Shop Manager** — The gold standard for creator seller dashboards. Card-based stats, tabbed order management, "Orders & Shipping" as a combined view. Practitioners consider it clean and well-organized, if slightly dated. Uses off-white backgrounds, muted greens/oranges for CTAs. Stat cards prominently feature "Views", "Visits", "Orders", "Revenue" with period dropdowns.

2. **Depop Seller App** — More modern, mobile-first, feed-centric. Bold product photography. Uses dark mode by default on mobile. The "Selling" tab shows pending orders with clear action prompts. Visual but operationally minimal — focused on listing creation speed.

3. **Whatnot Creator Portal** — The emerging "premium" reference for creator commerce dashboards. Shows live GMV, scheduled streams, active auctions, payout balance prominently. Highly visual, real-time feel. Uses deep purple/violet as primary brand color. Dashboard density is moderate — enough data to feel powerful without overwhelming a solo creator.

### Aesthetic Validation

- **Domain validation**: E-Commerce aesthetic is appropriate for this sub-domain but the standard "merchant gold/saffron" primary may feel too generic. Creator marketplaces lean toward warmer coral/rose or more contemporary violet/indigo. Recommend using a **violet-rose** or **coral** primary color that signals "creator-friendly" rather than "generic merchant tool." SaaS Modern is a viable secondary option for the seller dashboard specifically.
- **One adjustment to color/density if needed**: Reduce density slightly from generic e-commerce defaults — creator marketplace sellers are often solo entrepreneurs, not trained ops staff. More whitespace and clearer information hierarchy matters here. "Standard" density (not compact) with generous card padding.

### Format Validation

- **Domain validation**: This is a mobile-first PWA being wrapped for iOS/Android. The demo format should be **mobile-app-preview** to show the phone-frame experience. However, if the demo needs to show both creator dashboard AND buyer discovery, a `multi-screen-walkthrough` could work equally well. For a two-sided marketplace with rich seller analytics, **dashboard-app** is also defensible if the client's focus is the seller/admin portal.
- **Format-specific design notes for the Demo Screen Builder**: If using `mobile-app-preview`, the bottom tab bar should have: Discover/Feed, Search, Sell (CTA), Orders, Profile. Screens should include: (1) Buyer feed/discovery with creator cards, (2) Listing detail with add to wishlist and buy now, (3) Creator/seller shop page, (4) Seller dashboard with earnings and order queue, (5) Order detail with tracking timeline. Reference apps: Depop, Whatnot, Poshmark — all use image-first cards with creator avatars, not generic product grids.

### Density and Layout Expectations

**Standard density** — not dense like a trading terminal, not spacious like a wellness app. Creator marketplace sellers are mobile-first users who check their shop between life activities. Cards should be readable at a glance. Stat cards should be the primary hero on the dashboard screen.

**Card-heavy views** dominate: product listings in a 2-column grid, order cards in a scrollable list, stat cards stacked at the top. Tables are minimal — the Etsy/Depop aesthetic avoids dense data tables in favor of card lists with clear hierarchy.

**Image-centric**: Product photography is the #1 design element. Every listing card prominently features the product image. The app is fundamentally a visual media platform that sells things.

---

## Entity Names (10+ realistic names)

### Companies / Shops / Creator Brands

These are realistic creator shop names following real naming conventions (punny, aesthetic-descriptor + noun, or creator's name + shop):

1. Maplewood & Moss (home decor, botanical)
2. Thread & Theory (clothing, fashion)
3. Sundial Studio (jewelry, accessories)
4. Crestwood Ceramics (pottery, homeware)
5. The Velvet Archive (vintage fashion)
6. Bramblewood Press (art prints, stationery)
7. Studio 44 Goods (mixed crafts)
8. Golden Hour Wax Co. (candles, home fragrance)
9. Fernway Fibers (knitting, textiles)
10. Hazel & Holt Designs (leather goods)
11. Midnight Bloom Art (digital art, prints)
12. Copper & Clay Co. (jewelry, pottery hybrid)

### People Names (role-appropriate)

Creator marketplace sellers skew female (80% on Etsy), typically 25-45, and buyers are similarly demographic. Include both:

**Creators/Sellers:**
- Priya Nair (jewelry creator)
- Sofia Marchetti (vintage clothing)
- Megan Calloway (home decor)
- Ana Ferreira (ceramics)
- Jade Kowalski (art prints)
- Riley Huang (candles)

**Buyers:**
- Claire Whitfield
- Marcus Okonkwo
- Brittany Sandoval
- James Thornton
- Yuki Nakamura
- Emma Harrington

### Products / Listings

Realistic listing names (creators use specific, SEO-optimized names):

1. "Handwoven Rattan Wall Basket — 14 inch, Natural"
2. "Vintage Levi's 501 Jeans — Size 28x30, Faded Blue"
3. "Soy Wax Pillar Candle — Amber + Black Pepper, 8oz"
4. "Sterling Silver Crescent Moon Pendant Necklace"
5. "Matcha Ceramic Mug — Speckled Sage, 12oz, Handmade"
6. "Fine Art Print — 'Golden Hour' — 5x7, 8x10, 11x14"
7. "Chunky Knit Merino Throw Blanket — Oatmeal"
8. "Leather Card Wallet — Tan, Monogram Available"
9. "Botanical Pressed Flower Frame — Dried Wildflowers"
10. "Digital Download: Procreate Brush Set Vol. 3"
11. "Hand-Stamped Brass Keychain — Custom Name"
12. "Embroidered Linen Tote Bag — Natural, 'In Bloom'"

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Listings per active creator shop | 3 | 24 | 200+ | Median Etsy shop has ~20 active listings |
| Monthly orders per active shop | 2 | 18 | 300+ | Top 5% of sellers do 100+ orders/month |
| Average Order Value (AOV) | $18 | $47 | $180 | Etsy avg ~$32; Whatnot avg ~$28 (collectibles); handmade jewelry ~$65 |
| Platform take rate (commission) | 6.5% | 12–15% | 20% | Etsy: ~6.5% listing + payment fees (~11% blended); Depop: 10%; Whatnot: 8% |
| Creator monthly earnings (solo shop) | $120 | $890 | $8,500 | Median Etsy seller earns ~$1,299/year (~$108/mo); top sellers $65K/mo |
| Shop star rating | 3.2 | 4.7 | 5.0 | Buyers rarely leave reviews; ratings cluster 4.5–5.0 for active shops |
| Listing views per active listing/month | 10 | 85 | 800 | High variance; viral listings get 5K–50K views |
| Order-to-listing view conversion rate | 0.5% | 2.3% | 8% | Etsy avg ~2%; well-optimized listings 4–6% |
| Payout hold period | 3 days | 7 days | 21 days | New sellers held longer; standard is 3–7 day rolling |
| Time to first sale (new creator) | 3 days | 18 days | 60+ days | Best practice: 30-day target; avg ~14–21 days |
| Monthly active buyer retention | 30% | 55% | 82% | Whatnot reports 80% MoM; category-dependent |
| Repeat purchase rate | 15% | 34% | 65% | Strong brand-attached shops get 40–60% repeat rate |
| Dispute rate | 0.2% | 0.8% | 3% | Healthy marketplace target <1%; >3% triggers review |
| Refund rate | 1% | 3.5% | 9% | Typical marketplace target <5%; physical goods 2–4% |

---

## Industry Terminology Glossary (10+ terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| GMV (Gross Merchandise Value) | Total dollar value of all transactions processed on the platform before any fees are deducted | Platform-level KPI; investors, operators, and platform dashboards track this |
| Take Rate | Percentage of GMV that the platform retains as revenue (commission + fees / GMV) | Platform P&L metric; typical range 10–20% for creator marketplaces |
| Listing | A single product or service offered for sale — the fundamental commerce unit on any marketplace | Used universally; "Add a listing" not "Add a product" |
| Shop / Storefront | A creator's branded page on the marketplace; their digital store identity | Etsy, Depop, Poshmark all use "shop" not "store" or "account" |
| Payout | Funds transferred to a seller after platform fee deductions and any hold period | "Earnings" from creator's perspective; "payout" for the transfer event |
| Collection | A curated subset of listings that a creator groups together (e.g., "Summer Collection", "Under $30") | Seller-defined, used for marketing and discovery |
| Featured Listing | A listing promoted to top placement by either the creator (paid) or platform (editorial) | Used in "Promote" or "Feature this listing" flows |
| Shop Policies | Seller-defined rules for returns, exchanges, shipping, and processing times — displayed on storefront | Buyers expect to see these before checkout |
| Processing Time | Days a creator needs to prepare an order before shipping (distinct from shipping transit time) | Key buyer expectation: "Ships in 3–5 business days" |
| Favourites (or Saves) | Buyer action to save a listing to their wishlist without purchasing | Platform terminology varies: "Favourite" (Etsy), "Like" (Depop), "Like" (Poshmark) |
| Reserve / Hold | Seller holding a listing for a specific buyer before they purchase | Common in vintage/handmade: "I can hold this for 48 hours" |
| Digital Download | Listing type where the deliverable is a file (PDF, PNG, Procreate brush, pattern) with no physical shipping | Growing category; Etsy handles this as "automatic download" |
| Bundle Discount | Seller offering reduced pricing when a buyer purchases multiple listings in one order | Common seller tool to increase AOV |
| Star Seller | Etsy's badge for consistently high ratings, on-time shipping, and response rate | Badge system signals trusted creators to buyers |
| Listing Renewal | Marketplace practice of expiring listings after a set period (Etsy: 4 months) to maintain catalog freshness | Sellers pay a small fee to renew expired listings |
| Offer to Buyer | Seller sending a discounted price offer to a shopper who has shown interest (viewed/saved a listing) | Powerful conversion tool; "Send Offer" to interested shoppers |

---

## Common Workflows

### Workflow 1: Creator Onboarding to First Sale

1. Creator registers and creates a shop (shop name, banner image, bio, policies)
2. Creator publishes first listing (title, photos, description, price, quantity, shipping profile)
3. Platform indexes listing for search and recommendations
4. Buyer discovers listing via search, feed, or creator page
5. Buyer adds to wishlist OR purchases directly
6. Creator receives order notification ("New order from [Buyer]")
7. Creator packages item and adds tracking number to order
8. Platform sends shipping confirmation to buyer
9. Buyer receives package, optionally leaves review
10. Platform releases payout to creator after hold period

### Workflow 2: Dispute Resolution

1. Buyer opens a dispute ("Item not as described" or "Item not received")
2. Platform sends dispute notification to creator
3. Creator responds with evidence (photos, tracking, communications)
4. Platform mediates: 3-5 business day resolution window
5. Outcome options: (a) Refund issued to buyer, deducted from creator; (b) Dispute closed in creator's favor; (c) Partial refund negotiated
6. If dispute involves fraud, platform may escalate to chargeback process

### Workflow 3: Creator Running a Timed Sale

1. Creator selects listings to include in a sale event
2. Sets discount percentage and sale duration (e.g., "20% off for 48 hours")
3. Platform updates listing prices and adds "Sale" badge to affected listings
4. Buyers browsing see original price with strikethrough and sale price
5. Orders placed during sale period are captured at discounted price
6. Sale ends, prices automatically revert to original
7. Creator reviews earnings impact in Earnings dashboard

---

## Common Edge Cases

1. **Sold Out listing left active** — Creator forgets to mark as sold or update quantity; buyer attempts to purchase a 0-quantity listing → should show "Sold Out" badge, block checkout, prompt creator to update
2. **Disputed order with payout on hold** — Creator's payout shows "On Hold" badge; full payout amount is visible but frozen pending dispute resolution → needs prominent indicator and estimated release date
3. **Suspended shop (policy violation)** — All listings deactivated, new orders blocked, existing orders must be fulfilled → shows suspension notice with appeal CTA
4. **Listing with unusually high views but zero conversions** — May indicate pricing issue, poor photos, or a viral social share without purchase intent → appears as an "opportunity" flag in analytics
5. **Chargeback after delivered order** — Buyer disputes charge with bank after confirmed delivery → appears as "Chargeback Received" status distinct from standard dispute
6. **Creator on vacation with open orders** — Shop marked as "On Vacation", no new orders accepted, but existing orders still require fulfillment → vacation mode should not pause active orders
7. **Zero-review new creator** — Valid shop with legitimate listings but no social proof → "New Shop" badge, no star rating displayed (important: don't show 0 stars, show nothing)
8. **Digital download delivery failure** — Buyer paid for a digital product but download link expired or failed → auto-retry or manual resend flow

---

## What Would Impress a Domain Expert

1. **Payout hold logic displayed correctly** — New creators see a 21-day hold on earnings; established creators see 3-5 days. Showing this distinctly (not just "Pending") signals you understand the actual payment rail complexity in marketplace apps. Real platforms show "Available [date]" not just "Pending".

2. **Listing expiry and renewal flow** — Etsy listings expire after 120 days; the dashboard shows "Expiring Soon" warnings and a renewal prompt. Including this lifecycle in the listing table (with an "Expires in 12 days" indicator) shows genuine platform knowledge.

3. **Listing views → favorites → orders funnel** — Creator marketplaces show this three-stage conversion funnel per listing. A creator seeing "142 views → 8 saves → 2 orders" on a listing knows immediately whether the issue is discovery (low views), appeal (low save rate), or pricing (low order rate). This is not a generic e-commerce metric.

4. **Processing time vs. shipping time distinction** — Showing both on an order card ("Processing: 1-3 days" + "Shipping: 3-5 days USPS First Class") mirrors exactly how Etsy/Depop display order timelines and signals deep domain understanding.

5. **"Star Seller" tier system or equivalent badge logic** — Creator marketplaces use multi-factor badge systems (message response rate < 24h, on-time shipping rate > 95%, rating ≥ 4.8, minimum order threshold). Including this as a visible goal tracker ("Star Seller progress: 3/4 criteria met") would be immediately recognized by any Etsy seller as a feature they know and care about.

---

## Common Systems & Tools Used

1. **Etsy Shop Manager** — The primary competitor/reference; sets expectations for what a seller dashboard should look like and what data it exposes
2. **Shopify** — Many creator-marketplace sellers also run their own Shopify store; cross-platform inventory sync is a real pain point
3. **Printful / Printify** — Print-on-demand fulfillment integrations; popular with creators selling art prints and apparel
4. **Shippo / EasyPost / ShipStation** — Shipping label generation and rate comparison tools
5. **Capacitor / Ionic** — PWA-to-native wrapping layer; Capacitor is the clear standard for React/Next.js apps being wrapped for app stores
6. **Stripe Connect** — The standard payment split infrastructure for two-sided marketplaces (connects platform to seller payouts)
7. **Firebase / Supabase** — Common backend choices for marketplace MVPs and startups
8. **Cloudinary** — Image hosting and optimization for listing photos (CDN + transformation)
9. **Algolia** — Search-as-a-service used by many creator marketplaces for listing search (faceted search, typo tolerance)
10. **Braintree / PayPal Commerce Platform** — Alternative payment processors used by some creator marketplaces for PayPal buyer preference

---

## Geographic / Cultural Considerations

- **US-centric by default**: USD pricing, US address formats for shipping, US state abbreviations in seller location. Key US carriers: USPS, UPS, FedEx, DHL.
- **Shipping zones matter**: Domestic vs. international shipping is a common creator pain point. Show both domestic and international shipping options.
- **US sales tax complexity**: US marketplace facilitator laws (Etsy collects sales tax on behalf of sellers in most US states) — showing "Tax collected by platform" on order receipts is a signal of insider knowledge.
- **Holiday seasons drive 40–60% of annual GMV**: Q4 (Nov–Dec) is disproportionately important. Mock data should show clear seasonal spikes in October–December.

---

## Data Architect Notes

- **Primary entities**: `shops` (creator storefronts), `listings` (products for sale), `orders` (transactions), `creators` (seller profiles), `buyers` (buyer profiles), `reviews` (order reviews), `payouts` (earnings releases), `disputes` (opened issues)
- **Revenue per order should be $18–$180** with median around $47; use variance (e.g., $23.40, $67.00, $142.50, $31.99 — not round numbers)
- **Status labels to use exactly** (not "active/inactive"):
  - Listings: `"Active"`, `"Draft"`, `"Paused"`, `"Sold Out"`, `"Expired"`, `"Removed"`
  - Orders: `"Processing"`, `"Shipped"`, `"Delivered"`, `"Disputed"`, `"Refunded"`, `"Cancelled"`
  - Payouts: `"Scheduled"`, `"Processing"`, `"Paid"`, `"On Hold"`, `"Failed"`
  - Shops: `"Active"`, `"On Vacation"`, `"Under Review"`, `"Suspended"`
- **Edge case records to include**:
  - 2 orders with `"Disputed"` status
  - 1 payout with `"On Hold"` status
  - 2 listings with `"Sold Out"` status
  - 1 shop with `"Under Review"` status
  - 1 creator with zero reviews (new shop)
  - At least 1 order with unusually high AOV (outlier: $275+ order)
- **Date patterns**: Q4 2024 sales spike (Oct–Dec higher volume); flat Jan–Feb; gradual recovery Mar–May. Current period: Feb–Mar 2026. Use relative dates for orders (1–45 days ago).
- **Listing views/saves/orders funnel data**: Each listing should have `views`, `saves`, `orders` fields showing realistic conversion funnel. Viral outlier: 1 listing with 1,200+ views but 0 orders.
- **Creator earnings data**: Monthly earnings time-series for 12 months. Include one month with 0 earnings (vacation mode).

## Layout Builder Notes

- **Recommended density**: Standard (not compact). Card padding `1.5rem`. This is not a power-user ops tool — it's a solo creator's business dashboard.
- **Sidebar width**: Standard `16rem` is fine; nav labels are short ("My Listings", "Orders", "Earnings").
- **Domain-specific visual patterns the Layout Builder must know**:
  - Status badges are critical: use color-coded chips prominently in listing tables and order cards. Every row needs a visible status badge.
  - Product images are load-bearing: listing cards must show product thumbnail prominently (not a placeholder icon). Even in table rows, a small 40x40 image thumbnail in the first column.
  - Creator avatar + shop name in the sidebar header is expected (Etsy, Depop, Shopify all do this).
  - Stat cards at top of dashboard should show both the current value AND a trend comparison ("vs. last 30 days").
- **Color nuance**: Warm primary tone. Avoid cold enterprise blues. Coral (`oklch(0.62 0.22 28)`), rose (`oklch(0.62 0.18 10)`), or violet (`oklch(0.55 0.22 290)`) are all more authentic than generic merchant-gold. The E-Commerce aesthetic is directionally right but adjust the hue to warm/violet territory.

## Demo Screen Builder Notes

- **Most important metric (hero KPI)**: "Total Earnings" or "GMV This Month" — creators care about money first. This should be the largest stat card or the hero number on the dashboard screen.
- **Chart type for trend data**: Area chart for monthly earnings/GMV — same as how Etsy's Stats page displays revenue over time. Do NOT use bar chart for earnings trend — area chart with fill is the visual standard for creator revenue.
- **One domain-specific panel that would impress practitioners**: An **Order Queue** panel showing today's unshipped orders with a prominent "Mark as Shipped" button per row — this is the creator's daily operational view, and it maps exactly to how Etsy's "Orders & Shipping" tab is used. Include order number, buyer name, item thumbnail, and "Add Tracking" CTA.
- **Format-specific notes for `mobile-app-preview`**: If using phone frame format:
  - Bottom tab bar: Discover | Search | Sell (+ icon, CTA) | Orders | Profile
  - Home/Discover screen: 2-column product card grid with shop avatars, trending tag chips, featured creator banner
  - Sell screen: "Add Listing" prominent CTA + grid of current active listings with quick edit
  - Orders screen: swipeable order cards with status badges and "Add Tracking" inline action
  - Profile/Shop screen: shop banner + star rating + listing grid — mirrors what buyers see
  - Reference apps: Depop (2-column feed with creator avatars), Whatnot (bold GMV on seller home)
- **Format-specific notes for `dashboard-app`**: If using sidebar dashboard format:
  - Dashboard page: Earnings area chart + 4 stat cards (GMV, Orders, Avg Rating, Active Listings) + Order Queue panel
  - Listings page: 2-column card grid with status badges and listing performance metrics
  - Orders page: Table with filtering by status (Processing / Shipped / Disputed)
  - Earnings page: Monthly breakdown chart + payout history table
  - Reviews page: Rating distribution + individual review cards with star ratings and creator response option
