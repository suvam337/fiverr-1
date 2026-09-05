import React, { useState } from 'react';
import { BarChart3, AlertCircle, CheckCircle2, Wand2, Loader2, ArrowRight } from 'lucide-react';

interface GigAuditorProps {
  onCopy: (text: string, label: string) => void;
}

export const GigAuditor: React.FC<GigAuditorProps> = ({ onCopy }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<{
    score: number;
    issues: string[];
    suggestions: string[];
  } | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsAuditing(true);
    try {
      const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean);
      const res = await fetch('/api/optimize-gig', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          tags: tagList,
          description,
        }),
      });
      const data = await res.json();
      setAuditResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleLoadSample = () => {
    setTitle('I will make you a website fast');
    setTags('website, web developer');
    setDescription('Hello I am a web developer with 5 years experience. I can build websites. Contact me.');
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-500" />
            <span>Fiverr SEO & Algorithm Auditor</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit your existing draft against Fiverr's ranking signals (title length, keyword density, and search tags).
          </p>
        </div>
        <button
          type="button"
          onClick={handleLoadSample}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
        >
          Load Weak Draft Sample to Test
        </button>
      </div>

      <form onSubmit={handleAudit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Fiverr Gig Title (starts with "I will"):
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. I will design a modern luxury logo for your startup"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">
            Current length: {title.length} chars (Target: 40-70 characters)
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Search Tags (Comma separated, max 5):
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. web design, react js, frontend, full stack, website"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Gig Description:
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paste your gig description text here..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">
            Current length: {description.length} chars (Target: 800 - 1,150 chars)
          </span>
        </div>

        <button
          type="submit"
          disabled={isAuditing || !title.trim()}
          className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm"
        >
          {isAuditing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Ranking Signals...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Run Algorithm Audit</span>
            </>
          )}
        </button>
      </form>

      {/* Audit Result Display */}
      {auditResult && (
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                SEO & Algorithm Readiness
              </span>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-black ${auditResult.score >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {auditResult.score}
                </span>
                <span className="text-xs text-slate-500">/ 100</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-700">
                {auditResult.score >= 85 ? '🟢 Ready to Publish' : '🟠 Needs Improvement'}
              </span>
            </div>
          </div>

          {auditResult.issues.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Detected Ranking Flaws ({auditResult.issues.length})</span>
              </h4>
              <ul className="space-y-1 text-xs text-rose-900">
                {auditResult.issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span>•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {auditResult.suggestions.length > 0 && (
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Recommended Optimizations</span>
              </h4>
              <div className="space-y-2 text-xs text-sky-950">
                {auditResult.suggestions.map((sug, idx) => (
                  <div key={idx} className="p-2.5 bg-white rounded-lg border border-sky-200/80 leading-relaxed">
                    {sug}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
