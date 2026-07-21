/**
 * All site copy and structured content, typed. Sections receive this as props
 * from the server page, so text ships in the server-rendered HTML (good for
 * SEO). A future CMS (Sanity) swap would replace only this module.
 *
 * Copy is intentionally editorial and specific — no marketing filler. Refine
 * wording freely; the shapes are what the components depend on.
 */

export type NavLink = { label: string; href: string };
export type SocialLink = { label: string; href: string; handle: string };

export const siteConfig = {
  name: "Bookture Media",
  legalName: "Bookture Media LLC",
  tagline: "Empowering Stories for Future Generations",
  nav: [
    { label: "The Craft", href: "#craft" },
    { label: "Works", href: "#works" },
    { label: "Voices", href: "#voices" },
    { label: "Services", href: "#services" },
  ] satisfies NavLink[],
  socials: [
    { label: "Instagram", href: "https://instagram.com", handle: "@bookturemedia" },
    { label: "X", href: "https://x.com", handle: "@bookture" },
    { label: "LinkedIn", href: "https://linkedin.com", handle: "Bookture Media" },
  ] satisfies SocialLink[],
} as const;

export type HeroContent = {
  eyebrow: string;
  /** Headline split into runs; `emphasis` runs render in gold italic. */
  headline: { text: string; emphasis?: boolean }[];
  lede: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  /** Optional looping background video (muted). Empty = procedural backdrop. */
  backgroundVideo?: string;
};

export const heroContent: HeroContent = {
  eyebrow: "Independent literary publishing since 1994",
  // SWAP POINT: drop a looping hero clip here, e.g. "/video/hero-loop.mp4".
  backgroundVideo: "",
  headline: [
    { text: "We turn manuscripts into a " },
    { text: "legacy", emphasis: true },
    { text: " worth keeping." },
  ],
  lede: "Bookture Media is a boutique publishing house for writers who refuse to be forgettable. We edit with rigour, design with intent, and print books made to outlast the shelf they sit on.",
  primaryCta: { label: "Begin your book", href: "#begin" },
  secondaryCta: { label: "See our authors", href: "#works" },
};

export type Metric = { value: number; suffix?: string; label: string; format?: "plain" | "comma" };

export const trustMetrics: Metric[] = [
  { value: 240, suffix: "+", label: "Titles brought to the shelf" },
  { value: 31, label: "Years publishing independently" },
  { value: 19, label: "Literary honours earned" },
  { value: 12, label: "Editors, designers & typesetters" },
];

export type ManifestoContent = {
  chapter: { numeral: string; label: string };
  lead: string;
  /** Sequential lines revealed as the section is scrubbed. */
  movements: string[];
  /** Procedural background scenes crossfaded behind the pinned column. */
  scenes: { id: string; caption: string }[];
};

export const manifestoContent: ManifestoContent = {
  chapter: { numeral: "I", label: "The Belief" },
  lead: "A book is the slowest, most stubborn form of memory we have.",
  movements: [
    "We believe a story is not finished when it is written — only when it is made to last.",
    "We believe the reader deserves an object as considered as the words inside it.",
    "We believe a small house, kept honest, can outbuild a large one.",
    "So we publish fewer books, and we publish them properly.",
  ],
  scenes: [
    { id: "library", caption: "The reading room at dusk" },
    { id: "desk", caption: "An editor's desk, mid-manuscript" },
    { id: "press", caption: "The press, still warm" },
  ],
};

export type ProcessStep = { numeral: string; title: string; body: string };

export const processSteps: ProcessStep[] = [
  {
    numeral: "01",
    title: "The Reading",
    body: "Every manuscript is read in full by a human editor before a word of feedback is written. No form letters, no algorithms — a considered response within four weeks.",
  },
  {
    numeral: "02",
    title: "The Shape",
    body: "We work the structure with you: what the book is about, what it is trying to become, and the shortest honest path between the two.",
  },
  {
    numeral: "03",
    title: "The Line",
    body: "Sentence by sentence. A dedicated editor stays with your book from first pass to final proof — the same eyes, all the way through.",
  },
  {
    numeral: "04",
    title: "The Object",
    body: "Typeface, paper, binding, jacket. Our designers treat the physical book as part of the writing, not a wrapper for it.",
  },
  {
    numeral: "05",
    title: "The Press",
    body: "Printed with binderies we have used for decades, on paper chosen to age well. We proof on press so the first copy is the right copy.",
  },
  {
    numeral: "06",
    title: "The Reach",
    body: "Into bookshops, libraries, and translation. We place books where readers who will love them can actually find them.",
  },
];

export type Work = {
  title: string;
  author: string;
  genre: string;
  year: number;
  blurb: string;
  badge?: "New" | "Award" | "Reprint";
};

export const featuredWorks: Work[] = [
  {
    title: "The Salt Almanac",
    author: "Marisa Okonkwo",
    genre: "Literary fiction",
    year: 2025,
    blurb: "A coastal town keeps a ledger of everyone it has lost to the sea — until the ledger starts writing back.",
    badge: "New",
  },
  {
    title: "Cartography of Small Rooms",
    author: "Aleksander Vidal",
    genre: "Essays",
    year: 2024,
    blurb: "Fourteen essays on the interiors we carry — the kitchen, the waiting room, the space behind the eyes.",
    badge: "Award",
  },
  {
    title: "What the Orchard Knew",
    author: "Priya Ramanathan",
    genre: "Historical fiction",
    year: 2024,
    blurb: "Three generations of women, one failing orchard, and a secret pressed flat between the pages of a family Bible.",
  },
  {
    title: "Nightjar",
    author: "Tomás Beckett",
    genre: "Poetry",
    year: 2023,
    blurb: "Poems written at the hour when the birds go quiet and the mind does not.",
    badge: "Reprint",
  },
  {
    title: "The Inheritance of Weather",
    author: "Lena Fjord",
    genre: "Literary fiction",
    year: 2023,
    blurb: "A meteorologist inherits her grandmother's diaries and discovers the storms were never really about the storms.",
  },
  {
    title: "Rows of Kept Things",
    author: "Daniel Osei",
    genre: "Short stories",
    year: 2022,
    blurb: "Nine stories about the objects people refuse to throw away, and what those objects refuse to forget.",
    badge: "Award",
  },
];

export type StudioContent = {
  chapter: { numeral: string; label: string };
  overlay: string;
  subline: string;
  videoSrc: string;
  poster: string;
};

export const studioContent: StudioContent = {
  chapter: { numeral: "IV", label: "The Studio" },
  overlay: "Every book is printed on paper that remembers the ink.",
  subline: "Inside the bindery, where the last decisions are made by hand.",
  videoSrc: "/video/intro.mp4",
  poster: "/brand/studio-poster.svg",
};

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "They read my book more closely than I had. What came back wasn't a critique — it was a map out of the mess I'd made.",
    name: "Marisa Okonkwo",
    role: "Author, The Salt Almanac",
  },
  {
    quote:
      "I have published with the big houses. Nowhere else has the physical book been treated as seriously as the sentence.",
    name: "Aleksander Vidal",
    role: "Author, Cartography of Small Rooms",
  },
  {
    quote:
      "The same editor stayed with me for two years. By the end she could hear when a line was lying. That is rare, and it is everything.",
    name: "Priya Ramanathan",
    role: "Author, What the Orchard Knew",
  },
  {
    quote:
      "A small house that behaves like a patient one. They waited for the book to be right instead of rushing it to be out.",
    name: "Lena Fjord",
    role: "Author, The Inheritance of Weather",
  },
];

export type ReachHub = { city: string; country: string; lat: number; lng: number };

export type ReachContent = {
  chapter: { numeral: string; label: string };
  headline: string;
  stat: string;
  copy: string;
  hubs: ReachHub[];
  /** Optional equirectangular Earth day map for a photoreal globe. Empty =
   *  stylized glowing planet. SWAP POINT: e.g. "/textures/earth-day.jpg". */
  earthTexture?: string;
  /** Optional equirectangular clouds map (grayscale/alpha) for a cloud layer. */
  cloudsTexture?: string;
};

export const reachContent: ReachContent = {
  chapter: { numeral: "VIII", label: "The Reach" },
  earthTexture: "/textures/earth-day.jpg",
  cloudsTexture: "/textures/earth-clouds.png",
  headline: "Every bookshop that still smells like a bookshop.",
  stat: "47 languages · 92 countries",
  copy: "From a single reading room, our titles travel into translation and onto shelves across the world. We ship to the independents first — the shops that hand-sell, the libraries that keep books in circulation for decades.",
  hubs: [
    { city: "New York", country: "USA", lat: 40.71, lng: -74.0 },
    { city: "London", country: "UK", lat: 51.5, lng: -0.12 },
    { city: "Lagos", country: "Nigeria", lat: 6.52, lng: 3.38 },
    { city: "Mumbai", country: "India", lat: 19.08, lng: 72.88 },
    { city: "Tokyo", country: "Japan", lat: 35.68, lng: 139.69 },
    { city: "Buenos Aires", country: "Argentina", lat: -34.6, lng: -58.38 },
    { city: "Stockholm", country: "Sweden", lat: 59.33, lng: 18.06 },
    { city: "Cape Town", country: "South Africa", lat: -33.92, lng: 18.42 },
  ],
};

export type CtaContent = {
  chapter: { numeral: string; label: string };
  headline: { text: string; emphasis?: boolean }[];
  intro: string;
  loadingLabel: string;
  success: { title: string; body: string };
};

export const ctaContent: CtaContent = {
  chapter: { numeral: "IX", label: "Begin" },
  headline: [{ text: "Send us the first " }, { text: "fifty pages", emphasis: true }, { text: "." }],
  intro: "We read every submission ourselves. Tell us who you are and what you're writing — you'll hear back from a real editor, not an auto-reply.",
  loadingLabel: "Reaching the editor's desk…",
  success: {
    title: "It's on the editor's desk.",
    body: "Thank you. We read in the order received and reply within four weeks — often sooner. Watch for a note from a name, not a noreply.",
  },
};

/** Short press accolades for the infinite marquee ticker. */
export const pressQuotes: { quote: string; source: string }[] = [
  { quote: "A house that still believes in the book as an object", source: "The Paris Review" },
  { quote: "Small, exacting, and quietly essential", source: "The Times Literary Supplement" },
  { quote: "They publish as if every title were the last", source: "Granta" },
  { quote: "The rare press where the paper matters as much as the prose", source: "Lit Hub" },
  { quote: "Patient publishing, beautifully made", source: "The Bookseller" },
];

/** Ordered chapter markers for the fixed progress spine (matches page order). */
export const chapters: { numeral: string; id: string; label: string }[] = [
  { numeral: "I", id: "belief", label: "The Belief" },
  { numeral: "II", id: "craft", label: "The Craft" },
  { numeral: "III", id: "works", label: "Featured Works" },
  { numeral: "IV", id: "studio", label: "The Studio" },
  { numeral: "V", id: "voices", label: "Voices" },
  { numeral: "VI", id: "spotlight", label: "Author Spotlight" },
  { numeral: "VII", id: "services", label: "What We Offer" },
  { numeral: "VIII", id: "reach", label: "The Reach" },
  { numeral: "IX", id: "begin", label: "Begin" },
];

export type AuthorSpotlightContent = {
  chapter: { numeral: string; label: string };
  eyebrow: string;
  name: string;
  title: string;
  bio: string;
  pullQuote: string;
  /** Optional interview clip (muted loop / poster). Empty = placeholder frame. */
  videoSrc: string;
};

export const authorSpotlightContent: AuthorSpotlightContent = {
  chapter: { numeral: "VI", label: "Author Spotlight" },
  eyebrow: "In conversation",
  name: "Marisa Okonkwo",
  title: "Author of The Salt Almanac",
  bio: "Marisa spent nine years and three abandoned drafts on the book that would become The Salt Almanac. We sat with her in the reading room to talk about the sea, memory, and the ledger that started writing back.",
  pullQuote: "They didn't publish my book. They helped me finish it, then made it beautiful.",
  // SWAP POINT: drop an interview clip here, e.g. "/video/spotlight.mp4".
  videoSrc: "",
};

export type Service = { title: string; body: string };

export type ServicesContent = {
  chapter: { numeral: string; label: string };
  headline: string;
  intro: string;
  items: Service[];
};

export const servicesContent: ServicesContent = {
  chapter: { numeral: "VII", label: "What We Offer" },
  headline: "More than a printer. A partner for the whole life of the book.",
  intro: "Publishing a book is the beginning. Getting it read is the work. Beyond editing and printing, we run the campaigns, the submissions, and the events that carry a title into the world.",
  items: [
    {
      title: "Media Campaigns",
      body: "Press outreach, review placement, and social strategy built around each title — pitched to the outlets that actually cover your genre.",
    },
    {
      title: "Award Submissions",
      body: "We track the prizes worth entering, prepare the submissions, and meet every deadline so your book is in the running.",
    },
    {
      title: "Book Launch Events",
      body: "From an intimate reading room evening to a festival stage — we plan, host, and produce launches that feel like occasions.",
    },
    {
      title: "Author Website Development",
      body: "A considered home for your work: fast, beautiful, and yours — with a bookshop, a mailing list, and room to grow.",
    },
    {
      title: "Rights & Translation",
      body: "We represent your book to foreign publishers and negotiate translation deals, extending its reach into new languages.",
    },
    {
      title: "Audiobook Production",
      body: "Casting, direction, and studio production for an audiobook edition that honours the voice on the page.",
    },
  ],
};

export const footerContent = {
  columns: [
    {
      heading: "Publishing",
      links: [
        { label: "Submit a manuscript", href: "#begin" },
        { label: "Our process", href: "#craft" },
        { label: "Rights & translation", href: "#reach" },
      ] satisfies NavLink[],
    },
    {
      heading: "The House",
      links: [
        { label: "Featured works", href: "#works" },
        { label: "The studio", href: "#studio" },
        { label: "Author voices", href: "#voices" },
      ] satisfies NavLink[],
    },
  ],
  colophon: "Set in Fraunces & Inter. Printed on paper that remembers the ink.",
} as const;
