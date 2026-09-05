import React, { useState } from 'react';
import { Header } from './components/Header';
import { SafetyNoticeModal } from './components/SafetyNoticeModal';
import { GigGeneratorForm } from './components/GigGeneratorForm';
import { GigDisplay } from './components/GigDisplay';
import { PresetBrowser } from './components/PresetBrowser';
import { GigAuditor } from './components/GigAuditor';
import { FiverrStepGuide } from './components/FiverrStepGuide';
import { Toast } from './components/Toast';
import { PRESET_GIGS } from './data/presets';
import { GigData, GenerateGigParams } from './types';
import { ShieldAlert, ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';

export default function App() {
  const [currentGig, setCurrentGig] = useState<GigData>(PRESET_GIGS[0]);
  const [currentTab, setCurrentTab] = useState<'generator' | 'presets' | 'auditor' | 'guide'>('generator');
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSecurityBanner, setShowSecurityBanner] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  const handleGenerate = async (params: GenerateGigParams) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-gig', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      if (data.gig) {
        setCurrentGig(data.gig);
        showToast('New Perfect Gig generated successfully!');
      }
    } catch (err) {
      console.error('Failed to generate gig:', err);
      showToast('Error connecting to AI service. Using optimized template.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (gig: GigData) => {
    setCurrentGig(gig);
    setCurrentTab('generator');
    showToast(`Loaded "${gig.niche}" Gig Blueprint!`);
  };

  const handleExport = () => {
    if (!currentGig) return;
    const content = `# FIVERR GIG BLUEPRINT: ${currentGig.title}

## OVERVIEW
- Category: ${currentGig.category} > ${currentGig.subcategory}
- Service Type: ${currentGig.serviceType}
- 5 Search Tags: ${currentGig.searchTags.join(', ')}
- SEO Keywords: ${currentGig.seoKeywords.join(', ')}

## PRICING PACKAGES
### 1. Basic: ${currentGig.packages.basic.name} ($${currentGig.packages.basic.price})
- Tagline: ${currentGig.packages.basic.tagline}
- Delivery: ${currentGig.packages.basic.deliveryDays} Days
- Revisions: ${currentGig.packages.basic.revisions}
- Scope: ${currentGig.packages.basic.description}
- Features:
${currentGig.packages.basic.features.map((f) => `  * ${f}`).join('\n')}

### 2. Standard: ${currentGig.packages.standard.name} ($${currentGig.packages.standard.price})
- Tagline: ${currentGig.packages.standard.tagline}
- Delivery: ${currentGig.packages.standard.deliveryDays} Days
- Revisions: ${currentGig.packages.standard.revisions}
- Scope: ${currentGig.packages.standard.description}
- Features:
${currentGig.packages.standard.features.map((f) => `  * ${f}`).join('\n')}

### 3. Premium: ${currentGig.packages.premium.name} ($${currentGig.packages.premium.price})
- Tagline: ${currentGig.packages.premium.tagline}
- Delivery: ${currentGig.packages.premium.deliveryDays} Days
- Revisions: ${currentGig.packages.premium.revisions}
- Scope: ${currentGig.packages.premium.description}
- Features:
${currentGig.packages.premium.features.map((f) => `  * ${f}`).join('\n')}

## GIG DESCRIPTION
${currentGig.description}

## FREQUENTLY ASKED QUESTIONS
${currentGig.faqs.map((f, i) => `Q${i + 1}: ${f.question}\nA: ${f.answer}`).join('\n\n')}

## BUYER REQUIREMENTS
${currentGig.requirements.map((r, i) => `${i + 1}. [${r.type}] ${r.prompt} (${r.required ? 'Required' : 'Optional'})`).join('\n')}

## THUMBNAIL DESIGN BRIEF
- Headline: ${currentGig.thumbnailBrief.mainHeadline}
- Sub-headline: ${currentGig.thumbnailBrief.subHeadline}
- Canva Layout Rule: ${currentGig.thumbnailBrief.canvaLayoutTips}
- AI Image Prompt: ${currentGig.thumbnailBrief.aiPrompt}
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `fiverr-gig-${currentGig.niche.toLowerCase().replace(/\s+/g, '-')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported complete Gig Blueprint (.md)');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSafety={() => setIsSafetyModalOpen(true)}
        currentGig={currentGig}
        onExport={handleExport}
      />

      {/* Security Advisory Alert Bar */}
      {showSecurityBanner && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-4 py-2.5 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-100" />
              <span>
                <strong>Important Security Answer:</strong> Never give anyone access or passwords to your Fiverr account! We generate the 100% complete, copy-paste-ready gig blueprint for you right here safely.
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsSafetyModalOpen(true)}
                className="underline font-bold hover:text-amber-100"
              >
                Why account sharing is unsafe &rarr;
              </button>
              <button
                onClick={() => setShowSecurityBanner(false)}
                className="text-amber-100 hover:text-white text-xs px-1"
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {currentTab === 'generator' && (
          <div className="space-y-8">
            {/* Input Form */}
            <GigGeneratorForm
              onGenerate={handleGenerate}
              isLoading={isLoading}
              onSelectPresetNiche={(nicheId) => {
                const found = PRESET_GIGS.find((p) => p.id === nicheId);
                if (found) handleSelectPreset(found);
              }}
            />

            {/* Live Gig Workspace */}
            {currentGig && (
              <GigDisplay
                gig={currentGig}
                onCopy={handleCopy}
                onOpenSafetyNotice={() => setIsSafetyModalOpen(true)}
              />
            )}
          </div>
        )}

        {currentTab === 'presets' && (
          <PresetBrowser onSelectGig={handleSelectPreset} />
        )}

        {currentTab === 'auditor' && (
          <GigAuditor onCopy={handleCopy} />
        )}

        {currentTab === 'guide' && (
          <FiverrStepGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-medium text-slate-700">
            Fiverr Gig Builder • Crafted for High-Ranking Freelancers & Agencies
          </p>
          <p>
            Always keep your account credentials private. Fiverr is a registered trademark of Fiverr International Ltd.
          </p>
        </div>
      </footer>

      {/* Toast Notification */}
      <Toast message={toastMessage} />

      {/* Safety Policy Modal */}
      <SafetyNoticeModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />
    </div>
  );
}
