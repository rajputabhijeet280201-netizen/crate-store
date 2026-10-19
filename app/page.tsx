import { SITE_CONFIG } from '@/config/site';
import { CONTENT_CONFIG } from '@/config/content';
import { PRODUCTS_LIST, formatInr } from '@/config/products';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface text-ink">
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-ink">
              {SITE_CONFIG.name}
            </span>
          </div>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 font-medium text-white shadow-sm transition hover:bg-accent-hover focus-visible:outline-accent"
          >
            {CONTENT_CONFIG.header.ctaButton}
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {CONTENT_CONFIG.hero.badge}
        </span>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-6xl">
          {CONTENT_CONFIG.hero.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
          {CONTENT_CONFIG.hero.subheadline}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            className="w-full rounded-lg bg-accent px-8 py-3.5 text-center font-semibold text-white shadow-md transition hover:bg-accent-hover sm:w-auto"
          >
            {CONTENT_CONFIG.hero.primaryCta}
          </a>
          <button
            type="button"
            className="w-full rounded-lg border border-ink/20 bg-white px-8 py-3.5 text-center font-medium text-ink transition hover:bg-ink/5 sm:w-auto"
          >
            {CONTENT_CONFIG.hero.secondaryCta}
          </button>
        </div>

        <p className="mt-4 text-xs text-muted">{CONTENT_CONFIG.hero.trustNote}</p>
      </section>

      <section id="pricing" className="border-t border-ink/10 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">Choose Your Edition</h2>
            <p className="mt-2 text-muted">All notes include instant watermarked PDF downloads.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {PRODUCTS_LIST.map((product) => (
              <div
                key={product.slug}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 ${
                  product.isPopular
                    ? 'border-accent bg-surface shadow-xl ring-2 ring-accent'
                    : 'border-ink/10 bg-white shadow-sm'
                }`}
              >
                {product.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white shadow-sm">
                    {product.badge}
                  </span>
                )}
                <div>
                  <h3 className="font-serif text-2xl font-bold text-ink">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted">{product.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-ink">
                      {formatInr(product.priceInInr)}
                    </span>
                    <span className="text-sm text-muted line-through">
                      {formatInr(product.originalPriceInInr)}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-sm text-ink/90">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className={`w-full rounded-lg py-3 text-center font-semibold transition ${
                      product.isPopular
                        ? 'bg-accent text-white shadow-md hover:bg-accent-hover'
                        : 'border border-ink/20 bg-surface text-ink hover:bg-ink/5'
                    }`}
                  >
                    {product.ctaText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
