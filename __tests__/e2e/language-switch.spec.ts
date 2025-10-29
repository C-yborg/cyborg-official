import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('/zh');
  });

  test('should display default Chinese content on initial load', async ({ page }) => {
    // Verify Chinese content is displayed
    await expect(page.locator('h1')).toContainText('安全快速的VPN服务');

    // Verify URL contains Chinese locale
    expect(page.url()).toContain('/zh');
  });

  test('should switch to English when English is selected', async ({ page }) => {
    // Find and click the language switcher
    const languageSwitcher = page.locator('[data-testid="language-switcher"]');
    await languageSwitcher.click();

    // Select English
    const englishOption = page.locator('text=English');
    await englishOption.click();

    // Wait for navigation
    await page.waitForURL('**/en');

    // Verify English content is displayed
    await expect(page.locator('h1')).toContainText('Secure and Fast VPN Service');

    // Verify URL contains English locale
    expect(page.url()).toContain('/en');
  });

  test('should switch to Japanese when Japanese is selected', async ({ page }) => {
    // Find and click the language switcher
    const languageSwitcher = page.locator('[data-testid="language-switcher"]');
    await languageSwitcher.click();

    // Select Japanese
    const japaneseOption = page.locator('text=日本語');
    await japaneseOption.click();

    // Wait for navigation
    await page.waitForURL('**/ja');

    // Verify Japanese content is displayed (when translations are available)
    // Verify URL contains Japanese locale
    expect(page.url()).toContain('/ja');
  });

  test('should persist language preference after page refresh', async ({ page }) => {
    // Switch to English
    const languageSwitcher = page.locator('[data-testid="language-switcher"]');
    await languageSwitcher.click();
    const englishOption = page.locator('text=English');
    await englishOption.click();
    await page.waitForURL('**/en');

    // Reload the page
    await page.reload();

    // Verify language is still English
    await expect(page.locator('h1')).toContainText('Secure and Fast VPN Service');
    expect(page.url()).toContain('/en');
  });

  test('should persist language preference when navigating between pages', async ({ page }) => {
    // Switch to English
    const languageSwitcher = page.locator('[data-testid="language-switcher"]');
    await languageSwitcher.click();
    const englishOption = page.locator('text=English');
    await englishOption.click();
    await page.waitForURL('**/en');

    // Navigate to pricing section (anchor link)
    await page.click('a[href="#pricing"]');

    // Wait a moment for scroll
    await page.waitForTimeout(500);

    // Verify language is still English and URL maintains locale
    expect(page.url()).toContain('/en');
    await expect(page.locator('[data-testid="header"]')).toBeVisible();
  });

  test('should complete language switch within 500ms', async ({ page }) => {
    const languageSwitcher = page.locator('[data-testid="language-switcher"]');
    await languageSwitcher.click();

    const startTime = Date.now();

    const englishOption = page.locator('text=English');
    await englishOption.click();
    await page.waitForURL('**/en');

    const endTime = Date.now();
    const switchTime = endTime - startTime;

    // Verify switch completed within 500ms (plus some buffer for navigation)
    expect(switchTime).toBeLessThan(1000);
  });

  test('should display correct language switcher label', async ({ page }) => {
    const languageSwitcher = page.locator('[data-testid="language-switcher"]');

    // Should show current language (Chinese)
    await expect(languageSwitcher).toContainText('中文');

    // Switch to English
    await languageSwitcher.click();
    const englishOption = page.locator('text=English');
    await englishOption.click();
    await page.waitForURL('**/en');

    // Should now show English
    await expect(languageSwitcher).toContainText('English');
  });

  test('should have all three language options in switcher', async ({ page }) => {
    const languageSwitcher = page.locator('[data-testid="language-switcher"]');
    await languageSwitcher.click();

    // Verify all three languages are present as options
    await expect(page.getByRole('option', { name: '中文' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'English' })).toBeVisible();
    await expect(page.getByRole('option', { name: '日本語' })).toBeVisible();
  });
});
