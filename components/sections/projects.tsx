'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const projects = [
  {
    key: 'technicert',
    gradient: 'from-primary via-neon-blue to-primary',
    accentColor: 'primary',
  },
  {
    key: 'klikango',
    gradient: 'from-accent via-primary to-accent',
    accentColor: 'accent',
  },
  {
    key: 'expansi',
    gradient: 'from-neon-blue via-accent to-neon-blue',
    accentColor: 'neon-blue',
  },
];

export function ProjectsSection() {
  const t = useTranslations('projects');
  const [activeProject, setActiveProject] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleProjectChange = (index: number) => {
    if (index === activeProject) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProject(index);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Projects showcase */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Project tabs */}
          <div className="flex flex-row gap-2 overflow-x-auto lg:col-span-2 lg:flex-col lg:gap-3">
            {projects.map((project, index) => (
              <button
                key={project.key}
                onClick={() => handleProjectChange(index)}
                className={cn(
                  'group relative flex min-w-[200px] items-center gap-4 rounded-xl p-4 text-left transition-all duration-300 lg:min-w-0',
                  activeProject === index
                    ? 'glass-strong border border-primary/30'
                    : 'hover:bg-secondary/50 hover:translate-x-1'
                )}
              >
                {activeProject === index && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 transition-opacity duration-300" />
                )}
                <div className="relative z-10">
                  <h3
                    className={cn(
                      'font-semibold transition-colors',
                      activeProject === index ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {t(`items.${project.key}.name`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t(`items.${project.key}.type`)}</p>
                </div>
                <ChevronRight
                  className={cn(
                    'ml-auto h-5 w-5 transition-all',
                    activeProject === index
                      ? 'text-primary opacity-100'
                      : 'text-muted-foreground opacity-0 group-hover:opacity-50'
                  )}
                />
              </button>
            ))}
          </div>

          {/* Project detail card */}
          <div className="lg:col-span-3">
            <div
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Gradient background */}
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-20',
                  projects[activeProject].gradient
                )}
              />

              {/* Glass card */}
              <div className="glass-strong relative p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-2xl font-bold text-foreground">
                      {t(`items.${projects[activeProject].key}.name`)}
                    </h3>
                    <p className="text-sm text-primary">
                      {t(`items.${projects[activeProject].key}.type`)}
                    </p>
                  </div>
                  <button className="rounded-full bg-primary/10 p-2 transition-all hover:scale-110 hover:bg-primary/20 active:scale-95">
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                  </button>
                </div>

                {/* Problem / Solution */}
                <div className="mb-6 space-y-4">
                  <div className="rounded-xl bg-background/50 p-4">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Problem
                    </span>
                    <p className="text-sm leading-relaxed text-foreground">
                      {t(`items.${projects[activeProject].key}.problem`)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-primary/5 p-4">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary">
                      Solution
                    </span>
                    <p className="text-sm leading-relaxed text-foreground">
                      {t(`items.${projects[activeProject].key}.solution`)}
                    </p>
                  </div>
                </div>

                {/* Tech stack */}
                <div>
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {t(`items.${projects[activeProject].key}.stack`)
                      .split(', ')
                      .map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
