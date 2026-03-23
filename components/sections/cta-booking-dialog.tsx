'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { gugi } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';
const EMAILJS_TIMEOUT_MS = 15000;

export function CtaBookingDialog({ mounted }: { mounted: boolean }) {
  const t = useTranslations('cta');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const formSchema = z.object({
    name: z.string().min(1, t('form.errors.name_required')),
    email: z.string().email(t('form.errors.email_invalid')),
    company: z.string().optional(),
    date: z
      .string()
      .optional()
      .refine((value) => !value || value >= minDate, t('form.errors.date_past')),
    time: z.string().optional(),
    timezone: z.string().optional(),
    message: z.string().min(1, t('form.errors.message_required')),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      date: '',
      time: '',
      timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : '',
      message: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setSubmitError(null);

      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        setSubmitError(t('form.errors.emailjs_not_configured'));
        return;
      }

      const sendPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: values.name,
          email: values.email,
          company: values.company || '',
          date: values.date || '',
          time: values.time || '',
          timezone: values.timezone || '',
          message: values.message,
          mail_subject: t('form.mail_subject'),
          recipient_email: t('recipient_email'),
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          locale: typeof navigator !== 'undefined' ? navigator.language : '',
        },
        EMAILJS_PUBLIC_KEY
      );

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), EMAILJS_TIMEOUT_MS)
      );

      await Promise.race([sendPromise, timeoutPromise]);

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message === 'timeout') {
        setSubmitError(t('form.errors.send_timeout'));
        return;
      }
      setSubmitError(t('form.errors.send_failed'));
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setIsSubmitted(false);
          setSubmitError(null);
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="group relative w-full overflow-hidden bg-size-[200%_100%] px-6 py-5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 ring-1 ring-white/15 transition-all hover:bg-right hover:shadow-primary/30 focus-visible:ring-white/25 sm:w-auto sm:px-10 sm:py-6 sm:text-lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            {t('button')}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>

          {mounted && (
            <span
              className="absolute inset-0 z-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: 'shine 3s ease-in-out infinite',
              }}
            />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="top-4 max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] translate-y-0 overflow-y-auto border-border/60 p-0 sm:top-[50%] sm:max-h-[calc(100vh-4rem)] sm:max-w-xl sm:translate-y-[-50%]">
        <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-primary/35 via-accent/20 to-neon-blue/80 p-px">
          <div className="relative overflow-hidden rounded-lg border border-border/60 bg-background p-5 ring-1 ring-white/10 sm:p-7">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195/0.14),transparent_60%)]" />
              <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
            </div>

            <DialogHeader className="relative">
              <DialogTitle className="text-xl sm:text-2xl">
                <span
                  className={`${gugi.className} bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent`}
                >
                  {t('form.title')}
                </span>
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">{t('form.subtitle')}</DialogDescription>
            </DialogHeader>

            <div className="relative mt-5">
              {isSubmitted ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-border/60 bg-secondary/25 p-4 text-left">
                    <div className="text-sm font-medium text-foreground">{t('form.success.title')}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{t('form.success.body')}</div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-border/60 bg-secondary/25"
                      onClick={() => {
                        setIsSubmitted(false);
                        setSubmitError(null);
                        form.reset();
                      }}
                    >
                      {t('form.success.new_message')}
                    </Button>
                    <Button
                      type="button"
                      className="shadow-sm shadow-primary/20"
                      onClick={() => {
                        setIsDialogOpen(false);
                      }}
                    >
                      {t('form.success.close')}
                    </Button>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit, () => setSubmitError(t('form.errors.fix_required')))}
                    className="grid gap-4"
                  >
                    {submitError && (
                      <div className="rounded-xl border border-border/60 bg-secondary/25 p-4 text-left text-sm text-destructive">
                        {submitError}
                      </div>
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('form.fields.name')}</FormLabel>
                            <FormControl>
                              <Input autoComplete="name" placeholder={t('form.placeholders.name')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('form.fields.email')}</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                autoComplete="email"
                                placeholder={t('form.placeholders.email')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.fields.company')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('form.placeholders.company')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('form.fields.date')}</FormLabel>
                            <FormControl>
                              <Input type="date" min={minDate} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('form.fields.time')}</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.fields.timezone')}</FormLabel>
                          <FormControl>
                            <Input placeholder="Europe/Paris" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.fields.message')}</FormLabel>
                          <FormControl>
                            <Textarea placeholder={t('form.placeholders.message')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-border/60 bg-secondary/25"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        {t('form.actions.cancel')}
                      </Button>
                      <Button type="submit" className="group shadow-sm shadow-primary/20" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('form.actions.submitting')}
                          </>
                        ) : (
                          <>
                            {t('form.actions.submit')}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
