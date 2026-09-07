import React, { useState, useEffect } from 'react';
import { EcommerceNavbar } from './components/ecommerce/EcommerceNavbar';
import { StorefrontView } from './components/ecommerce/StorefrontView';
import { ProductQuickViewModal } from './components/ecommerce/ProductQuickViewModal';
import { CartDrawer } from './components/ecommerce/CartDrawer';
import { CheckoutModal } from './components/ecommerce/CheckoutModal';
import { AdminPortal } from './components/ecommerce/AdminPortal';
import { PortfolioGuideModal } from './components/ecommerce/PortfolioGuideModal';

// Gig Builder Components
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
import { Product, CartItem, Coupon, Order } from './types/ecommerce';
import { INITIAL_PRODUCTS, AVAILABLE_COUPONS } from './data/seedProducts';

export default function App() {
  // Main View Router
  const [activeView, setActiveView] = useState<'storefront' | 'admin' | 'portfolio' | 'gig_builder'>('storefront');

  // E-Commerce Storefront State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart & Checkout State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('apex_cart');
      return saved ? JSON.parse(saved) : [
        { product: INITIAL_PRODUCTS[0], quantity: 1 },
        { product: INITIAL_PRODUCTS[1], quantity: 1 },
      ];
    } catch {
      return [{ product: INITIAL_PRODUCTS[0], quantity: 1 }];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(AVAILABLE_COUPONS[0]); // MERN20 preloaded for great UX!

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('apex_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Fetch products from Express backend
  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (sortBy) params.append('sort', sortBy);
      if (inStockOnly) params.append('inStockOnly', 'true');

      const res = await fetch(`/api/ecommerce/products?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to load products from API:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const handleApplyCoupon = async (code: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/ecommerce/apply-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.success && data.coupon) {
        setAppliedCoupon(data.coupon);
        showToast(`Promo code "${data.coupon.code}" applied: ${data.coupon.discountPercent}% off!`);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const handleOrderSuccess = (order: Order) => {
    setCartItems([]);
    showToast(`Order ${order.orderNumber} successfully placed!`);
  };

  // Gig Builder State (Preserved from earlier turn)
  const [currentGig, setCurrentGig] = useState<GigData>(PRESET_GIGS[0]);
  const [currentTab, setCurrentTab] = useState<'generator' | 'presets' | 'auditor' | 'guide'>('generator');
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Unified Navigation */}
      <EcommerceNavbar
        activeView={activeView}
        onViewChange={(view) => setActiveView(view)}
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: E-COMMERCE STOREFRONT */}
        {activeView === 'storefront' && (
          <StorefrontView
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            inStockOnly={inStockOnly}
            onInStockToggle={() => setInStockOnly(!inStockOnly)}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onOpenAdmin={() => setActiveView('admin')}
          />
        )}

        {/* VIEW 2: ADMIN & REST API PORTAL */}
        {activeView === 'admin' && (
          <AdminPortal
            onBackToStore={() => setActiveView('storefront')}
            onRefreshTrigger={fetchProducts}
          />
        )}

        {/* VIEW 3: FIVERR PORTFOLIO SHOWCASE GUIDE */}
        {activeView === 'portfolio' && (
          <PortfolioGuideModal
            onGoToStore={() => setActiveView('storefront')}
            onGoToAdmin={() => setActiveView('admin')}
          />
        )}

        {/* VIEW 4: FIVERR GIG BUILDER TOOLS */}
        {activeView === 'gig_builder' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-base text-slate-900">Fiverr Gig Content & SEO Suite</h2>
                <p className="text-xs text-slate-500">Rank high on Fiverr search with 100% compliant titles, descriptions & pricing packages.</p>
              </div>
              <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setCurrentTab('generator')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentTab === 'generator' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Generator
                </button>
                <button
                  onClick={() => setCurrentTab('presets')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentTab === 'presets' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Presets
                </button>
                <button
                  onClick={() => setCurrentTab('auditor')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentTab === 'auditor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  SEO Auditor
                </button>
                <button
                  onClick={() => setCurrentTab('guide')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentTab === 'guide' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  6-Step Guide
                </button>
              </div>
            </div>

            {currentTab === 'generator' && (
              <div className="space-y-8">
                <GigGeneratorForm
                  onGenerate={handleGenerate}
                  isLoading={isLoading}
                  onSelectPresetNiche={(nicheId) => {
                    const found = PRESET_GIGS.find((p) => p.id === nicheId);
                    if (found) handleSelectPreset(found);
                  }}
                />
                {currentGig && (
                  <GigDisplay
                    gig={currentGig}
                    onCopy={handleCopy}
                    onOpenSafetyNotice={() => setIsSafetyModalOpen(true)}
                  />
                )}
              </div>
            )}

            {currentTab === 'presets' && <PresetBrowser onSelectGig={handleSelectPreset} />}
            {currentTab === 'auditor' && <GigAuditor onCopy={handleCopy} />}
            {currentTab === 'guide' && <FiverrStepGuide />}
          </div>
        )}
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
      />

      {/* Checkout Simulator Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderSuccess={handleOrderSuccess}
        onViewInAdmin={() => {
          setIsCheckoutOpen(false);
          setActiveView('admin');
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-700">ApexTech MERN Full-Stack E-Commerce</span>
            <span className="text-slate-400">| Designed for Suvam Sharma's Fiverr Portfolio</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>React 19</span>
            <span>•</span>
            <span>Express.js REST</span>
            <span>•</span>
            <span>MongoDB Schema</span>
            <span>•</span>
            <span>Stripe Simulator</span>
          </div>
        </div>
      </footer>

      {/* Toast feedback */}
      <Toast message={toastMessage} />

      {/* Safety Modal */}
      <SafetyNoticeModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />
    </div>
  );
}
