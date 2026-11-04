import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fbfbf8] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
          <BookOpen className="h-8 w-8" />
        </div>
        <h1 className="mt-4 font-serif text-3xl font-extrabold text-slate-900">
          Page Not Found
        </h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          The page or notes preview you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0e593a] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#0a452d] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to {SITE_CONFIG.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

