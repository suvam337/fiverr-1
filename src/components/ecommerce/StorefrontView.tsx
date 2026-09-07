import React, { useState } from 'react';
import { Product, CartItem } from '../../types/ecommerce';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, CheckCircle2, ShieldCheck, Zap, Laptop, ArrowRight } from 'lucide-react';

interface StorefrontViewProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  inStockOnly: boolean;
  onInStockToggle: () => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onOpenAdmin: () => void;
}

const CATEGORIES = ['All', 'Audio', 'Developer Gear', 'Workstation', 'Wearables', 'Smart Home'];

export function StorefrontView({
  products,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  inStockOnly,
  onInStockToggle,
  onAddToCart,
  onQuickView,
  onOpenAdmin,
}: StorefrontViewProps) {
  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Hero Showcase Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-radial from-slate-900 via-slate-950 to-slate-950 text-white border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Production MERN E-Commerce Platform
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Engineered Workspace Tech & Modern Developer Gear
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            A full-stack e-commerce web application featuring real-time MongoDB catalog filtering, custom Express.js REST APIs, interactive cart state, and a simulated Stripe checkout engine.
          </p>

          {/* Key Architectural badges */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/80 font-medium">
              ⚡ React 19 Frontend
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/80 font-medium">
              🚀 Express & Node.js Backend
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/80 font-medium">
              🍃 MongoDB Document Store
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/80 font-medium">
              💳 Stripe Checkout Simulator
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#catalog"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              Explore Products ({products.length})
            </a>
            <button
              onClick={onOpenAdmin}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>View Admin Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Category Controls Section */}
      <div id="catalog" className="pt-4 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & In-Stock filter */}
          <div className="flex items-center gap-3 self-end md:self-auto text-xs">
            <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={onInStockToggle}
                className="w-3.5 h-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>In-stock only</span>
            </label>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 mt-6 p-8">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">No matching products found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or clearing category filters.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/60">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Instant API Response</h4>
            <p className="text-[11px] text-slate-400">Node/Express server caching</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-800/60">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Secure Transactions</h4>
            <p className="text-[11px] text-slate-400">Encrypted Stripe webhook auth</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center shrink-0 border border-amber-800/60">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Mobile Optimized</h4>
            <p className="text-[11px] text-slate-400">Tailwind fluid layouts</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center shrink-0 border border-purple-800/60">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Verified Inventory</h4>
            <p className="text-[11px] text-slate-400">Real-time stock reservation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
