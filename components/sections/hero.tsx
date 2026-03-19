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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left side - Text content */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <div
            className={`mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">SaaS Development Studio</span>
          </div>

          {/* Headline */}
          <h1
            className={`mb-6 text-balance text-4xl font-bold leading-tight tracking-tight transition-all duration-700 delay-100 sm:text-5xl md:text-6xl lg:text-7xl ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-foreground">{t('headline').split('.')[0]}.</span>
            <span className="bg-gradient-to-r from-primary via-accent to-neon-blue bg-clip-text text-transparent">
              {t('headline').split('.')[1]?.trim() || 'Faster.'}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground transition-all duration-700 delay-200 sm:text-xl lg:mx-0 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t('subheadline')}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col items-center justify-center gap-4 transition-all duration-700 delay-300 sm:flex-row lg:justify-start ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent px-8 text-primary-foreground transition-all hover:scale-105"
              asChild
            >
              <a href="#contact">
                <span className="relative z-10 flex items-center gap-2">
                  {t('cta_primary')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-border/50 bg-secondary/50 px-8 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-secondary"
              asChild
            >
              <a href="#projects">
                <Code2 className="mr-2 h-4 w-4 text-primary" />
                {t('cta_secondary')}
              </a>
            </Button>
          </div>

          {/* Tech stack floating badges */}
          <div
            className={`mt-12 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-500 lg:justify-start ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {techStack.map((tech, index) => (
              <span
                key={tech}
                className="glass rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-500"
                style={{
                  transitionDelay: mounted ? `${600 + index * 100}ms` : '0ms',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'scale(1)' : 'scale(0.8)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right side - Animated Image */}
        <div
          className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          {/* Outer glow ring */}
          <div
            className="absolute h-[400px] w-[400px] rounded-full border border-primary/20 md:h-[500px] md:w-[500px]"
            style={{
              animation: mounted ? 'pulse-ring 4s ease-in-out infinite' : 'none',
            }}
          />

          {/* Middle glow ring */}
          <div
            className="absolute h-[350px] w-[350px] rounded-full border border-accent/30 md:h-[450px] md:w-[450px]"
            style={{
              animation: mounted ? 'spin 8s linear infinite' : 'none',
            }}
          />

          {/* Pulsing background glow */}
          <div
            className="absolute h-[300px] w-[300px] rounded-full bg-gradient-to-r from-primary/30 via-accent/20 to-neon-blue/30 blur-3xl md:h-[400px] md:w-[400px]"
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
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-accent/20 blur-2xl" />

              {/* The actual image */}
              <div className="relative transition-transform duration-300 hover:scale-105">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Free-removebg-preview-ssrzQgmZApEW1tLyKVtpExlarFkP4Z.png"
                  alt="PRE-IT - Web Engineering & Digital Solutions"
                  width={450}
                  height={450}
                  className="relative z-10 drop-shadow-[0_0_30px_rgba(0,245,255,0.3)]"
                  priority
                />

                {/* Shine effect overlay */}
                {mounted && (
                  <div
                    className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                    style={{
                      animation: 'shine 5s ease-in-out infinite',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Orbiting dots */}
          {mounted && (
            <>
              <div
                className="absolute h-[380px] w-[380px] md:h-[480px] md:w-[480px]"
                style={{ animation: 'spin 20s linear infinite' }}
              >
                <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
                <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
              </div>

              <div
                className="absolute h-[320px] w-[320px] md:h-[420px] md:w-[420px]"
                style={{ animation: 'spin 15s linear infinite reverse' }}
              >
                <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neon-blue shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-700 delay-1000 ${
          mounted ? 'opacity-100' : 'opacity-0'
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
