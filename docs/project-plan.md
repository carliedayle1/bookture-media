# Bookture Media Website — Full Project Plan

**Goal:** Build a marketing site that reads as unmistakably expensive on first glance. Cinematic, atmospheric, richly animated. Modeled on booksacademy.net's mood, but faster, cleaner, and with technical polish that competitor sites lack.

---

## 1. What makes booksacademy feel expensive (so we can beat it)

Six ingredients, each of which we will match or exceed:

1. **A cinematic intro moment.** Their gold-logo reveal on textured black. It's dated, but it works because it sets a tone before content loads. We will replace it with a shorter, higher-craft intro (~2 seconds max) that skips automatically.
2. **Full-bleed atmospheric imagery.** Every section has moody library/forest/mountain backgrounds. This is 70% of the "expensive" feel.
3. **Layered depth.** Foreground content, midground blur, background imagery — three z-planes on every section.
4. **Ambient motion everywhere.** Nothing sits still. Backgrounds pan slowly (Ken Burns), particles drift, gold shimmers, numbers count, text reveals on scroll.
5. **Gold-on-dark palette with disciplined restraint.** Gold appears sparingly — dividers, numerals, small accents — never as flat fills.
6. **A ritual structure.** The numbered 01–06 process feels ceremonial. We keep this pattern; it's genuinely good.

**Where booksacademy loses:** heavy page weight, low text contrast, blurry mid-load states, no dark/light toggle, no real portfolio, weak CTAs. Every one of these is an opportunity for us.

---

## 2. Decisions to lock in before we build

| Question | Options | My recommendation |
|---|---|---|
| Brand name | Bookture Media LLC (existing) or new | Keep Bookture Media |
| Primary conversion goal | Manuscript submission / consultation booking / bookstore purchase | Pick ONE — everything else is secondary. I recommend "book a free consultation" |
| Scope | Marketing site only / marketing + bookstore / + author portal | Start with marketing only, add rest in phase 2 |
| Tech stack | See section 4 | Next.js 15 + React 19 (recommended) OR Laravel 12 + Inertia + React (if backend integration matters) |
| Asset budget | AI-generated (~$100/mo) / stock ($500-2000 one-time) / custom shoot ($5-15k) | AI + curated stock for launch, custom photography for phase 2 |
| Timeline | 3 weeks aggressive / 6 weeks realistic / 10 weeks polished | 6 weeks |
| Hosting | Vercel / Cloudflare Pages / self-hosted | Vercel for Next.js, or Laravel Forge for Laravel |

---

## 3. Tech stack — the case for and against

### Option A (recommended): Next.js 15 + React 19
**Frontend-only marketing site, deployed on Vercel.**

Pros: Best performance, best animation library ecosystem, largest talent pool, best DX, near-zero backend cost, fastest to build.

Cons: If you later need bookstore/auth/CMS, you add those as separate services (Sanity for CMS, Stripe for commerce, Clerk for auth).

Libraries:
- **Next.js 15** — framework
- **React 19** — UI
- **TypeScript** — type safety (avoid entire categories of bugs)
- **Tailwind CSS v4** — styling
- **GSAP + ScrollTrigger** — scroll-driven animations (industry standard for premium sites)
- **Lenis** — smooth scroll
- **Framer Motion** — component-level motion
- **React Three Fiber + drei** — Three.js in React
- **Splitting.js** — text splitting for word/character reveals
- **Lottie React** — logo animations
- **Sanity** (optional) — headless CMS if content will change often

### Option B: Laravel 12 + Inertia + React
Same frontend libraries as above, but Laravel handles backend for future bookstore/auth/admin.

Pros: One project handles everything. If phase 2 includes bookstore, you're ready. Booksacademy uses Laravel.

Cons: More complex to set up, slower dev cycle, needs a real server.

### Option C: Astro
Pros: Fastest possible page loads, static output, ships almost no JS by default.

Cons: Weaker for heavy interactivity. Not ideal for this project — we WANT heavy interactivity.

**My recommendation: Option A (Next.js).** Start there; if bookstore becomes a real need, add Laravel later as a headless API or migrate. Don't couple decisions.

---

## 4. The "wow" ingredients — every technique we will use

### Motion & scroll
- **Lenis** — buttery smooth scroll (this alone makes a site feel $20k more expensive)
- **GSAP ScrollTrigger** — scroll-linked timelines
- **GSAP SplitText** — animate each character/word/line individually
- **Sticky scroll storytelling** — content pins while imagery changes behind it (like Apple product pages)
- **Horizontal scroll panels** — one section that goes sideways (used once, memorably)
- **Marquee scrollers** — infinite ticker with client names or press quotes
- **Parallax layers** — 3+ depth planes per section
- **Ken Burns backgrounds** — slow zoom/pan on all background imagery

### 3D & visual effects
- **React Three Fiber** hero scene — floating open book with fluttering pages, camera orbits with scroll
- **Post-processing bloom** — makes gold accents glow like they're really lit
- **WebGL image hover effects** — book covers reveal, distort, or transition on hover (curtains.js or ogl)
- **Custom cursor** — small gold dot that grows on interactive elements, disappears on scroll
- **Gooey blob effects** on section transitions (SVG filter)
- **Particle systems** — dust motes in the library, gold flecks around headings

### Typography
- **Kinetic type** — text that morphs, splits, or draws itself
- **Text-on-path** — a headline that curves along an SVG spine
- **Variable font animation** — weight/width shifts on scroll
- **Ligature reveals** — italic swashes animate in after main letters

### Micro-interactions
- **Magnetic buttons** — cursor pulls buttons toward it
- **Hover distortions** on images (WebGL displacement)
- **Number counters** with easing curves
- **Loading state on every button** click
- **Ambient sound** (optional, toggleable) — page-turn on section changes

### Rituals
- **Preloader** — brand mark draws itself in gold SVG stroke while assets warm up (2-3 seconds max, skippable)
- **Chapter markers** at every section (I–VII)
- **Page transitions** — a gold curtain sweeps between pages (Barba.js or Next.js view transitions API)

---

## 5. Asset inventory & where each asset comes from

### Fonts (free)
- **Display serif:** Fraunces (variable), Cormorant Garamond, or Cardinal Fruit (paid, worth it if budget allows)
- **Body sans:** Inter or GT Walsheim (paid)
- **Utility mono** (for numbers): Söhne Mono or Space Mono

### Photography & background imagery

You need approximately:
- 8-12 atmospheric library/study/print-shop scenes for section backgrounds
- 4-6 elegant "hands with book" or "paper detail" shots for section accents
- 20-30 book covers (from real portfolio if possible; else AI-generated)

**Best AI image tools for this aesthetic** (ranked by quality for our use):
1. **Midjourney v7** — best for atmospheric, cinematic imagery
2. **Flux.1 Pro** — sharpest text rendering (for book cover mockups), great cinematic look
3. **Ideogram 2.0** — great when text needs to be readable
4. **DALL-E 3 (via ChatGPT)** — solid all-rounder

**Sample Midjourney prompts** for our aesthetic:

```
A dimly lit private library at dusk, floor-to-ceiling leather-bound books,
warm amber pendant lighting, ornate persian rug, mahogany reading desk with
scattered manuscripts and a brass magnifying glass, atmospheric haze,
volumetric light, shallow depth of field, cinematic composition,
photographed on Hasselblad H6D, --ar 16:9 --style raw --stylize 250
```

```
A single open leather-bound book on dark walnut table, gold foil edges,
handwritten manuscript pages, quill pen, single candle, moody chiaroscuro
lighting, rembrandt style, close-up macro detail, photorealistic,
shot on Phase One IQ4, --ar 3:2 --style raw
```

```
A stone spiral staircase in an ancient monastery library, ornate iron
banister, warm sunlight streaming through arched windows illuminating
suspended dust motes, endless shelves of ancient tomes disappearing
into darkness above, wide angle, cinematic, --ar 21:9 --style raw --stylize 300
```

**Curated stock alternative:** Unsplash and Pexels have thousands of dark library photos, but the good ones are overused. Adobe Stock and Getty are pricier but exclusive. Budget ~$500-1000 for a mix.

### The intro video

Booksacademy's intro is a 5-second logo reveal — gold R animating out of a book on textured black. To match/exceed:

**Approach 1 (recommended): SVG/Lottie animation, not video.**
- Draws the Bookture "B" in gold stroke over 1.2 seconds
- Book opens beneath it with pages fluttering
- Total: 2 seconds, auto-skips
- File size: ~30KB (a video would be 500KB-2MB)
- Sharp at any resolution
- Created in After Effects, exported via Bodymovin → Lottie JSON

**Approach 2: AI-generated video.**
If you want a full atmospheric cinematic intro (say, camera flying through a library, landing on a book that opens):

Best tools right now:
1. **Runway Gen-4** ($15-30/mo, ~10 seconds per generation) — best quality, most control
2. **Kling AI 2.0** (from Chinese studio Kuaishou, ~$10-20/mo) — excellent motion, cinematic
3. **Google Veo 3** (via Gemini) — very high quality, longer clips
4. **Pika 2.0** — good for stylized/animated
5. **Luma Dream Machine** — good motion, cheap
6. **Sora (OpenAI)** — top-tier when accessible

**Sample prompts** for the intro video:

```
Camera slowly flying forward through an ancient candlelit library, past
towering shelves of leather books, dust motes drifting in warm amber light,
arriving at an ornate reading desk where a golden book opens on its own,
pages turning gently, letter "B" glowing in gold foil emerging from the page,
cinematic, moody, 4K, shot on Arri Alexa, 24fps, atmospheric fog
```

```
Extreme close-up of a leather-bound book cover with gold foil title,
in dark shadow, a warm light slowly emerges from the pages as it opens
autonomously, revealing a golden ornamental letter B, cinematic macro
photography, shallow depth of field, particles floating, gold sparkles
```

**Recommendation:** Combine both. Use a Lottie SVG for the actual brand reveal (crisp, controllable), and use AI video for atmospheric b-roll clips embedded in later sections (video hero background, print-shop montage, etc.).

### 3D assets (optional but powerful)
- **Meshy AI** or **Tripo AI** — text-to-3D model. Generate a detailed leather book model to use in the Three.js hero.
- **Sketchfab** — download existing high-quality book/library models (many free, many paid ~$10-50).
- Custom Blender work if you want signature 3D — hire on Fiverr/Upwork for ~$200-500 for a hero book model.

### Icons
- **Phosphor Icons** or **Lucide** — free, thin-line, gold-tintable
- Or custom SVG set (~2-4 hours in Figma)

### Copy
- Write it yourself with AI assist (Claude/GPT-4) using your existing Bookture positioning
- Or hire a copywriter ($1-3k for a full site) — pays off for something this premium
- Avoid: generic marketing hyperbole. Booksacademy suffers from this ("Empowering writers. Enriching readers." says nothing).

### Book covers for portfolio
- If Bookture has real published books: request cover files from the design team
- If placeholder: AI-generate faux covers with Midjourney + text overlay in Figma
- Sample prompt: `An elegant literary book cover, minimalist typography, single symbolic illustration, jacket design in muted colors, mockup on wooden shelf, photograph, --ar 2:3`

---

## 6. Section-by-section wow moments

### Section 0 — Preloader (2 seconds)
Gold SVG "B" draws itself stroke-by-stroke over textured black. Fades to hero. Skippable via keydown.

### Section 1 — Hero
- **Background:** AI-generated atmospheric library video, subtle Ken Burns pan, blurred slightly
- **Foreground:** Three.js scene — a single leather book floating in center, slowly rotating, pages occasionally flutter open revealing gold text
- **Type:** Massive serif headline splits word-by-word on load. Italic emphasis word ("legacy" or "extraordinary") glows in gold
- **CTAs:** Two magnetic buttons — "Begin your book" and "See our authors"
- **Ambient:** Gold dust particles drifting
- **Scroll cue:** Vertical line that pulses and fills

### Section 2 — Trust bar
Slim horizontal bar with animated counter numbers. Between each metric, a small ornament (gold divider). Numbers count up when scrolled into view with easing (not linear).

### Section 3 — Manifesto (sticky scroll storytelling)
Left column stays pinned, right column scrolls. As user scrolls, the manifesto text advances through 3-4 lines, while the pinned image on left morphs between different library scenes (crossfade). Like Apple product page technique.

### Section 4 — The Craft (process 01–06)
- Full-bleed dark forest/library background with slow Ken Burns
- 6 cards arranged in a curved SVG path that snakes down the page
- Each card fades in as it comes into view, connected by animated gold line drawing
- Numbers 01–06 in massive serif italic, gold, on hover they translate and rotate slightly
- Cards have subtle 3D tilt on mouse hover (perspective transform)

### Section 5 — Featured works
- Horizontal-scroll marquee of book covers
- Covers have WebGL hover distortion — hover a cover and it ripples/curves
- Click opens a detail modal with parallax layers
- Gold "New" badges on recent releases with subtle pulse

### Section 6 — The Studio (video moment)
- Full-viewport AI-generated video of a print shop / bookbinding process
- Overlay text: "Every book is printed on paper that remembers the ink."
- Sound optional (paper rustling, press machinery, quiet ambient)

### Section 7 — Voices (testimonials)
- 3D card carousel — cards float in perspective, one center-focus with two behind angled
- Swipe or scroll to advance, others slide into place
- Card backgrounds are subtle bokeh library photos
- Author name in italic serif, quote in larger display serif

### Section 8 — Global reach
- Interactive globe (Three.js) with animated arcs from city to city representing book distribution
- Or, if simpler: an animated SVG world map with pulsing dots at distribution hubs
- Sidebar: "47 languages. 92 countries. Every bookshop that still smells like a bookshop."

### Section 9 — Begin your book (CTA)
- Full-bleed cinematic imagery
- Two-step form: (1) email + name, (2) manuscript pitch textarea
- Submit button has extended loading state ("Reaching the editor's desk...")
- Success state: gold ornamental confirmation with next-step guidance

### Section 10 — Footer
- Gold ornamental divider (like a book chapter break)
- Newsletter signup with gold envelope icon animation
- Social links with magnetic hover
- Bottom line in italic serif: "Set in Fraunces & Inter. Printed on paper that remembers the ink."

---

## 7. Development plan (with Claude Code)

Yes — Claude Code is exactly right for this. Claude Code can hold the entire codebase in context, iterate on components, run the dev server, install packages, and handle multi-file refactors. Cursor is a strong alternative.

### Setup
```bash
# 1. Install Claude Code (if not already)
npm install -g @anthropic-ai/claude-code

# 2. Create the project
npx create-next-app@latest bookture-media --typescript --tailwind --app --src-dir --import-alias "@/*"
cd bookture-media

# 3. Install animation libraries
npm install gsap @gsap/react lenis framer-motion three @react-three/fiber @react-three/drei splitting lottie-react

# 4. Start Claude Code
claude
```

### First prompt to Claude Code
Once you're in the project, feed Claude Code a starter prompt like:
```
This is a Next.js 15 project for Bookture Media, a boutique literary publisher.
Read /docs/project-plan.md for full context. Read /docs/design-system.md for
tokens. Start by scaffolding the folder structure: src/components/sections,
src/components/ui, src/lib, src/hooks. Then build the design system components:
Button, Container, Section, ChapterTag, RevealText. Follow the plan strictly.
```

### Recommended build order
1. **Design system** (colors, fonts, base components) — 2 days
2. **Preloader + smooth scroll setup** — 1 day
3. **Hero with Three.js book** — 3 days
4. **Metrics bar + counters** — 0.5 day
5. **Manifesto with sticky scroll** — 2 days
6. **Process section with SVG path animation** — 3 days
7. **Featured works with WebGL hover** — 3 days
8. **Video moment section** — 1 day
9. **Testimonial 3D carousel** — 2 days
10. **Global map/globe** — 3 days
11. **CTA + Footer** — 1 day
12. **Performance pass (lazy loading, image optimization, Lighthouse)** — 2 days
13. **Accessibility + reduced motion + keyboard nav** — 1 day
14. **Cross-browser + mobile QA** — 2 days
15. **Content plug-in (real copy, real images)** — 2 days
16. **Deploy to Vercel + custom domain** — 0.5 day

**Total: ~28 working days** for a single dev with Claude Code. That's ~6 weeks at a normal pace, ~4 weeks aggressive.

### Working with Claude Code effectively
- **One section at a time.** Say "Build the manifesto section following spec 5.3, make it work first, we'll polish next round."
- **Screenshot feedback.** Take screenshots of what Claude Code produces, paste them back, say what's wrong.
- **Ask for options.** "Show me 3 different approaches to the process section's connecting line" — pick one, tell it why.
- **Save the SKILL.md.** Create `/skills/bookture/SKILL.md` with your specific conventions (motion timings, colors, typography rules). Claude Code will read it every session.

---

## 8. Realistic timeline & cost

| Phase | Duration | Cost |
|---|---|---|
| Discovery + design system in Figma | 1 week | $2-5k (or DIY with AI) |
| AI asset generation | Ongoing during build | ~$100-300 in tool subscriptions |
| Development (with Claude Code assist) | 4-6 weeks | Depends on dev rate |
| Stock imagery/fonts licensing | One-time | $500-2000 |
| Custom photography (optional phase 2) | 1 week | $3-15k |
| Bookstore/backend (phase 2) | 3-4 weeks | Depends |

**Minimum viable premium site (marketing only, AI assets, one dev with Claude Code): 5-6 weeks, ~$800-1500 in tool/asset costs, plus dev time.**

---

## 9. Reference sites to study

Study these for specific techniques:

**Publisher / literary:**
- Chronicle Books (chroniclebooks.com) — bookstore done well
- New Directions Publishing (ndbooks.com) — editorial elegance
- Fitzcarraldo Editions (fitzcarraldoeditions.com) — restrained but distinctive

**Cinematic marketing sites (steal these techniques):**
- Studio Kimi (studiokimi.com) — smooth scroll + WebGL
- Igloo Inc. (igloo.inc) — 3D scenes done tastefully
- Locomotive (locomotive.ca) — the smooth scroll originators
- Active Theory (activetheory.net) — Three.js masters
- Basement Studio (basement.studio) — motion language
- Resn (resn.co.nz) — playful WebGL
- Diagram (diagram.com) — clean but rich

**Awards showcases** (spend an evening browsing):
- awwwards.com/websites/
- siteinspire.com
- godly.website
- httpster.net

**Specifically for animation inspiration:**
- osmo.supply — motion principles
- Framer templates (framer.com/templates) — many premium ones

---

## 10. First action items

If you agree with this plan, in order:

1. **Confirm scope** — marketing site only for launch, correct?
2. **Confirm stack** — Next.js recommended, or Laravel-based required?
3. **Decide on brand name/logo** — keep Bookture Media LLC logo or refresh?
4. **Set up Claude Code** on your machine (or Cursor if you prefer)
5. **Sign up for Midjourney + Runway/Kling** — start generating hero imagery now, in parallel
6. **Write the real copy** — no lorem ipsum. Real words shape real design.
7. **Ping me** — I'll help scaffold the project, build the design system, and take the first sections one at a time

---

## Appendix: One-page cheatsheet

**Stack:** Next.js 15 + TS + Tailwind + GSAP + Lenis + R3F + Framer Motion + Lottie
**Design:** Fraunces + Inter, gold-on-black + parchment-on-bronze light mode
**Deploy:** Vercel
**CMS (phase 2):** Sanity or Payload
**AI tools:** Midjourney (images), Runway/Kling (video), Meshy (3D), Claude Code (dev)
**Reference bar:** Every section should read as premium as Basement Studio
**Motion principle:** Nothing is ever fully static. Every interaction has a state transition.
**Type principle:** Serif for meaning, sans for utility. Italic for emotion.
**Restraint principle:** Gold is a spice, not a base.
