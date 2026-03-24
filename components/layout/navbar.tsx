'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { ScrollToTopButton } from './scroll-to-top-button';
import { NavbarBrand } from '@/components/branding/navbar-brand';
import { TechChatbox } from '@/components/shared/tech-chatbox';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
  { key: 'process', href: '#process' },
  { key: 'contact', href: '#contact' },
];

export function Navbar() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '');
    if (navItems.some((item) => item.key === currentHash)) {
      setActiveSection(currentHash);
    }

    const sectionElements = navItems
      .map((item) => document.getElementById(item.key))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        setActiveSection((visible.target as HTMLElement).id);
      },
      {
        root: null,
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8],
      }
    );

    for (const el of sectionElements) observer.observe(el);

    const handleHashChange = () => {
      const nextHash = window.location.hash.replace('#', '');
      if (navItems.some((item) => item.key === nextHash)) {
        setActiveSection(nextHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
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

        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <NavbarBrand showTagline />

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) =>
              (() => {
                const isActive = activeSection === item.key;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setActiveSection(item.key)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'group relative rounded-full px-4 py-2 text-sm font-medium transition-all active:translate-y-0',
                      isActive
                        ? 'bg-secondary/60 text-foreground'
                        : 'text-muted-foreground hover:-translate-y-0.5 hover:bg-secondary/60 hover:text-foreground'
                    )}
                  >
                    {t(item.key)}
                    <span
                      className={cn(
                        'absolute inset-x-4 -bottom-0.5 h-px bg-linear-to-r from-primary to-accent transition-all duration-200',
                        isActive ? 'w-8' : 'w-0 group-hover:w-8'
                      )}
                    />
                  </a>
                );
              })()
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
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
          'glass-strong fixed inset-x-0 top-[72px] z-40 max-h-[calc(100vh-72px)] overflow-y-auto border-b border-border/50 transition-all duration-300 md:hidden',
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
              onClick={() => {
                setActiveSection(item.key);
                setIsMobileMenuOpen(false);
              }}
              aria-current={activeSection === item.key ? 'page' : undefined}
              className={cn(
                'rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-secondary/70 hover:text-foreground',
                activeSection === item.key
                  ? 'bg-secondary/70 text-foreground'
                  : 'text-muted-foreground'
              )}
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

      <ScrollToTopButton disabled={isMobileMenuOpen} />
      <TechChatbox disabled={isMobileMenuOpen} />
    </>
  );
}
