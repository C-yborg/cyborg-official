import { getTranslations } from 'next-intl/server';
import { Shield, Zap, Lock, Globe, Smartphone, HeadphonesIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default async function FeaturesSection() {
  const t = await getTranslations('features');

  const features = [
    {
      icon: Shield,
      titleKey: 'items.security.title',
      descriptionKey: 'items.security.description',
    },
    {
      icon: Zap,
      titleKey: 'items.speed.title',
      descriptionKey: 'items.speed.description',
    },
    {
      icon: Lock,
      titleKey: 'items.privacy.title',
      descriptionKey: 'items.privacy.description',
    },
    {
      icon: Globe,
      titleKey: 'items.global.title',
      descriptionKey: 'items.global.description',
    },
    {
      icon: Smartphone,
      titleKey: 'items.devices.title',
      descriptionKey: 'items.devices.description',
    },
    {
      icon: HeadphonesIcon,
      titleKey: 'items.support.title',
      descriptionKey: 'items.support.description',
    },
  ];

  return (
    <section
      id="features"
      className="bg-slate-900 py-20"
      data-testid="features-section"
      aria-label="Features section"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-300 sm:text-xl">{t('subtitle')}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-slate-700 bg-slate-800/50 transition-all hover:border-sky-500 hover:bg-slate-800"
                data-testid="feature-card"
              >
                <CardContent className="p-6">
                  <Icon className="mb-4 h-12 w-12 text-sky-500" />
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-slate-300">{t(feature.descriptionKey)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
