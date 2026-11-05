'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS_CONFIG, formatInr } from '@/config/products';
import { X, ShieldCheck, Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

declare global {
  interface Window {
    Cashfree?: any;
  }
}

interface CashfreeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSlug: string;
}

export function CashfreeCheckoutModal({
  isOpen,
  onClose,
  selectedSlug,
}: CashfreeCheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [mockSession, setMockSession] = useState<{
    orderId: string;
    sessionId: string;
  } | null>(null);

  const product = PRODUCTS_CONFIG[selectedSlug] || PRODUCTS_CONFIG['complete-edition'];

  // Dynamically load official Cashfree JS SDK v3
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.Cashfree) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      console.warn('⚠️ Could not load Cashfree external JS SDK script.');
    };
    document.body.appendChild(script);

    return () => {
      // Keep script in document cache
    };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (phone && cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number for UPI receipt.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Call checkout route to create order on Cashfree
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: product.slug,
          email,
          name: name || undefined,
          phone: cleanPhone || '9999999999',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        let msg = data.error || 'Failed to initiate checkout with Cashfree.';
        if (msg.toLowerCase().includes('authentication failed')) {
          msg = 'Cashfree Authentication Error: Please ensure your production App ID and unmasked Secret Key are properly set in Vercel and IP Whitelist is disabled in Cashfree Dashboard.';
        }
        throw new Error(msg);
      }

      // 2. If running with test mock session in development
      if (data.isMock) {
        setMockSession({
          orderId: data.orderId,
          sessionId: data.paymentSessionId,
        });
        setIsLoading(false);
        return;
      }

      // 3. Initialize Cashfree JS SDK
      const mode: 'sandbox' | 'production' =
        data.environment === 'production' ||
        (process.env.NEXT_PUBLIC_CASHFREE_ENV || '').toLowerCase() === 'production'
          ? 'production'
          : 'sandbox';

      console.log(`[Cashfree Checkout] Initializing checkout in mode: ${mode}`);

      if (window.Cashfree) {
        const cashfree = window.Cashfree({ mode });

        // Trigger Cashfree Checkout in modal popup or redirect fallback
        cashfree.checkout({
          paymentSessionId: data.paymentSessionId,
          redirectTarget: '_modal',
        }).then((result: any) => {
          if (result.error) {
            console.error('Cashfree modal error:', result.error);
            setErrorMessage(result.error.message || 'Payment was cancelled or failed.');
            setIsLoading(false);
          }
          if (result.redirect) {
            console.log('Redirecting to Cashfree completion...');
          }
          if (result.paymentDetails) {
            // Payment success inside modal!
            window.location.href = `/checkout/success?order_id=${data.orderId}`;
          }
        });
      } else {
        // Fallback: direct browser redirect if script blocked
        window.location.href = `/checkout/success?order_id=${data.orderId}`;
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      const raw = err.message || '';
      if (raw.toLowerCase().includes('authentication') || raw.toLowerCase().includes('auth')) {
        setErrorMessage(
          'Payment gateway is temporarily updating credentials. Please try again in a moment or contact support@devopsjeet.tech.'
        );
      } else {
        setErrorMessage(raw || 'An unexpected error occurred. Please try again.');
      }
      setIsLoading(false);
    }
  };

  const handleSimulateMockSuccess = () => {
    if (!mockSession) return;
    window.location.href = `/checkout/success?order_id=${mockSession.orderId}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 transition-all text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-[#0e593a] px-6 py-6 text-white sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition"
            aria-label="Close checkout modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
            <Sparkles className="h-4 w-4" />
            <span>Instant Access Checkout</span>
          </div>

          <h3 className="mt-2 text-2xl font-black tracking-tight">{product.name}</h3>
          <p className="mt-1 text-xs text-emerald-100/90 leading-relaxed">
            {product.tagline}
          </p>

          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="text-3xl font-extrabold text-white">
              {formatInr(product.priceInInr)}
            </span>
            <span className="text-sm font-semibold text-emerald-300/60 line-through">
              {formatInr(product.originalPriceInInr)}
            </span>
            <span className="rounded bg-amber-400 px-2 py-0.5 text-xs font-black text-slate-950">
              ONE-TIME PAYMENT
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {mockSession ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="mt-3 text-base font-bold text-slate-900">
                Sandbox Test Mode Activated
              </h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Order initialized with session ID: <br />
                <code className="rounded bg-slate-200/80 px-1 py-0.5 font-mono text-[11px] text-slate-800">
                  {mockSession.sessionId}
                </code>
              </p>
              <button
                type="button"
                onClick={handleSimulateMockSuccess}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-800 transition"
              >
                <span>Simulate Successful Payment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
                <span className="mt-1 block text-[11px] text-slate-500">
                  Your PDF download link &amp; GST invoice will be delivered here.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Abhijeet Rajput"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / UPI Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Cashfree Payment Gateways Accepted */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Supported Payment Modes:</span>
                  <span className="font-bold text-emerald-800">0% Convenience Fee</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-600">
                  <span className="rounded bg-white border border-slate-200 px-2 py-0.5">UPI</span>
                  <span className="rounded bg-white border border-slate-200 px-2 py-0.5">Google Pay</span>
                  <span className="rounded bg-white border border-slate-200 px-2 py-0.5">PhonePe</span>
                  <span className="rounded bg-white border border-slate-200 px-2 py-0.5">Paytm</span>
                  <span className="rounded bg-white border border-slate-200 px-2 py-0.5">Cards</span>
                  <span className="rounded bg-white border border-slate-200 px-2 py-0.5">Netbanking</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0e593a] px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg hover:bg-[#0a452d] transition disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Connecting to Cashfree...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 text-emerald-300" />
                    <span>Pay {formatInr(product.priceInInr)} with Cashfree</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Trust Badge */}
              <div className="mt-3 flex items-center justify-center gap-2 text-center text-[11px] font-semibold text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>256-bit Encrypted Cashfree Payment Gateway • Instant Delivery</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
