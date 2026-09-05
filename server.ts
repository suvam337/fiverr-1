import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { PRESET_GIGS } from './src/data/presets';
import { GigData, GenerateGigParams } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for Gemini SDK
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Endpoint to fetch built-in presets
app.get('/api/presets', (req: Request, res: Response) => {
  res.json({ presets: PRESET_GIGS });
});

// Endpoint: Generate complete Fiverr gig kit using Gemini 3.8 Flash
app.post('/api/generate-gig', async (req: Request, res: Response) => {
  try {
    const params: GenerateGigParams = req.body;
    const { niche, skills, targetAudience, experienceLevel, pricingStrategy, language, additionalDetails } = params;

    if (!niche || !skills) {
      return res.status(400).json({ error: 'Niche and skills are required.' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback if no API key is provided
      console.log('Gemini API key not configured, synthesizing custom gig from domain knowledge...');
      const fallbackGig = createFallbackGig(params);
      return res.json({ gig: fallbackGig, source: 'offline_engine' });
    }

    const prompt = `You are a top 1% Fiverr Pro Seller and Fiverr SEO & Algorithm Consultant who has generated over $1,000,000 in freelance revenue.
Generate an extraordinary, highly optimized, 100% Fiverr-compliant "Perfect Gig" kit for a seller offering this service:

Niche / Service Name: ${niche}
Core Skills & Tools: ${skills}
Target Audience / Ideal Client: ${targetAudience || 'Small business owners, startups, creators, and agencies'}
Seller Experience Level: ${experienceLevel || 'intermediate'}
Pricing Strategy: ${pricingStrategy || 'balanced'}
Language: ${language || 'English'}
Special Instructions: ${additionalDetails || 'None'}

CRITICAL FIVERR RULES TO STRICTLY FOLLOW:
1. Title MUST start with "I will" and be under 80 characters total. It must contain the highest-volume buyer search keywords naturally (e.g. "I will develop a modern responsive react web application"). Avoid spammy all-caps.
2. Category and Subcategory must reflect official Fiverr taxonomy.
3. Search Tags: Exactly 5 search tags (max 20 characters per tag, lowercase, highly searched buyer keywords).
4. 3-Tier Packages: Basic, Standard, and Premium packages with realistic pricing ($USD), turnaround times (days), revisions, clear package names, taglines, and bullet points.
5. Description: Around 1000-1200 characters. Use markdown formatting with bolding, bullet points, a strong hook addressing buyer pain points, "Why Choose Me", "What You Will Get", "Tech/Tools Used", "How It Works", and a courteous call to action ("Please contact me before ordering").
6. FAQs: 5 to 6 realistic objection-handling FAQs that clear buyer doubts before purchasing.
7. Buyer Requirements: 3 specific questions to collect all necessary assets from the buyer once they order so the order doesn't get delayed.
8. Thumbnail Brief: Instructions for a high CTR 16:9 thumbnail (1280x769px), including headline formula (under 5 words), color palette, visual mockup elements, Canva tips, and an image generation prompt.
9. Pro Tips & SEO Keywords: 4 actionable tips to rank high on Fiverr search (impressions, response rate, click-through rate).
10. Overall SEO score (0-100) assessing compliance.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are the ultimate Fiverr Gig Architect. Always respond with pure valid JSON matching the exact schema requested.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Fiverr gig title starting with "I will" under 80 chars' },
            niche: { type: Type.STRING },
            category: { type: Type.STRING },
            subcategory: { type: Type.STRING },
            serviceType: { type: Type.STRING },
            searchTags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '5 top Fiverr search tags',
            },
            seoKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Target SEO keywords woven into title and description',
            },
            packages: {
              type: Type.OBJECT,
              properties: {
                basic: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    tagline: { type: Type.STRING },
                    description: { type: Type.STRING },
                    deliveryDays: { type: Type.INTEGER },
                    revisions: { type: Type.STRING },
                    price: { type: Type.INTEGER },
                    features: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['name', 'tagline', 'description', 'deliveryDays', 'revisions', 'price', 'features'],
                },
                standard: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    tagline: { type: Type.STRING },
                    description: { type: Type.STRING },
                    deliveryDays: { type: Type.INTEGER },
                    revisions: { type: Type.STRING },
                    price: { type: Type.INTEGER },
                    features: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['name', 'tagline', 'description', 'deliveryDays', 'revisions', 'price', 'features'],
                },
                premium: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    tagline: { type: Type.STRING },
                    description: { type: Type.STRING },
                    deliveryDays: { type: Type.INTEGER },
                    revisions: { type: Type.STRING },
                    price: { type: Type.INTEGER },
                    features: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['name', 'tagline', 'description', 'deliveryDays', 'revisions', 'price', 'features'],
                },
              },
              required: ['basic', 'standard', 'premium'],
            },
            extras: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  additionalDays: { type: Type.INTEGER },
                  price: { type: Type.INTEGER },
                },
                required: ['title', 'description', 'additionalDays', 'price'],
              },
            },
            description: { type: Type.STRING, description: 'Formatted Fiverr gig description in markdown' },
            faqs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING },
                },
                required: ['question', 'answer'],
              },
            },
            requirements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  prompt: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['free_text', 'file_upload', 'multiple_choice'] },
                  required: { type: Type.BOOLEAN },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['prompt', 'type', 'required'],
              },
            },
            thumbnailBrief: {
              type: Type.OBJECT,
              properties: {
                mainHeadline: { type: Type.STRING },
                subHeadline: { type: Type.STRING },
                colorPalette: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      hex: { type: Type.STRING },
                    },
                    required: ['name', 'hex'],
                  },
                },
                visualElements: { type: Type.ARRAY, items: { type: Type.STRING } },
                canvaLayoutTips: { type: Type.STRING },
                aiPrompt: { type: Type.STRING },
              },
              required: ['mainHeadline', 'subHeadline', 'colorPalette', 'visualElements', 'canvaLayoutTips', 'aiPrompt'],
            },
            proTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            auditScore: { type: Type.INTEGER },
          },
          required: [
            'title',
            'niche',
            'category',
            'subcategory',
            'serviceType',
            'searchTags',
            'seoKeywords',
            'packages',
            'extras',
            'description',
            'faqs',
            'requirements',
            'thumbnailBrief',
            'proTips',
            'auditScore',
          ],
        },
      },
    });

    const gigData: GigData = JSON.parse(response.text.trim());
    gigData.id = 'generated-' + Date.now();
    return res.json({ gig: gigData, source: 'gemini-3.8-flash' });
  } catch (error) {
    console.error('Error generating gig:', error);
    // Fallback to custom generator if API fails
    const fallbackGig = createFallbackGig(req.body);
    return res.json({ gig: fallbackGig, source: 'fallback_engine', note: 'Generated using algorithm engine' });
  }
});

// Endpoint: Audit and optimize an existing gig draft
app.post('/api/optimize-gig', async (req: Request, res: Response) => {
  try {
    const { title, description, tags } = req.body;
    const ai = getGeminiClient();

    let suggestions = [];
    let score = 85;

    // Quick heuristic calculations
    const issues = [];
    if (!title?.toLowerCase().startsWith('i will')) {
      issues.push('Title must start with "I will".');
      score -= 10;
    }
    if (title && title.length > 80) {
      issues.push('Title is over 80 characters. Shorter titles rank better on Fiverr search.');
      score -= 8;
    }
    if (tags && tags.length < 5) {
      issues.push(`You only have ${tags.length}/5 search tags. Always utilize all 5 tags.`);
      score -= 10;
    }
    if (description && description.length < 500) {
      issues.push('Description is too brief. Aim for 900-1100 characters to cover buyer questions.');
      score -= 10;
    }

    if (ai && title && description) {
      const auditPrompt = `Audit this Fiverr Gig content for SEO ranking and sales conversion:
Title: ${title}
Description: ${description}
Tags: ${Array.isArray(tags) ? tags.join(', ') : tags}

Return a concise critique with 3 concrete rewrites to maximize CTR and ranking.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: auditPrompt,
      });
      suggestions.push(response.text);
    } else {
      suggestions.push(
        'Make sure to put your primary keyword in the first sentence of your description.',
        'Break text into bulleted lists with bold headers to make it scannable for buyers on mobile.',
        'Add a clear call to action asking buyers to message you prior to placing orders.'
      );
    }

    res.json({
      score: Math.max(50, score),
      issues,
      suggestions,
    });
  } catch (err) {
    console.error('Error optimizing gig:', err);
    res.status(500).json({ error: 'Failed to optimize gig' });
  }
});

function createFallbackGig(params: GenerateGigParams): GigData {
  const cleanNiche = params.niche || 'Professional Digital Services';
  const cleanSkills = params.skills || 'Expert implementation, modern best practices';
  const priceMultiplier = params.pricingStrategy === 'premium' ? 2 : params.pricingStrategy === 'competitive' ? 0.75 : 1;

  return {
    id: 'generated-fallback-' + Date.now(),
    title: `I will provide professional ${cleanNiche.toLowerCase().slice(0, 45)} services with quality results`,
    niche: cleanNiche,
    category: 'Digital Services',
    subcategory: 'Specialized Consulting',
    serviceType: cleanNiche,
    searchTags: [cleanNiche.split(' ')[0].toLowerCase(), 'freelance expert', 'professional work', 'fast delivery', 'top rated'].slice(0, 5),
    seoKeywords: [cleanNiche.toLowerCase(), 'professional service', 'high quality', 'quick turnaround'],
    packages: {
      basic: {
        name: 'Essential Starter',
        tagline: `Fundamental starter setup for ${cleanNiche}`,
        description: `Core delivery package including basic setup, initial consultation, and ${cleanSkills.slice(0, 50)}.`,
        deliveryDays: 2,
        revisions: '2 Revisions',
        price: Math.round(40 * priceMultiplier),
        features: ['Initial Consultation', 'Core Setup & Deliverable', 'High Quality Delivery', '2 Revision Rounds'],
      },
      standard: {
        name: 'Growth Standard',
        tagline: `Complete multi-feature delivery package for ${cleanNiche}`,
        description: `Comprehensive project execution with advanced configuration, source assets, and testing.`,
        deliveryDays: 4,
        revisions: '4 Revisions',
        price: Math.round(110 * priceMultiplier),
        features: ['Full Project Execution', 'All Working Files Included', 'Performance Optimization', 'Detailed Documentation', 'Priority Delivery'],
      },
      premium: {
        name: 'VIP Enterprise',
        tagline: `End-to-end full solution with ongoing support and VIP priority`,
        description: `Everything in Standard plus bespoke customization, extended support, and unlimited revisions.`,
        deliveryDays: 7,
        revisions: 'Unlimited Revisions',
        price: Math.round(280 * priceMultiplier),
        features: ['Complete Custom Implementation', 'Highest Priority Turnaround', 'Full Commercial License', 'VIP Post-Delivery Support', 'Unlimited Revisions'],
      },
    },
    extras: [
      {
        title: 'Super Fast 24h Delivery',
        description: 'Prioritize this order ahead of the queue for 24-hour turnaround.',
        additionalDays: 1,
        price: Math.round(30 * priceMultiplier),
      },
      {
        title: 'Additional Full Revision Round',
        description: 'Extra round of comprehensive feedback and polish.',
        additionalDays: 1,
        price: Math.round(20 * priceMultiplier),
      },
    ],
    description: `👋 **Welcome to your go-to solution for ${cleanNiche}!**

Are you seeking reliable, high-caliber results without endless back-and-forth? With deep expertise in **${cleanSkills}**, I help clients bring their ideas to reality efficiently and affordably.

### 🌟 Why Work With Me?
- **Obsessed with Quality:** Every single deliverable is meticulously checked before handover.
- **Crystal-Clear Communication:** Regular progress updates so you always stay informed.
- **Buyer Protection:** Unlimited revisions on premium packages until you are 100% satisfied.

### 💼 What You Get:
- Complete deliverable matching your specifications
- Source files and organized project assets
- Post-delivery guidance and quick answers

💬 **Have questions or custom requirements?** Please reach out via the Contact Seller button before ordering!`,
    faqs: [
      {
        question: 'What information do you need to get started?',
        answer: 'Simply provide your project brief, preferred timeline, and any assets or inspiration links you have.',
      },
      {
        question: 'Can I order a custom package if my requirements differ?',
        answer: 'Yes! Send me a message detailing what you need and I will generate a custom offer tailored to your scope and budget.',
      },
      {
        question: 'Do you offer revisions?',
        answer: 'Yes, all packages include revisions to ensure the final output exceeds your expectations.',
      },
    ],
    requirements: [
      {
        prompt: `Please detail your specific goals and requirements for this ${cleanNiche} project.`,
        type: 'free_text',
        required: true,
      },
      {
        prompt: 'Do you have any existing assets, documents, or reference files?',
        type: 'file_upload',
        required: false,
      },
    ],
    thumbnailBrief: {
      mainHeadline: cleanNiche.toUpperCase().slice(0, 26),
      subHeadline: 'High Quality • Fast Delivery • 100% Satisfaction',
      colorPalette: [
        { name: 'Primary Emerald', hex: '#10b981' },
        { name: 'Deep Navy', hex: '#0f172a' },
        { name: 'Pure White', hex: '#ffffff' },
      ],
      visualElements: [
        'High-contrast headline in bold modern sans-serif font',
        'Clean mockup showcasing sample work or deliverables',
        'Fiverr rating badge: "Top Quality & Fast Delivery"',
      ],
      canvaLayoutTips: 'Keep typography large and bold with strong contrast against background.',
      aiPrompt: `Sleek modern commercial studio mockup showing ${cleanNiche} assets, minimalist luxury composition, soft studio rim lighting --ar 16:9`,
    },
    proTips: [
      'Fill in every package feature comparison box on Fiverr.',
      'Respond to first buyer inquiries within 1 hour to maintain a 100% response rate.',
      'Deliver orders at least a few hours before deadline to maximize five-star ratings.',
    ],
    auditScore: 95,
  };
}

// Start server with Vite middleware in development or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fiverr Gig Builder server running on port ${PORT}`);
  });
}

startServer();
