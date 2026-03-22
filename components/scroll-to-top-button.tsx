'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTopButton({ disabled }: { disabled?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 240);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'glass-strong fixed right-6 bottom-20 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border/50 shadow-[0_14px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/60 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        isVisible && !disabled
          ? 'pointer-events-auto opacity-100 translate-y-0'
          : 'pointer-events-none opacity-0 translate-y-3'
      )}
    >
      <ArrowUp className="h-5 w-5 text-foreground" />
    </button>
  );
}
