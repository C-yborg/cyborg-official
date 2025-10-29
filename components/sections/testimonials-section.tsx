import { getTranslations } from 'next-intl/server';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default async function TestimonialsSection() {
  const t = await getTranslations('testimonials');

  return (
    <section
      id="testimonials"
      className="bg-slate-900 py-20"
      data-testid="testimonials-section"
      aria-label="Testimonials section"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-300 sm:text-xl">{t('subtitle')}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* User 1 */}
          <Card className="border-slate-700 bg-slate-800/50" data-testid="testimonial-card">
            <CardContent className="p-6">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-2xl font-bold text-white"
                data-testid="avatar"
              >
                Z
              </div>
              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-slate-300">{t('items.user1.content')}</p>
              <div>
                <p className="font-semibold text-white">{t('items.user1.name')}</p>
                <p className="text-sm text-slate-400">{t('items.user1.role')}</p>
              </div>
            </CardContent>
          </Card>

          {/* User 2 */}
          <Card className="border-slate-700 bg-slate-800/50" data-testid="testimonial-card">
            <CardContent className="p-6">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-2xl font-bold text-white"
                data-testid="avatar"
              >
                L
              </div>
              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-slate-300">{t('items.user2.content')}</p>
              <div>
                <p className="font-semibold text-white">{t('items.user2.name')}</p>
                <p className="text-sm text-slate-400">{t('items.user2.role')}</p>
              </div>
            </CardContent>
          </Card>

          {/* User 3 */}
          <Card className="border-slate-700 bg-slate-800/50" data-testid="testimonial-card">
            <CardContent className="p-6">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-2xl font-bold text-white"
                data-testid="avatar"
              >
                W
              </div>
              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-slate-300">{t('items.user3.content')}</p>
              <div>
                <p className="font-semibold text-white">{t('items.user3.name')}</p>
                <p className="text-sm text-slate-400">{t('items.user3.role')}</p>
              </div>
            </CardContent>
          </Card>

          {/* User 4 */}
          <Card className="border-slate-700 bg-slate-800/50" data-testid="testimonial-card">
            <CardContent className="p-6">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-2xl font-bold text-white"
                data-testid="avatar"
              >
                Z
              </div>
              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} />
                ))}
              </div>
              <p className="mb-4 text-slate-300">{t('items.user4.content')}</p>
              <div>
                <p className="font-semibold text-white">{t('items.user4.name')}</p>
                <p className="text-sm text-slate-400">{t('items.user4.role')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
