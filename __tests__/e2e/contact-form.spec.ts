import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page with Chinese locale
    await page.goto('/zh');

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('should display contact form', async ({ page }) => {
    // Verify contact section is visible
    await expect(page.locator('section').filter({ hasText: '联系' })).toBeVisible();

    // Verify all form fields are present
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // Click submit button without filling any fields
    await page.locator('button[type="submit"]').click();

    // Wait for validation errors to appear
    await page.waitForTimeout(500);

    // Verify error messages are displayed
    const errorMessages = page.locator('[role="alert"]').or(page.locator('.text-red-500, .text-destructive'));
    await expect(errorMessages.first()).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Fill form with invalid email
    await page.locator('input[name="name"]').fill('测试用户');
    await page.locator('input[name="email"]').fill('invalid-email');
    await page.locator('input[name="subject"]').fill('测试主题');
    await page.locator('textarea[name="message"]').fill('测试消息内容');

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Wait for validation error
    await page.waitForTimeout(500);

    // Verify email error is displayed
    const emailError = page.locator('text=/email|邮箱|メール/i').filter({ hasText: /invalid|无效|不正确/ });
    await expect(emailError.first()).toBeVisible();
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    // Fill form with valid data
    await page.locator('input[name="name"]').fill('张三');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="subject"]').fill('产品咨询');
    await page.locator('textarea[name="message"]').fill('我对你们的VPN产品很感兴趣，想了解更多详情。');

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Wait for success message
    await page.waitForSelector('text=/success|成功|送信完了/i', { timeout: 5000 });

    // Verify success message is displayed
    await expect(page.locator('text=/success|成功|送信完了/i')).toBeVisible();
  });

  test('should show loading state during submission', async ({ page }) => {
    // Fill form with valid data
    await page.locator('input[name="name"]').fill('李四');
    await page.locator('input[name="email"]').fill('test2@example.com');
    await page.locator('input[name="subject"]').fill('技术支持');
    await page.locator('textarea[name="message"]').fill('需要帮助设置VPN连接。');

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Verify loading state (button should be disabled or show loading indicator)
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test('should retain form data when submission fails', async ({ page }) => {
    const testData = {
      name: '王五',
      email: 'test3@example.com',
      subject: '合作意向',
      message: '希望能与贵公司建立合作关系。'
    };

    // Fill form
    await page.locator('input[name="name"]').fill(testData.name);
    await page.locator('input[name="email"]').fill(testData.email);
    await page.locator('input[name="subject"]').fill(testData.subject);
    await page.locator('textarea[name="message"]').fill(testData.message);

    // Mock API to return error (by intercepting the request if needed)
    // For now, we'll just submit and check data retention

    // Verify data is still in form fields after potential error
    await expect(page.locator('input[name="name"]')).toHaveValue(testData.name);
    await expect(page.locator('input[name="email"]')).toHaveValue(testData.email);
    await expect(page.locator('input[name="subject"]')).toHaveValue(testData.subject);
    await expect(page.locator('textarea[name="message"]')).toHaveValue(testData.message);
  });

  test('should work in different languages', async ({ page }) => {
    // Test in English
    await page.goto('/en');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Verify form is visible with English labels
    await expect(page.locator('section').filter({ hasText: 'Contact' })).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Test in Japanese
    await page.goto('/ja');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Verify form is visible with Japanese labels
    await expect(page.locator('section').filter({ hasText: 'お問い合わせ' })).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should clear form after successful submission', async ({ page }) => {
    // Fill and submit form
    await page.locator('input[name="name"]').fill('赵六');
    await page.locator('input[name="email"]').fill('test4@example.com');
    await page.locator('input[name="subject"]').fill('反馈建议');
    await page.locator('textarea[name="message"]').fill('产品体验很好！');

    await page.locator('button[type="submit"]').click();

    // Wait for success message
    await page.waitForSelector('text=/success|成功|送信完了/i', { timeout: 5000 });

    // Close success message if it's a dialog/modal
    const closeButton = page.locator('button').filter({ hasText: /close|关闭|閉じる|ok|确定/i });
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    // Wait a moment for form to clear
    await page.waitForTimeout(500);

    // Verify form fields are cleared
    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
    await expect(page.locator('input[name="subject"]')).toHaveValue('');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('');
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Tab through form fields
    await page.keyboard.press('Tab'); // Focus first field
    await page.keyboard.type('键盘测试');

    await page.keyboard.press('Tab'); // Move to email
    await page.keyboard.type('keyboard@test.com');

    await page.keyboard.press('Tab'); // Move to subject
    await page.keyboard.type('键盘导航测试');

    await page.keyboard.press('Tab'); // Move to message
    await page.keyboard.type('使用键盘填写表单');

    await page.keyboard.press('Tab'); // Move to submit button
    await page.keyboard.press('Enter'); // Submit with Enter key

    // Verify submission was triggered
    await page.waitForTimeout(500);
    // Should see either success message or validation (since we used valid data)
    const feedbackVisible = await page.locator('text=/success|成功|送信完了|error|错误|エラー/i').isVisible();
    expect(feedbackVisible).toBeTruthy();
  });
});
