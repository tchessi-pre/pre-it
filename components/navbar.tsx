'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'glass-strong py-3' : 'py-6',
          mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <a
            href="#"
            className="group relative text-2xl font-bold tracking-tight transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              PRE-IT
            </span>
            <span className="absolute -inset-2 -z-10 rounded-lg bg-primary/10 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="group relative text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground active:translate-y-0"
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-2 md:hidden"
              aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      <div
        className={cn(
          'glass-strong fixed inset-x-0 top-16 z-40 border-b border-border/50 transition-all duration-300 md:hidden',
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
              className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
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
    </>
  );
}
