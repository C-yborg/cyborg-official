import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import userEvent from '@testing-library/user-event';
import FAQSection from '@/components/sections/faq-section';

const messages = {
  faq: {
    title: '常见问题',
    subtitle: '解答您的疑问',
    items: {
      q1: {
        question: '什么是VPN？',
        answer: 'VPN（虚拟专用网络）是一种加密的网络连接，可以保护您的在线隐私和安全。',
      },
      q2: {
        question: '如何开始使用？',
        answer: '注册账号后，下载我们的应用程序，登录即可开始使用。',
      },
      q3: {
        question: '支持哪些设备？',
        answer: '我们支持Windows、Mac、iOS、Android等主流平台。',
      },
      q4: {
        question: '可以同时连接多少设备？',
        answer: '根据您选择的套餐，可以同时连接3-10个设备。',
      },
      q5: {
        question: '有退款保证吗？',
        answer: '是的，我们提供7-30天的退款保证，具体取决于您选择的套餐。',
      },
      q6: {
        question: '如何联系客服？',
        answer: '您可以通过邮件、在线聊天或工单系统联系我们的24/7客服团队。',
      },
    },
  },
};

describe('FAQSection Integration Tests', () => {
  const renderFAQSection = () => {
    return render(
      <NextIntlClientProvider locale="zh" messages={messages}>
        <FAQSection />
      </NextIntlClientProvider>
    );
  };

  it('should render without crashing', () => {
    renderFAQSection();
    expect(screen.getByTestId('faq-section')).toBeInTheDocument();
  });

  it('should display section title', () => {
    renderFAQSection();
    const title = screen.getByText('常见问题');
    expect(title).toBeInTheDocument();
  });

  it('should display at least 6 FAQ items', () => {
    renderFAQSection();
    const faqItems = screen.getAllByTestId('faq-item');
    expect(faqItems.length).toBeGreaterThanOrEqual(6);
  });

  it('should display FAQ questions', () => {
    renderFAQSection();

    expect(screen.getByText('什么是VPN？')).toBeInTheDocument();
    expect(screen.getByText('如何开始使用？')).toBeInTheDocument();
    expect(screen.getByText('支持哪些设备？')).toBeInTheDocument();
    expect(screen.getByText('可以同时连接多少设备？')).toBeInTheDocument();
    expect(screen.getByText('有退款保证吗？')).toBeInTheDocument();
    expect(screen.getByText('如何联系客服？')).toBeInTheDocument();
  });

  it('should expand and collapse FAQ items on click', async () => {
    const user = userEvent.setup();
    renderFAQSection();

    const firstQuestion = screen.getByText('什么是VPN？');

    // Click to expand
    await user.click(firstQuestion);

    // Answer should be visible
    const answer = await screen.findByText(/虚拟专用网络/i);
    expect(answer).toBeVisible();
  });

  it('should use accordion component from shadcn/ui', () => {
    renderFAQSection();
    const section = screen.getByTestId('faq-section');

    // Should have accordion structure
    const accordion = section.querySelector('[data-radix-accordion]');
    expect(accordion).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    renderFAQSection();
    const section = screen.getByTestId('faq-section');
    expect(section.tagName).toBe('SECTION');
  });

  it('should be accessible with keyboard navigation', async () => {
    const user = userEvent.setup();
    renderFAQSection();

    const firstItem = screen.getAllByTestId('faq-item')[0];

    // Focus first item
    firstItem.focus();

    // Press Enter to expand
    await user.keyboard('{Enter}');

    // Should expand and show content
    expect(firstItem).toHaveAttribute('data-state', 'open');
  });

  it('should be accessible', () => {
    renderFAQSection();
    const section = screen.getByTestId('faq-section');
    expect(section).toHaveAttribute('aria-label');
  });
});
