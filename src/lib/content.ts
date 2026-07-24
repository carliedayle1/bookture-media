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
  phone: "+1 778 656 0875",
  email: "support@bookturemedia.org",
  address: {
    line1: "Studio 5 — 108 West Cordova Street",
    line2: "Vancouver, BC V6B 1E4",
    country: "Canada",
    // Gastown / downtown Vancouver — centres the contact-page map.
    lat: 49.2827,
    lng: -123.1207,
  },
  nav: [
    { label: "The Craft", href: "#craft" },
    { label: "Works", href: "#works" },
    { label: "Awards", href: "#awards" },
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
  /** One-line hook, used as the modal's italic lead. */
  blurb: string;
  /** Fuller jacket copy shown in the detail modal. */
  synopsis: string;
  /** Path to the cover artwork under /public. */
  cover: string;
  badge?: "New" | "Award" | "Reprint";
};

export const featuredWorks: Work[] = [
  {
    title: "A Grammar of Departures",
    author: "Noor Haddad",
    genre: "Literary fiction",
    year: 2025,
    blurb: "A translator who loves only in borrowed languages must choose which tongue to keep her last memories in.",
    synopsis:
      "Yara can only fall in love in languages that aren't her own — French with a cellist, Portuguese with a cartographer, never Arabic, never home. When early-onset aphasia begins erasing her words one tongue at a time, she must decide which language to keep her final memories in, and which of her selves to lose. A novel about translation as both intimacy and escape.",
    cover: "/images/covers/grammar-of-departures.png",
    badge: "New",
  },
  {
    title: "Tin Sky",
    author: "Gwennan Price",
    genre: "Historical fiction",
    year: 2024,
    blurb: "A girl who paints skies on the ceilings of a sunless mining town is asked to paint the memories of the dead.",
    synopsis:
      "In a 1930s Welsh mining town where men go weeks without daylight, young Carys earns her keep painting skies on the ceilings of their cottages — clouds, larks, weather they'll never see. After a collapse traps a shift underground, the widows ask her for something harder: to paint the last skies the dead might have wanted. A luminous story about grief, labour, and the small mercies of imagination.",
    cover: "/images/covers/tin-sky.png",
    badge: "Award",
  },
  {
    title: "The Undrowned",
    author: "Cai Verhoeven",
    genre: "Speculative fiction",
    year: 2026,
    blurb: "In a drowned city, a memory diver salvages keepsakes from flooded homes — until one job is her own.",
    synopsis:
      "A generation after the sea took Rotterdam-on-Sea, Wren works as a memory diver, retrieving keepsakes from flooded homes for the people who fled. Every descent into the green dark dredges up someone else's past — until a job at her own childhood address forces her to surface what she abandoned there. A haunting, hopeful vision of loss in a warming world.",
    cover: "/images/covers/the-undrowned.png",
    badge: "New",
  },
  {
    title: "Marginalia",
    author: "Eleanor Fitch",
    genre: "Essays",
    year: 2023,
    blurb: "A book conservator reads a lifetime of strangers' margin-notes — and finally her own.",
    synopsis:
      "For thirty years, a rare-book conservator has restored the pages of strangers — and quietly collected the notes they left in the margins: grocery lists, confessions, a phone number, a single word of grief. In fourteen essays she reads other people's marginalia as a map of her own reticence, and asks what it means to write in the borders of a life. Warm, wry, and quietly devastating.",
    cover: "/images/covers/marginalia.png",
  },
  {
    title: "Bruise Season",
    author: "Junie Calloway",
    genre: "Literary fiction",
    year: 2025,
    blurb: "One luminous, violent summer between two sisters, told in reverse — from the funeral back to the first ripe peach.",
    synopsis:
      "Told in reverse — from a funeral back to the first ripe fruit — this is the story of one violent, luminous summer two sisters spend on their grandmother's failing Georgia peach farm. As the narrative unwinds toward innocence, the reader learns what the ending already knows. A debut about heat, sisterhood, and the tenderness hidden inside harm.",
    cover: "/images/covers/bruise-season.png",
  },
  {
    title: "Vespers for the Unbelieving",
    author: "Mattias Holt",
    genre: "Poetry",
    year: 2022,
    blurb: "A year of evening prayers by a man who lost his faith but kept the ritual.",
    synopsis:
      "A year of evening prayers by a man who has lost his faith but not his need for one. These poems move through insomnia, grief, and the small liturgies of ordinary nights — the last light in a window, the ritual of the kettle, the god-shaped quiet after loss. Spare, luminous, and unafraid of the dark.",
    cover: "/images/covers/verspers-for-the-unbelieving.png",
    badge: "Reprint",
  },
  {
    title: "The Glassblower's Confession",
    author: "Rosa Benedetti",
    genre: "Historical mystery",
    year: 2024,
    blurb: "A forbidden Venetian glassblower forges a mirror that reflects secrets, not faces — and one of them is murder.",
    synopsis:
      "On 17th-century Murano, where master glassblowers are forbidden to leave the island on pain of death, Ludovico crafts a mirror that reflects not faces but the secrets of whoever stands before it. When a cardinal's secret surfaces in the glass and the cardinal turns up dead, Ludovico must smuggle both the mirror and himself past the Republic's assassins. A sumptuous, candlelit thriller.",
    cover: "/images/covers/the-glassblowers-confession.png",
    badge: "Award",
  },
  {
    title: "The Weight of Small Birds",
    author: "João Almeida",
    genre: "Short stories",
    year: 2023,
    blurb: "Eleven tenants, one Lisbon building, fifty years — and the single thing each of them couldn't say.",
    synopsis:
      "Eleven linked stories set in a single narrow apartment building in Lisbon across fifty years. In each, one tenant and the one thing they could never bring themselves to say — to a lover, a mother, a stranger on the stairs. Together they form a quiet chorus about the words that hold us up and the ones that would have set us free.",
    cover: "/images/covers/the-weight-of-small-birds.png",
  },
  {
    title: "Aurora Incognita",
    author: "Mira Sølvberg",
    genre: "Science fiction",
    year: 2026,
    blurb: "The last botanist on a starship tends a garden she'll never see grow — beside an AI dreaming in her grandmother's voice.",
    synopsis:
      "Aboard a generation ship four centuries from any shore, Estée is the last living botanist, tending a garden that only her descendants will ever walk. Her sole companion is the ship's failing archival AI — which has begun, inexplicably, to dream in the voice of her grandmother. A meditative novel about inheritance, loneliness, and tending what you'll never see bloom.",
    cover: "/images/covers/aurora-incognita.png",
    badge: "New",
  },
  {
    title: "The Photographer of Empty Rooms",
    author: "Hedda Vance",
    genre: "Literary thriller",
    year: 2025,
    blurb: "The same faint woman haunts the corner of every house a photographer has ever shot. She was never there.",
    synopsis:
      "For ten years, real-estate photographer Ruth has shot pristine, empty houses. When she notices the same faint woman standing in the far corner of every photo — a woman she never saw through the lens — her search leads to a disappearance the town paved over decades ago. A slow-burn thriller about what a house keeps and what it gives away.",
    cover: "/images/covers/the-photographer-of-empty-rooms.png",
  },
  {
    title: "Milk Teeth",
    author: "Ana-Maria Câmpeanu",
    genre: "Gothic",
    year: 2024,
    blurb: "A folklorist returns for a dying lullaby — and learns the song was a warning to keep something asleep.",
    synopsis:
      "A folklorist returns to her grandmother's Carpathian village to record a dying lullaby before its last singer passes. But the villagers only hum it behind closed doors, and always at dusk — because the song was never a lullaby. It was a warning, sung for generations to keep something in the forest asleep. And this year, the singing has grown quiet.",
    cover: "/images/covers/milk-teeth.png",
  },
  {
    title: "How to Winter",
    author: "Saana Korhonen",
    genre: "Nature writing",
    year: 2023,
    blurb: "A naturalist who has lost her hearing spends a year alone in the boreal winter, learning to read the silence.",
    synopsis:
      "After losing her hearing in her forties, naturalist Saana spends a year alone in a cabin at the edge of the Finnish boreal forest, learning to read a silence she can no longer escape. Part field guide to the northern winter, part reckoning with loss, it asks what listening really means once sound is gone. A spare, radiant book about attention as a form of survival.",
    cover: "/images/covers/how-to-winter.png",
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

export type Award = {
  year: string;
  name: string;
  issuer: string;
  detail: string;
  /** Fuller citation shown in the award modal. */
  description: string;
};

export const awardsContent = {
  eyebrow: "Recognition",
  headline: "A publishing house the industry noticed.",
  intro:
    "We publish few books, and we publish them properly. Now and then the wider world agrees — a shelf of honours earned for how we edit, design, and champion independent publishing.",
  items: [
    {
      year: "2026",
      name: "Independent Publisher of the Year",
      issuer: "British Book Awards",
      detail: "For a catalogue built one title at a time.",
      description:
        "The Nibbies' headline publishing honour. Awarded for a year in which our catalogue, editorial standards, and design were judged the strongest of any independent house.",
    },
    {
      year: "2025",
      name: "Small Press of the Year",
      issuer: "The Bookseller",
      detail: "National winner among independent presses.",
      description:
        "The industry's recognition of the best independent presses. We were named national winner for publishing with care and conviction at a scale that lets every title matter.",
    },
    {
      year: "2024",
      name: "Trade Publisher of the Year",
      issuer: "Independent Publishers Guild",
      detail: "Cited for editorial rigour and design.",
      description:
        "The IPG's award for excellence across the whole of publishing — editorial, design, sales, and rights. The judges cited our rigour on the page and the craft of the finished object.",
    },
    {
      year: "2023",
      name: "Independent Voice Award",
      issuer: "London Book Fair",
      detail: "For championing debut literary voices worldwide.",
      description:
        "Part of the International Excellence Awards, this honour recognises publishers who take real risks on new writers. It marked our commitment to debut literary voices from around the world.",
    },
    {
      year: "2021",
      name: "Publisher to Watch",
      issuer: "Publishers Weekly Star Watch",
      detail: "Named among publishing's rising presses.",
      description:
        "Star Watch spotlights the people and presses shaping publishing's future. Being named a press to watch affirmed the path we'd chosen: fewer books, published properly.",
    },
    {
      year: "2020",
      name: "Best New Independent Press",
      issuer: "Foreword INDIES",
      detail: "Recognising a first list of rare care.",
      description:
        "Foreword's recognition of the year's most promising new independent publisher. It arrived with our very first list — a debut season we'd laboured over, and one readers noticed too.",
    },
  ] satisfies Award[],
} as const;

export const contactContent = {
  eyebrow: "Contact",
  headline: "Come find us in Vancouver.",
  intro:
    "Whether you're an author with a manuscript, a bookseller, or a reader with a question — we'd love to hear from you. Send a note and a real person will write back.",
  hoursLabel: "Studio hours",
  hours: "Monday–Friday · 9am–5pm PT",
  formNote: "We reply within a few working days — from a name, not a noreply.",
  success: {
    title: "Your message is on its way.",
    body: "Thank you for writing. We read everything ourselves and reply within a few working days.",
  },
} as const;

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

export type ServiceStep = { step: string; detail: string };
export type Service = {
  title: string;
  body: string;
  /** Fuller framing shown at the top of the service modal. */
  description: string;
  /** How the work unfolds — rendered as a numbered process in the modal. */
  process: ServiceStep[];
};

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
      description:
        "A book earns its readers one considered introduction at a time. We build a campaign around what makes your title singular, then place it in front of the critics, booksellers, and readers most likely to carry it forward.",
      process: [
        { step: "Positioning", detail: "We read the book and define its angle — the story behind the story that press will want to tell." },
        { step: "Outreach", detail: "We pitch the outlets, critics, and podcasts that genuinely cover your genre — never a blast list." },
        { step: "Placement", detail: "Reviews, features, and interviews, timed to build toward launch week." },
        { step: "Amplify", detail: "We carry the best coverage across social and the author's channels so it keeps working." },
      ],
    },
    {
      title: "Award Submissions",
      body: "We track the prizes worth entering, prepare the submissions, and meet every deadline so your book is in the running.",
      description:
        "Prizes open doors — but only if the right ones are entered on time and presented properly. We handle the calendar, the paperwork, and the case for your book.",
      process: [
        { step: "Shortlist the prizes", detail: "We match your title to the awards it can genuinely win — by genre, form, and eligibility." },
        { step: "Prepare the case", detail: "Submission copies, citations, and supporting materials, assembled to each jury's brief." },
        { step: "Meet every deadline", detail: "We track windows across the year so nothing worth entering is missed." },
        { step: "Follow through", detail: "Longlist and shortlist news becomes its own press moment." },
      ],
    },
    {
      title: "Book Launch Events",
      body: "From an intimate reading room evening to a festival stage — we plan, host, and produce launches that feel like occasions.",
      description:
        "A launch should feel like an occasion, not an obligation. We design and produce events that honour the book and give readers a reason to gather.",
      process: [
        { step: "Concept", detail: "We shape the evening around the book — venue, format, and tone." },
        { step: "Production", detail: "Booking, staging, readings, and run-of-show, handled end to end." },
        { step: "Guests", detail: "Invitations to the booksellers, press, and readers who matter to the title." },
        { step: "Afterlife", detail: "Photography and recordings that keep the night working long after." },
      ],
    },
    {
      title: "Author Website Development",
      body: "A considered home for your work: fast, beautiful, and yours — with a bookshop, a mailing list, and room to grow.",
      description:
        "A considered home for your work — fast, beautiful, and entirely yours. Built to sell books, grow a readership, and last.",
      process: [
        { step: "Design", detail: "A site shaped to your voice and your catalogue, not a template." },
        { step: "Build", detail: "Fast, accessible, and easy to update — with a bookshop and mailing list built in." },
        { step: "Launch", detail: "Domains, analytics, and search set up so readers can find you." },
        { step: "Grow", detail: "Room to add titles, events, and journal entries as your body of work expands." },
      ],
    },
    {
      title: "Rights & Translation",
      body: "We represent your book to foreign publishers and negotiate translation deals, extending its reach into new languages.",
      description:
        "Your book can live in more than one language. We represent it to publishers abroad and negotiate the deals that carry it into new markets.",
      process: [
        { step: "Catalogue", detail: "We prepare rights materials — sample translations, synopses, and a sales sheet." },
        { step: "Represent", detail: "We pitch your title at the international fairs and to editors we know." },
        { step: "Negotiate", detail: "Advance, territory, and terms, handled with your interests first." },
        { step: "Steward", detail: "We track each edition through to publication and royalties." },
      ],
    },
    {
      title: "Audiobook Production",
      body: "Casting, direction, and studio production for an audiobook edition that honours the voice on the page.",
      description:
        "The right voice can make a book new again. We cast, direct, and produce an audiobook edition that honours the voice on the page.",
      process: [
        { step: "Casting", detail: "We audition narrators until we find the voice the book was waiting for." },
        { step: "Direction", detail: "Studio sessions guided so pace, tone, and character stay true." },
        { step: "Production", detail: "Editing, mastering, and quality control to broadcast standard." },
        { step: "Distribution", detail: "Delivered to Audible, Libro.fm, and libraries worldwide." },
      ],
    },
  ],
};

export const footerContent = {
  columns: [
    {
      heading: "Publishing",
      links: [
        { label: "Submit a manuscript", href: "/#begin" },
        { label: "Our process", href: "/#craft" },
        { label: "Services", href: "/#services" },
        { label: "Contact", href: "/contact" },
      ] satisfies NavLink[],
    },
    {
      heading: "The House",
      links: [
        { label: "Featured works", href: "/#works" },
        { label: "Awards", href: "/#awards" },
        { label: "The studio", href: "/#studio" },
        { label: "Author voices", href: "/#voices" },
      ] satisfies NavLink[],
    },
    {
      heading: "Legal",
      links: [
        { label: "Terms & conditions", href: "/terms" },
        { label: "Refund policy", href: "/refund-policy" },
        { label: "Privacy policy", href: "/privacy" },
        { label: "FAQ", href: "/faq" },
      ] satisfies NavLink[],
    },
  ],
  colophon: "Set in Fraunces & Inter. Printed on paper that remembers the ink.",
} as const;
