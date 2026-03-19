'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { MessageSquare, Wrench, Rocket } from 'lucide-react';

const steps = [
  { key: 'understand', icon: MessageSquare },
  { key: 'build', icon: Wrench },
  { key: 'launch', icon: Rocket },
];

export function ProcessSection() {
  const t = useTranslations('process');
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
    <section id="process" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Process timeline */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="absolute left-0 right-0 top-[60px] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className={`relative transition-all duration-700 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: isInView ? `${index * 150}ms` : '0ms',
                  }}
                >
                  {/* Connection line - mobile */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-[60px] h-full w-px bg-gradient-to-b from-border to-transparent lg:hidden" />
                  )}

                  <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Step number with icon */}
                    <div className="relative z-10 mb-6 flex items-center gap-4">
                      <div
                        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent transition-transform duration-300 hover:scale-110"
                        style={{
                          boxShadow: '0 0 20px oklch(0.75 0.18 195 / 0.4)',
                        }}
                      >
                        <Icon className="h-5 w-5 text-primary-foreground" />

                        {/* Pulse effect */}
                        {mounted && (
                          <div
                            className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent"
                            style={{
                              animation: 'pulse-ring 2s ease-out infinite',
                            }}
                          />
                        )}
                      </div>

                      <span className="text-4xl font-bold text-foreground/10">
                        {t(`steps.${step.key}.number`)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="mb-3 text-xl font-semibold text-foreground">
                        {t(`steps.${step.key}.title`)}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {t(`steps.${step.key}.description`)}
                      </p>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-50" />
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
