'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Briefcase, Github, Linkedin } from 'lucide-react';
import { NavbarBrand } from '@/components/navbar-brand';

const socialLinks = [
  { icon: Github, href: 'https://github.com/tchessi-pre', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/tch%C3%A8ssi-pre-2a8479216/', label: 'LinkedIn' },
  { icon: Briefcase, href: 'https://www.tchessi-pre.dev/', label: 'Mon port Portfolio' },
];

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 py-12">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <NavbarBrand />
            <p className="mt-1 text-sm text-muted-foreground">{t('tagline')}</p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const isExternal = social.href.startsWith('http');
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-secondary/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}
          </div>

          <p className="text-sm text-muted-foreground">
            {currentYear} {t('brand')}. {t('rights')}
          </p>
        </div>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-40 w-80 -translate-x-1/2 bg-linear-to-t from-primary/5 to-transparent blur-3xl" />
    </footer>
  );
}
