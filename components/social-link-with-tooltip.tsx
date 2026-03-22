'use client';

import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type React from 'react';

export function SocialLinkWithTooltip({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}) {
  const isExternal = href.startsWith('http');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          href={href}
          aria-label={label}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-secondary/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="h-4 w-4" />
        </motion.a>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
