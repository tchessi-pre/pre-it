'use client';

import { useTranslations } from 'next-intl';
import { Rocket, Layers, TrendingUp, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const services = [
  { key: 'mvp', icon: Rocket },
  { key: 'fullstack', icon: Layers },
  { key: 'scaling', icon: TrendingUp },
  { key: 'audit', icon: Search },
];

export function ServicesSection() {
  const t = useTranslations('services');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
              >
                <div className="glass relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
                  {/* Gradient border effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Glow effect */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t(`items.${service.key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`items.${service.key}.description`)}
                    </p>
                  </div>

                  {/* Number indicator */}
                  <div className="absolute right-4 top-4 text-6xl font-bold text-foreground/5 transition-colors group-hover:text-primary/10">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
