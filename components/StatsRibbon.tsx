import React from 'react';

export function StatsRibbon() {
  const stats = [
    {
      value: '16',
      label: 'visual PDF handbooks',
    },
    {
      value: '1,804',
      label: 'annotated pages of notes',
    },
    {
      value: '5',
      label: 'structured production phases',
    },
    {
      value: '₹299',
      label: 'starter pack (save up to 75%)',
    },
  ];

  return (
    <section
      aria-label="Key Highlights"
      className="border-y border-slate-200/90 bg-white select-none"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-y divide-slate-200/80 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 px-6 py-5 sm:py-7 justify-start sm:justify-center"
            >
              <span className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0e6945]">
                {stat.value}
              </span>
              <span className="font-sans text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
