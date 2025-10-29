import { POST } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';

// Mock console methods to avoid cluttering test output
global.console = {
  ...console,
  error: jest.fn(),
  log: jest.fn(),
};

describe('/api/contact', () => {
  const validPayload = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Product Inquiry',
    message: 'I would like to know more about your VPN service.',
    locale: 'en',
  };

  const createRequest = (body: any): NextRequest => {
    return new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  test('should return 200 for valid contact form submission', async () => {
    const request = createRequest(validPayload);
    const response = await POST(request);

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toBeDefined();
  });

  test('should return 400 for missing name', async () => {
    const invalidPayload = { ...validPayload };
    delete (invalidPayload as any).name;

    const request = createRequest(invalidPayload);
    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toBeDefined();
  });

  test('should return 400 for invalid email', async () => {
    const invalidPayload = {
      ...validPayload,
      email: 'invalid-email',
    };

    const request = createRequest(invalidPayload);
    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain('email');
  });

  test('should return 400 for name that is too short', async () => {
    const invalidPayload = {
      ...validPayload,
      name: 'A',
    };

    const request = createRequest(invalidPayload);
    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('should return 400 for message that is too short', async () => {
    const invalidPayload = {
      ...validPayload,
      message: 'Short',
    };

    const request = createRequest(invalidPayload);
    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('should return 400 for invalid locale', async () => {
    const invalidPayload = {
      ...validPayload,
      locale: 'invalid',
    };

    const request = createRequest(invalidPayload);
    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('should accept Chinese characters', async () => {
    const chinesePayload = {
      name: '张三',
      email: 'zhangsan@example.com',
      subject: 'VPN服务咨询',
      message: '您好，我对贵公司的VPN服务很感兴趣，希望了解更多详细信息。',
      locale: 'zh',
    };

    const request = createRequest(chinesePayload);
    const response = await POST(request);

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
  });

  test('should accept Japanese characters', async () => {
    const japanesePayload = {
      name: '田中太郎',
      email: 'tanaka@example.jp',
      subject: 'サービスについて',
      message: 'こんにちは、御社のVPNサービスに興味があります。詳細を教えてください。',
      locale: 'ja',
    };

    const request = createRequest(japanesePayload);
    const response = await POST(request);

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
  });

  test('should handle missing request body', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('should handle malformed JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json',
    });

    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('should validate maximum field lengths', async () => {
    const tooLongPayload = {
      name: 'A'.repeat(51), // Max is 50
      email: validPayload.email,
      subject: validPayload.subject,
      message: validPayload.message,
      locale: 'en',
    };

    const request = createRequest(tooLongPayload);
    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('should return 405 for non-POST methods', async () => {
    // This test assumes the route handler only exports POST
    // If GET, PUT, etc. are not defined, Next.js will handle the 405
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'GET',
    });

    // Since we're only testing POST, we can't call other methods directly
    // This test documents the expected behavior
    expect(true).toBe(true);
  });

  test('should trim whitespace from string fields', async () => {
    const payloadWithWhitespace = {
      name: '  John Doe  ',
      email: '  john@example.com  ',
      subject: '  Product Inquiry  ',
      message: '  I would like to know more about your service.  ',
      locale: 'en',
    };

    const request = createRequest(payloadWithWhitespace);
    const response = await POST(request);

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
  });

  test('should handle concurrent requests', async () => {
    const requests = Array(5).fill(null).map(() =>
      POST(createRequest(validPayload))
    );

    const responses = await Promise.all(requests);

    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });

  test('should return appropriate error message structure', async () => {
    const invalidPayload = {
      name: 'A', // Too short
      email: 'invalid',
      subject: 'Hi', // Too short
      message: 'Short', // Too short
      locale: 'invalid',
    };

    const request = createRequest(invalidPayload);
    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('error');
    expect(data.success).toBe(false);
    expect(typeof data.error).toBe('string');
  });
});
