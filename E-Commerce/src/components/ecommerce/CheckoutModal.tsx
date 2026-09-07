import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2, Truck, Sparkles, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { CartItem, Coupon, Order, ShippingAddress } from '../../types/ecommerce';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  onOrderSuccess: (order: Order) => void;
  onViewInAdmin: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  appliedCoupon,
  onOrderSuccess,
  onViewInAdmin,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'shipping' | 'payment' | 'processing' | 'success'>('shipping');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Shipping Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
  });

  // Card Simulator State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const estimatedTax = discountedSubtotal * 0.0825;
  const shippingFee = discountedSubtotal >= 150 ? 0 : 15;
  const grandTotal = discountedSubtotal + estimatedTax + shippingFee;

  // Auto-fill mock customer details for quick demo/video
  const handleAutoFillDemo = () => {
    setFormData({
      fullName: 'Alex Reynolds',
      email: 'alex.reynolds@example.com',
      address: '450 Tech Parkway, Suite 210',
      city: 'Seattle',
      postalCode: '98101',
      country: 'United States',
    });
  };

  // Auto-fill mock Stripe test card
  const handleAutoFillCard = () => {
    setCardNumber('4242 •••• •••• 4242');
    setCardExpiry('12/28');
    setCardCvc('884');
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address || !formData.city) {
      setErrorMessage('Please fill out all required shipping fields.');
      return;
    }
    setErrorMessage('');
    setStep('payment');
  };

  const handleExecutePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setErrorMessage('');

    try {
      const response = await fetch('/api/ecommerce/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            imageUrl: item.product.imageUrl,
          })),
          shippingAddress: formData,
          couponCode: appliedCoupon?.code,
          paymentMethod: 'stripe',
        }),
      });

      const data = await response.json();
      if (data.success && data.order) {
        setConfirmedOrder(data.order);
        onOrderSuccess(data.order);
        setStep('success');
      } else {
        setErrorMessage(data.error || 'Payment gateway simulation failed.');
        setStep('payment');
      }
    } catch (err: any) {
      setErrorMessage('Network error connecting to Express backend.');
      setStep('payment');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                {step === 'success' ? 'Order Confirmed!' : 'Stripe Secure Checkout'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {step === 'shipping' && 'Step 1 of 2: Shipping Destination'}
                {step === 'payment' && 'Step 2 of 2: Payment Simulator'}
                {step === 'processing' && 'Processing Transaction...'}
                {step === 'success' && 'Transaction Verified by Backend'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content according to Step */}
        <div className="p-6">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Contact & Shipping Information
                </h4>
                <button
                  type="button"
                  onClick={handleAutoFillDemo}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-Fill Demo Info
                </button>
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@company.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. 123 Innovation Way"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="90210"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>India</option>
                    <option>Germany</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              {/* Order total banner */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">Total amount to charge:</span>
                <span className="text-base font-extrabold text-slate-900">${grandTotal.toFixed(2)}</span>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT SIMULATOR */}
          {step === 'payment' && (
            <form onSubmit={handleExecutePayment} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  Stripe Payment Element (Test Mode)
                </h4>
                <button
                  type="button"
                  onClick={handleAutoFillCard}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-Fill Test Card
                </button>
              </div>

              {/* Stripe styled card box */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-md space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Card Details</span>
                  <div className="flex gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">VISA</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">MasterCard</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">Amex</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-800 text-white font-mono text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Expiration</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-slate-800 text-white font-mono text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">CVC Security Code</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-slate-800 text-white font-mono text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Summary line */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                <span className="text-emerald-900 font-medium">Delivering to: {formData.fullName} ({formData.city})</span>
                <span className="text-emerald-900 font-extrabold text-sm">${grandTotal.toFixed(2)}</span>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ← Back to Shipping
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize & Pay ${grandTotal.toFixed(2)}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PROCESSING SIMULATION */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Processing Simulated Payment</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Sending payload to Express.js REST API `/api/ecommerce/checkout`, validating stock, and writing order record to database...
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 'success' && confirmedOrder && (
            <div className="space-y-5">
              <div className="text-center py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Payment Successfully Processed!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Receipt and tracking notification generated by server.
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 font-mono">
                  <span className="text-slate-500">Order Number:</span>
                  <span className="font-bold text-emerald-700">{confirmedOrder.orderNumber}</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Purchased Items ({confirmedOrder.items.length})
                  </span>
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-slate-800 truncate max-w-xs">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-bold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
                  <span>Grand Total Paid:</span>
                  <span className="text-emerald-600">${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewInAdmin();
                  }}
                  className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Live Order in Admin Portal
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
