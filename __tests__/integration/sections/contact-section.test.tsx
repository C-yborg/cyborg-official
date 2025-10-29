import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import ContactSection from '@/components/sections/contact-section';

// Mock fetch for API calls
global.fetch = jest.fn();

const mockMessages = {
  contact: {
    title: 'Contact Us',
    subtitle: 'Get in touch',
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      subject: 'Subject',
      subjectPlaceholder: 'How can we help?',
      message: 'Message',
      messagePlaceholder: 'Your message...',
      submit: 'Send Message',
      sending: 'Sending...',
    },
    validation: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email address',
      subjectRequired: 'Subject is required',
      messageRequired: 'Message is required',
      messageMinLength: 'Message must be at least 10 characters',
    },
    success: {
      title: 'Message Sent!',
      message: 'Thank you for contacting us. We will get back to you soon.',
    },
    error: {
      title: 'Error',
      message: 'Failed to send message. Please try again.',
    },
  },
};

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={mockMessages}>
      {component}
    </NextIntlClientProvider>
  );
};

describe('ContactSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  test('should render contact form with all fields', () => {
    renderWithIntl(<ContactSection />);

    // Verify all form elements are present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('should show validation errors for empty fields', async () => {
    renderWithIntl(<ContactSection />);

    // Click submit without filling any fields
    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    // Wait for validation errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  test('should show validation error for invalid email', async () => {
    renderWithIntl(<ContactSection />);

    // Fill fields with invalid email
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for email validation error
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  test('should show validation error for short message', async () => {
    renderWithIntl(<ContactSection />);

    // Fill fields with short message
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Short' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for message length validation error
    await waitFor(() => {
      expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
    });
  });

  test('should successfully submit form with valid data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithIntl(<ContactSection />);

    // Fill form with valid data
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Product Inquiry' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'I would like to know more about your VPN service.' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/thank you for contacting us/i)).toBeInTheDocument();

    // Verify fetch was called with correct data
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('john@example.com'),
      })
    );
  });

  test('should show error message when API fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    renderWithIntl(<ContactSection />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
  });

  test('should disable submit button during submission', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise(resolve => setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 1000))
    );

    renderWithIntl(<ContactSection />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    // Button should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  test('should retain form data when submission fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    renderWithIntl(<ContactSection />);

    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Important Question',
      message: 'I need help with my VPN connection.',
    };

    // Fill form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: testData.name } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: testData.email } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: testData.subject } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: testData.message } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for error
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    // Verify form data is retained
    expect(screen.getByLabelText(/name/i)).toHaveValue(testData.name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(testData.email);
    expect(screen.getByLabelText(/subject/i)).toHaveValue(testData.subject);
    expect(screen.getByLabelText(/message/i)).toHaveValue(testData.message);
  });

  test('should clear form after successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithIntl(<ContactSection />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'This is a test message' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for success and form to clear
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });

    // Close success dialog if there's a close button
    const closeButton = screen.queryByRole('button', { name: /close|ok/i });
    if (closeButton) {
      fireEvent.click(closeButton);
      await waitFor(() => {
        expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
      });
    }

    // Verify form is cleared
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/subject/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });
});
