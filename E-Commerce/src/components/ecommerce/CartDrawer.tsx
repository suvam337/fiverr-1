import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import { CartItem, Coupon } from '../../types/ecommerce';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => Promise<boolean>;
  onRemoveCoupon: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 150;
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const estimatedTax = discountedSubtotal * 0.0825;
  const shippingFee = subtotal === 0 ? 0 : discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15;
  const total = discountedSubtotal + estimatedTax + shippingFee;

  const progressToFreeShip = Math.min(100, (discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    setCouponError('');
    const success = await onApplyCoupon(couponInput.trim());
    if (!success) {
      setCouponError('Invalid code. Try MERN20 or DEV10');
    } else {
      setCouponInput('');
    }
    setIsApplying(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Top Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="font-bold text-base tracking-tight">Shopping Bag</h2>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cartItems.length > 0 && (
            <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100 text-xs">
              <div className="flex justify-between items-center mb-1.5 font-medium text-emerald-950">
                {amountNeededForFreeShip > 0 ? (
                  <span>
                    Add <strong className="text-emerald-700 font-bold">${amountNeededForFreeShip.toFixed(2)}</strong> more for Free Shipping
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <Check className="w-3.5 h-3.5" /> You unlocked Free Priority Shipping!
                  </span>
                )}
                <span className="font-mono text-[11px] text-emerald-700">{Math.round(progressToFreeShip)}%</span>
              </div>
              <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressToFreeShip}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-700 text-sm">Your cart is empty</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Browse our high-performance developer accessories and audio gear to populate your cart.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover border border-slate-200 bg-white shrink-0"
                  />

                  {/* Info & Quantity controls */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-emerald-700 font-medium uppercase tracking-wider">
                          {item.product.category}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                      {/* Stepper */}
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold hover:bg-slate-100 rounded-l cursor-pointer text-xs"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-bold text-slate-800 text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold hover:bg-slate-100 rounded-r cursor-pointer text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Price total for item */}
                      <span className="font-extrabold text-slate-900 text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations & Checkout CTA */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3.5">
              {/* Promo code form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-slate-500 hover:text-rose-600 text-[11px] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code (e.g. MERN20)"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isApplying || !couponInput.trim()}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>}

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-semibold text-slate-800">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-800">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900">
                  <span>Total</span>
                  <span className="text-lg text-emerald-700">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-98 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Stripe Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Encrypted 256-bit SSL Simulated Stripe Gateway</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
