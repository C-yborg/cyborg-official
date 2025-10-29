import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import FeaturesSection from '@/components/sections/features-section';

const messages = {
  features: {
    title: '核心功能',
    subtitle: '全方位保护您的在线安全',
    items: {
      security: {
        title: '军事级加密',
        description: 'AES-256加密技术，保护您的数据安全',
      },
      speed: {
        title: '超快速度',
        description: '全球服务器网络，提供最佳连接速度',
      },
      privacy: {
        title: '零日志政策',
        description: '我们不记录您的任何在线活动',
      },
    },
  },
};

describe('FeaturesSection Integration Tests', () => {
  const renderFeaturesSection = () => {
    return render(
      <NextIntlClientProvider locale="zh" messages={messages}>
        <FeaturesSection />
      </NextIntlClientProvider>
    );
  };

  it('should render without crashing', () => {
    renderFeaturesSection();
    expect(screen.getByTestId('features-section')).toBeInTheDocument();
  });

  it('should display section title', () => {
    renderFeaturesSection();
    const title = screen.getByText('核心功能');
    expect(title).toBeInTheDocument();
  });

  it('should display at least 3 feature cards', () => {
    renderFeaturesSection();
    const featureCards = screen.getAllByTestId('feature-card');
    expect(featureCards.length).toBeGreaterThanOrEqual(3);
  });

  it('should display feature titles and descriptions', () => {
    renderFeaturesSection();

    // Check for feature titles
    expect(screen.getByText('军事级加密')).toBeInTheDocument();
    expect(screen.getByText('超快速度')).toBeInTheDocument();
    expect(screen.getByText('零日志政策')).toBeInTheDocument();

    // Check for feature descriptions
    expect(screen.getByText(/AES-256加密技术/i)).toBeInTheDocument();
    expect(screen.getByText(/全球服务器网络/i)).toBeInTheDocument();
    expect(screen.getByText(/不记录您的任何在线活动/i)).toBeInTheDocument();
  });

  it('should have icons for each feature', () => {
    renderFeaturesSection();
    const featureCards = screen.getAllByTestId('feature-card');

    featureCards.forEach((card) => {
      // Each card should have an icon (svg or img)
      const icon = card.querySelector('svg, img');
      expect(icon).toBeInTheDocument();
    });
  });

  it('should have proper semantic structure', () => {
    renderFeaturesSection();
    const section = screen.getByTestId('features-section');
    expect(section.tagName).toBe('SECTION');
  });

  it('should be accessible', () => {
    renderFeaturesSection();
    const section = screen.getByTestId('features-section');
    expect(section).toHaveAttribute('aria-label');
  });
});
