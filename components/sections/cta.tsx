'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, ShieldCheck } from 'lucide-react';
import { gugi } from '@/lib/fonts';
import { CtaBookingDialog } from '@/components/sections/cta-booking-dialog';
import { ReasonIcon } from '@/components/shared/reason-icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function CTASection() {
  const t = useTranslations('cta');
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);

    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return () => observer.disconnect();
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateReducedMotionPreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateReducedMotionPreference);
    } else {
      mediaQuery.addListener(updateReducedMotionPreference);
    }

    return () => {
      observer.disconnect();
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateReducedMotionPreference);
      } else {
        mediaQuery.removeListener(updateReducedMotionPreference);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195/0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.75_0.18_195/0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.75_0.18_195/0.06)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_55%,transparent_78%)]" />
        <div
          className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
          style={{
            animation:
              mounted && !prefersReducedMotion
                ? 'orb-float-1 10s ease-in-out infinite'
                : 'none',
          }}
        />
        <div
          className="absolute -right-28 bottom-8 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
          style={{
            animation:
              mounted && !prefersReducedMotion
                ? 'orb-float-2 12s ease-in-out infinite'
                : 'none',
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div
          className={`relative transition-all duration-700 motion-reduce:transition-none ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:translate-y-0'}`}
        >
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/40 via-accent/25 to-neon-blue/40 p-px shadow-[0_0_80px_rgba(0,245,255,0.07)]">
            <div className="glass-strong relative overflow-hidden rounded-3xl px-5 py-10 text-center ring-1 ring-white/10 sm:px-8 sm:py-12 md:px-16 md:py-16">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195/0.10),transparent_55%)]" />
              </div>

              {/* Icon */}
              <div
                className={`mx-auto mb-6 flex justify-center transition-all duration-500 delay-200 motion-reduce:transition-none ${isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0 motion-reduce:scale-100'}`}
              >
                <ReasonIcon
                  Icon={Calendar}
                  wrapperClassName="h-14 w-14 rounded-xl sm:h-16 sm:w-16"
                  iconClassName="h-6 w-6 sm:h-7 sm:w-7"
                />
              </div>

              {/* Title */}
              <h2 className="mb-3 text-2xl font-bold tracking-tight sm:mb-4 sm:text-3xl md:text-5xl">
                <span
                  className={`${gugi.className} bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent`}
                >
                  {t('title')}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mx-auto mb-8 max-w-xl text-base text-muted-foreground sm:text-lg md:mb-10 md:text-xl">
                {t('subtitle')}
              </p>

              {/* CTA Button */}
              <div className="w-full transition-transform motion-reduce:transition-none sm:inline-block sm:w-auto hover:scale-[1.02] active:scale-[0.98]">
                <CtaBookingDialog mounted={mounted} />
              </div>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:mt-8 sm:flex-row sm:flex-wrap">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/25 px-4 py-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {t('trust.items.reply')}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/25 px-4 py-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {t('trust.items.call')}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/25 px-4 py-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  {t('trust.items.nda')}
                </span>
              </div>

              <div className="mx-auto mt-10 max-w-2xl text-left">
                <div className="mb-4 text-sm font-medium text-foreground">
                  {t('faq.title')}
                </div>
                <div className="rounded-2xl border border-border/50 bg-secondary/15 px-4 sm:px-5">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="pricing">
                      <AccordionTrigger>{t('faq.items.pricing.q')}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {t('faq.items.pricing.a')}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="timeline">
                      <AccordionTrigger>{t('faq.items.timeline.q')}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {t('faq.items.timeline.a')}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="ownership">
                      <AccordionTrigger>{t('faq.items.ownership.q')}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {t('faq.items.ownership.a')}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Decorative particles */}
              {mounted && !prefersReducedMotion && (
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
