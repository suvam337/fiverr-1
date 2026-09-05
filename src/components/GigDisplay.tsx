import React, { useState } from 'react';
import {
  Copy,
  Check,
  Tag,
  Layers,
  Clock,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  FileQuestion,
  Image as ImageIcon,
  Award,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { GigData, GigPackage } from '../types';

interface GigDisplayProps {
  gig: GigData;
  onCopy: (text: string, label: string) => void;
  onOpenSafetyNotice: () => void;
}

export const GigDisplay: React.FC<GigDisplayProps> = ({ gig, onCopy, onOpenSafetyNotice }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'description' | 'requirements' | 'gallery' | 'audit'>('overview');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const copyPackageFormatted = (pkg: GigPackage, tier: string) => {
    const formatted = `PACKAGE: ${tier.toUpperCase()} - ${pkg.name}
Tagline: ${pkg.tagline}
Price: $${pkg.price} USD
Delivery: ${pkg.deliveryDays} Days
Revisions: ${pkg.revisions}
Description:
${pkg.description}

Included Features:
${pkg.features.map((f) => `• ${f}`).join('\n')}`;
    onCopy(formatted, `${tier} Package Details`);
  };

  const copyAllRequirements = () => {
    const reqText = gig.requirements
      .map((r, i) => `${i + 1}. [${r.type.toUpperCase()}] ${r.prompt}${r.required ? ' (Required)' : ' (Optional)'}`)
      .join('\n\n');
    onCopy(reqText, 'All Buyer Requirements');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Top Banner with Gig Title & Quick Score */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                {gig.niche}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium bg-white/10 text-slate-300 rounded-full">
                {gig.category} &gt; {gig.subcategory}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {gig.title}
              <button
                onClick={() => onCopy(gig.title, 'Gig Title')}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
                title="Copy Title"
              >
                <Copy className="w-4 h-4" />
              </button>
            </h1>
            <p className="text-xs text-slate-400">
              Length: <span className="font-semibold text-emerald-400">{gig.title.length}</span> / 80 characters (optimal for Fiverr search index)
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">SEO Score</span>
              <span className="text-2xl font-black text-white">{gig.auditScore || 98}<span className="text-sm font-normal text-slate-400">/100</span></span>
            </div>
            <button
              onClick={() => {
                const fullSummary = `FIVERR GIG ARCHITECTURE:
TITLE: ${gig.title}
CATEGORY: ${gig.category} > ${gig.subcategory}
TAGS: ${gig.searchTags.join(', ')}

PRICING:
Basic ($${gig.packages.basic.price}): ${gig.packages.basic.name}
Standard ($${gig.packages.standard.price}): ${gig.packages.standard.name}
Premium ($${gig.packages.premium.price}): ${gig.packages.premium.name}

DESCRIPTION:
${gig.description}

FAQS:
${gig.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}`;
                onCopy(fullSummary, 'Complete Gig Blueprint');
              }}
              className="px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Full Gig</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fiverr Flow Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/80 overflow-x-auto scrollbar-none px-4 sm:px-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3.5 px-4 font-semibold text-xs sm:text-sm whitespace-nowrap border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'overview'
              ? 'border-emerald-600 text-emerald-700 bg-white shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>1. Overview & Tags</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`py-3.5 px-4 font-semibold text-xs sm:text-sm whitespace-nowrap border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'pricing'
              ? 'border-emerald-600 text-emerald-700 bg-white shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Pricing Packages (3 Tiers)</span>
        </button>

        <button
          onClick={() => setActiveTab('description')}
          className={`py-3.5 px-4 font-semibold text-xs sm:text-sm whitespace-nowrap border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'description'
              ? 'border-emerald-600 text-emerald-700 bg-white shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>3. Description & FAQs</span>
        </button>

        <button
          onClick={() => setActiveTab('requirements')}
          className={`py-3.5 px-4 font-semibold text-xs sm:text-sm whitespace-nowrap border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'requirements'
              ? 'border-emerald-600 text-emerald-700 bg-white shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileQuestion className="w-4 h-4" />
          <span>4. Buyer Requirements</span>
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`py-3.5 px-4 font-semibold text-xs sm:text-sm whitespace-nowrap border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'gallery'
              ? 'border-emerald-600 text-emerald-700 bg-white shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>5. Thumbnail Spec</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`py-3.5 px-4 font-semibold text-xs sm:text-sm whitespace-nowrap border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'audit'
              ? 'border-emerald-600 text-emerald-700 bg-white shadow-sm'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>6. SEO & Pro Tips</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Fiverr Gig Title
                </span>
                <button
                  onClick={() => onCopy(gig.title, 'Gig Title')}
                  className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Title</span>
                </button>
              </div>
              <p className="text-base font-bold text-slate-900">{gig.title}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <span className="text-emerald-600 font-semibold">✓ Meets Fiverr rule:</span> Starts with "I will" and uses keyword-dense buyer phrasing.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Category & Subcategory
                  </span>
                  <button
                    onClick={() => onCopy(`${gig.category} > ${gig.subcategory}`, 'Category')}
                    className="p-1 text-slate-500 hover:text-slate-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  {gig.category} &rarr; {gig.subcategory}
                </p>
                <p className="text-xs text-slate-500 mt-1">Service Type: {gig.serviceType}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Primary SEO Target Keywords
                  </span>
                  <button
                    onClick={() => onCopy(gig.seoKeywords.join(', '), 'SEO Keywords')}
                    className="p-1 text-slate-500 hover:text-slate-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {gig.seoKeywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-xs bg-slate-200/80 text-slate-700">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 5 Search Tags */}
            <div className="p-5 rounded-xl border border-emerald-200/70 bg-emerald-50/30">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>Search Tags (5 / 5 Maximum)</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Fiverr allows exactly 5 tags. Each tag should be lowercase and under 20 characters.
                  </p>
                </div>
                <button
                  onClick={() => onCopy(gig.searchTags.join(', '), 'All 5 Tags')}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All 5 Tags</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {gig.searchTags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="group px-3 py-1.5 rounded-lg bg-white border border-emerald-300/80 text-emerald-950 font-medium text-xs flex items-center gap-2 shadow-xs"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => onCopy(tag, `Tag "${tag}"`)}
                      className="text-slate-400 hover:text-emerald-700 transition-colors"
                      title="Copy this tag"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRICING PACKAGES */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Fiverr 3-Tier Pricing Packages
                </h3>
                <p className="text-xs text-slate-500">
                  Structure your packages to give buyers a low barrier to entry, a popular middle option, and a high-ticket enterprise tier.
                </p>
              </div>
            </div>

            {/* 3 Packages Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Basic */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between hover:border-slate-300 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-700">
                      Basic
                    </span>
                    <button
                      onClick={() => copyPackageFormatted(gig.packages.basic, 'Basic')}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </button>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{gig.packages.basic.name}</h4>
                    <p className="text-xs text-slate-600 mt-1 italic">{gig.packages.basic.tagline}</p>
                    <div className="text-2xl font-black text-slate-900 mt-2">
                      ${gig.packages.basic.price} <span className="text-xs font-normal text-slate-500">USD</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80">
                    {gig.packages.basic.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-600 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {gig.packages.basic.deliveryDays} Days Delivery
                    </span>
                    <span className="flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      {gig.packages.basic.revisions}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-700">
                    {gig.packages.basic.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Standard */}
              <div className="p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/20 relative flex flex-col justify-between shadow-md shadow-emerald-500/5">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                  Most Popular
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pt-1">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                      Standard
                    </span>
                    <button
                      onClick={() => copyPackageFormatted(gig.packages.standard, 'Standard')}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </button>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{gig.packages.standard.name}</h4>
                    <p className="text-xs text-slate-600 mt-1 italic">{gig.packages.standard.tagline}</p>
                    <div className="text-2xl font-black text-emerald-700 mt-2">
                      ${gig.packages.standard.price} <span className="text-xs font-normal text-slate-500">USD</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-emerald-200/80">
                    {gig.packages.standard.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-600 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {gig.packages.standard.deliveryDays} Days Delivery
                    </span>
                    <span className="flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      {gig.packages.standard.revisions}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-emerald-200 text-xs text-slate-700">
                    {gig.packages.standard.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Premium */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between hover:border-slate-300 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800">
                      Premium VIP
                    </span>
                    <button
                      onClick={() => copyPackageFormatted(gig.packages.premium, 'Premium')}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </button>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{gig.packages.premium.name}</h4>
                    <p className="text-xs text-slate-600 mt-1 italic">{gig.packages.premium.tagline}</p>
                    <div className="text-2xl font-black text-slate-900 mt-2">
                      ${gig.packages.premium.price} <span className="text-xs font-normal text-slate-500">USD</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80">
                    {gig.packages.premium.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-600 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {gig.packages.premium.deliveryDays} Days Delivery
                    </span>
                    <span className="flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      {gig.packages.premium.revisions}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-700">
                    {gig.packages.premium.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Gig Extras */}
            {gig.extras && gig.extras.length > 0 && (
              <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  Recommended Up-Sell Gig Extras (High Profit Margin):
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {gig.extras.map((extra, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-start gap-2">
                      <div>
                        <p className="font-semibold text-xs text-slate-900">{extra.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{extra.description}</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 shrink-0">+${extra.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DESCRIPTION & FAQS */}
        {activeTab === 'description' && (
          <div className="space-y-6">
            {/* Description Container */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Fiverr Gig Description (Formatted for Editor)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Characters: <span className="font-semibold text-emerald-600">{gig.description.length}</span> / 1,200 limit (Fiverr maximum is 1,200 chars)
                  </p>
                </div>
                <button
                  onClick={() => onCopy(gig.description, 'Gig Description')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Description</span>
                </button>
              </div>

              {/* Formatted Preview */}
              <div className="bg-slate-50/70 p-5 rounded-xl text-slate-800 text-xs sm:text-sm font-normal leading-relaxed whitespace-pre-wrap font-sans border border-slate-200/80">
                {gig.description}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    <span>Frequently Asked Questions ({gig.faqs.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Adding 5+ FAQs prevents pre-order hesitation and improves gig ranking algorithms.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const allFaqs = gig.faqs.map((f, i) => `${i + 1}. Q: ${f.question}\nA: ${f.answer}`).join('\n\n');
                    onCopy(allFaqs, 'All FAQs');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All FAQs</span>
                </button>
              </div>

              <div className="space-y-2">
                {gig.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full px-4 py-3 text-left font-semibold text-xs sm:text-sm text-slate-800 flex items-center justify-between hover:bg-slate-50"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        {faq.question}
                      </span>
                      {expandedFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    {expandedFaq === idx && (
                      <div className="px-4 pb-3 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 flex items-start justify-between gap-4">
                        <p className="leading-relaxed">{faq.answer}</p>
                        <button
                          onClick={() => onCopy(`Q: ${faq.question}\nA: ${faq.answer}`, `FAQ #${idx + 1}`)}
                          className="shrink-0 p-1.5 text-slate-400 hover:text-emerald-700"
                          title="Copy this FAQ"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BUYER REQUIREMENTS */}
        {activeTab === 'requirements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Fiverr "Tell your buyer what you need to get started" Tab
                </h3>
                <p className="text-xs text-slate-500">
                  Clear requirements prevent order countdown timers from running while waiting on missing files!
                </p>
              </div>
              <button
                onClick={copyAllRequirements}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All Requirements</span>
              </button>
            </div>

            <div className="space-y-4">
              {gig.requirements.map((req, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-slate-200 text-slate-700 uppercase tracking-wide">
                        {req.type.replace('_', ' ')}
                      </span>
                      {req.required ? (
                        <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                          Required
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{req.prompt}</p>
                    {req.options && req.options.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {req.options.map((opt, i) => (
                          <span key={i} className="text-xs bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-600">
                            • {opt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onCopy(req.prompt, `Requirement Question #${idx + 1}`)}
                    className="p-2 text-slate-400 hover:text-slate-700 bg-white rounded-lg border border-slate-200 shadow-xs"
                    title="Copy Question"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: THUMBNAIL & GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Gig Thumbnail & Gallery Specifications
              </h3>
              <p className="text-xs text-slate-500">
                Fiverr recommended resolution: <strong>1280 x 769 px</strong> (16:9 ratio, min 712 x 430 px, under 5MB).
              </p>
            </div>

            {/* Thumbnail Canvas Visual Preview */}
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-white relative aspect-[16/9] max-w-xl mx-auto flex flex-col justify-between shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  TOP RATED DESIGN
                </span>
                <span className="text-[11px] text-slate-400 font-mono">1280 × 769 PX</span>
              </div>

              <div className="space-y-2 text-center py-4">
                <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                  {gig.thumbnailBrief.mainHeadline}
                </h4>
                <p className="text-sm font-semibold text-emerald-400 tracking-wide">
                  {gig.thumbnailBrief.subHeadline}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Safe Margin Zone: 15%</span>
                <span className="text-white font-medium">Clear Mockup / Badge Area</span>
              </div>
            </div>

            {/* Color Palette & Visual Layout Advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Recommended High-Contrast Color Palette:
                </h4>
                <div className="flex items-center gap-3">
                  {gig.thumbnailBrief.colorPalette.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border border-slate-300 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs font-medium text-slate-700">{c.name} ({c.hex})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Canva / Photoshop Layout Rule:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {gig.thumbnailBrief.canvaLayoutTips}
                </p>
              </div>
            </div>

            {/* AI Image Generation Prompt */}
            <div className="p-5 rounded-xl border border-purple-200 bg-purple-50/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>AI Prompt for Midjourney / DALL-E / Canva AI:</span>
                </div>
                <button
                  onClick={() => onCopy(gig.thumbnailBrief.aiPrompt, 'Thumbnail AI Prompt')}
                  className="px-2.5 py-1 text-xs font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </button>
              </div>
              <p className="text-xs font-mono bg-white p-3 rounded-lg border border-purple-200 text-slate-700 break-words">
                {gig.thumbnailBrief.aiPrompt}
              </p>
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT & PRO TIPS */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Fiverr Algorithmic Readiness Score
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-emerald-950">{gig.auditScore || 98}</span>
                  <span className="text-sm font-semibold text-emerald-700">/ 100 Points</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Passed all high-ranking criteria: Title length, keyword density, 5 tags, 3-tier price spread, and complete FAQ objections handled.
                </p>
              </div>
              <div className="w-full sm:w-auto p-4 rounded-xl bg-white border border-emerald-200 text-xs space-y-1 text-slate-700">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SEO Title: Under 80 chars ({gig.title.length} chars)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Search Tags: All 5 slots utilized</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3-Tier Packages: Clear scope differentiation</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>FAQs: {gig.faqs.length} objection clearers</span>
                </div>
              </div>
            </div>

            {/* Pro Tips from Top 1% Sellers */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Proven Strategies to Win Your First 5 Fiverr Orders:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gig.proTips.map((tip, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reminder on account safety */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3">
              <p>
                <strong>Friendly Reminder:</strong> You never need to hand over your Fiverr password to anyone. You are in complete control of your account!
              </p>
              <button
                onClick={onOpenSafetyNotice}
                className="font-bold underline shrink-0 hover:text-amber-950"
              >
                Read Safety Policy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
