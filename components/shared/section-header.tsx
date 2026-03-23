import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { gugi } from '@/lib/fonts';

type SectionHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  isInView?: boolean;
  inViewClassName?: string;
  outOfViewClassName?: string;
  titleGradientClassName?: string;
  subtitleClassName?: string;
  after?: ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  isInView,
  inViewClassName,
  outOfViewClassName,
  titleGradientClassName,
  subtitleClassName,
  after,
  className,
}: SectionHeaderProps) {
  const motionClass =
    isInView === undefined
      ? ''
      : isInView
        ? inViewClassName ?? 'opacity-100 translate-y-0'
        : outOfViewClassName ?? 'opacity-0 translate-y-5';

  return (
    <div className={cn('text-center transition-all duration-700', motionClass, className)}>
      <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        <span
          className={cn(
            gugi.className,
            'bg-clip-text [-webkit-background-clip:text] text-transparent',
            titleGradientClassName ?? 'bg-linear-to-r from-foreground via-primary to-foreground'
          )}
        >
          {title}
        </span>
      </h2>
      {subtitle ? (
        <p className={cn('mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl', subtitleClassName)}>
          {subtitle}
        </p>
      ) : null}
      {after ? after : null}
    </div>
  );
}
