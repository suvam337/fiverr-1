import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Check } from 'lucide-react';
import { Product } from '../../types/ecommerce';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const badgeColorMap: Record<string, string> = {
    'Best Seller': 'bg-amber-500/90 text-white',
    'New': 'bg-indigo-600 text-white',
    'Sale': 'bg-rose-500 text-white',
    'Featured': 'bg-emerald-600 text-white',
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
              badgeColorMap[product.badge] || 'bg-slate-900 text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <button
            type="button"
            className="pointer-events-auto bg-white/95 backdrop-blur-sm text-slate-800 hover:text-emerald-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>

        {/* Stock status indicator */}
        <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-200">
          {product.stock > 5 ? (
            <span className="text-emerald-400 font-semibold">{product.stock} in stock</span>
          ) : product.stock > 0 ? (
            <span className="text-amber-400 font-semibold">Only {product.stock} left</span>
          ) : (
            <span className="text-rose-400 font-semibold">Backorder</span>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-emerald-700 font-medium tracking-wide uppercase text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-slate-700 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name & Tagline */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-500 text-xs mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={product.stock <= 0}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : product.stock <= 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-emerald-600 text-white active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
