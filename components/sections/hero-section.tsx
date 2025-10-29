import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';

export default async function HeroSection() {
  const t = await getTranslations('hero');

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900"
      data-testid="hero-section"
      aria-label="Hero section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {t('title')}
        </h1>
        <p className="mx-auto mb-12 max-w-3xl text-lg text-slate-300 sm:text-xl md:text-2xl">
          {t('subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="w-full bg-sky-700 px-8 py-6 text-lg font-semibold text-white transition-colors hover:bg-sky-800 sm:w-auto"
          >
            {t('cta.primary')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-slate-600 bg-transparent px-8 py-6 text-lg font-semibold text-white transition-colors hover:bg-slate-800 sm:w-auto"
          >
            {t('cta.secondary')}
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 animate-bounce">
          <svg
            className="mx-auto h-8 w-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
