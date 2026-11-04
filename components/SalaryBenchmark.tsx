import React from 'react';

export function SalaryBenchmark() {
  return (
    <section className="bg-surface px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-600/30 bg-gradient-to-br from-emerald-950 via-zinc-900 to-black p-6 sm:p-8 text-white shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 font-bold text-emerald-400 text-xs">
                  ₹
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  SALARY BENCHMARK &amp; CAREER ROI
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black tracking-wide text-emerald-300 border border-emerald-500/30">
                  High Demand
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-2 pt-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-mono">
                  ₹18,50,000
                </span>
                <span className="text-sm sm:text-base font-semibold text-emerald-200">
                  /year (₹18.5 LPA median in India)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                Certified Kubernetes Administrators (CKA) and cloud DevOps engineers command 40–70% higher
                compensation than standard sysadmins. Illustrated visual blueprints help you internalize
                difficult multi-cluster architectures 3× faster for technical rounds.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
              <a
                href="#pricing"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-center text-xs sm:text-sm font-bold text-black hover:bg-emerald-400 transition shadow-lg"
              >
                Fast-Track Career (From ₹299)
              </a>
              <span className="text-center text-[11px] text-zinc-400">
                ⭐ 4.9/5 Rating from 2,800+ Engineers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
