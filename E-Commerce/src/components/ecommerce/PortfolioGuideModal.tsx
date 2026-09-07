import React, { useState } from 'react';
import { Camera, Check, Copy, ExternalLink, Sparkles, Star, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

interface PortfolioGuideModalProps {
  onGoToStore: () => void;
  onGoToAdmin: () => void;
}

export function PortfolioGuideModal({ onGoToStore, onGoToAdmin }: PortfolioGuideModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const projectTitle = "Full-Stack MERN E-Commerce & SaaS Platform";

  const projectDescription = `A responsive, production-ready Full-Stack MERN E-Commerce web application built with React, Node.js, Express, and MongoDB.

Key Features Implemented:
- Dynamic Product Catalog with instant keyword search and category filtering
- Slide-out Shopping Cart drawer with quantity steppers and promo code engine (MERN20)
- End-to-end simulated Stripe checkout flow with real-time tax calculation and order confirmation receipts
- Admin Management Portal with live inventory stock updates (+/-) and order fulfillment tracking
- Secure RESTful APIs with modular Express routing and MongoDB document schemas
- 100% responsive, mobile-first design styled with Tailwind CSS`;

  const skillsTags = "React.js, Node.js, Express.js, MongoDB, Tailwind CSS, REST API, Stripe, JavaScript, Web Development";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Fiverr Portfolio Kit for Suvam Sharma
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          How to Add This Project to Your Fiverr Portfolio
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Use this live application to take 3 high-resolution screenshots and paste the pre-written details into your Fiverr "Create new project" screen.
        </p>
      </div>

      {/* 3 Screenshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Screenshot 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Screenshot 1: Storefront Catalog</h3>
            <p className="text-xs text-slate-500 mt-1">
              Captures modern UI, high-contrast product cards, search bar, and category filters.
            </p>
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1">
              <strong>How to take it:</strong>
              <p>Go to the Storefront tab. Make sure the screen looks clean and press <kbd className="bg-slate-200 px-1 py-0.5 rounded">Win + Shift + S</kbd> (or Mac <kbd className="bg-slate-200 px-1 py-0.5 rounded">Cmd + Shift + 4</kbd>) to capture the top hero and product cards.</p>
            </div>
          </div>
          <button
            onClick={onGoToStore}
            className="mt-4 w-full py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Open Storefront to Capture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Screenshot 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Screenshot 2: Cart & Stripe Checkout</h3>
            <p className="text-xs text-slate-500 mt-1">
              Proves transactional capability, discount code calculations, and payment gateway UI.
            </p>
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1">
              <strong>How to take it:</strong>
              <p>Add 2 items to the cart, open the Cart Drawer or Checkout modal, and screenshot the elegant Stripe payment element.</p>
            </div>
          </div>
          <button
            onClick={onGoToStore}
            className="mt-4 w-full py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Open Storefront & Add to Cart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Screenshot 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Screenshot 3: Admin & Orders Portal</h3>
            <p className="text-xs text-slate-500 mt-1">
              Proves backend CRUD operations, stock management, and order fulfillment status control.
            </p>
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1">
              <strong>How to take it:</strong>
              <p>Switch to the Admin & REST API tab. Capture the Gross Revenue metrics and the Live Inventory table.</p>
            </div>
          </div>
          <button
            onClick={onGoToAdmin}
            className="mt-4 w-full py-2 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Open Admin Portal to Capture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Ready-to-Copy Content Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold">Copy-Paste Information for Fiverr Portfolio</h2>
            <p className="text-xs text-slate-400">Directly paste these into the "Create new project" fields on Fiverr.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs border border-emerald-800 font-mono">
            Optimized for Conversions
          </span>
        </div>

        {/* Field 1: Title */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-300">1. Project Title</span>
            <button
              onClick={() => copyToClipboard(projectTitle, 'title')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'title' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'title' ? 'Copied!' : 'Copy Title'}</span>
            </button>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl font-medium text-xs sm:text-sm text-white border border-slate-700">
            {projectTitle}
          </div>
        </div>

        {/* Field 2: Description */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-300">2. Project Description</span>
            <button
              onClick={() => copyToClipboard(projectDescription, 'desc')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'desc' ? 'Copied!' : 'Copy Description'}</span>
            </button>
          </div>
          <pre className="p-4 bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-700 font-sans whitespace-pre-wrap leading-relaxed">
            {projectDescription}
          </pre>
        </div>

        {/* Field 3: Skills / Tags */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-300">3. Skills & Tags to Select</span>
            <button
              onClick={() => copyToClipboard(skillsTags, 'tags')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'tags' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'tags' ? 'Copied!' : 'Copy Tags'}</span>
            </button>
          </div>
          <div className="p-3 bg-slate-800 rounded-xl text-xs text-emerald-300 border border-slate-700 font-mono">
            {skillsTags}
          </div>
        </div>
      </div>
    </div>
  );
}
