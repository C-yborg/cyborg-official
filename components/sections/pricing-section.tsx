import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default async function PricingSection() {
  const t = await getTranslations('pricing');

  const plans = [
    {
      key: 'monthly',
      features: ['feature1', 'feature2', 'feature3', 'feature4'],
    },
    {
      key: 'yearly',
      features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5'],
      popular: true,
    },
    {
      key: 'enterprise',
      features: ['feature1', 'feature2', 'feature3', 'feature4'],
    },
  ];

  return (
    <section
      id="pricing"
      className="bg-gradient-to-b from-blue-900/20 to-slate-900 py-20"
      data-testid="pricing-section"
      aria-label="Pricing section"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-300 sm:text-xl">{t('subtitle')}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.key}
              className={`relative border-slate-700 bg-slate-800/50 ${
                plan.popular ? 'border-sky-500 shadow-lg shadow-sky-500/20' : ''
              }`}
              data-testid="pricing-card"
            >
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-sky-700 px-4 py-1 text-sm font-semibold text-white"
                  data-testid="popular-badge"
                >
                  {t(`plans.${plan.key}.save` as any)}
                </div>
              )}

              <CardHeader className="pb-8 pt-8">
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {t(`plans.${plan.key}.name` as any)}
                </h3>
                <div className="mb-2">
                  <span
                    className="text-4xl font-bold text-white"
                    data-testid="price"
                  >
                    {t(`plans.${plan.key}.price` as any)}
                  </span>
                  <span className="text-slate-400">
                    {t(`plans.${plan.key}.period` as any)}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 shrink-0 text-sky-500" />
                      <span className="text-slate-300">
                        {t(`plans.${plan.key}.features.${feature}` as any)}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-sky-700 hover:bg-sky-800'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  size="lg"
                >
                  {t(`plans.${plan.key}.cta` as any)}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
