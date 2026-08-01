export const SITE_CONFIG = {
  name: "Rofiozag Chat",
  tagline: "The Next-Gen Messaging Infrastructure for Creators & Communities",
  description: "Unifying real-time messaging, native AI automation, creator channels, social crossposting, and monetization into one ultra-fast, encrypted platform.",
  waitlistGoal: 20000,
  currentWaitlistCount: 14892,
  version: "v2.4-beta",
  socials: {
    twitter: "https://x.com/rofiozagchat",
    telegram: "https://t.me/rofiozagchat",
    discord: "https://discord.gg/rofiozag",
    github: "https://github.com/rofiozag-chat",
    youtube: "https://youtube.com/@rofiozagchat"
  }
};

export const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "Live Demo", href: "#demo" },
  { name: "Integrations", href: "#integrations" },
  { name: "Stats", href: "#stats" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" }
];

export const HERO_STATS = [
  { value: "< 10ms", label: "Global Sync Latency" },
  { value: "100%", label: "Zero-Knowledge Encryption" },
  { value: "10+", label: "Social Networks Sync" },
  { value: "$0 Fee", label: "Early Creator Revenue Tier" }
];

export const TRUST_LOGOS = [
  { name: "TechCrunch", label: "TECHCRUNCH" },
  { name: "ProductHunt", label: "PRODUCT HUNT #1" },
  { name: "Wired", label: "WIRED" },
  { name: "Forbes", label: "FORBES 30U30" },
  { name: "The Verge", label: "THE VERGE" },
  { name: "Bloomberg", label: "BLOOMBERG" }
];

export const FEATURES = [
  {
    id: "realtime",
    icon: "Zap",
    title: "Sub-Millisecond Real-Time Core",
    subtitle: "Built on Rust & WebSockets",
    description: "Experience ultra-fast message delivery worldwide with edge state replication and sub-10ms packet delivery across 240+ CDN points.",
    badge: "Ultra Fast",
    highlightColor: "from-blue-500/20 via-cyan-500/10 to-transparent",
    borderColor: "group-hover:border-blue-500/50",
    metrics: "99.999% Uptime guarantee"
  },
  {
    id: "ai-copilot",
    icon: "Bot",
    title: "Native AI Assistant & Copilot",
    subtitle: "GPT-4o & Claude 3.5 Sonnet Powered",
    description: "Draft viral content, auto-translate 50+ languages in real time, generate voice-to-text summaries, and handle community FAQs effortlessly.",
    badge: "AI Powered",
    highlightColor: "from-purple-500/20 via-indigo-500/10 to-transparent",
    borderColor: "group-hover:border-purple-500/50",
    metrics: "Instant 50+ Language Neural Translation"
  },
  {
    id: "monetization",
    icon: "DollarSign",
    title: "Creator Economy Engine",
    subtitle: "Subscriptions, Tips & Paid Drops",
    description: "Monetize your audience with tier-gated channels, paywalled message attachments, instant tipping, and automated subscriber management.",
    badge: "0% Fee Tier",
    highlightColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderColor: "group-hover:border-emerald-500/50",
    metrics: "$12M+ paid to creators in early alpha"
  },
  {
    id: "crossposting",
    icon: "Share2",
    title: "Omnichannel Social Sync",
    subtitle: "One Click Multi-Network Broadcast",
    description: "Broadcast your chat announcements, stories, and channel posts directly to X, Instagram, TikTok, Telegram, and YouTube simultaneously.",
    badge: "Viral Scale",
    highlightColor: "from-amber-500/20 via-orange-500/10 to-transparent",
    borderColor: "group-hover:border-amber-500/50",
    metrics: "Connects 12+ Social Platforms"
  },
  {
    id: "stories-audio",
    icon: "Radio",
    title: "Ephemeral Stories & Spatial Audio",
    subtitle: "HD Audio Rooms & Interactive Drops",
    description: "Host live voice spaces for up to 50,000 listeners, drop time-limited broadcast stories, and run live interactive polls in high fidelity.",
    badge: "HD Spatial",
    highlightColor: "from-rose-500/20 via-pink-500/10 to-transparent",
    borderColor: "group-hover:border-rose-500/50",
    metrics: "Crystal-clear Opus 320kbps audio"
  },
  {
    id: "security",
    icon: "ShieldCheck",
    title: "Zero-Knowledge E2E Security",
    subtitle: "Post-Quantum Cryptography",
    description: "Your messages, voice notes, and media stay 100% private. End-to-end encryption with double ratchet protocol and SOC2 Type II compliance.",
    badge: "Encrypted",
    highlightColor: "from-blue-600/20 via-violet-600/10 to-transparent",
    borderColor: "group-hover:border-blue-400/50",
    metrics: "Audited by Top Security Firms"
  }
];

export const DEMO_PRESETS = [
  {
    id: "ai",
    label: "🤖 AI Copilot",
    title: "AI Co-Pilot & Automation",
    subtitle: "Smart reply generation, instant summary & auto-translation",
    messages: [
      { sender: "Elena (Creator)", role: "creator", text: "Hey team, can someone summarize our Q3 community roadmap?", time: "10:14 AM" },
      { sender: "Rofiozag AI", role: "ai", text: "⚡ **Q3 Roadmap Summary**:\n1. Monetized voice channels\n2. Native Instagram Crossposting\n3. Sub-10ms latency upgrade", time: "10:14 AM", badge: "AI Generated in 0.2s" },
      { sender: "Marcus (Subscriber)", role: "user", text: "Translating to Spanish: ¡Increíble trabajo equipo!", time: "10:15 AM", status: "translated" }
    ]
  },
  {
    id: "monetize",
    label: "💎 Creator Paywall",
    title: "Monetized Channel & Tips",
    subtitle: "Instant creator subscriptions, paywalled media & tipping",
    messages: [
      { sender: "Rofiozag VIP Channel", role: "creator", text: "🔒 Exclusive Audio Masterclass: 'Scaling to $100k/mo as a Solo Creator'", time: "11:00 AM", isPaywall: true, price: "$4.99" },
      { sender: "System", role: "system", text: "🎉 David unlocked the media drop & tipped $25.00!", time: "11:02 AM" },
      { sender: "David K.", role: "user", text: "This voice note was worth 10x the price! Thank you Elena!", time: "11:03 AM" }
    ]
  },
  {
    id: "crosspost",
    label: "🚀 Social Sync",
    title: "Omnichannel Crossposting",
    subtitle: "Post once in Rofiozag, publish everywhere automatically",
    messages: [
      { sender: "Alex Vance", role: "creator", text: "🚀 Rofiozag Chat v2.4 Beta is officially live! Join our community now.", time: "12:00 PM" },
      { sender: "Rofiozag Sync Engine", role: "system", text: "✅ Auto-synced to X/Twitter, Instagram Reels, Telegram Channel & Discord Server", time: "12:00 PM", status: "synced" }
    ]
  }
];

export const INTEGRATIONS = [
  { name: "OpenAI", category: "AI & Models", icon: "Bot", color: "from-emerald-500/20 to-teal-500/10", tag: "GPT-4o Native" },
  { name: "Claude AI", category: "AI & Models", icon: "Sparkles", color: "from-purple-500/20 to-indigo-500/10", tag: "Sonnet 3.5" },
  { name: "Instagram", category: "Social Networks", icon: "Instagram", color: "from-pink-500/20 to-purple-500/10", tag: "Reels & Stories" },
  { name: "Telegram", category: "Messaging", icon: "Send", color: "from-blue-500/20 to-cyan-500/10", tag: "Bot API Sync" },
  { name: "TikTok", category: "Social Networks", icon: "Video", color: "from-slate-700/40 to-slate-900/40", tag: "Direct Upload" },
  { name: "YouTube", category: "Social Networks", icon: "Youtube", color: "from-red-500/20 to-rose-500/10", tag: "Community Posts" },
  { name: "X / Twitter", category: "Social Networks", icon: "Twitter", color: "from-sky-500/20 to-blue-500/10", tag: "Thread Publisher" },
  { name: "Supabase", category: "Backend & DB", icon: "Database", color: "from-emerald-600/20 to-green-500/10", tag: "Realtime Engine" },
  { name: "Stripe", category: "Payments", icon: "CreditCard", color: "from-indigo-500/20 to-blue-500/10", tag: "Instant Payouts" },
  { name: "Notion", category: "Productivity", icon: "FileText", color: "from-slate-500/20 to-slate-700/10", tag: "Docs Sync" },
  { name: "Zapier", category: "Automation", icon: "Workflow", color: "from-amber-500/20 to-orange-500/10", tag: "6,000+ Apps" },
  { name: "WhatsApp", category: "Messaging", icon: "MessageSquare", color: "from-green-500/20 to-emerald-500/10", tag: "Business API" }
];

export const METRICS = [
  { value: 50, suffix: "M+", label: "Messages Synced Daily", desc: "Delivered in sub-10ms latency worldwide" },
  { value: 120, suffix: "K+", label: "Active Creators", desc: "Monetizing their core digital audience" },
  { value: 15, suffix: "K+", label: "Exclusive Communities", desc: "Private paid & public channels" },
  { value: 140, suffix: "+", label: "Countries Supported", desc: "Global edge CDN distribution" }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Tech Creator & Founder",
    handle: "@arivera_tech",
    subscribers: "450K Followers",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: "Rofiozag Chat completely eliminated my need for 4 separate apps. I run my private VIP group, broadcast live stories, collect subscriptions, and crosspost to X and Instagram all from one place.",
    rating: 5,
    metrics: "$32k/mo recurring revenue"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Community Director at Horizon DAO",
    handle: "@sarah_dao",
    subscribers: "85K Members",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    quote: "The sub-10ms real-time latency and native AI auto-moderation cut our community management workload in half. Rofiozag feels like Discord, Telegram, and Substack merged into one masterpiece.",
    rating: 5,
    metrics: "99.8% member retention"
  },
  {
    id: 3,
    name: "Marcus Vance",
    role: "Digital Entrepreneur & Coach",
    handle: "@vance_growth",
    subscribers: "120K Students",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote: "I launched my paid audio masterclass channel on Rofiozag and generated $18,000 in less than 48 hours. The zero-knowledge security and instant Stripe payouts are unmatched.",
    rating: 5,
    metrics: "$18,000 in 48h launch"
  }
];

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter Creator",
    badge: "Free Forever",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Ideal for emerging creators and individual community builders.",
    features: [
      "Up to 2,500 active channel members",
      "Sub-10ms Real-Time Chat Engine",
      "50 AI Copilot prompt tokens/day",
      "Basic Social Crossposting (2 platforms)",
      "End-to-End Encryption",
      "Standard 5% platform fee on monetization"
    ],
    ctaText: "Join Free Waitlist",
    isPopular: false
  },
  {
    id: "pro",
    name: "Pro Creator",
    badge: "Most Popular",
    priceMonthly: 19,
    priceYearly: 15,
    description: "Designed for growing creators and monetization-focused communities.",
    features: [
      "Up to 50,000 active members",
      "Unlimited AI Copilot & Neural Translation",
      "Omnichannel Crossposting (All 10+ platforms)",
      "Paid Channels, Paywalls & Tipping (0% fee tier)",
      "Ephemeral HD Voice & Video Rooms",
      "Custom Branded Community Link",
      "Priority 24/7 Creator Support"
    ],
    ctaText: "Get Pro Access",
    isPopular: true
  },
  {
    id: "business",
    name: "Business & Scale",
    badge: "For Organizations",
    priceMonthly: 49,
    priceYearly: 39,
    description: "Enterprise features for scaling businesses, DAOs, and media networks.",
    features: [
      "Unlimited Members & Channels",
      "Custom Domain Support (chat.yourbrand.com)",
      "Automated Bot Workflows & CRM Webhooks",
      "Dedicated High-Throughput Relays",
      "Advanced Revenue & Engagement Analytics",
      "Custom SLA & Dedicated Account Manager",
      "SOC2 & Post-Quantum Encryption Compliance"
    ],
    ctaText: "Request Enterprise Trial",
    isPopular: false
  }
];

export const FAQS = [
  {
    id: 1,
    category: "General",
    question: "What makes Rofiozag Chat different from Telegram, Discord, or WhatsApp?",
    answer: "Rofiozag Chat combines sub-millisecond real-time messaging with built-in creator monetization (paywalled drops, tipping, subscriptions), native AI copilot tools, and automated social crossposting. You no longer need separate apps for chat, payments, AI tools, and social publishing."
  },
  {
    id: 2,
    category: "Monetization",
    question: "How does creator monetization work on Rofiozag Chat?",
    answer: "You can lock specific channels, voice notes, stories, or download attachments behind monthly subscriptions or one-time payment paywalls. Payments are processed instantly via Stripe with 0% platform fee on our early creator tier."
  },
  {
    id: 3,
    category: "Security",
    question: "Is Rofiozag Chat fully end-to-end encrypted?",
    answer: "Yes. All 1-on-1 chats, private groups, and voice calls use zero-knowledge post-quantum end-to-end encryption. Your messages and media cannot be read by anyone else—not even Rofiozag servers."
  },
  {
    id: 4,
    category: "AI & Features",
    question: "How does native social crossposting work?",
    answer: "When you publish a post, channel update, or story in Rofiozag Chat, you can enable auto-sync. Rofiozag automatically formats and distributes your content to X (Twitter), Instagram, TikTok, Telegram, and YouTube with a single click."
  },
  {
    id: 5,
    category: "Waitlist",
    question: "When will I get access after joining the waitlist?",
    answer: "Waitlist invitations are dispatched in weekly batches. Joining early reserves your spot, gives you lower position numbers, and unlocks 6 months of 0% monetization fees."
  }
];
