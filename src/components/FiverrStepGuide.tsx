import React from 'react';
import { Tag, Layers, CheckCircle2, FileQuestion, ImageIcon, Rocket, ShieldCheck } from 'lucide-react';

export const FiverrStepGuide: React.FC = () => {
  const steps = [
    {
      step: '1',
      name: 'Overview Tab',
      icon: Tag,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      action: 'Copy & Paste:',
      fields: ['Gig Title (e.g. "I will develop a modern full stack web app in react")', 'Category & Subcategory selector', 'Search Tags (Paste all 5 search tags)'],
      proTip: 'Make sure the title starts with "I will" and is under 80 characters.',
    },
    {
      step: '2',
      name: 'Pricing Tab',
      icon: Layers,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      action: 'Copy & Paste:',
      fields: ['Toggle "Offer Packages" to ON for 3 tiers', 'Basic, Standard, Premium package names & taglines', 'Delivery times, revisions, and price points', 'Add Gig Extras (Fast 24hr delivery, extra revisions)'],
      proTip: 'Tier your prices so Standard is the most compelling sweet spot.',
    },
    {
      step: '3',
      name: 'Description & FAQ Tab',
      icon: CheckCircle2,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      action: 'Copy & Paste:',
      fields: ['Paste the formatted Description (uses bold headings & bullets)', 'Click "Add FAQ" for each of the 5 pre-written questions & answers'],
      proTip: 'Always include "Contact me before ordering" to avoid mismatched scopes.',
    },
    {
      step: '4',
      name: 'Requirements Tab',
      icon: FileQuestion,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      action: 'Copy & Paste:',
      fields: ['Add the 3 pre-written Buyer Questions', 'Mark critical questions (like raw assets) as "Required"'],
      proTip: 'The order clock does not start until the buyer completes requirements.',
    },
    {
      step: '5',
      name: 'Gallery Tab',
      icon: ImageIcon,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      action: 'Upload:',
      fields: ['Thumbnail image (1280 x 769 px) created from our Thumbnail Spec', 'Up to 2 extra sample portfolio images or PDF case studies'],
      proTip: 'High contrast text and clean mockups increase click-through rates by up to 200%.',
    },
    {
      step: '6',
      name: 'Publish & Rank',
      icon: Rocket,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      action: 'Hit Publish:',
      fields: ['Review terms and click Publish Gig', 'Share gig link with initial network to get your first 1-2 orders & 5-star reviews'],
      proTip: 'Reply to every buyer inquiry within 1 hour to maximize the Fiverr algorithm boost.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-emerald-600" />
            <span>How to Paste Your Gig into Fiverr (6-Step Roadmap)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Follow this step-by-step walkthrough in your Fiverr Seller Dashboard. Total time: ~3 minutes.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Zero Login Shared • 100% TOS Compliant</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between hover:border-slate-300 transition-all space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {st.step}
                  </span>
                  <span className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 ${st.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span>Fiverr Tab</span>
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{st.name}</h3>

                <div className="space-y-1 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">{st.action}</span>
                  <ul className="space-y-1 pl-1">
                    {st.fields.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-500 italic">
                <strong className="text-slate-700 not-italic font-semibold">Pro tip: </strong>
                {st.proTip}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
