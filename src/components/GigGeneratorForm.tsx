import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, Layers, Target, DollarSign, Globe, Loader2 } from 'lucide-react';
import { GenerateGigParams } from '../types';

interface GigGeneratorFormProps {
  onGenerate: (params: GenerateGigParams) => Promise<void>;
  isLoading: boolean;
  onSelectPresetNiche: (nicheId: string) => void;
}

const QUICK_NICHES = [
  { label: 'React Web App', niche: 'Full Stack Web Development', skills: 'React, Node.js, TypeScript, Tailwind, MongoDB' },
  { label: 'AI Automation & Make', niche: 'AI Workflows & Chatbots', skills: 'Make.com, Zapier, OpenAI GPT-4, Webhooks' },
  { label: 'Minimalist Logo', niche: 'Luxury Logo & Brand Design', skills: 'Adobe Illustrator, Minimalist Vector, Brand Guidelines' },
  { label: 'Viral Video Editing', niche: 'TikTok & Reels Video Editing', skills: 'Premiere Pro, After Effects, Dynamic Subtitles, Sound Design' },
  { label: 'Shopify Dropshipping', niche: 'Shopify Store Design & Setup', skills: 'Shopify Liquid, Theme Customization, High-Converting UI' },
  { label: 'SEO Content Writer', niche: 'SEO Articles & Blog Posts', skills: 'SurferSEO, Keyword Research, Copywriting, WordPress' },
];

export const GigGeneratorForm: React.FC<GigGeneratorFormProps> = ({
  onGenerate,
  isLoading,
  onSelectPresetNiche,
}) => {
  const [niche, setNiche] = useState('Full Stack Web Development');
  const [skills, setSkills] = useState('React, TypeScript, Node.js, Express, Tailwind CSS, PostgreSQL');
  const [targetAudience, setTargetAudience] = useState('Founders, startups, small businesses, and agencies');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'expert'>('intermediate');
  const [pricingStrategy, setPricingStrategy] = useState<'competitive' | 'balanced' | 'premium'>('balanced');
  const [language, setLanguage] = useState('English');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim() || !skills.trim()) return;

    onGenerate({
      niche,
      skills,
      targetAudience,
      experienceLevel,
      pricingStrategy,
      language,
      additionalDetails,
    });
  };

  const handleApplyQuickNiche = (item: typeof QUICK_NICHES[0]) => {
    setNiche(item.niche);
    setSkills(item.skills);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
      {/* Top Banner explaining why no login is needed */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-600 text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Zero Login Required • 100% Fiverr Terms-of-Service Safe
            </h3>
            <p className="text-xs text-slate-600">
              Provide your service details below. Our AI engine builds the entire optimized Gig package ready to copy-paste.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quick Suggestion Pills */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Popular High-Demand Services (Click to Autofill):
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_NICHES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyQuickNiche(item)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 text-slate-700 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Service / Niche Name *</span>
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. AI Automation Specialist, Shopify Store Designer"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-slate-500 mt-1">
              What specific skill or outcome are you selling to buyers?
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <Wand2 className="w-4 h-4 text-emerald-600" />
              <span>Key Skills, Tools & Software *</span>
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js, Figma, Zapier, Python"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-slate-500 mt-1">
              Software or technical strengths to highlight for search keywords
            </p>
          </div>
        </div>

        {/* Additional Strategy Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-slate-500" />
              <span>Target Client Profile</span>
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. E-commerce brands, Tech startups"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-500" />
              <span>Pricing Strategy</span>
            </label>
            <select
              value={pricingStrategy}
              onChange={(e) => setPricingStrategy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="competitive">Competitive (Lower Price for Fast First Orders)</option>
              <option value="balanced">Balanced (Market Standard)</option>
              <option value="premium">Premium / Pro (High-Ticket Quality)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>Fiverr Seller Level</span>
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="beginner">New Seller (Build initial momentum)</option>
              <option value="intermediate">Level 1 / Level 2 Seller</option>
              <option value="expert">Top Rated / Fiverr Pro candidate</option>
            </select>
          </div>
        </div>

        {/* Optional notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Special Highlights or Custom Requests (Optional):
          </label>
          <input
            type="text"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="e.g. Include 24-hour delivery option, highlight 100% money back guarantee"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Submit Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Generates SEO Title, 5 Tags, 3 Packages, Description, FAQs & Thumbnail specs
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Architecting High-Ranking Gig...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Perfect Fiverr Gig Kit</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
