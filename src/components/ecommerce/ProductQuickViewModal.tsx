import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RefreshCw, ShoppingCart, Check, ChevronRight } from 'lucide-react';
import { Product } from '../../types/ecommerce';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductQuickViewModal({ product, onClose, onAddToCart }: ProductQuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentImg = selectedImage || product.imageUrl;
  const allImages = [product.imageUrl, ...(product.additionalImages || [])];

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Media Gallery */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
            <div className="relative aspect-4/3 w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs mb-4">
              <img
                src={currentImg}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {allImages.length > 1 && (
              <div className="flex gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      currentImg === img ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Value Props Bar */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-emerald-600 mb-1" />
                <span>Free 2-Day Ship</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-emerald-600 mb-1" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-500">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {product.name}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium">
                {product.tagline}
              </p>

              {/* Price Row */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-slate-400 line-through font-medium">
                      ${product.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Stock info */}
              <div className="mt-2 text-xs font-semibold">
                {product.stock > 0 ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    In Stock ({product.stock} units ready to ship from US warehouse)
                  </span>
                ) : (
                  <span className="text-rose-600">Currently Out of Stock</span>
                )}
              </div>

              {/* Description */}
              <div className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </div>

              {/* Key Features bullet points */}
              {product.features && product.features.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Key Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Specs Table */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mt-5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex flex-col py-0.5 border-b border-slate-200/50 last:border-0">
                        <span className="text-slate-400 font-medium">{key}</span>
                        <span className="text-slate-800 font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart Button */}
            <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-700 hover:text-slate-900 font-bold hover:bg-slate-200/70 rounded-lg cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-slate-900 text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-700 hover:text-slate-900 font-bold hover:bg-slate-200/70 rounded-lg cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={product.stock <= 0}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : product.stock <= 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 hover:bg-emerald-600 text-white active:scale-98'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added {quantity} to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart (${(product.price * quantity).toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
