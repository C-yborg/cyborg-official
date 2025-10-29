import { cn, formatDate, truncate } from '@/lib/utils';

describe('Utils - cn function', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toContain('text-red-500');
    expect(result).toContain('bg-blue-500');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
  });

  it('should ignore falsy values', () => {
    const result = cn('base-class', false && 'should-not-appear', null, undefined);
    expect(result).toBe('base-class');
    expect(result).not.toContain('should-not-appear');
  });

  it('should merge Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    // px-4 should override px-2
    expect(result).toContain('px-4');
    expect(result).not.toContain('px-2');
    expect(result).toContain('py-1');
  });

  it('should handle empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });
});

describe('Utils - formatDate function', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15T10:30:00');
    const result = formatDate(date);
    expect(result).toMatch(/2024/);
    expect(result).toMatch(/1/);
    expect(result).toMatch(/15/);
  });

  it('should format date with custom locale', () => {
    const date = new Date('2024-01-15T10:30:00');
    const result = formatDate(date, 'zh-CN');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should handle date strings', () => {
    const dateString = '2024-01-15';
    const result = formatDate(new Date(dateString));
    expect(result).toMatch(/2024/);
  });

  it('should handle invalid dates gracefully', () => {
    const invalidDate = new Date('invalid');
    const result = formatDate(invalidDate);
    expect(result).toBeDefined();
  });
});

describe('Utils - truncate function', () => {
  it('should truncate long strings', () => {
    const longString = 'This is a very long string that needs to be truncated';
    const result = truncate(longString, 20);
    expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
    expect(result).toContain('...');
  });

  it('should not truncate short strings', () => {
    const shortString = 'Short text';
    const result = truncate(shortString, 20);
    expect(result).toBe(shortString);
    expect(result).not.toContain('...');
  });

  it('should handle exact length strings', () => {
    const exactString = '12345678901234567890';
    const result = truncate(exactString, 20);
    expect(result).toBe(exactString);
  });

  it('should handle empty strings', () => {
    const result = truncate('', 10);
    expect(result).toBe('');
  });

  it('should use default length if not specified', () => {
    const longString = 'a'.repeat(200);
    const result = truncate(longString);
    expect(result.length).toBeLessThan(200);
    expect(result).toContain('...');
  });

  it('should handle custom suffix', () => {
    const longString = 'This is a very long string';
    const result = truncate(longString, 10, '…');
    expect(result).toContain('…');
    expect(result).not.toContain('...');
  });
});
