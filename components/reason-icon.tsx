'use client';

import type { ComponentType } from 'react';
import { cn } from '@/lib/utils';

type IconComponent = ComponentType<{ className?: string }>;

export function ReasonIcon({
  Icon,
  wrapperClassName,
  iconClassName,
}: {
  Icon: IconComponent;
  wrapperClassName?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20',
        wrapperClassName
      )}
    >
      <Icon className={cn('h-6 w-6 text-primary', iconClassName)} />
    </div>
  );
}
