import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Footer } from '@/components/footer';
import { PageWrapper } from '@/components/page-wrapper';
import { gugi } from '@/lib/fonts';

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legal');

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

          <div className="mt-10 space-y-10">
            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                {t('publisher_title')}
              </h2>
              <dl className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
                <div>
                  <dt className="font-medium text-foreground">{t('publisher_name_label')}</dt>
                  <dd className="mt-1">{t('publisher_name_value')}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">{t('publisher_email_label')}</dt>
                  <dd className="mt-1">
                    <a className="text-primary hover:text-primary/85" href={`mailto:${t('publisher_email_value')}`}>
                      {t('publisher_email_value')}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">{t('publisher_address_label')}</dt>
                  <dd className="mt-1">{t('publisher_address_value')}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">{t('publisher_director_label')}</dt>
                  <dd className="mt-1">{t('publisher_director_value')}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                {t('hosting_title')}
              </h2>
              <dl className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
                <div>
                  <dt className="font-medium text-foreground">{t('hosting_name_label')}</dt>
                  <dd className="mt-1">{t('hosting_name_value')}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">{t('hosting_site_label')}</dt>
                  <dd className="mt-1">
                    <a className="text-primary hover:text-primary/85" href={t('hosting_site_value')} target="_blank" rel="noreferrer">
                      {t('hosting_site_value')}
                    </a>
                  </dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="font-medium text-foreground">{t('hosting_address_label')}</dt>
                  <dd className="mt-1">{t('hosting_address_value')}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                {t('ip_title')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t('ip_text')}
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/10 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                {t('liability_title')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t('liability_text')}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageWrapper>
  );
}
