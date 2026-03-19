import { setRequestLocale } from 'next-intl/server';
import { AnimatedBackground } from '@/components/animated-background';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { ProjectsSection } from '@/components/sections/projects';
import { WhySection } from '@/components/sections/why';
import { ProcessSection } from '@/components/sections/process';
import { CTASection } from '@/components/sections/cta';
import { Footer } from '@/components/footer';
import { PageWrapper } from '@/components/page-wrapper';

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
