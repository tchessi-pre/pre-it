'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { Lightbulb, Code2, Trophy, Zap } from 'lucide-react';

const reasons = [
  { key: 'product', icon: Lightbulb },
  { key: 'fullstack', icon: Code2 },
  { key: 'experience', icon: Trophy },
  { key: 'execution', icon: Zap },
];

export function WhySection() {
  const t = useTranslations('why');
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
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

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Header */}
          <div
            className={`lg:sticky lg:top-32 lg:self-start transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h2>
            <p className="mb-8 max-w-md text-lg text-muted-foreground">{t('subtitle')}</p>

            {/* Decorative element */}
            <div className="hidden lg:block">
              <div
                className={`relative h-64 w-64 transition-all duration-700 delay-200 ${
                  isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
                }`}
              >
                {/* Animated rings */}
                {mounted &&
                  [...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full border border-primary/20"
                      style={{
                        transform: `scale(${1 - i * 0.2})`,
                        animation: `spin ${10 + i * 5}s linear infinite${i % 2 === 1 ? ' reverse' : ''}`,
                      }}
                    />
                  ))}
                {/* Center glow */}
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-accent opacity-30 blur-xl" />
              </div>
            </div>
          </div>

          {/* Right side - Reasons */}
          <div className="space-y-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.key}
                  className={`group relative transition-all duration-500 ${
                    isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                  }`}
                  style={{
                    transitionDelay: isInView ? `${index * 100}ms` : '0ms',
                  }}
                >
                  <div className="glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]">
                    {/* Hover glow */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-accent/0 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative z-10 flex items-start gap-4">
                      {/* Number */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-foreground">
                          {t(`items.${reason.key}.title`)}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {t(`items.${reason.key}.description`)}
                        </p>
                      </div>

                      {/* Index number */}
                      <span className="ml-auto text-4xl font-bold text-foreground/5 transition-colors group-hover:text-primary/10">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
