'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { contactFormSchema, type ContactFormInput } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      locale: locale as 'zh' | 'en' | 'ja',
    },
  });

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setShowError(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, locale }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      // Show success dialog
      setShowSuccess(true);

      // Reset form
      form.reset({
        name: '',
        email: '',
        subject: '',
        message: '',
        locale: locale as 'zh' | 'en' | 'ja',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-slate-900 py-16 md:py-24"
      data-testid="contact-section"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {t('title')}
            </h2>
            <p className="text-lg text-slate-400">
              {t('subtitle')}
            </p>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border border-slate-800 bg-slate-800/50 p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        {t('form.name')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form.namePlaceholder')}
                          {...field}
                          className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        {t('form.email')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('form.emailPlaceholder')}
                          {...field}
                          className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Subject Field */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        {t('form.subject')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form.subjectPlaceholder')}
                          {...field}
                          className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        {t('form.message')}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('form.messagePlaceholder')}
                          rows={6}
                          {...field}
                          className="resize-none border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-50"
                >
                  {isSubmitting ? t('form.sending') : t('form.submit')}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="border-slate-700 bg-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              {t('success.title')}
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              {t('success.message')}
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowSuccess(false)}
            className="mt-4 bg-sky-500 text-white hover:bg-sky-600"
          >
            {t('success.close') || 'OK'}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="border-slate-700 bg-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-red-400">
              {t('error.title')}
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              {t('error.message')}
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowError(false)}
            className="mt-4 bg-slate-700 text-white hover:bg-slate-600"
          >
            {t('error.close') || 'Close'}
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
