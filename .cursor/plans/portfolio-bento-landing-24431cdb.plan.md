<!-- 24431cdb-7d4d-42b0-a32d-994d12f74892 af7c0bb1-28fe-46d2-a062-ef43bbe5ce2d -->
# PDF Export Modal Improvements

## Changes in [components/pdf-export.tsx](my-portfolio/my-portfolio/components/pdf-export.tsx)

### 1. Remove Projects Section

- Delete the entire "Selected Projects" block from the PDF content (lines ~220-250)

### 2. Enlarge Dialog Window

- Change `DialogContent` className from `max-w-2xl` to `max-w-5xl w-[95vw]`
- Remove `maxHeight: '400px'` from preview container, use `maxHeight: '70vh'`
- Increase `minWidth` of PDF content from `500px` to `700px`

### 3. Increase Font Sizes

- Header name: `28px` -> `36px`
- Title: `16px` -> `20px`
- Bio: `11px` -> `14px`
- Section headers: `14px` -> `16px`
- Experience text: `11px` -> `13px`
- Skills tags: `10px` -> `12px`
- Contact section: `11px` -> `14px`
- Generated date: `9px` -> `11px`

### 4. Remove Refresh Button

- Delete the Button component with "Refresh content" text

### 5. Replace Emoji Icons with Lucide

- Import `Sun`, `Moon` from `lucide-react`
- Replace `☀️ Light` with `<Sun className="h-4 w-4" /> Light`
- Replace `🌙 Dark` with `<Moon className="h-4 w-4" /> Dark`

### To-dos

- [ ] A1. Add self-hosted Geist Variable + Geist Mono via next/font/local (no manual preload)
- [ ] A2. Define theme CSS tokens: --bg, --fg, --card, --card-fg, --border, --muted, --muted-fg, --accent, --accent-fg, --ring, --primary, --primary-fg, --destructive, --destructive-fg
- [ ] A3. Wire next-themes with attribute="class", defaultTheme="dark", enableSystem=false; add suppressHydrationWarning on <html>; prevent FOUC
- [ ] A4. Add sticky header with IntersectionObserver sentinel (no scroll listeners); blur/bg only when sentinel is past
- [ ] A5. Add anchor nav (#hero, #work, #about, #experience, #skills, #contact) and global smooth scroll; disable on reduced-motion
- [ ] A6. Scaffold section id blocks; add scroll-margin-top equal to header height
- [ ] A7. Add NEXT_PUBLIC_ENABLE_INDEXING flag and noindex,nofollow meta while placeholders are active
- [ ] B1. Create BentoCard variants (sm/md/lg/hero), fixed aspect options to prevent CLS
- [ ] B2. Implement Hero split: H1 + tagline + two CTAs (Email/Telegram); portrait placeholder prioritized
- [ ] B3. Build Featured Work grid (3–5) from MDX stubs; 1 large + 2–4 medium/small (will use Contentlayer from CL epic)
- [ ] B4. Create About section (short bio + small photo tile)
- [ ] B5. Create Experience list (3 roles, compact copy)
- [ ] B6. Create Skills grid (tool icons + 2–3 expertise chips)
- [ ] B7. Create Testimonials grid (2–3 quotes, no carousel)
- [ ] B8. Ensure all next/image have correct sizes per breakpoint and fixed aspects
- [ ] C1. Add global reduced-motion hook; when true → only fades
- [ ] C2. Page-fade on initial load (once)
- [ ] C3. Section reveal with useInView({ once: true, amount: 0.15 }) applied to section wrappers only
- [ ] C4. Stagger lists for work/skills/experience
- [ ] C5. Hover-lift for interactive BentoCards (scale ≤ 1.04, translateY ≤ 4px)
- [ ] C6. Magnetic hover on Email/Telegram CTAs (bind on pointerenter, remove on pointerleave; disable on touch)
- [ ] C7. Parallax on Hero portrait via useScroll (desktop only; disable on touch/reduced-motion)
- [ ] D1. Contact UI: Name, Email, Message (req), Budget (opt) + hidden honeypot field
- [ ] D2. Zod schema + React Hook Form with inline errors
- [ ] D3. API route /api/contact with honeypot check and simple per-IP rate-limit stub (DEV ONLY - in-memory breaks on Vercel prod)
- [ ] D4. Email stub (Resend/SMTP) and Telegram bot stub; return mock success
- [ ] D5. Form state micro-animations: loading/success/error; reset after success
- [ ] D6. Wire CTA links in Hero (mailto, tg://) + analytics throttling (no event spam)
- [ ] E1. Base metadata (title/description/3-5 keywords max/canonical) in a single config
- [ ] E3. Static OG image 1200×630 (dark), reference in metadata
- [ ] E4. Robots & Sitemap with noindex controlled by env flag
- [ ] F3. Verify font strategy (display: swap, latin subset); no manual preload
- [ ] F4. Ensure CLS < 0.03 with fixed aspects/skeletons where needed
- [ ] F6. A11y: keyboard nav, visible focus, ARIA labels, AA contrast in both themes, alt texts
- [ ] F9. Add docs/performance-budget.md with JS/img budgets and CWV targets
- [ ] RL1. Abstract rate-limit interface; stub (in-memory) behind env switch
- [ ] RL2. Add TODO to migrate to Upstash Redis / Vercel KV with IP hash (x-forwarded-for) and UA prefix
- [ ] RL3. Log limit hits (console warn in dev), return 429 JSON with retry-after
- [ ] SEC1. Add security headers: CSP (self/img/data: https:), Referrer-Policy: strict-origin-when-cross-origin, X-Content-Type-Options, Permissions-Policy minimal
- [ ] SEC2. Disable Next telemetry in postinstall or env (NEXT_TELEMETRY_DISABLED=1)
- [ ] SEC3. Add .nvmrc (Node LTS) and packageManager field (pnpm/npm version)
- [ ] IMG1. Set images.formats = ['image/avif','image/webp'], domains empty (local only)
- [ ] IMG2. Create lib/image-sizes.ts with constants for hero/cards; use everywhere to prevent errors
- [ ] ERR1. Add app/not-found.tsx (button 'Back to portfolio')
- [ ] ERR2. Add app/error.tsx (reset boundary), minimal typography and CTA 'reload'
- [ ] FR1. Document: FORBIDDEN to animate top/left/width/height; only transform/opacity; add comment in each animation component
- [ ] OG1. Ensure /og.png accessible with noindex; use relative path in metadata