# Propsoch Assignment

*This assignment is divided into four phases: conducting a website audit using Google Lighthouse, identifying UI/UX issues and their fixes, redesigning and rebuilding key UI components, and finally handling the deployment and documentation.*

---

## Step 1 — Google Lighthouse Audit Results

The audit was run on **May 12, 2026** using **Lighthouse 13.0.2** on **Chromium 147.0.0.0**, on the live site at [https://www.propsoch.com/](https://www.propsoch.com/).

### Desktop Scores (Emulated Desktop, Custom Throttling)

![Audit Result - Desktop Mode](https://github.com/user-attachments/assets/2fc99f6b-ca69-462d-b9a6-5aff340b9583)

| Category | Score | Status |
|---|---|---|
| Performance | 70 | 🟠 Needs Improvement |
| Accessibility | 77 | 🟠 Needs Improvement |
| Best Practices | 81 | 🟠 Needs Improvement |
| SEO | 100 | 🟢 Excellent |

### Mobile Scores (Emulated Moto G Power, Slow 4G Throttling)

![Audit Result - Mobile Mode](https://github.com/user-attachments/assets/b7eea9f8-086c-4548-b6f8-3a3054440f3b)

| Category | Score | Status |
|---|---|---|
| Performance | 68 | 🟠 Needs Improvement |
| Accessibility | 71 | 🟠 Needs Improvement |
| Best Practices | 77 | 🟠 Needs Improvement |
| SEO | 100 | 🟢 Excellent |

### Key Performance Metrics

| Metric | Desktop | Mobile |
|---|---|---|
| First Contentful Paint | 0.5 s 🟢 | 1.8 s 🟠 |
| Largest Contentful Paint | 0.6 s 🟢 | 2.2 s 🟠 |
| Total Blocking Time | 2,090 ms 🔴 | 2,870 ms 🔴 |
| Cumulative Layout Shift | 0.002 🟢 | 0 🟢 |
| Speed Index | 1.1 s 🟢 | 3.2 s 🟠 |

The most critical bottleneck is the **Total Blocking Time** — at nearly 3 seconds on mobile, the page is visually present but completely unresponsive to taps for several seconds after load.

---

## Step 2 — UI/UX Issues

The following issues were identified by manually exploring the site on desktop and mobile, and by analysing the Lighthouse audit reports. Issues are spread across different categories as required.

---

### Issue 1 — Missing Horizontal Padding on the Home Page Layout
**Category:** Spacing and Layout

**Problem:**
The `HomePage` component (`data-sentry-component="HomePage"`) has no horizontal padding applied at the root level. On wider desktop screens this causes all content — headings, body text, CTAs — to press directly against the left edge of the viewport with no breathing room, making the layout look unfinished and hard to read.

![Home Page Padding Issue](https://github.com/user-attachments/assets/75ca543a-28ff-4f73-ba21-349aa46f70ec)

**Fix:**
Add horizontal padding at the `HomePage` wrapper level using Tailwind's `px-5 md:px-10` (or a consistent `container mx-auto px-6` approach). For sections that are intentionally full-bleed — specifically `TestimonialsSection` and `ROISection` — apply a negative horizontal margin (`-mx-5 md:-mx-10`) to break out of the parent padding, and add their own internal padding to keep their content readable.

```tsx
// HomePage wrapper
<main className="px-5 md:px-10">
  ...
  {/* Full-bleed sections break out of the parent padding */}
  <TestimonialsSection className="-mx-5 md:-mx-10 px-5 md:px-10" />
  <ROISection className="-mx-5 md:-mx-10 px-5 md:px-10" />
</main>
```

---

### Issue 2 — Broken Accordion Behaviour in Insights & FAQ Sections
**Category:** Visual Design / Interaction

**Problem:**
Two separate accordion bugs exist on the page:

1. **Insights section** — Each accordion item shows an open/closed state indicator, but clicking the close button does not actually collapse the open accordion. The state is shown visually but the toggle logic is disconnected from the UI action.
2. **FAQ section** — Hovering over accordion toggle buttons does not change the cursor to a pointer, giving no visual affordance that the element is clickable. This violates the basic web convention that interactive elements show `cursor: pointer` on hover.

**Fix:**
- In the **Insights accordion**, ensure the close button's `onClick` handler correctly sets the active accordion state to `null` (or the closed equivalent). If using a library like Radix UI or shadcn `Accordion`, verify the `value` / `onValueChange` props are wired up correctly.
- In the **FAQ accordion**, add `cursor-pointer` to the button's Tailwind class list:

```tsx
// FAQ accordion button
<button className="flex w-full items-center justify-between py-4 cursor-pointer ...">
  {question}
</button>
```

---

### Issue 3 — Broken Search UX (Incorrect Filtering, New Tab Navigation, Unclosed Search Box)
**Category:** Spacing and Layout / Interaction

**Problem:**
The search component in the navbar has three distinct issues:

1. **Partial-match-only filtering** — The search only matches the first word of a location name. Searching "Bengaluru" returns nothing, but searching "Bel" returns "Bellandur, Bengaluru". This means users looking up a city or full area name get no results and may assume the platform has no listings.
2. **Opens results in a new browser tab** — After a successful search, results open in a new tab. The user now has two tabs open: the original (with the search box still open) and the results page (with no way to navigate back). This breaks the browsing flow and leaves behind a "ghost" tab.
3. **Search box stays open after search** — After submitting a search, the search input stays open on the original page, which is confusing because the results are already showing elsewhere.

**Fix:**
- Fix the search filter to tokenise and match against all relevant fields — project name, location name, developer name, and city — not just the first word:
  ```ts
  // Instead of: location.startsWith(query)
  // Use:
  const q = query.toLowerCase();
  return (
    project.name.toLowerCase().includes(q) ||
    project.location.toLowerCase().includes(q) ||
    project.developer.toLowerCase().includes(q)
  );
  ```
- Replace `window.open(url, '_blank')` with `router.push(url)` (Next.js router) so results open within the same tab.
- After a successful search/navigation, set the search component's open state to `false` to close the search box:
  ```ts
  const handleSearch = (query: string) => {
    router.push(`/properties?q=${encodeURIComponent(query)}`);
    setSearchOpen(false); // close the search box
  };
  ```

---

### Issue 4 — Footer Logo Hidden Behind Fixed Mobile Navbar
**Category:** Mobile Responsiveness

**Problem:**
On mobile, the bottom navigation bar is fixed to the bottom of the viewport (`position: fixed; bottom: 0`). The Propsoch logo placed at the very bottom of the footer sits behind this fixed navbar and is therefore completely invisible to mobile users. This is a common mobile layout pitfall — any content at the bottom of a scrollable page can be obscured by fixed UI elements.

**Fix:**
Add a bottom padding to the footer equal to the height of the fixed mobile navbar (commonly `56px` or `4rem`). This creates enough clearance so the footer logo and any other bottom content remain visible above the navbar:

```tsx
// Footer component
<footer className="pb-20 md:pb-0 ...">
  {/* pb-20 gives clearance on mobile; reset to 0 on md+ where navbar isn't fixed */}
  ...
</footer>
```

Alternatively, target only the mobile breakpoint:
```css
/* globals.css */
@media (max-width: 768px) {
  footer {
    padding-bottom: calc(56px + 1rem); /* navbar height + breathing room */
  }
}
```

---

### Issue 5 — No Vertical Padding on the "Get Started" Page
**Category:** Spacing and Layout

**Problem:**
On the `/get-started` (Get Started) page, the form layout has no vertical padding. The form touches the navbar at the top and the bottom edge of the viewport at the bottom, with no breathing room on either side. This makes the form feel cramped, especially on shorter mobile screens, and is a basic spacing oversight that reduces perceived quality.

**Fix:**
Add vertical padding to the page wrapper of the Get Started form. Use responsive padding that gives more space on larger screens:

```tsx
// GetStarted page wrapper
<main className="min-h-screen py-8 px-5 md:py-16 md:px-10">
  <GetStartedForm />
</main>
```

If the layout uses a full-screen modal or drawer pattern instead, ensure `pt-[navbar-height]` is applied so content does not go underneath the navbar, and `pb-8` at the bottom.

---

### Issue 6 — Critically High Total Blocking Time Caused by Unoptimised JavaScript
**Category:** Performance *(directly observed from Google Lighthouse)*

**Problem:**
Lighthouse flagged **Total Blocking Time (TBT) of 2,090 ms on desktop and 2,870 ms on mobile** — both far above the acceptable threshold of under 200 ms. TBT measures how long the main thread is blocked by JavaScript and unable to respond to user input. In practice, this means a user landing on the Propsoch homepage on mobile cannot tap, scroll, or interact with the page for nearly **3 full seconds** after it visually appears.

Lighthouse identified the following root causes contributing to the high TBT:
- **~371 KiB of unused JavaScript** being downloaded and parsed on every page load
- **~36 KiB of legacy JavaScript** (polyfills for older browsers) being sent to modern browsers that don't need them
- **15 seconds of main-thread work** on mobile
- **Forced reflow** — JavaScript reads layout properties immediately after writing them, forcing the browser to recalculate layout repeatedly

**Fix:**
- Use **Next.js dynamic imports** to code-split heavy components so they only load when needed:
  ```tsx
  import dynamic from 'next/dynamic';
  const TestimonialsCarousel = dynamic(() => import('@/components/Testimonials'), {
    ssr: false,
  });
  ```
- Update the `browserslist` target in `package.json` to modern browsers only, which removes the need for legacy polyfills:
  ```json
  "browserslist": ["> 1%", "last 2 versions", "not dead", "not ie 11"]
  ```
- Run `next build` and inspect the bundle analyser (`@next/bundle-analyzer`) to identify and trim the largest unused chunks.
- Load third-party scripts (analytics, Sentry, chat widgets) using `next/script` with `strategy="lazyOnload"` to defer them after the page is fully interactive.

---

### Issue 7 — Missing `alt` Text on Images (Accessibility + SEO)
**Category:** Accessibility

**Problem:**
Several images across the site — including property listing images, section illustration images, and partner builder logos — either have empty `alt=""` attributes or use generic, non-descriptive filenames as alt text (e.g., `alt="image1"`). Lighthouse flags this as an accessibility failure (WCAG 2.1 Success Criterion 1.1.1 — Non-text Content). Screen readers announce these images as meaningless to blind and low-vision users. Additionally, missing or weak alt text is a missed SEO opportunity since search engines use it to understand image content.

**Fix:**
Every `<Image>` component must have a meaningful, descriptive `alt` prop that conveys the purpose or content of the image in context:

```tsx
// Bad
<Image src="/hero-banner.webp" alt="" width={1200} height={600} />
<Image src="/builder-logo.png" alt="image" width={80} height={40} />

// Good
<Image
  src="/hero-banner.webp"
  alt="Family standing in front of their new home in Bangalore"
  width={1200}
  height={600}
/>
<Image
  src="/builder-logo.png"
  alt="Godrej Properties — partner builder"
  width={80}
  height={40}
/>
```

Purely decorative images that add no informational value should use `alt=""` intentionally and `aria-hidden="true"` to correctly hide them from screen readers.

---

### Summary Table

| # | Issue | Category |
|---|---|---|
| 1 | No horizontal padding on HomePage layout | Spacing & Layout |
| 2 | Accordion broken in Insights; missing cursor in FAQ | Visual Design / Interaction |
| 3 | Search: partial match, opens new tab, box stays open | UX / Interaction |
| 4 | Footer logo hidden behind fixed mobile navbar | Mobile Responsiveness |
| 5 | No vertical padding on Get Started page | Spacing & Layout |
| 6 | Total Blocking Time 2,090 ms desktop / 2,870 ms mobile | Performance (Lighthouse) | 
| 7 | Missing or non-descriptive `alt` text on images | Accessibility | 

---

## Step 3 — Build (Redesigned Landing Page)

I rebuilt the core experience using **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. The redesign focuses on solving the performance and layout issues identified in the audit while modernizing the UI.

### 1. Redesigned Hero Section & Integrated CTA
The original hero section lacked a clear, immediate path for user conversion. My redesigned version focuses on clarity and "Time-to-Action."

*   **Design Decision:** I implemented a split-layout design. The left side handles the value proposition with high-contrast typography, while the right side features an optimized hero image.
*   **Direct CTA Integration:** I integrated a prominent "Call to Action" featuring a direct contact number and a primary action button. 
*   **Justification:** In real estate, immediate trust and contact are vital. By placing the contact number and a "Get Started" button in the hero's primary focal point, we reduce user friction and increase conversion potential.
*   **Performance:** The image uses the `next/image` component with the `priority` attribute, ensuring it is the first element loaded, which significantly improves the Largest Contentful Paint (LCP) score.

### 2. Testimonials Section
The original site's social proof felt cluttered and lacked a consistent rhythm.

*   **Design Decision:** I replaced the previous layout with a responsive **Trust Grid**. Each testimonial is encapsulated in a card with a subtle border-radius (`rounded-2xl`) and a soft shadow (`shadow-sm`).
*   **Justification:** A grid layout allows the user's eye to scan reviews more naturally. Using a uniform card system creates a professional, cohesive look that builds brand authority.
*   **Responsiveness:** I used Tailwind’s grid utilities (`grid-cols-1 md:grid-cols-3`) to ensure that on mobile devices, the testimonials stack vertically for readability, while on desktop, they utilize the full width of the container.

### 3. Technical Optimization Highlights
*   **TypeScript Implementation:** I defined strict interfaces for all components (e.g., `TestimonialProps`), ensuring that the data flow is predictable and bug-free.
*   **Layout Consistency:** I applied a standardized spacing scale across all new sections using Tailwind’s `container` class and consistent padding (`px-6 py-20`), solving the "touching the edges" issue found in the original site.
*   **Zero-Layout Shift:** By specifying fixed aspect ratios for images and using modern CSS layouts, I achieved a **Cumulative Layout Shift (CLS) of 0**.

---
## Step 4 — Extension Task: Dark Mode Support

As an additional feature to improve user experience and accessibility, I implemented a fully functional **Dark Mode**.

*   **Implementation:** I utilized Tailwind CSS's `dark` variant combined with a theme provider to allow users to toggle between light and dark themes.
*   **Design Justification:** Dark mode reduces eye strain during night-time browsing—a common use case for users searching for properties at home. It also provides a sleek, modern aesthetic that differentiates the brand.
*   **Technical Detail:** Colors were mapped to semantic variables (e.g., `bg-white` becomes `dark:bg-slate-900`) to ensure that contrast ratios remain WCAG AA compliant across both modes.

## Step 5 — Redesigned Website Audit Results

After completing the rebuild, I ran a second Google Lighthouse audit on the new URL: [https://propsoch-assignment-zeta.vercel.app/](https://propsoch-assignment-zeta.vercel.app/).

### Desktop Mode
![Audit Result - Desktop Mode](https://github.com/user-attachments/assets/e41a5558-d97b-4d3c-89db-fd3f90cef765)

### Mobile Mode
![Audit Result - Mobile Mode](https://github.com/user-attachments/assets/c31a3761-cc64-4972-aece-9472a0c11c30)

## Step 6 — Deployment & Links

| Resource | Link |
|---|---|
| GitHub Repository | *https://github.com/abhis12github/propsoch-assignment* |
| Deployed Site (Vercel) | *https://propsoch-assignment-zeta.vercel.app/* |
| Walkthrough Video | *https://drive.google.com/file/d/1Mco7AWdac38Xdeh5b_iFgvJudoE66Tim/view?usp=sharing* |
