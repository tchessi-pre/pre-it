'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

export function TechChatbox({ disabled }: { disabled?: boolean }) {
  const t = useTranslations('chat');
  const dialogTitleId = useId();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const quickQuestionKeys = useMemo(
    () =>
      [
        'stack',
        'frontend',
        'backend',
        'database',
        'realtime',
        'payments',
        'devops',
        'best_practices',
        'clean_code',
        'testing',
        'code_review',
      ] as const,
    []
  );

  useEffect(() => {
    if (!disabled) return;
    setIsOpen(false);
  }, [disabled]);

  useEffect(() => {
    if (!isOpen || disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, isOpen]);

  useEffect(() => {
    if (!isOpen || disabled) return;
    if (messages.length !== 0) return;
    setMessages([{ id: 'welcome', role: 'assistant', text: t('welcome') }]);
  }, [disabled, isOpen, messages.length, t]);

  useEffect(() => {
    if (!isOpen || disabled) return;
    const el = listRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });
  }, [disabled, isOpen, messages.length]);

  const ask = (key: (typeof quickQuestionKeys)[number]) => {
    const prompt = t(`questions.${key}`);
    const answer = t(`answers.${key}`);

    setMessages((prev) => [
      ...prev,
      { id: `${key}-q-${prev.length}`, role: 'user', text: prompt },
      { id: `${key}-a-${prev.length + 1}`, role: 'assistant', text: answer },
    ]);
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby={dialogTitleId}
        className={cn(
          'glass-strong fixed right-6 bottom-20 z-40 w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-2xl border border-border/50 shadow-[0_18px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition-all duration-300',
          isOpen && !disabled
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        )}
      >
        <div className="flex items-center justify-between border-b border-border/40 bg-secondary/15 px-4 py-3">
          <div className="min-w-0">
            <div id={dialogTitleId} className="truncate text-sm font-semibold text-foreground">
              {t('title')}
            </div>
            <div className="truncate text-xs text-muted-foreground">{t('subtitle')}</div>
          </div>

          <button
            type="button"
            aria-label={t('close')}
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <X className="h-4 w-4 text-foreground" />
          </button>
        </div>

        <div className="px-4 py-3">
          <div
            ref={listRef}
            className="max-h-64 space-y-2 overflow-auto rounded-xl border border-border/40 bg-background/30 p-3"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'w-fit max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed',
                  m.role === 'user'
                    ? 'ml-auto bg-primary/15 text-foreground ring-1 ring-primary/25'
                    : 'bg-secondary/25 text-foreground ring-1 ring-white/10'
                )}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="mt-3 text-xs font-medium text-muted-foreground">{t('quick_title')}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {quickQuestionKeys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => ask(key)}
                className="rounded-full border border-border/50 bg-secondary/20 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {t(`questions.${key}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label={t('launcher_label')}
        aria-expanded={isOpen && !disabled}
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          'glass-strong fixed right-6 bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border/50 shadow-[0_14px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/60 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          disabled ? 'pointer-events-none opacity-40' : 'opacity-100'
        )}
      >
        <MessageCircle className="h-5 w-5 text-foreground" />
      </button>
    </>
  );
}

