import React from 'react';
import { PRESET_GIGS } from '../data/presets';
import { GigData } from '../types';
import { ArrowRight, Tag, Check, Award, Layers } from 'lucide-react';

interface PresetBrowserProps {
  onSelectGig: (gig: GigData) => void;
}

export const PresetBrowser: React.FC<PresetBrowserProps> = ({ onSelectGig }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              High-Demand Fiverr Niche Blueprints (Ready to Copy)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Battle-tested presets crafted using real top-ranked Fiverr keywords, competitive pricing structures, and objection-killing descriptions.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 self-start sm:self-auto">
            {PRESET_GIGS.length} Top Niches Pre-loaded
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {PRESET_GIGS.map((preset) => (
            <div
              key={preset.id}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {preset.niche}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Score: {preset.auditScore}/100
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {preset.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {preset.packages.standard.description}
                </p>

                {/* Pricing & Tags preview */}
                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="font-semibold text-slate-800">
                    Pricing: ${preset.packages.basic.price} - ${preset.packages.premium.price}
                  </span>
                  <span>•</span>
                  <span>{preset.packages.standard.deliveryDays}d delivery</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {preset.searchTags.map((tag, i) => (
                    <span key={i} className="text-[11px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {preset.faqs.length} FAQs • 3 Packages Included
                </span>
                <button
                  onClick={() => onSelectGig(preset)}
                  className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Load & Customize</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
