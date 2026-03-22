'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Github,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/section-header';

type ProjectLink = {
  github?: string;
  live?: string;
};

type Project = {
  key: string;
  gradient: string;
  accentColor: string;
  links?: ProjectLink;
};

const projects: Project[] = [
  {
    key: 'technicert',
    gradient: 'from-primary via-neon-blue to-primary',
    accentColor: 'primary',
    links: {
      live: 'https://technicert-back.development.atelier.ovh/login',
    },
  },
  {
    key: 'afhome',
    gradient: 'from-accent via-neon-blue to-accent',
    accentColor: 'accent',
    links: {
      live: 'https://afhome-services.com/',
    },
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
  {
    key: 'alafiaplus',
    gradient: 'from-primary via-accent to-neon-blue',
    accentColor: 'accent',
    links: {
      github: 'https://github.com/tchessi-pre/alafia-plus',
    },
  },
  {
    key: 'zongopay',
    gradient: 'from-neon-blue via-primary to-accent',
    accentColor: 'neon-blue',
    links: {
      github: 'https://github.com/tchessi-pre/zongo-pay-official',
    },
  },
];

export function ProjectsSection() {
  const t = useTranslations('projects');
  const [activeProject, setActiveProject] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

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

  const updateTabsScrollIndicators = useCallback(() => {
    const el = tabsScrollRef.current;
    if (!el) return;

    const threshold = 4;
    setCanScrollUp(el.scrollTop > threshold);
    setCanScrollDown(
      el.scrollTop + el.clientHeight < el.scrollHeight - threshold
    );
  }, []);

  useEffect(() => {
    if (!isInView) return;
    tabRefs.current[activeProject]?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    });
    requestAnimationFrame(() => updateTabsScrollIndicators());
  }, [activeProject, isInView, updateTabsScrollIndicators]);

  const handleProjectChange = (index: number) => {
    if (index === activeProject) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProject(index);
      setIsTransitioning(false);
    }, 150);
  };
  useEffect(() => {
    updateTabsScrollIndicators();
    window.addEventListener('resize', updateTabsScrollIndicators);
    return () =>
      window.removeEventListener('resize', updateTabsScrollIndicators);
  }, [updateTabsScrollIndicators]);

  return (
    <section id='projects' ref={sectionRef} className='relative py-24 md:py-32'>
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195/0.10),transparent_60%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(to_right,oklch(0.75_0.18_195/0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.75_0.18_195/0.06)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_55%,transparent_78%)]' />
        <div className='absolute -left-28 top-16 h-80 w-80 rounded-full bg-primary/15 blur-3xl' />
        <div className='absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl' />
      </div>

      <div className='mx-auto max-w-6xl px-6'>
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          isInView={isInView}
          className='mb-16'
        />

        {/* Projects showcase */}
        <div className='grid gap-8 lg:grid-cols-5 lg:items-center'>
          {/* Project tabs */}
          <div className='relative lg:col-span-2'>
            <div
              className={cn(
                'pointer-events-none absolute left-1/2 -top-8 z-20 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-secondary/35  ring-white/10 transition-opacity',
                canScrollUp ? 'opacity-100' : 'opacity-0'
              )}
            >
              <ChevronUp className='h-6 w-6 text-muted-foreground' />
            </div>
            <div
              className={cn(
                'pointer-events-none absolute left-1/2 -bottom-8 z-20 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-secondary/35  ring-white/10 transition-opacity',
                canScrollDown ? 'opacity-100' : 'opacity-0'
              )}
            >
              <ChevronDown className='h-6 w-6 text-muted-foreground' />
            </div>
            <div
              ref={tabsScrollRef}
              onScroll={updateTabsScrollIndicators}
              className='grid max-h-[calc(3*4.5rem+2*0.75rem)] gap-3 overflow-y-auto pr-1 -mr-1 touch-pan-y overscroll-contain lg:max-h-[calc(4*4.5rem+3*0.75rem)]'
            >
              {projects.map((project, index) => (
                <button
                  key={project.key}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  onClick={() => handleProjectChange(index)}
                  className={cn(
                    'group relative flex min-h-18 w-full items-center gap-4 rounded-xl p-2 text-left ring-1 ring-white/10 transition-all duration-300',
                    activeProject === index
                      ? 'glass-strong shadow-sm shadow-primary/15 ring-primary/25'
                      : 'bg-secondary/20 hover:bg-secondary/80 '
                  )}
                >
                  {activeProject === index && (
                    <div className='absolute inset-0 rounded-xl bg-linear-to-r from-primary/12 via-accent/10 to-primary/12 transition-opacity duration-300' />
                  )}
                  <div className='relative z-10'>
                    <h3
                      className={cn(
                        'font-semibold transition-colors',
                        activeProject === index
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {t(`items.${project.key}.name`)}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      {t(`items.${project.key}.type`)}
                    </p>
                  </div>
                  <ChevronRight
                    className={cn(
                      'ml-auto h-5 w-5 transition-all',
                      activeProject === index
                        ? 'text-primary opacity-100'
                        : 'text-muted-foreground opacity-30 lg:opacity-0 lg:group-hover:opacity-50 lg:group-hover:translate-x-0.5'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Project detail card */}
          <div className='lg:col-span-3'>
            <div
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${isTransitioning
                ? 'opacity-0 translate-y-4'
                : 'opacity-100 translate-y-0'
                }`}
            >
              <div
                className={cn(
                  'absolute inset-0 bg-linear-to-br opacity-25',
                  projects[activeProject].gradient
                )}
              />
              <div className='relative rounded-2xl bg-linear-to-br from-primary/35 via-accent/20 to-neon-blue/35 p-px'>
                <div className='glass-strong relative overflow-hidden rounded-2xl p-6 ring-1 ring-white/10 md:p-8'>
                  <div className='pointer-events-none absolute inset-0'>
                    <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195/0.12),transparent_60%)]' />
                    <div className='absolute -left-20 -top-20 h-56 w-56 rounded-full bg-primary/12 blur-3xl' />
                    <div className='absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-accent/12 blur-3xl' />
                  </div>

                  <div className='relative'>
                    <div className='mb-6 flex items-start justify-between gap-4'>
                      <div>
                        <h3 className='mb-1 text-2xl font-bold text-foreground'>
                          {t(`items.${projects[activeProject].key}.name`)}
                        </h3>
                        <p className='text-sm text-primary'>
                          {t(`items.${projects[activeProject].key}.type`)}
                        </p>
                      </div>
                      {(projects[activeProject].links?.github ||
                        projects[activeProject].links?.live) && (
                          <div className='flex items-center gap-2'>
                            {projects[activeProject].links?.github && (
                              <a
                                href={projects[activeProject].links?.github}
                                target='_blank'
                                rel='noreferrer'
                                className='inline-flex items-center gap-2 rounded-full bg-secondary/30 px-3.5 py-2 text-sm font-medium text-foreground ring-1 ring-white/10 transition-all hover:scale-[1.03] hover:bg-secondary/45 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                              >
                                <Github className='h-5 w-5 text-primary' />
                                <span>GitHub</span>
                              </a>
                            )}
                            {projects[activeProject].links?.live && (
                              <a
                                href={projects[activeProject].links?.live}
                                target='_blank'
                                rel='noreferrer'
                                className='inline-flex items-center gap-2 rounded-full bg-secondary/30 px-3.5 py-2 text-sm font-medium text-foreground ring-1 ring-white/10 transition-all hover:scale-[1.03] hover:bg-secondary/45 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                              >
                                <ArrowUpRight className='h-5 w-5 text-primary' />
                                <span>{t('view_site')}</span>
                              </a>
                            )}
                          </div>
                        )}
                    </div>

                    <div className='mb-6 space-y-4'>
                      <div className='rounded-xl border border-border/50 bg-background/35 p-4'>
                        <span className='mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                          Problem
                        </span>
                        <p className='text-sm leading-relaxed text-foreground'>
                          {t(`items.${projects[activeProject].key}.problem`)}
                        </p>
                      </div>
                      <div className='rounded-xl border border-border/50 bg-primary/7 p-4'>
                        <span className='mb-2 block text-xs font-semibold uppercase tracking-wider text-primary'>
                          Solution
                        </span>
                        <p className='text-sm leading-relaxed text-foreground'>
                          {t(`items.${projects[activeProject].key}.solution`)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className='mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                        Tech Stack
                      </span>
                      <div className='flex flex-wrap gap-2'>
                        {t(`items.${projects[activeProject].key}.stack`)
                          .split(', ')
                          .map((tech) => (
                            <span
                              key={tech}
                              className='rounded-full border border-border/50 bg-secondary/35 px-3 py-1 text-xs font-medium text-muted-foreground'
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
