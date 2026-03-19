'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <motion.a
              href="#"
              className="inline-block text-xl font-bold"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('brand')}
              </span>
            </motion.a>
            <p className="mt-1 text-sm text-muted-foreground">{t('tagline')}</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-secondary/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {currentYear} {t('brand')}. {t('rights')}
          </p>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 h-40 w-80 -translate-x-1/2 bg-gradient-to-t from-primary/5 to-transparent blur-3xl" />
    </footer>
  );
}
