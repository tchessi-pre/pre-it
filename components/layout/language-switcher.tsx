'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
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
    <div
      role="tablist"
      aria-label="Language"
      className="glass relative inline-flex items-center gap-1 rounded-full p-1 ring-1 ring-border/30 shadow-[0_0_25px_oklch(0.75_0.18_195/0.06)]"
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          role="tab"
          aria-selected={locale === loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            'relative rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] transition-[color,background-color,border-color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 active:scale-[0.98]',
            locale === loc
              ? 'border-primary/55 bg-primary/15 text-foreground shadow-[0_0_16px_oklch(0.75_0.18_195/0.16)]'
              : 'border-transparent text-muted-foreground hover:border-border/40 hover:bg-foreground/5 hover:text-foreground'
          )}
        >
          {localeNames[loc]}
        </button>
      ))}
    </div>
  );
}
