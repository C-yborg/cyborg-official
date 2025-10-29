import { getTranslations } from 'next-intl/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default async function FAQSection() {
  const t = await getTranslations('faq');

  const faqs = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

  return (
    <section
      id="faq"
      className="bg-slate-900 py-20"
      data-testid="faq-section"
      aria-label="FAQ section"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-300 sm:text-xl">{t('subtitle')}</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq}
                value={faq}
                className="rounded-lg border border-slate-700 bg-slate-800/50 px-6"
                data-testid="faq-item"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-sky-400 hover:no-underline">
                  {t(`items.${faq}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300">
                  {t(`items.${faq}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
