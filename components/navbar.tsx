'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUp, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
  { key: 'process', href: '#process' },
  { key: 'contact', href: '#contact' },
];

export function Navbar() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setShowScrollTop(y > 600);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-[72px] transition-all duration-500',
          isScrolled
            ? 'glass-strong border-b border-border/50 shadow-[0_18px_60px_rgba(0,0,0,0.35)]'
            : 'bg-transparent',
          mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 md:via-accent/30" />
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent transition-opacity duration-500',
            isScrolled ? 'opacity-100' : 'opacity-0'
          )}
        />

        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <a
            href="#"
            className="group relative rounded-xl px-2 py-1 text-2xl font-bold tracking-tight transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(0,245,255,0.18)]">
              PRE-IT
            </span>
            <span className="absolute -inset-2 -z-10 rounded-xl bg-primary/10 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
          </a>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary/60 hover:text-foreground active:translate-y-0"
              >
                {t(item.key)}
                <span className="absolute inset-x-4 -bottom-0.5 h-px w-0 bg-linear-to-r from-primary to-accent transition-all duration-200 group-hover:w-8" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative rounded-xl p-2 transition-colors hover:bg-secondary/60 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative h-6 w-6">
                <X
                  className={cn(
                    'absolute inset-0 h-6 w-6 text-foreground transition-all duration-200',
                    isMobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
                  )}
                />
                <Menu
                  className={cn(
                    'absolute inset-0 h-6 w-6 text-foreground transition-all duration-200',
                    isMobileMenuOpen ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-30 bg-background/70 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={cn(
          'glass-strong fixed inset-x-0 top-[72px] z-40 border-b border-border/50 transition-all duration-300 md:hidden',
          isMobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item, index) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary/70 hover:text-foreground"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
              }}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
      </div>

      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          'glass-strong fixed right-6 bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border/50 shadow-[0_14px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/60 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          showScrollTop && !isMobileMenuOpen
            ? 'pointer-events-auto opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 translate-y-3'
        )}
      >
        <ArrowUp className="h-5 w-5 text-foreground" />
      </button>
    </>
  );
}
