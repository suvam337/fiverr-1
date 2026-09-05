import React from 'react';
import { Sparkles, ShieldCheck, Zap, BarChart3, HelpCircle, FileDown } from 'lucide-react';
import { GigData } from '../types';

interface HeaderProps {
  currentTab: 'generator' | 'presets' | 'auditor' | 'guide';
  onSelectTab: (tab: 'generator' | 'presets' | 'auditor' | 'guide') => void;
  onOpenSafety: () => void;
  currentGig: GigData | null;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSafety,
  currentGig,
  onExport,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-black text-xl tracking-tighter">
              fi
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                  Fiverr Gig Builder
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                  Top 1% Architect
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Create high-ranking, high-converting gigs without sharing account credentials
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onSelectTab('generator')}
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                currentTab === 'generator'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Gig Architect</span>
            </button>

            <button
              onClick={() => onSelectTab('presets')}
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                currentTab === 'presets'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Top Niches</span>
              <span className="sm:hidden">Presets</span>
            </button>

            <button
              onClick={() => onSelectTab('auditor')}
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                currentTab === 'auditor'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-sky-500" />
              <span>SEO Audit</span>
            </button>

            <button
              onClick={() => onSelectTab('guide')}
              className={`hidden md:flex px-3 py-2 rounded-lg text-sm font-medium items-center gap-1.5 transition-all ${
                currentTab === 'guide'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span>Fiverr Guide</span>
            </button>
          </nav>

          {/* Right Actions: Safety + Export */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSafety}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 flex items-center gap-1.5 transition-colors"
              title="Learn why you should never share your account login"
            >
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">Account Safety</span>
            </button>

            {currentGig && (
              <button
                onClick={onExport}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 transition-colors"
                title="Export complete gig as Markdown"
              >
                <FileDown className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
