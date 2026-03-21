'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const t = useTranslations('hero');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const techStack = ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'];

  return (
    <section className="relative flex min-h-screen items-start justify-center overflow-x-hidden pt-20">
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left side - Text content */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <div
            className={`mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('badge')}</span>
          </div>

          {/* Headline */}
          <h1
            className={`mb-6 text-balance text-4xl font-bold leading-tight tracking-tight transition-all duration-700 delay-100 sm:text-5xl md:text-6xl lg:text-7xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <span className="block text-foreground">{t('headline').split('.')[0]}.</span>
            <span className="bg-linear-to-r from-primary via-accent to-neon-blue bg-clip-text text-transparent">
              {t('headline').split('.')[1]?.trim() || 'Faster.'}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground transition-all duration-700 delay-200 sm:text-xl lg:mx-0 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {t('subheadline')}
          </p>
        </div>

        {/* Right side - Animated Image */}
        <div
          className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
        >
          {/* Outer glow ring */}
          <div
            className="absolute h-[320px] w-[320px] rounded-full border border-primary/20 md:h-[420px] md:w-[420px]"
            style={{
              animation: mounted ? 'pulse-ring 4s ease-in-out infinite' : 'none',
            }}
          />

          {/* Middle glow ring */}
          <div
            className="absolute h-[280px] w-[280px] rounded-full border border-accent/30 md:h-[380px] md:w-[380px]"
            style={{
              animation: mounted ? 'spin 8s linear infinite' : 'none',
            }}
          />

          {/* Pulsing background glow */}
          <div
            className="absolute h-[260px] w-[260px] rounded-full bg-linear-to-r from-primary/30 via-accent/20 to-neon-blue/30 blur-3xl md:h-[340px] md:w-[340px]"
            style={{
              animation: mounted ? 'pulse-glow 3s ease-in-out infinite' : 'none',
            }}
          />

          {/* Floating particles around the image */}
          {mounted &&
            [0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-primary"
                style={{
                  left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                  top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
                  animation: `particle-float ${2 + i * 0.3}s ease-in-out infinite ${i * 0.2}s`,
                }}
              />
            ))}

          {/* Main image container with float animation */}
          <div className="relative z-10">
            <div
              className="relative"
              style={{
                animation: mounted ? 'float 4s ease-in-out infinite' : 'none',
              }}
            >
              {/* Image glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-primary/20 via-transparent to-accent/20 blur-2xl" />

              {/* The actual image */}
              <div className="relative transition-transform duration-300 hover:scale-105">
                <Image
                  src="/hand-pre-it.png"
                  alt="PRE-IT - Web Engineering & Digital Solutions"
                  width={320}
                  height={320}
                  sizes="(min-width: 1024px) 360px, 280px"
                  quality={85}
                  className="relative z-10 drop-shadow-[0_0_30px_rgba(0,245,255,0.3)]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Orbiting dots */}
          {mounted && (
            <>
              <div
                className="absolute h-[310px] w-[310px] md:h-[400px] md:w-[400px]"
                style={{ animation: 'spin 20s linear infinite' }}
              >
                <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
                <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
              </div>

              <div
                className="absolute h-[260px] w-[260px] md:h-[340px] md:w-[340px]"
                style={{ animation: 'spin 15s linear infinite reverse' }}
              >
                <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neon-blue shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
              </div>
            </>
          )}
        </div>

        <div
          className={`lg:col-span-2 flex flex-col items-center justify-center gap-4 transition-all duration-700 delay-300 sm:flex-row ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div>
            <Button
              size="lg"
              className="group relative overflow-hidden px-8 text-primary-foreground shadow-sm transition-[transform,box-shadow,background-color] duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,245,255,0.35)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              asChild
            >
              <a href="#contact">
                <span className="absolute inset-0 bg-linear-to-r from-primary/0 via-white/10 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  {t('cta_primary')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                </span>
              </a>
            </Button>
          </div>
          <div>
            <Button
              size="lg"
              variant="outline"
              className="group border-border/50 bg-secondary/50 px-8 shadow-sm backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-px hover:border-primary/50 hover:bg-secondary hover:shadow-[0_0_22px_rgba(139,92,246,0.25)] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              asChild
            >
              <a href="#projects">
                <Code2 className="mr-2 h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-px group-hover:-rotate-6" />
                {t('cta_secondary')}
              </a>
            </Button>
          </div>
        </div>

        <div
          className={`lg:col-span-2 mt-4 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {techStack.map((tech, index) => (
            <div
              key={tech}
              style={{
                transitionDelay: mounted ? `${600 + index * 100}ms` : '0ms',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(1)' : 'scale(0.8)',
              }}
            >
              <span className="glass block rounded-full px-4 py-2 text-xs font-medium text-white transition-all duration-500">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-700 delay-1000 ${mounted ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div
          className="flex flex-col items-center gap-2"
          style={{ animation: mounted ? 'bounce-slow 1.5s ease-in-out infinite' : 'none' }}
        >
          <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 p-1">
            <div
              className="h-2 w-2 rounded-full bg-primary"
              style={{ animation: mounted ? 'scroll-dot 1.5s ease-in-out infinite' : 'none' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
