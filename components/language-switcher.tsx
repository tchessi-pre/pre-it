'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="glass relative flex items-center gap-1 rounded-full p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            'relative z-10 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
            locale === loc ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {locale === loc && (
            <motion.span
              layoutId="locale-indicator"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent"
              style={{ boxShadow: '0 0 15px oklch(0.75 0.18 195 / 0.5)' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{localeNames[loc]}</span>
        </button>
      ))}
    </div>
  );
}
