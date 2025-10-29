import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import AboutSection from '@/components/sections/about-section';

const messages = {
  about: {
    title: '关于我们',
    subtitle: '致力于保护您的数字隐私',
    description:
      '我们是一支专注于网络安全和隐私保护的团队。自2020年以来，我们一直致力于为全球用户提供安全、快速、可靠的VPN服务。我们相信每个人都有权利享受自由和安全的互联网。',
    mission: {
      title: '我们的使命',
      description: '让每个人都能安全、自由地访问互联网',
    },
    vision: {
      title: '我们的愿景',
      description: '成为全球最值得信赖的VPN服务提供商',
    },
  },
};

describe('AboutSection Integration Tests', () => {
  const renderAboutSection = () => {
    return render(
      <NextIntlClientProvider locale="zh" messages={messages}>
        <AboutSection />
      </NextIntlClientProvider>
    );
  };

  it('should render without crashing', () => {
    renderAboutSection();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
  });

  it('should display section title', () => {
    renderAboutSection();
    const title = screen.getByText('关于我们');
    expect(title).toBeInTheDocument();
  });

  it('should display company description', () => {
    renderAboutSection();
    const description = screen.getByText(/我们是一支专注于网络安全/i);
    expect(description).toBeInTheDocument();
  });

  it('should display mission and vision', () => {
    renderAboutSection();

    expect(screen.getByText('我们的使命')).toBeInTheDocument();
    expect(screen.getByText(/让每个人都能安全/i)).toBeInTheDocument();

    expect(screen.getByText('我们的愿景')).toBeInTheDocument();
    expect(screen.getByText(/成为全球最值得信赖/i)).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    renderAboutSection();
    const section = screen.getByTestId('about-section');
    expect(section.tagName).toBe('SECTION');
  });

  it('should be accessible', () => {
    renderAboutSection();
    const section = screen.getByTestId('about-section');
    expect(section).toHaveAttribute('aria-label');
  });
});
