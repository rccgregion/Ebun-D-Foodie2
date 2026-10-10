# Khaana Indian Kitchen – System Architecture & Design System

## 1. Executive Summary & Brand Identity
- **Product Name**: Khaana Indian Kitchen
- **Positioning**: Luxury modern Indian restaurant and fine dining digital experience.
- **Tagline**: *"Authentic Flavours. Timeless Traditions."*
- **Signatures**: Royal Awadhi, Mughlai, North & South Indian dishes, slow-simmered handi curries, and clay tandoor cooking.
- **Brand Motifs**: Lotus flower emblem in gold/amber, handwritten script highlights (*"Good Food Brings People Together"*, *"Same Tradition New Stories"*), warm candlelight and terracotta tones.

---

## 2. Design System Tokens & CSS Variables

### 2.1 CSS Custom Properties (Defined in `src/index.css`)
```css
:root {
  /* Typography Tokens */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-display: 'Cinzel', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-script: 'Caveat', cursive;

  /* Day Mode (Warm Cream & Terracotta) */
  --color-bg-primary: #FDFBF7;
  --color-bg-surface: #FFFFFF;
  --color-bg-muted: #F5EFEB;
  --color-text-main: #1C1917;
  --color-text-muted: #78716C;
  --color-accent-gold: #D97706;
  --color-accent-amber: #F59E0B;
  --color-border: #E7E0D8;
}

.dark {
  /* Night Mode (Deep Charcoal & Regal Amber Glow) */
  --color-bg-primary: #120E0D;
  --color-bg-surface: #1B1513;
  --color-bg-muted: #241D1B;
  --color-text-main: #FAF5EE;
  --color-text-muted: #A8A29E;
  --color-accent-gold: #F59E0B;
  --color-accent-amber: #FBBF24;
  --color-border: #2D2320;
}
```

---

## 3. Component Architecture

### 3.1 Layout & Component Tree
```
App
├── Header (Top Announcement Bar + Nav + Actions + Mobile Drawer)
├── Hero ("A Taste of India", 4 Value Pillars, Photo Showcase, Script Overlay)
├── CategoryMenu ("Flavours for Every Craving" with 7 circular category buttons)
├── Bestsellers ("Our Bestsellers": Butter Chicken, Paneer Tikka, Biryani, Dal Makhani)
├── DiningExperience ("Good Food Better Company", Ambiance + 4 Services)
├── OurStory ("Rooted in Tradition, Served with Love" + Visual Collage)
├── Testimonials ("Real Flavours. Real Happiness." - 3 Verified Guest Reviews)
├── ReservationSection ("Reserve Your Table Today" Inline Quick Bar)
├── Footer (Brand + Quick Links + Support + Address + Script Flourish)
└── Interactive Overlays:
    ├── CartDrawer (Order style, item stepper, promo codes, simulated checkout)
    ├── ReservationModal (Multi-step date, time, party size, atmosphere, instant confirmation)
    ├── SearchModal (Real-time keyword & dietary search, ⌘K trigger)
    ├── AnalyticsModal (Live conversion funnel, AOV, top dishes, real-time event stream)
    ├── DishDetailModal (Story, ingredients, nutrition, custom spice slider, sommelier pairings)
    ├── OurStoryModal (Four-decade culinary timeline)
    ├── FullMenuModal (Complete browsable menu with category & dietary filters)
    └── CateringModal (Event planner & pricing calculator for weddings and galas)
```

---

## 4. Touchscreen & Responsive Layout Optimization

1. **Target Sizes**:
   - All interactive touch targets (buttons, pills, icons) satisfy minimum 44×44px hit bounds.
2. **Horizontal Scrolling**:
   - Category row and bestseller carousel use native smooth scroll with `-webkit-overflow-scrolling: touch` and `no-scrollbar` styling for gesture flicking.
3. **Orientations**:
   - Mobile Portrait: Stacked hero, drawer navigation, horizontal scroll categories, single-column cards.
   - Mobile Landscape & Tablet: 2-column bestsellers, floating quick-action drawer, balanced padding.
   - Desktop: 12-column grid system with 4-card bestseller row.

---

## 5. SEO & Search Engine Indexing (Google & Bing)

1. **Sitemap (`/public/sitemap.xml`)**:
   - Includes canonical URLs, change frequencies, and Google Image sitemap tags for food images.
2. **Robots.txt (`/public/robots.txt`)**:
   - Allows all major search engine crawlers and points to the XML sitemap.
3. **Structured Data (Schema.org JSON-LD in `index.html`)**:
   - `Restaurant` schema with `@context: "https://schema.org"`
   - Address: `SCO 12, VIP Road, Zirakpur, Punjab 140603`
   - Cuisines served: `["Indian", "North Indian", "Mughlai", "Tandoori", "South Indian"]`
   - Opening hours: 11:30 to 23:00 daily
   - Telephone: `+91-98765-43210`
   - Price range: `₹₹`
   - Aggregate rating: 4.9 from 1,284 reviews
4. **OpenGraph & Twitter Cards**:
   - Full social sharing preview tags with title, description, and high-resolution thumbnail images.

---

## 6. Real-Time Conversion & Engagement Analytics

- **Service Module**: `src/services/analytics.ts`
- **Tracked Events**:
  - `PAGE_VIEW`
  - `MENU_FILTER`
  - `ADD_TO_CART`
  - `VIEW_DISH`
  - `INITIATE_BOOKING`
  - `CONFIRM_BOOKING`
  - `CHECKOUT_SIMULATION`
  - `THEME_TOGGLE`
- **Dashboard Modal**:
  - Clickable via "Analytics" badge in the navigation header.
  - Displays Total Pageviews, Unique Diners, Cart Pipeline Value (₹), Table Bookings, Booking Conversion Rate (%), Top 5 dishes, and a live timestamped activity feed.
