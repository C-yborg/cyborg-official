import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import TestimonialsSection from '@/components/sections/testimonials-section';

const messages = {
  testimonials: {
    title: '用户评价',
    subtitle: '听听我们用户的真实反馈',
    items: {
      user1: {
        name: '张三',
        role: '软件工程师',
        content: '这是我用过最好的VPN服务，速度快，稳定性好！',
        rating: 5,
      },
      user2: {
        name: '李四',
        role: '设计师',
        content: '界面简洁，操作方便，价格也很合理。',
        rating: 5,
      },
      user3: {
        name: 'John Smith',
        role: 'Product Manager',
        content: 'Excellent service with great customer support!',
        rating: 5,
      },
      user4: {
        name: '田中太郎',
        role: 'ビジネスオーナー',
        content: '安全で信頼性の高いサービスです。',
        rating: 4,
      },
    },
  },
};

describe('TestimonialsSection Integration Tests', () => {
  const renderTestimonialsSection = () => {
    return render(
      <NextIntlClientProvider locale="zh" messages={messages}>
        <TestimonialsSection />
      </NextIntlClientProvider>
    );
  };

  it('should render without crashing', () => {
    renderTestimonialsSection();
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
  });

  it('should display section title', () => {
    renderTestimonialsSection();
    const title = screen.getByText('用户评价');
    expect(title).toBeInTheDocument();
  });

  it('should display at least 4 testimonials', () => {
    renderTestimonialsSection();
    const testimonialCards = screen.getAllByTestId('testimonial-card');
    expect(testimonialCards.length).toBeGreaterThanOrEqual(4);
  });

  it('should display testimonial content with user info', () => {
    renderTestimonialsSection();

    // Check for user names
    expect(screen.getByText('张三')).toBeInTheDocument();
    expect(screen.getByText('李四')).toBeInTheDocument();

    // Check for user roles
    expect(screen.getByText('软件工程师')).toBeInTheDocument();
    expect(screen.getByText('设计师')).toBeInTheDocument();

    // Check for testimonial content
    expect(screen.getByText(/这是我用过最好的VPN服务/i)).toBeInTheDocument();
    expect(screen.getByText(/界面简洁/i)).toBeInTheDocument();
  });

  it('should display user avatars', () => {
    renderTestimonialsSection();
    const testimonialCards = screen.getAllByTestId('testimonial-card');

    testimonialCards.forEach((card) => {
      // Each testimonial should have an avatar
      const avatar = card.querySelector('img, [data-testid="avatar"]');
      expect(avatar).toBeInTheDocument();
    });
  });

  it('should have proper semantic structure', () => {
    renderTestimonialsSection();
    const section = screen.getByTestId('testimonials-section');
    expect(section.tagName).toBe('SECTION');
  });

  it('should be accessible', () => {
    renderTestimonialsSection();
    const section = screen.getByTestId('testimonials-section');
    expect(section).toHaveAttribute('aria-label');
  });
});
