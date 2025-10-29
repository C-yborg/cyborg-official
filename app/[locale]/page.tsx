import HeroSection from '@/components/sections/hero-section';
import FeaturesSection from '@/components/sections/features-section';
import AboutSection from '@/components/sections/about-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import PricingSection from '@/components/sections/pricing-section';
import FAQSection from '@/components/sections/faq-section';
import ContactSection from '@/components/sections/contact-section';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/lib/i18n/config';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'common' });

  // Get base URL from environment or use default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cyborg-vpn.com';

  return {
    title: t('siteTitle'),
    description: t('siteDescription'),
    openGraph: {
      title: t('siteTitle'),
      description: t('siteDescription'),
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('siteTitle'),
      description: t('siteDescription'),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'zh': `${baseUrl}/zh`,
        'en': `${baseUrl}/en`,
        'ja': `${baseUrl}/ja`,
        'x-default': `${baseUrl}/zh`,
      },
    },
  };
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
