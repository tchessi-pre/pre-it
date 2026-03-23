import { setRequestLocale } from 'next-intl/server';
import { AnimatedBackground } from '@/components/effects/animated-background';
import { Navbar } from '@/components/layout/navbar';
import { HeroSection } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { ProjectsSection } from '@/components/sections/projects';
import { WhySection } from '@/components/sections/why';
import { ProcessSection } from '@/components/sections/process';
import { CTASection } from '@/components/sections/cta';
import { Footer } from '@/components/layout/footer';
import { PageWrapper } from '@/components/layout/page-wrapper';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageWrapper>
      <AnimatedBackground />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <WhySection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
    </PageWrapper>
  );
}
