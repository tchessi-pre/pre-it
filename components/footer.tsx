'use client';

import { useTranslations } from 'next-intl';
import { Briefcase, Github, Linkedin } from 'lucide-react';
import { NavbarBrand } from '@/components/navbar-brand';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SocialLinkWithTooltip } from '@/components/social-link-with-tooltip';

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

          <TooltipProvider delayDuration={0}>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <SocialLinkWithTooltip
                  key={social.label}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                />
              ))}
            </div>
          </TooltipProvider>

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
