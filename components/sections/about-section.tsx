import { getTranslations } from 'next-intl/server';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye } from 'lucide-react';

export default async function AboutSection() {
  const t = await getTranslations('about');

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-slate-900 to-blue-900/20 py-20"
      data-testid="about-section"
      aria-label="About section"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-300 sm:text-xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="mb-12 text-center">
          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-slate-300">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-slate-700 bg-slate-800/50">
            <CardContent className="p-8">
              <Target className="mb-4 h-12 w-12 text-sky-500" />
              <h3 className="mb-3 text-2xl font-semibold text-white">
                {t('mission.title')}
              </h3>
              <p className="text-slate-300">{t('mission.description')}</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50">
            <CardContent className="p-8">
              <Eye className="mb-4 h-12 w-12 text-sky-500" />
              <h3 className="mb-3 text-2xl font-semibold text-white">
                {t('vision.title')}
              </h3>
              <p className="text-slate-300">{t('vision.description')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
