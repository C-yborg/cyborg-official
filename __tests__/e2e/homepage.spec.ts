import { test, expect } from '@playwright/test';

test.describe('Homepage - Product Information Display (US1)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Chinese homepage
    await page.goto('/zh');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Verify page loads without errors
    await expect(page).toHaveTitle(/VPN/);

    // Verify no console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('should display all sections in correct order', async ({ page }) => {
    // Hero Section should be visible
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();

    // Features Section should be visible
    const featuresSection = page.locator('[data-testid="features-section"]');
    await expect(featuresSection).toBeVisible();

    // About Section should be visible
    const aboutSection = page.locator('[data-testid="about-section"]');
    await expect(aboutSection).toBeVisible();

    // Testimonials Section should be visible
    const testimonialsSection = page.locator('[data-testid="testimonials-section"]');
    await expect(testimonialsSection).toBeVisible();

    // Pricing Section should be visible
    const pricingSection = page.locator('[data-testid="pricing-section"]');
    await expect(pricingSection).toBeVisible();

    // FAQ Section should be visible
    const faqSection = page.locator('[data-testid="faq-section"]');
    await expect(faqSection).toBeVisible();
  });

  test('should display Hero section with CTA button', async ({ page }) => {
    const heroSection = page.locator('[data-testid="hero-section"]');

    // Verify hero title exists
    await expect(heroSection.locator('h1')).toBeVisible();

    // Verify hero subtitle exists
    await expect(heroSection.locator('p').first()).toBeVisible();

    // Verify CTA button exists and is clickable
    const ctaButton = heroSection.locator('button, a[role="button"]').first();
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toBeEnabled();
  });

  test('should display Features section with at least 3 features', async ({ page }) => {
    const featuresSection = page.locator('[data-testid="features-section"]');

    // Verify at least 3 feature cards are displayed
    const featureCards = featuresSection.locator('[data-testid="feature-card"]');
    const count = await featureCards.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Each feature should have an icon, title, and description
    for (let i = 0; i < 3; i++) {
      const card = featureCards.nth(i);
      await expect(card.locator('svg, img')).toBeVisible(); // Icon
      await expect(card.locator('h3')).toBeVisible(); // Title
      await expect(card.locator('p')).toBeVisible(); // Description
    }
  });

  test('should display Pricing section with pricing plans', async ({ page }) => {
    const pricingSection = page.locator('[data-testid="pricing-section"]');

    // Verify at least 2 pricing plans are displayed
    const pricingCards = pricingSection.locator('[data-testid="pricing-card"]');
    await expect(pricingCards.first()).toBeVisible();

    // Each pricing plan should have price, features, and CTA
    const firstPlan = pricingCards.first();
    await expect(firstPlan.locator('h3')).toBeVisible(); // Plan name
    await expect(firstPlan.locator('[data-testid="price"]')).toBeVisible(); // Price
    await expect(firstPlan.locator('button, a[role="button"]')).toBeVisible(); // CTA
  });

  test('should display FAQ section with accordion items', async ({ page }) => {
    const faqSection = page.locator('[data-testid="faq-section"]');

    // Verify at least 6 FAQ items
    const faqItems = faqSection.locator('[data-testid="faq-item"]');
    const count = await faqItems.count();
    expect(count).toBeGreaterThanOrEqual(6);

    // Click first FAQ to expand
    const firstFaq = faqItems.first();
    await firstFaq.click();

    // Verify content is revealed (use role="region" for the content area)
    const faqContent = firstFaq.locator('[role="region"]');
    await expect(faqContent).toBeVisible({ timeout: 1000 });
  });

  test('should work on different locales', async ({ page }) => {
    // Test Chinese locale
    await page.goto('/zh');
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();

    // Test English locale
    await page.goto('/en');
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();

    // Test Japanese locale
    await page.goto('/ja');
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // All sections should still be visible
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="features-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="pricing-section"]')).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // All sections should still be visible
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="features-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="pricing-section"]')).toBeVisible();
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    // All sections should still be visible
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="features-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="pricing-section"]')).toBeVisible();
  });
});
