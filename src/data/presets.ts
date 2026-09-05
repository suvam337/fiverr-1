import { GigData } from '../types';

export const PRESET_GIGS: GigData[] = [
  {
    id: 'preset-web-dev',
    title: 'I will develop a modern full stack web application in react and node js',
    niche: 'Web Development',
    category: 'Programming & Tech',
    subcategory: 'Web Programming',
    serviceType: 'Full Stack Development',
    searchTags: ['react js', 'full stack developer', 'node js', 'web application', 'frontend developer'],
    seoKeywords: ['full stack web application', 'react js developer', 'node js backend', 'responsive web app', 'modern ui'],
    packages: {
      basic: {
        name: 'Starter Landing',
        tagline: 'Single page modern reactive web page with responsive design',
        description: 'Clean, responsive 1-page React web application with modern layout, mobile optimization, and contact form integration.',
        deliveryDays: 2,
        revisions: '3 Revisions',
        price: 50,
        features: [
          '1 Page Responsive UI',
          'Tailwind CSS Styling',
          'Contact Form Setup',
          'Source Code Included',
          'Mobile & Tablet Friendly',
        ],
      },
      standard: {
        name: 'Full Web App',
        tagline: 'Complete 3-5 pages multi-view dynamic application with REST API',
        description: 'Up to 5 dynamic pages, state management, REST API integration, database connection (MongoDB/PostgreSQL), and authentication.',
        deliveryDays: 5,
        revisions: '5 Revisions',
        price: 180,
        features: [
          'Up to 5 Responsive Pages',
          'Node.js / Express Backend',
          'User Authentication (JWT/Auth)',
          'Database Setup (SQL/NoSQL)',
          'API Integration & Testing',
          'Source Code & Deployment Help',
        ],
      },
      premium: {
        name: 'Enterprise Scale',
        tagline: 'Full production-ready SaaS / platform with admin panel and payments',
        description: 'End-to-end full-stack web app, custom admin dashboard, Stripe payment gateway, real-time features, secure API, and 14 days VIP post-launch support.',
        deliveryDays: 10,
        revisions: 'Unlimited Revisions',
        price: 450,
        features: [
          'Unlimited Core Pages & Features',
          'Complete Admin Management Panel',
          'Stripe / PayPal Gateway Setup',
          'Real-time WebSockets / Notifications',
          'Performance & SEO Optimization',
          '14 Days Dedicated Post-Launch Support',
        ],
      },
    },
    extras: [
      {
        title: 'Super Fast 24-Hour Delivery (Basic)',
        description: 'Get your starter landing page completed and delivered in 24 hours.',
        additionalDays: 1,
        price: 30,
      },
      {
        title: 'Cloud Hosting Deployment (Vercel / AWS)',
        description: 'Complete setup on your custom domain with SSL certificate and CI/CD pipeline.',
        additionalDays: 1,
        price: 45,
      },
      {
        title: 'Stripe Payment Gateway Integration',
        description: 'Secure checkout flow, webhook listener, and customer billing portal setup.',
        additionalDays: 2,
        price: 75,
      },
    ],
    description: `🚀 **Looking for a clean, lightning-fast, and scalable modern web application?**

You've come to the right place! I am a full-stack engineer specializing in building responsive, high-performance web applications using **React, TypeScript, Node.js, and modern databases**. Whether you need an engaging MVP, a custom dashboard, or a scalable SaaS platform, I deliver clean code that drives business growth.

### 💎 What You Will Receive:
- **Pixel-Perfect Frontend:** Built with React, Next.js, and Tailwind CSS for snappy user experiences.
- **Robust Backend & APIs:** Secure Node.js/Express architecture with structured endpoints and data validation.
- **Database Architecture:** Optimized PostgreSQL, MongoDB, or Firestore databases.
- **Flawless Responsiveness:** 100% mobile, tablet, and ultra-wide monitor compatibility.
- **SEO & Speed Optimized:** Fast Lighthouse scores, clean semantic HTML, and secure headers.

### 🛠️ Technology Stack:
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Redux/Zustand
- **Backend:** Node.js, Express.js, REST APIs, GraphQL
- **Databases:** PostgreSQL, MongoDB, Supabase, Firebase
- **DevOps & Cloud:** Vercel, AWS, Docker, GitHub Actions

### 🤝 How We Work Together:
1. **Discovery:** We discuss your wireframes, references, and core features.
2. **Development:** Regular milestone updates and preview links so you always know progress.
3. **Refinement:** Polishing according to your feedback.
4. **Delivery & Launch:** Complete source code and smooth deployment to your hosting.

⚠️ **PLEASE NOTE:** To guarantee the best results and custom timeline for your project, kindly **send me a message before placing an order** so we can review requirements together!`,
    faqs: [
      {
        question: 'What do you need from me to start working?',
        answer: 'Please share your project brief, Figma/wireframe designs (if you have them), examples of websites you like, and any specific feature requirements. If you do not have designs yet, we can design the UI from scratch!',
      },
      {
        question: 'Do you provide the complete source code upon delivery?',
        answer: 'Yes, 100%! All packages include clean, well-commented source code with full commercial rights and documentation on how to run and build it.',
      },
      {
        question: 'Will the website be mobile-friendly and responsive?',
        answer: 'Absolutely. Every single component is thoroughly tested across mobile phones, tablets, laptops, and 4K desktop screens.',
      },
      {
        question: 'Can you deploy the website to my hosting server or custom domain?',
        answer: 'Yes! I can deploy to Vercel, Netlify, Render, AWS, or your custom VPS and configure your custom domain with free SSL.',
      },
      {
        question: 'What if I need revisions or adjustments after delivery?',
        answer: 'Your satisfaction is my top priority. Each package includes revisions, and I guarantee quick turnaround times on tweaks until you are completely happy.',
      },
    ],
    requirements: [
      {
        prompt: 'Please describe your project idea, target audience, and key required features.',
        type: 'free_text',
        required: true,
      },
      {
        prompt: 'Do you have Figma designs, wireframes, or reference websites you love?',
        type: 'file_upload',
        required: false,
      },
      {
        prompt: 'What type of database or third-party service do you need (e.g. Firebase, MongoDB, Stripe, None)?',
        type: 'multiple_choice',
        required: true,
        options: ['MongoDB / NoSQL', 'PostgreSQL / SQL', 'Firebase / Supabase', 'None / Just Frontend', 'Not sure yet (let us discuss)'],
      },
    ],
    thumbnailBrief: {
      mainHeadline: 'FULL STACK WEB DEVELOPER',
      subHeadline: 'React • Node.js • Fast & Responsive',
      colorPalette: [
        { name: 'Fiverr Green', hex: '#1dbf73' },
        { name: 'Deep Slate', hex: '#0f172a' },
        { name: 'Electric Cyan', hex: '#06b6d4' },
      ],
      visualElements: [
        'High-contrast dark card background (#0f172a) with subtle code syntax glow',
        'Official React and Node.js vector badge icons',
        'Clean laptop mockup showing an attractive dashboard interface',
        'High-visibility pill badge: "100% Responsive & SEO Ready"',
      ],
      canvaLayoutTips: 'Keep main title under 5 words in bold sans-serif font. Leave 20% margin around borders so Fiverr crop masks do not cut off your text.',
      aiPrompt: 'Cinematic professional 3D isometric mockup of modern web applications on a sleek laptop and tablet, glowing cyan and emerald code particles, dark graphite studio background, sharp focus, 8k resolution, minimalist commercial tech photography --ar 16:9',
    },
    proTips: [
      'Use all 5 search tags (do not leave empty tags!).',
      'Mention your primary keyword 3-4 times naturally in your description.',
      'Always include "Contact me before ordering" to prevent mismatched scope disputes.',
      'Respond to first buyer messages within 1 hour to boost Fiverr response rate metrics.',
    ],
    auditScore: 98,
  },
  {
    id: 'preset-ai-automation',
    title: 'I will build custom ai automation chatbots and workflows with make zapier',
    niche: 'AI Automation & Workflows',
    category: 'Programming & Tech',
    subcategory: 'AI Services',
    serviceType: 'AI Chatbots & Automation',
    searchTags: ['ai automation', 'make com', 'zapier', 'ai chatbot', 'chatgpt bot'],
    seoKeywords: ['make com automation', 'zapier workflows', 'chatgpt ai agent', 'lead generation bot', 'custom ai chatbot'],
    packages: {
      basic: {
        name: 'Quick Bot / Zap',
        tagline: 'Single automated workflow connecting 2 apps or basic FAQ bot',
        description: 'Build 1 custom Zapier or Make.com scenario (up to 4 steps) or a simple knowledge-base AI bot for customer inquiries.',
        deliveryDays: 2,
        revisions: '2 Revisions',
        price: 60,
        features: [
          '1 Custom Automation Flow',
          'Connect 2 Platforms (e.g. Gmail to Sheets)',
          'Basic Error Handling',
          'Step-by-step Setup Video',
          'Testing & Verification',
        ],
      },
      standard: {
        name: 'Growth Automation',
        tagline: 'Multi-step AI workflow with webhook triggers and CRM routing',
        description: 'Advanced automated pipeline: Lead qualification, ChatGPT summarization, CRM sync (HubSpot/Notion), and automated WhatsApp/Slack alerts.',
        deliveryDays: 4,
        revisions: '4 Revisions',
        price: 175,
        features: [
          'Up to 3 Complex Workflows',
          'ChatGPT / Claude AI Prompt Tuning',
          'CRM Integration (HubSpot/Airtable/Notion)',
          'Custom Webhook & API Data Parsing',
          'Full Error Handling & Re-run Logic',
          'Video Walkthrough & Handover',
        ],
      },
      premium: {
        name: 'Full AI Ecosystem',
        tagline: 'Enterprise autonomous AI agents, multi-tool sync, and custom UI bot',
        description: 'Comprehensive business automation system. AI agent capable of web scraping, dynamic customer follow-ups, calendar booking, and 30-day monitoring.',
        deliveryDays: 7,
        revisions: 'Unlimited Revisions',
        price: 420,
        features: [
          'Unlimited Scenario Complexities',
          'Custom Knowledge Base RAG Assistant',
          'Full Cal.com / Calendly / Stripe Sync',
          'Real-time Multi-Channel Alerts',
          'Full Architecture Diagram & Documentation',
          '30 Days Dedicated System Monitoring',
        ],
      },
    },
    extras: [
      {
        title: 'Priority 24-Hour Delivery',
        description: 'Fast-track your automation to launch within 24 hours.',
        additionalDays: 1,
        price: 50,
      },
      {
        title: 'Custom Loom Video Training',
        description: 'Personalized 15-minute screen recording explaining every node and how to maintain it.',
        additionalDays: 1,
        price: 35,
      },
    ],
    description: `🤖 **Tired of wasting hours on repetitive manual tasks?**

Supercharge your business efficiency with custom **AI automations and smart workflows** built with **Make.com, Zapier, OpenAI, and Voiceflow**. I build autonomous systems that capture leads, answer client questions 24/7, route data to your CRM, and save you 20+ hours every single week.

### ⚡ What I Can Automate For You:
- **AI Customer Support & Sales Chatbots:** Trained on your company PDFs, website, and guidelines.
- **Smart Lead Pipelines:** Automatically parse incoming leads from Meta ads or forms, score them with AI, and alert your team on Slack/WhatsApp.
- **CRM & Database Syncing:** Real-time bi-directional sync between Airtable, Notion, HubSpot, and Google Sheets.
- **Content & Social Workflows:** Automated generation and scheduling workflows.

### 🛠️ Tools & Ecosystem:
- Make.com (Integromat), Zapier, n8n
- OpenAI GPT-4o / Claude 3.5 / Gemini
- Airtable, Notion, Google Workspace, Slack, Discord
- WhatsApp API, Twilio, SendGrid

Ready to put your business on autopilot? **Send me a quick message with your tools, and let's get started today!**`,
    faqs: [
      {
        question: 'Do I need my own Make.com or Zapier account?',
        answer: 'Yes, you will need your own account on the platform you choose. Free or starter tiers are usually enough to get started, and I will guide you on the most cost-effective plan.',
      },
      {
        question: 'How do you train the AI chatbot on my company data?',
        answer: 'We can connect your company website URLs, PDFs, notion docs, or FAQ sheets so the AI only answers with accurate, pre-approved facts.',
      },
      {
        question: 'Will I be able to edit or manage the workflows myself?',
        answer: 'Yes! I deliver clean, labeled, color-coded scenarios and provide a screen-recorded tutorial showing you exactly how everything operates.',
      },
    ],
    requirements: [
      {
        prompt: 'What manual tasks or workflows are you looking to automate?',
        type: 'free_text',
        required: true,
      },
      {
        prompt: 'Which software tools are you currently using (e.g. Gmail, HubSpot, Airtable)?',
        type: 'free_text',
        required: true,
      },
    ],
    thumbnailBrief: {
      mainHeadline: 'AI WORKFLOW AUTOMATION',
      subHeadline: 'Make.com • Zapier • ChatGPT Agents',
      colorPalette: [
        { name: 'Electric Violet', hex: '#8b5cf6' },
        { name: 'Dark Navy', hex: '#0b0f19' },
        { name: 'Neon Coral', hex: '#f43f5e' },
      ],
      visualElements: [
        '3D workflow nodes connected with glowing energy lines',
        'Make.com and Zapier official logo badges',
        'Bold stat callout: "Save 20+ Hours / Week"',
      ],
      canvaLayoutTips: 'Use high-contrast bold typography and avoid tiny text that gets pixelated on mobile app previews.',
      aiPrompt: 'Futuristic glowing automation pipeline diagram, floating colorful app icons interconnected by electric glowing neon laser threads, deep space background, clean isometric rendering --ar 16:9',
    },
    proTips: [
      'Keywords like "make com", "zapier", and "ai chatbot" have high buyer search volume.',
      'Show concrete time-saving metrics in your proposal to justify higher prices.',
    ],
    auditScore: 97,
  },
  {
    id: 'preset-logo-branding',
    title: 'I will design a modern minimalist luxury logo and brand identity',
    niche: 'Graphic & Brand Design',
    category: 'Graphics & Design',
    subcategory: 'Logo Design',
    serviceType: 'Minimalist Logo Design',
    searchTags: ['minimalist logo', 'luxury logo', 'brand identity', 'modern logo', 'business logo'],
    seoKeywords: ['minimalist business logo', 'luxury brand design', 'vector source files', 'custom typography logo'],
    packages: {
      basic: {
        name: 'Silver Concept',
        tagline: '2 High-resolution minimalist logo concepts with transparency',
        description: '2 unique logo concepts in high-res JPG and transparent PNG (300 DPI) plus unlimited revisions for the chosen concept.',
        deliveryDays: 2,
        revisions: 'Unlimited Revisions',
        price: 35,
        features: ['2 Logo Concepts', 'Transparent PNG & JPG', 'High Resolution 300 DPI', 'Unlimited Revisions'],
      },
      standard: {
        name: 'Gold Identity',
        tagline: '3 Premium concepts + Vector files (AI, EPS, SVG) + Social kit',
        description: '3 custom concepts, vector source files (AI, EPS, SVG, PDF), social media avatars & banners, and 3D mockup presentation.',
        deliveryDays: 3,
        revisions: 'Unlimited Revisions',
        price: 85,
        features: ['3 Unique Concepts', 'All Vector & Source Files', 'Social Media Kit', '3D Realistic Mockups', 'Print-Ready Files'],
      },
      premium: {
        name: 'Platinum Brand Bible',
        tagline: 'Complete corporate brand identity guide, typography, and stationery',
        description: '4 VIP concepts, full vector suite, stationery design (business card, letterhead), comprehensive brand style guidelines manual, and VIP copyright transfer.',
        deliveryDays: 5,
        revisions: 'Unlimited Revisions',
        price: 195,
        features: ['4 VIP Concepts', 'Full Brand Guidelines Book', 'Stationery Kit (Cards, Letterhead)', 'Full Vector & Source Suite', 'Copyright Transfer Document'],
      },
    },
    extras: [
      {
        title: 'Extra Fast 24-Hour Delivery',
        description: 'Receive your initial concepts within 24 hours.',
        additionalDays: 1,
        price: 25,
      },
      {
        title: 'Brand Mascot / Custom Iconography',
        description: 'Custom hand-crafted vector icon or brand emblem.',
        additionalDays: 2,
        price: 60,
      },
    ],
    description: `✨ **Make your business unforgettable with a timeless, luxury minimalist logo.**

A great logo is more than just graphics—it is the first impression and anchor of your brand reputation. I specialize in crafting clean, meaningful, and premium brand identities that command trust and elevate your positioning.

### 🎨 Why Choose My Service:
- **100% Original Vector Art:** Zero clip art or recycled templates.
- **Timeless Minimalist Aesthetics:** Designed to look stunning on mobile screens, storefronts, and business cards.
- **Complete Ownership:** Full commercial copyright ownership transferred to you.
- **Friendly & Responsive Communication:** Fast turnaround with dedicated support.

### 📦 What You Get:
- High Resolution JPG & Transparent PNG (300 DPI)
- Fully Editable Vector Source Files (AI, EPS, SVG, PDF)
- Social Media Kit & Stationery mockups

Let’s build something iconic. **Order now or send a message to discuss your brand vision!**`,
    faqs: [
      {
        question: 'Do I get the copyright of the design?',
        answer: 'Yes, once the order is approved and completed, you own 100% full commercial rights to the final design.',
      },
      {
        question: 'What is a vector file and why do I need it?',
        answer: 'Vector files (AI, EPS, SVG) can be scaled infinitely to any size without losing quality, which is essential for printing banners, billboards, and merchandise.',
      },
    ],
    requirements: [
      {
        prompt: 'What is your exact company name and tagline/slogan?',
        type: 'free_text',
        required: true,
      },
      {
        prompt: 'What industry is your business in, and who is your ideal customer?',
        type: 'free_text',
        required: true,
      },
      {
        prompt: 'Do you have preferred brand colors or visual styles (e.g. Modern, Vintage, Minimalist)?',
        type: 'free_text',
        required: false,
      },
    ],
    thumbnailBrief: {
      mainHeadline: 'MINIMALIST LUXURY LOGO',
      subHeadline: 'Clean • Timeless • Vector Files Included',
      colorPalette: [
        { name: 'Warm Charcoal', hex: '#1c1917' },
        { name: 'Champagne Gold', hex: '#d4af37' },
        { name: 'Pure Linen', hex: '#fafaf9' },
      ],
      visualElements: [
        'Sleek neutral split background with 2 premium monochrome logo samples',
        'Subtle embossed business card mock-up in gold foil',
        'Clear rating badge: "Original & Vector Formats"',
      ],
      canvaLayoutTips: 'Keep the background clean and clutter-free. Let the typography and logo marks speak for themselves.',
      aiPrompt: 'Minimalist luxury brand mockup on textured matte warm paper, subtle gold foil debossing, elegant serif typography, soft natural directional lighting, architectural aesthetic --ar 16:9',
    },
    proTips: [
      'Include high-res realistic mockups in your gig gallery to dramatically boost click-through rates.',
      'Offer unlimited revisions to remove purchase friction for new buyers.',
    ],
    auditScore: 99,
  },
  {
    id: 'preset-video-editing',
    title: 'I will edit engaging viral youtube shorts tiktok and instagram reels',
    niche: 'Video Editing & Reels',
    category: 'Video & Animation',
    subcategory: 'Video Editing',
    serviceType: 'Short-Form Content',
    searchTags: ['video editing', 'tiktok edit', 'youtube shorts', 'reels editor', 'alex hormozi'],
    seoKeywords: ['viral reels editing', 'engaging captions', 'sound design', 'b-roll motion graphics'],
    packages: {
      basic: {
        name: 'Single Viral Clip',
        tagline: '1 Edited short-form video (up to 60s) with animated captions',
        description: 'Dynamic animated subtitles, color grading, zoom cuts, sound effects, and background music.',
        deliveryDays: 1,
        revisions: '3 Revisions',
        price: 25,
        features: ['1 Video up to 60s', 'Animated Captions & Emojis', 'Sound Effects (SFX)', 'B-roll Footage Cut-ins'],
      },
      standard: {
        name: 'Creator 5-Pack',
        tagline: '5 Highly engaging shorts/reels with custom branding and motion graphics',
        description: '5 vertical videos with advanced hook editing, sound design, motion graphics, zoom pulses, and noise reduction.',
        deliveryDays: 3,
        revisions: 'Unlimited Revisions',
        price: 95,
        features: ['5 Videos up to 60s', 'Advanced Sound Design', 'Custom Brand Colors & Fonts', 'Hooks & Retention Optimization'],
      },
      premium: {
        name: 'Agency 15-Pack',
        tagline: '15 High-retention reels + custom thumbnails + content strategy audit',
        description: '15 viral short videos optimized for maximum retention, custom cover frames for Instagram/TikTok, and priority turnaround.',
        deliveryDays: 7,
        revisions: 'Unlimited Revisions',
        price: 260,
        features: ['15 Videos up to 60s', 'Custom Thumbnail Covers', 'Highest Priority Turnaround', 'Full Commercial Music Licensing'],
      },
    },
    extras: [
      {
        title: 'Same-Day Rush 12h Delivery',
        description: 'Get your clip edited and delivered in 12 hours.',
        additionalDays: 1,
        price: 20,
      },
      {
        title: 'Custom Vertical Thumbnail Frame',
        description: 'High CTR cover image with bold text and expressive face cutout.',
        additionalDays: 1,
        price: 15,
      },
    ],
    description: `🔥 **Want your content to stop the scroll and capture millions of views?**

Short-form video algorithms demand high retention, fast pacing, and captivating visuals. I edit viral **TikToks, YouTube Shorts, and Instagram Reels** styled after top creators like Alex Hormozi, Ali Abdaal, and Iman Gadzhi.

### 🎬 What You Get In Every Edit:
- **Dynamic Animated Captions:** Colored keywords, animations, and expressive emojis.
- **Retention Hooks:** Snappy jump cuts, zoom ins/outs, and motion graphics.
- **Cinematic Sound Design:** Impact whooshes, risers, pop sounds, and trending royalty-free music.
- **Engaging B-Roll & Memes:** Relevant context footage, overlays, and animations.

Drop your raw footage into my inbox and let's turn your content into viral gold!`,
    faqs: [
      {
        question: 'How do I send you my raw video footage?',
        answer: 'You can easily share your video files via Google Drive, Dropbox, WeTransfer, or directly through the Fiverr order page.',
      },
      {
        question: 'Do you provide the music and sound effects?',
        answer: 'Yes! All music and SFX used are 100% royalty-free and safe for commercial monetization on YouTube, TikTok, and Instagram.',
      },
    ],
    requirements: [
      {
        prompt: 'Please provide the link to your raw footage (Google Drive/Dropbox/WeTransfer).',
        type: 'free_text',
        required: true,
      },
      {
        prompt: 'Do you have specific style preferences, font styles, or example videos you want us to match?',
        type: 'free_text',
        required: false,
      },
    ],
    thumbnailBrief: {
      mainHeadline: 'VIRAL REELS & SHORTS EDITING',
      subHeadline: 'High Retention • Dynamic Captions • SFX',
      colorPalette: [
        { name: 'High-Vis Yellow', hex: '#facc15' },
        { name: 'Dark Onyx', hex: '#111827' },
        { name: 'Bright Magenta', hex: '#ec4899' },
      ],
      visualElements: [
        'Split screen comparing boring raw footage vs colorful dynamic edited reel',
        'Floating emoji icons (🔥, 🚀, 💰) and waveform sound bar',
        'Bold badge: "Hormozi / Ali Abdaal Style"',
      ],
      canvaLayoutTips: 'Use bright neon yellow or green headline on dark background for high CTR thumbnail display.',
      aiPrompt: 'High energy vertical smartphone mockup showing viral TikTok video with bright glowing colorful animated subtitles and motion graphics, neon studio glow, vibrant cinematic lighting --ar 16:9',
    },
    proTips: [
      'Include a 30-second portfolio video reel directly in your Fiverr gig gallery for 200%+ more clicks.',
      'Offer batch packages (e.g. 5 or 10 videos) to secure recurring monthly clients.',
    ],
    auditScore: 98,
  },
];
