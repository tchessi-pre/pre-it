'use client';

import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
};

function createParticle(width: number, height: number): Particle {
  const colors = ['#22d3ee', '#a855f7', '#3b82f6'];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: Math.random() * 0.5 + 0.2,
  };
}

function updateParticle(particle: Particle, width: number, height: number) {
  particle.x += particle.vx;
  particle.y += particle.vy;

  if (particle.x < 0 || particle.x > width) particle.vx *= -1;
  if (particle.y < 0 || particle.y > height) particle.vy *= -1;
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fillStyle = particle.color;
  ctx.globalAlpha = particle.alpha;
  ctx.fill();
  ctx.globalAlpha = 1;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      const particleCount = Math.min(
        80,
        Math.floor((window.innerWidth * window.innerHeight) / 15000)
      );
      for (let i = 0; i < particleCount; i++) {
        particles.push(
          createParticle(canvas.width || window.innerWidth, canvas.height || window.innerHeight)
        );
      }
    };

    const connectParticles = () => {
      if (!ctx) return;
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - distance / maxDistance) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        updateParticle(particle, canvas.width, canvas.height);
        drawParticle(ctx, particle);
      }

      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    const handleResize = () => {
      resize();
      init();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {mounted && (
        <>
          <div
            className="absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
              animation: 'orb-float-1 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/3 -left-40 h-96 w-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
              animation: 'orb-float-2 10s ease-in-out infinite',
            }}
          />
          <div
            className="absolute -bottom-40 right-1/4 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
              animation: 'orb-float-3 12s ease-in-out infinite',
            }}
          />
        </>
      )}

      <div className="absolute inset-0 bg-grid opacity-30" />

      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
