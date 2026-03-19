'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const t = useTranslations('cta');
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);

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

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div
          className={`relative overflow-hidden rounded-3xl transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-neon-blue/20" />

          {/* Animated glow orbs - CSS only */}
          <div
            className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/30 blur-3xl"
            style={{
              animation: mounted ? 'orb-float-1 8s ease-in-out infinite' : 'none',
            }}
          />
          <div
            className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl"
            style={{
              animation: mounted ? 'orb-float-2 10s ease-in-out infinite' : 'none',
            }}
          />

          {/* Content */}
          <div className="glass-strong relative px-8 py-16 text-center md:px-16 md:py-20">
            {/* Icon */}
            <div
              className={`mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent transition-all duration-500 delay-200 ${
                isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              style={{
                boxShadow: '0 0 30px oklch(0.75 0.18 195 / 0.5)',
              }}
            >
              <Calendar className="h-7 w-7 text-primary-foreground" />
            </div>

            {/* Title */}
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground">{t('subtitle')}</p>

            {/* CTA Button */}
            <div className="inline-block transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-10 py-6 text-lg font-semibold text-primary-foreground transition-all hover:bg-right"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('button')}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>

                {/* Shine effect */}
                {mounted && (
                  <span
                    className="absolute inset-0 -z-0"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      animation: 'shine 3s ease-in-out infinite',
                    }}
                  />
                )}
              </Button>
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
    </section>
  );
}
