import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import PricingSection from '@/components/sections/pricing-section';

const messages = {
  pricing: {
    title: '定价方案',
    subtitle: '选择适合您的套餐',
    plans: {
      monthly: {
        name: '月付套餐',
        price: '¥29',
        period: '/月',
        features: {
          feature1: '无限流量',
          feature2: '全球服务器',
          feature3: '7天退款保证',
          feature4: '24/7客户支持',
        },
        cta: '立即购买',
      },
      yearly: {
        name: '年付套餐',
        price: '¥199',
        period: '/年',
        popular: true,
        features: {
          feature1: '无限流量',
          feature2: '全球服务器',
          feature3: '30天退款保证',
          feature4: '24/7客户支持',
          feature5: '优先客服',
        },
        cta: '立即购买',
      },
      enterprise: {
        name: '企业套餐',
        price: '定制',
        period: '',
        features: {
          feature1: '无限设备',
          feature2: '专属服务器',
          feature3: '定制解决方案',
          feature4: '专属客户经理',
        },
        cta: '联系我们',
      },
    },
  },
};

describe('PricingSection Integration Tests', () => {
  const renderPricingSection = () => {
    return render(
      <NextIntlClientProvider locale="zh" messages={messages}>
        <PricingSection />
      </NextIntlClientProvider>
    );
  };

  it('should render without crashing', () => {
    renderPricingSection();
    expect(screen.getByTestId('pricing-section')).toBeInTheDocument();
  });

  it('should display section title', () => {
    renderPricingSection();
    const title = screen.getByText('定价方案');
    expect(title).toBeInTheDocument();
  });

  it('should display at least 2 pricing plans', () => {
    renderPricingSection();
    const pricingCards = screen.getAllByTestId('pricing-card');
    expect(pricingCards.length).toBeGreaterThanOrEqual(2);
  });

  it('should display plan names and prices', () => {
    renderPricingSection();

    // Check for plan names
    expect(screen.getByText('月付套餐')).toBeInTheDocument();
    expect(screen.getByText('年付套餐')).toBeInTheDocument();

    // Check for prices
    expect(screen.getByText('¥29')).toBeInTheDocument();
    expect(screen.getByText('¥199')).toBeInTheDocument();
  });

  it('should display features for each plan', () => {
    renderPricingSection();

    // Common features
    const unlimitedBandwidth = screen.getAllByText('无限流量');
    expect(unlimitedBandwidth.length).toBeGreaterThanOrEqual(2);

    const globalServers = screen.getAllByText('全球服务器');
    expect(globalServers.length).toBeGreaterThanOrEqual(2);
  });

  it('should display CTA buttons for each plan', () => {
    renderPricingSection();
    const ctaButtons = screen.getAllByRole('button', { name: /立即购买|联系我们/i });
    expect(ctaButtons.length).toBeGreaterThanOrEqual(2);
  });

  it('should highlight popular plan', () => {
    renderPricingSection();
    const pricingCards = screen.getAllByTestId('pricing-card');

    // At least one plan should be marked as popular
    const popularPlan = pricingCards.find((card) =>
      card.querySelector('[data-testid="popular-badge"]')
    );
    expect(popularPlan).toBeDefined();
  });

  it('should have proper semantic structure', () => {
    renderPricingSection();
    const section = screen.getByTestId('pricing-section');
    expect(section.tagName).toBe('SECTION');
  });

  it('should be accessible', () => {
    renderPricingSection();
    const section = screen.getByTestId('pricing-section');
    expect(section).toHaveAttribute('aria-label');
  });
});
