'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { Lightbulb, Code2, Trophy, Zap } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';

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
    <section ref={sectionRef} className='relative py-24 md:py-32'>
      {/* Background accent */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl' />
        <div className='absolute right-0 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl' />
      </div>

      <div className='mx-auto max-w-6xl px-6'>
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          isInView={isInView}
          className='mb-14'
        />

        <div className='mx-auto max-w-5xl'>
          <div className='grid gap-6 lg:grid-cols-3 lg:grid-rows-3 lg:gap-6'>
            <div className='order-1 lg:order-0 lg:col-start-2 lg:row-start-2'>
              <div
                className={`relative mx-auto h-64 w-64 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
                  }`}
              >
                {mounted &&
                  [...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className='absolute inset-0 rounded-full border border-primary/20'
                      style={{
                        transform: `scale(${1 - i * 0.2})`,
                        animation: `spin ${10 + i * 5}s linear infinite${i % 2 === 1 ? ' reverse' : ''
                          }`,
                      }}
                    />
                  ))}
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <Image
                    src='/hand-pre-it.png'
                    alt='PRE-IT'
                    width={200}
                    height={200}
                    className='h-60 w-60 object-cover drop-shadow-[0_14px_28px_rgba(0,0,0,0.35)] animate-pulse'
                  />
                </div>
                <div className='absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-primary to-accent opacity-30 blur-xl' />
              </div>
            </div>

            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              const positionClass =
                index === 0
                  ? 'order-2 lg:order-none lg:col-start-2 lg:row-start-1'
                  : index === 1
                    ? 'order-3 lg:order-none lg:col-start-3 lg:row-start-2'
                    : index === 2
                      ? 'order-4 lg:order-none lg:col-start-2 lg:row-start-3'
                      : 'order-5 lg:order-none lg:col-start-1 lg:row-start-2';

              const motionClass =
                index === 0
                  ? isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-5'
                  : index === 1
                    ? isInView
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-5'
                    : index === 2
                      ? isInView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-5'
                      : isInView
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-5';

              return (
                <div
                  key={reason.key}
                  className={`group relative transition-all duration-500 ${positionClass} ${motionClass}`}
                  style={{
                    transitionDelay: isInView ? `${index * 100}ms` : '0ms',
                  }}
                >
                  <div className='glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]'>
                    <div className='absolute -inset-px rounded-2xl bg-linear-to-r from-primary/0 via-primary/20 to-accent/0 opacity-100 blur transition-opacity duration-300 group-hover:opacity-0' />

                    <div className='relative z-10 flex items-start gap-4'>
                      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20'>
                        <Icon className='h-6 w-6 text-primary' />
                      </div>
                      <span className='ml-auto text-4xl font-bold text-primary/70 transition-colors group-hover:text-primary/50'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <h3 className='mb-2 mt-2 text-lg font-semibold text-foreground'>
                        {t(`items.${reason.key}.title`)}
                      </h3>
                      <p className='text-sm leading-relaxed text-muted-foreground'>
                        {t(`items.${reason.key}.description`)}
                      </p>
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
