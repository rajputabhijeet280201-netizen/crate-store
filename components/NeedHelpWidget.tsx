'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Mail, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export function NeedHelpWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Pill Button */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open customer support help window"
          className="group inline-flex items-center gap-2.5 rounded-full border border-emerald-800/60 bg-[#0e271c] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-2xl transition hover:bg-[#153a2a] hover:scale-105 active:scale-95 focus-visible:outline-emerald-500"
        >
          <MessageSquare className="h-4 w-4 text-emerald-400 transition group-hover:scale-110" />
          <span>Need help?</span>
        </button>
      </div>

      {/* Help Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Card */}
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl z-10 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Quick Help &amp; Support</h4>
                  <span className="text-[11px] text-emerald-600 font-medium">Online · Typical reply in &lt;15m</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              Have questions about the visual notes, Cashfree checkout, or invoice downloads? We&apos;re here to help.
            </p>

            <div className="mt-4 space-y-2">
              <a
                href={SITE_CONFIG.channels.whatsapp || 'https://wa.me/919999999999'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/60 p-3 text-xs font-semibold text-emerald-900 transition"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">💬</span>
                  <span>WhatsApp Chat</span>
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-emerald-700" />
              </a>

              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="flex items-center justify-between rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 p-3 text-xs font-semibold text-slate-800 transition"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-600" />
                  <span>Email Support</span>
                </span>
                <span className="text-[10px] text-slate-500">{SITE_CONFIG.supportEmail}</span>
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Instant PDF download on payment</span>
              <span>🔒 256-bit SSL</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
