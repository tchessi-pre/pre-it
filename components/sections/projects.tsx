'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/section-header';

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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195/0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.75_0.18_195/0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.75_0.18_195/0.06)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_55%,transparent_78%)]" />
        <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          isInView={isInView}
          className="mb-16"
        />

        {/* Projects showcase */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Project tabs */}
          <div className="flex flex-row gap-2 overflow-x-auto pb-1 lg:col-span-2 lg:flex-col lg:gap-3 lg:pb-0">
            {projects.map((project, index) => (
              <button
                key={project.key}
                onClick={() => handleProjectChange(index)}
                className={cn(
                  'group relative flex min-w-[200px] items-center gap-4 rounded-xl p-4 text-left ring-1 ring-white/10 transition-all duration-300 lg:min-w-0',
                  activeProject === index
                    ? 'glass-strong shadow-sm shadow-primary/15 ring-primary/25'
                    : 'bg-secondary/20 hover:bg-secondary/35 hover:translate-x-1'
                )}
              >
                {activeProject === index && (
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/12 via-accent/10 to-primary/12 transition-opacity duration-300" />
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
                      : 'text-muted-foreground opacity-0 group-hover:opacity-50 group-hover:translate-x-0.5'
                  )}
                />
              </button>
            ))}
          </div>

          {/* Project detail card */}
          <div className="lg:col-span-3">
            <div
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
            >
              <div
                className={cn(
                  'absolute inset-0 bg-linear-to-br opacity-25',
                  projects[activeProject].gradient
                )}
              />
              <div className="relative rounded-2xl bg-linear-to-br from-primary/35 via-accent/20 to-neon-blue/35 p-px">
                <div className="glass-strong relative overflow-hidden rounded-2xl p-6 ring-1 ring-white/10 md:p-8">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195/0.12),transparent_60%)]" />
                    <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-primary/12 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-accent/12 blur-3xl" />
                  </div>

                  <div className="relative">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="mb-1 text-2xl font-bold text-foreground">
                          {t(`items.${projects[activeProject].key}.name`)}
                        </h3>
                        <p className="text-sm text-primary">
                          {t(`items.${projects[activeProject].key}.type`)}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={t(`items.${projects[activeProject].key}.name`)}
                        className="rounded-full bg-secondary/30 p-2 ring-1 ring-white/10 transition-all hover:scale-110 hover:bg-secondary/45 active:scale-95"
                      >
                        <ArrowUpRight className="h-5 w-5 text-primary" />
                      </button>
                    </div>

                    <div className="mb-6 space-y-4">
                      <div className="rounded-xl border border-border/50 bg-background/35 p-4">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Problem
                        </span>
                        <p className="text-sm leading-relaxed text-foreground">
                          {t(`items.${projects[activeProject].key}.problem`)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/50 bg-primary/7 p-4">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary">
                          Solution
                        </span>
                        <p className="text-sm leading-relaxed text-foreground">
                          {t(`items.${projects[activeProject].key}.solution`)}
                        </p>
                      </div>
                    </div>

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
                              className="rounded-full border border-border/50 bg-secondary/35 px-3 py-1 text-xs font-medium text-muted-foreground"
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
        </div>
      </div>
    </section>
  );
}
