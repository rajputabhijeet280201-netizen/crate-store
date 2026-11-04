'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Download, AlertCircle, Loader2, ArrowLeft, ShieldCheck, Mail, FileText, Clock } from 'lucide-react';
import Link from 'next/link';

interface OrderVerificationData {
  success: boolean;
  status: 'PAID' | 'PENDING' | 'FAILED';
  orderNumber?: string;
  productTitle?: string;
  amountInInr?: number;
  buyerEmail?: string;
  downloadUrl?: string;
  message?: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<OrderVerificationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError('No order ID provided in URL.');
      setLoading(false);
      return;
    }

    let isMounted = true;
    let pollCount = 0;
    const maxPolls = 10;

    const verifyOrder = async () => {
      try {
        const res = await fetch(`/api/checkout/verify?order_id=${encodeURIComponent(orderId)}`);
        const json: OrderVerificationData = await res.json();

        if (!isMounted) return;

        if (json.status === 'PAID') {
          setData(json);
          setLoading(false);
        } else if (json.status === 'PENDING' && pollCount < maxPolls) {
          pollCount++;
          setTimeout(verifyOrder, 2000);
        } else {
          setData(json);
          setLoading(false);
        }
      } catch (err: any) {
        if (!isMounted) return;
        setError(err.message || 'Failed to verify payment status.');
        setLoading(false);
      }
    };

    verifyOrder();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#fbfbf8] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl">
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-emerald-600" />
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Verifying Payment with Cashfree...
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Please wait while we confirm your transaction and generate your signed PDF download link.
            </p>
          </div>
        ) : error || data?.status === 'FAILED' ? (
          <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-900">
              Payment Verification Failed
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {error || data?.message || 'We could not confirm payment completion for this order.'}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Pricing</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            {/* Top Green Banner */}
            <div className="bg-[#0e593a] px-6 py-10 text-center text-white sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 ring-8 ring-emerald-500/10">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="mt-4 inline-block rounded-full bg-emerald-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-200">
                Payment Successful via Cashfree
              </span>
              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Thank you for your purchase!
              </h1>
              <p className="mt-2 text-sm text-emerald-100/90 max-w-md mx-auto">
                Your order is confirmed and your personal study handbook is ready for instant download.
              </p>
            </div>

            {/* Receipt & Download Details */}
            <div className="p-6 sm:p-10 space-y-6">
              {/* Order Info Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-500">Order Number:</span>
                  <span className="font-mono font-bold text-slate-900">{data?.orderNumber || 'GN-2026'}</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-500">Product Edition:</span>
                  <span className="font-bold text-slate-900">{data?.productTitle}</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-500">Delivered To:</span>
                  <span className="font-semibold text-slate-900">{data?.buyerEmail}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-extrabold text-emerald-800">
                    ₹{data?.amountInInr || 299} (One-Time)
                  </span>
                </div>
              </div>

              {/* Download CTA Button */}
              {data?.downloadUrl && (
                <div className="space-y-3 text-center">
                  <a
                    href={data.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-700 px-8 py-4 text-center text-base font-bold text-white shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 transition"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Your Study Notes PDF</span>
                  </a>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-emerald-600" />
                      <span>Link valid for 48 hours</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-emerald-600" />
                      <span>5 download attempts allowed</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Email Backup Note */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 flex items-start gap-3 text-xs text-emerald-950">
                <Mail className="h-5 w-5 shrink-0 text-emerald-700 mt-0.5" />
                <div>
                  <span className="font-bold block">Check your inbox:</span>
                  <span>
                    A copy of your signed download token and official receipt has been dispatched to{' '}
                    <strong>{data?.buyerEmail}</strong>. If you don&apos;t see it within 5 minutes, please check your spam folder.
                  </span>
                </div>
              </div>

              {/* Footer navigation */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Return to Home</span>
                </Link>

                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Verified Cashfree Transaction</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
