import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/layout/language-switcher';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'zh'),
}));

describe('LanguageSwitcher', () => {
  const mockPush = jest.fn();
  const mockPathname = '/zh';

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  test('should render language switcher with current locale', () => {
    render(<LanguageSwitcher />);

    // Should display current language label
    const switcher = screen.getByTestId('language-switcher');
    expect(switcher).toBeInTheDocument();
    expect(switcher).toHaveTextContent('中文');
  });

  test('should display all available languages when clicked', () => {
    render(<LanguageSwitcher />);

    const switcher = screen.getByTestId('language-switcher');
    fireEvent.click(switcher);

    // Should show all three language options in the dropdown
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('中文');
    expect(options[1]).toHaveTextContent('English');
    expect(options[2]).toHaveTextContent('日本語');
  });

  test('should navigate to correct locale when language is selected', async () => {
    render(<LanguageSwitcher />);

    const switcher = screen.getByTestId('language-switcher');
    fireEvent.click(switcher);

    const englishOption = screen.getByText('English');
    fireEvent.click(englishOption);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/en');
    });
  });

  test('should handle Japanese selection', async () => {
    render(<LanguageSwitcher />);

    const switcher = screen.getByTestId('language-switcher');
    fireEvent.click(switcher);

    const japaneseOption = screen.getByText('日本語');
    fireEvent.click(japaneseOption);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/ja');
    });
  });

  test('should not navigate when selecting current language', async () => {
    render(<LanguageSwitcher />);

    const switcher = screen.getByTestId('language-switcher');
    fireEvent.click(switcher);

    // Find the Chinese option that is marked as selected (aria-selected="true")
    const chineseOption = screen.getByRole('option', { selected: true });
    fireEvent.click(chineseOption);

    // Should not call push for same language
    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test('should be keyboard accessible', () => {
    render(<LanguageSwitcher />);

    const switcher = screen.getByTestId('language-switcher');

    // Should be focusable
    switcher.focus();
    expect(document.activeElement).toBe(switcher);

    // Should open on Enter key
    fireEvent.keyDown(switcher, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('English')).toBeVisible();
  });

  test('should have proper ARIA attributes', () => {
    render(<LanguageSwitcher />);

    const switcher = screen.getByTestId('language-switcher');

    // Should have aria-label
    expect(switcher).toHaveAttribute('aria-label');

    // Should have role
    expect(switcher).toHaveAttribute('role');
  });

  test('should display language switcher in correct position', () => {
    const { container } = render(<LanguageSwitcher />);

    const switcher = screen.getByTestId('language-switcher');
    expect(switcher).toBeInTheDocument();

    // Should have appropriate styling classes
    expect(switcher.className).toContain('flex');
  });
});
