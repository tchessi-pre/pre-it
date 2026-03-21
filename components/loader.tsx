'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        // Start fade out after progress completes
        setTimeout(() => {
          setFadeOut(true);
          // Call onComplete after fade animation
          setTimeout(onComplete, 600);
        }, 300);
      } else {
        // Add some randomness for realistic feel
        setProgress(Math.min(current + Math.random() * 5, 99));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-[orb-float-1_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-[orb-float-2_10s_ease-in-out_infinite]" />

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with glow rings */}
        <div className="relative mb-8">
          {/* Outer spinning ring */}
          <div className="absolute inset-[-30px] rounded-full border border-primary/30 animate-[spin_8s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
          </div>

          {/* Middle pulsing ring */}
          <div className="absolute inset-[-15px] rounded-full border-2 border-primary/40 animate-[pulse-ring_2s_ease-in-out_infinite]" />

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl animate-[pulse-glow_3s_ease-in-out_infinite]" />

          {/* Logo image */}
          <div className="relative h-32 w-32 md:h-40 md:w-40">
            <Image
              src="/hand-pre-it.png"
              alt="PRE-IT Logo"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]"
              priority
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            <span className="text-primary text-glow-cyan">PRE</span>
            <span className="text-foreground">-</span>
            <span className="text-foreground">IT</span>
          </h2>
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            Initializing System
          </p>
        </div>

        {/* Progress bar container */}
        <div className="relative w-64 md:w-80">
          {/* Background bar */}
          <div className="h-1 w-full rounded-full bg-secondary/50 overflow-hidden">
            {/* Progress fill */}
            <div
              className="h-full rounded-full bg-linear-to-r from-primary via-accent to-primary transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Glow effect on progress */}
          <div
            className="absolute top-0 h-1 rounded-full bg-primary blur-sm transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />

          {/* Progress percentage */}
          <div className="mt-3 flex justify-between items-center text-xs">
            <span className="text-muted-foreground font-mono">LOADING</span>
            <span className="text-primary font-mono font-bold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Animated dots */}
        <div className="mt-8 flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary/60"
              style={{
                animation: `pulse-glow 1.5s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-primary/50 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-linear-to-b from-primary/50 to-transparent" />
      </div>
      <div className="absolute top-8 right-8 w-16 h-16">
        <div className="absolute top-0 right-0 w-full h-px bg-linear-to-l from-primary/50 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-primary/50 to-transparent" />
      </div>
      <div className="absolute bottom-8 left-8 w-16 h-16">
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-linear-to-t from-primary/50 to-transparent" />
      </div>
      <div className="absolute bottom-8 right-8 w-16 h-16">
        <div className="absolute bottom-0 right-0 w-full h-px bg-linear-to-l from-primary/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-linear-to-t from-primary/50 to-transparent" />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-0 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
          style={{
            animation: 'scan-line 3s linear infinite',
          }}
        />
      </div>
    </div>
  );
}
