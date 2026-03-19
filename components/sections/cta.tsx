'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Copy, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function CTASection() {
  const t = useTranslations('cta');
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const formSchema = z.object({
    name: z.string().min(1, t('form.errors.name_required')),
    email: z.string().email(t('form.errors.email_invalid')),
    company: z.string().optional(),
    date: z.string().optional(),
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

  const buildMailto = (values: FormValues) => {
    const recipient = t('recipient_email') || 'tchessipre@gmail.com';
    const subject = t('form.mail_subject');

    const lines = [
      `${t('form.summary.name')}: ${values.name}`,
      `${t('form.summary.email')}: ${values.email}`,
      values.company ? `${t('form.summary.company')}: ${values.company}` : null,
      values.date ? `${t('form.summary.date')}: ${values.date}` : null,
      values.time ? `${t('form.summary.time')}: ${values.time}` : null,
      values.timezone ? `${t('form.summary.timezone')}: ${values.timezone}` : null,
      '',
      t('form.summary.message') + ':',
      values.message,
    ].filter(Boolean);

    const body = lines.join('\n');

    return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (values: FormValues) => {
    const nextMailto = buildMailto(values);
    setMailtoUrl(nextMailto);
    setIsSubmitted(true);

    try {
      window.location.href = nextMailto;
    } catch {
      try {
        await navigator.clipboard.writeText(decodeURIComponent(nextMailto));
      } catch {
        // no-op
      }
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195/0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.75_0.18_195/0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.75_0.18_195/0.06)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_55%,transparent_78%)]" />
        <div
          className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
          style={{
            animation: mounted ? 'orb-float-1 10s ease-in-out infinite' : 'none',
          }}
        />
        <div
          className="absolute -right-28 bottom-8 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
          style={{
            animation: mounted ? 'orb-float-2 12s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <div
          className={`relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/40 via-accent/25 to-neon-blue/40 p-px">
            <div className="glass-strong relative overflow-hidden rounded-3xl px-8 py-14 text-center ring-1 ring-white/10 md:px-16 md:py-18">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195/0.10),transparent_55%)]" />
              </div>

              {/* Icon */}
              <div
                className={`mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent transition-all duration-500 delay-200 ${isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                style={{
                  boxShadow: '0 0 34px oklch(0.75 0.18 195 / 0.55)',
                }}
              >
                <Calendar className="h-7 w-7 text-primary-foreground" />
              </div>

              {/* Title */}
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  {t('title')}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground md:text-xl">{t('subtitle')}</p>

              {/* CTA Button */}
              <div className="inline-block transition-transform hover:scale-[1.02] active:scale-[0.98]">
                <Dialog
                  open={isDialogOpen}
                  onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) {
                      setIsSubmitted(false);
                      setMailtoUrl(null);
                      form.reset();
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_100%] px-10 py-6 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 ring-1 ring-white/15 transition-all hover:bg-right hover:shadow-primary/30 focus-visible:ring-white/25"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {t('button')}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>

                      {mounted && (
                        <span
                          className="absolute inset-0 z-0"
                          style={{
                            background:
                              'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            animation: 'shine 3s ease-in-out infinite',
                          }}
                        />
                      )}
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="border-border/60 bg-transparent p-0 sm:max-w-xl">
                    <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-primary/35 via-accent/20 to-neon-blue/35 p-px">
                      <div className="glass-strong relative overflow-hidden rounded-lg p-6 ring-1 ring-white/10 sm:p-7">
                        <div className="pointer-events-none absolute inset-0">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195/0.14),transparent_60%)]" />
                          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
                          <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
                        </div>

                        <DialogHeader className="relative">
                          <DialogTitle className="text-2xl">
                            <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                              {t('form.title')}
                            </span>
                          </DialogTitle>
                          <DialogDescription className="text-base">{t('form.subtitle')}</DialogDescription>
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
                                  onClick={async () => {
                                    if (!mailtoUrl) return;
                                    try {
                                      await navigator.clipboard.writeText(decodeURIComponent(mailtoUrl));
                                    } catch {
                                      // no-op
                                    }
                                  }}
                                >
                                  <Copy className="mr-2 h-4 w-4" />
                                  {t('form.success.copy')}
                                </Button>
                                <Button
                                  type="button"
                                  className="shadow-sm shadow-primary/20"
                                  onClick={() => {
                                    if (!mailtoUrl) return;
                                    window.location.href = mailtoUrl;
                                  }}
                                >
                                  <Mail className="mr-2 h-4 w-4" />
                                  {t('form.success.open_email')}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                                          <Input type="date" {...field} />
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
                                  <Button type="submit" className="group shadow-sm shadow-primary/20">
                                    {t('form.actions.submit')}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              </div>

              {/* Decorative particles */}
              {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-1 w-1 rounded-full bg-primary/50"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`,
                        animation: `particle-float ${3 + i}s ease-in-out ${i * 0.5}s infinite`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
