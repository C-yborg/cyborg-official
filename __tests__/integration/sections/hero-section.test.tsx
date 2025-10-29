import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import HeroSection from '@/components/sections/hero-section';

const messages = {
  hero: {
    title: '安全快速的VPN服务',
    subtitle: '保护您的在线隐私，突破地理限制，享受无限制的互联网自由',
    cta: {
      primary: '立即开始',
      secondary: '了解更多',
    },
  },
};

describe('HeroSection Integration Tests', () => {
  const renderHeroSection = () => {
    return render(
      <NextIntlClientProvider locale="zh" messages={messages}>
        <HeroSection />
      </NextIntlClientProvider>
    );
  };

  it('should render without crashing', () => {
    renderHeroSection();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('should display hero title', () => {
    renderHeroSection();
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('安全快速的VPN服务');
  });

  it('should display hero subtitle', () => {
    renderHeroSection();
    const subtitle = screen.getByText(/保护您的在线隐私/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('should display primary CTA button', () => {
    renderHeroSection();
    const ctaButton = screen.getByRole('button', { name: /立即开始/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toBeEnabled();
  });

  it('should display secondary CTA button', () => {
    renderHeroSection();
    const secondaryButton = screen.getByRole('button', { name: /了解更多/i });
    expect(secondaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeEnabled();
  });

  it('should have proper semantic HTML structure', () => {
    renderHeroSection();
    const section = screen.getByTestId('hero-section');
    expect(section.tagName).toBe('SECTION');
    expect(section).toHaveAttribute('aria-label');
  });

  it('should apply correct CSS classes for styling', () => {
    renderHeroSection();
    const section = screen.getByTestId('hero-section');
    expect(section).toHaveClass('min-h-screen');
  });

  it('should be accessible with ARIA attributes', () => {
    renderHeroSection();
    const section = screen.getByTestId('hero-section');
    expect(section).toHaveAttribute('aria-label');

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeVisible();
  });
});
