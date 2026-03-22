'use client';

import { useTranslations } from 'next-intl';
import { PreItLogo } from '@/components/pre-it-logo';
import { gugi } from '@/lib/fonts';

export function NavbarBrand({
  showTagline = false,
  tagline,
}: {
  showTagline?: boolean;
  tagline?: string;
}) {
  const t = useTranslations('brand');

  return (
    <a
      href="#"
      className="group relative rounded-xl px-2 py-1 text-2xl font-bold tracking-tight transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <span className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-primary/10 ring-1 ring-white/10">
            <PreItLogo className="h-5 w-5 text-primary" title="Logo PRE-IT" />
          </span>
          <span
            className={`${gugi.className} drop-shadow-[0_0_16px_rgba(0,245,255,0.18)]`}
          >
            <span className="text-foreground transition-opacity duration-300 group-hover:opacity-90">
              PRE
            </span>
            <span className="relative inline-flex w-3 items-center justify-center align-middle">
              <span className="absolute h-px w-2 rounded-full bg-foreground/70 transition-all duration-300 group-hover:w-3 group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(0,245,255,0.45)]" />
            </span>
            <span className="text-primary transition-all duration-300 group-hover:-translate-y-px group-hover:drop-shadow-[0_0_10px_rgba(0,245,255,0.35)]">
              IT
            </span>
          </span>
        </span>
        {showTagline ? (
          <span className="pl-10 text-xs font-medium text-muted-foreground">
            {tagline ?? t('tagline')}
          </span>
        ) : null}
      </span>
      <span className="absolute -inset-2 -z-10 rounded-xl bg-primary/10 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
    </a>
  );
}
