import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Footer } from '@/components/layout/footer';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { gugi } from '@/lib/fonts';

export default async function ConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('privacy');

  return (
    <PageWrapper>
      <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <a
            href={`/${locale}`}
            className="rounded-xl px-2 py-1 text-2xl font-bold tracking-tight transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className={`${gugi.className} text-foreground`}>PRE</span>
            <span className="mx-1 inline-block h-px w-3 translate-y-[-0.35em] bg-foreground/70 align-middle" />
            <span className={`${gugi.className} text-primary`}>IT</span>
          </a>

          <a
            href={`/${locale}#contact`}
            className="rounded-full border border-border/60 bg-secondary/25 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/45"
          >
            {t('back_cta')}
          </a>
        </div>
      </header>

      <main className="pt-[72px]">
        <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            {t('intro')}
          </p>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">{t('data_title')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('data_text')}</p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">{t('purpose_title')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('purpose_text')}</p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">{t('legal_basis_title')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('legal_basis_text')}</p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">{t('recipients_title')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('recipients_text')}</p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">{t('retention_title')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('retention_text')}</p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">{t('rights_title')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('rights_text')}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{t('contact_label')}</span>{' '}
                <a className="text-primary hover:text-primary/85" href={`mailto:${t('contact_email')}`}>
                  {t('contact_email')}
                </a>
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">{t('cookies_title')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('cookies_text')}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageWrapper>
  );
}
