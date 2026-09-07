import React from 'react';
import { ShoppingBag, Search, Database, X } from 'lucide-react';
import { CartItem } from '../../types/ecommerce';

interface EcommerceNavbarProps {
  activeView: 'storefront' | 'admin';
  onViewChange: (view: 'storefront' | 'admin') => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function EcommerceNavbar({
  activeView,
  onViewChange,
  cartItems,
  onOpenCart,
  searchQuery,
  onSearchChange,
}: EcommerceNavbarProps) {
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top micro-bar for system status */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Full-Stack MERN Platform
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-mono text-[11px]">
            MongoDB Atlas • Express REST APIs • React 19 • Node.js
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
          <span>Stripe Simulator Connected</span>
          <span className="text-slate-600">•</span>
          <span>Port 3000 Active</span>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onViewChange('storefront')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center font-bold text-white shadow-inner group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div>
              <div className="font-bold tracking-tight text-base sm:text-lg flex items-center gap-1.5 text-white">
                ApexTech <span className="text-emerald-400 font-normal text-xs px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/50">MERN</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Full-Stack E-Commerce Platform</p>
            </div>
          </button>

          {/* Primary View Switcher Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => onViewChange('storefront')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'storefront'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Storefront
            </button>
            <button
              onClick={() => onViewChange('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'admin'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Admin & Inventory Portal
            </button>
          </nav>
        </div>

        {/* Search Bar (active in storefront) */}
        {activeView === 'storefront' && (
          <div className="flex-1 max-w-md mx-2 relative hidden sm:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search keyboards, audio, docks..."
              className="w-full bg-slate-800/90 text-slate-100 placeholder-slate-400 text-xs sm:text-sm pl-9 pr-8 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Mobile view quick switcher */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => onViewChange(activeView === 'storefront' ? 'admin' : 'storefront')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700"
            >
              {activeView === 'storefront' ? '⚙️ Admin' : '🛍️ Store'}
            </button>
          </div>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-900 animate-scale-in">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">
              {totalCartCount > 0 ? `$${cartSubtotal.toFixed(2)}` : 'Cart'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
