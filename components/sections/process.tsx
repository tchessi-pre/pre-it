'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { MessageSquare, Wrench, Rocket } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { ReasonIcon } from '@/components/reason-icon';

const steps = [
  { key: 'understand', icon: MessageSquare },
  { key: 'build', icon: Wrench },
  { key: 'launch', icon: Rocket },
];

export function ProcessSection() {
  const t = useTranslations('process');
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          isInView={isInView}
          titleGradientClassName="bg-linear-to-r from-foreground via-primary to-muted-foreground"
          subtitleClassName="md:text-lg"
          className="mb-16"
        />

        {/* Process timeline */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="absolute left-0 right-0 top-[60px] hidden h-px bg-linear-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className={`relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  style={{
                    transitionDelay: isInView ? `${index * 150}ms` : '0ms',
                  }}
                >
                  {/* Connection line - mobile */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-[60px] h-full w-px bg-linear-to-b from-border to-transparent lg:hidden" />
                  )}

                  <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Step number with icon */}
                    <div className="relative z-10 mb-6 flex items-center gap-4">
                      <ReasonIcon Icon={Icon} />

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
                    <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-linear-to-br from-primary/10 to-accent/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-50" />
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
