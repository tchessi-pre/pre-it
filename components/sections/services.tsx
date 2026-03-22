'use client';

import { useTranslations } from 'next-intl';
import { Rocket, Layers, TrendingUp, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '@/components/section-header';
import { ReasonIcon } from '@/components/reason-icon';

const services = [
	{ key: 'mvp', icon: Rocket },
	{ key: 'fullstack', icon: Layers },
	{ key: 'scaling', icon: TrendingUp },
	{ key: 'audit', icon: Search },
];

export function ServicesSection() {
	const t = useTranslations('services');
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1, rootMargin: '-50px' }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section
			ref={sectionRef}
			id='services'
			className='relative overflow-hidden py-24 md:py-32'
		>
			<div aria-hidden className='absolute inset-0 -z-10'>
				<div className='absolute inset-0 bg-grid opacity-[0.14] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_78%)]' />
				<div className='absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-primary/8 blur-3xl' />
				<div className='absolute -right-24 top-24 h-96 w-96 rounded-full bg-accent/8 blur-3xl' />
				<div className='absolute bottom-0 left-1/2 h-104 w-104 -translate-x-1/2 rounded-full bg-neon-blue/8 blur-3xl' />
			</div>

			<div className='mx-auto max-w-6xl px-6'>
				<SectionHeader
					title={t('title')}
					subtitle={t('subtitle')}
					isInView={isVisible}
					outOfViewClassName='opacity-0 translate-y-8'
					titleGradientClassName='bg-linear-to-r from-foreground via-primary to-muted-foreground'
					subtitleClassName='md:text-lg'
					className='mb-14 md:mb-16'
					after={
						<div className='mx-auto mt-8 h-px w-24 bg-linear-to-r from-transparent via-border to-transparent' />
					}
				/>

				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
					{services.map((service, index) => {
						const Icon = service.icon;
						return (
							<div
								key={service.key}
								className={`group relative transition-all duration-700 ${
									isVisible
										? 'opacity-100 translate-y-0'
										: 'opacity-0 translate-y-8'
								}`}
								style={{
									transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
								}}
							>
								<div className='relative h-full rounded-2xl bg-linear-to-br from-primary/25 via-transparent to-accent/25 p-px transition-all duration-300 group-hover:from-primary/35 group-hover:to-accent/35 group-hover:shadow-[0_0_60px_rgba(0,245,255,0.08)]'>
									<div className='glass relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.01]'>
										<div className='absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-accent/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
										<div className='absolute -inset-px rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60' />

										<div className='relative z-10 flex h-full flex-col'>
											<div className='mb-4'>
												<ReasonIcon Icon={Icon} />
											</div>

											<h3 className='mb-2 text-lg font-semibold text-foreground'>
												{t(`items.${service.key}.title`)}
											</h3>
											<p className='text-sm leading-relaxed text-muted-foreground'>
												{t(`items.${service.key}.description`)}
											</p>

											<div className='mt-auto pt-6'>
												<div className='h-px w-full bg-linear-to-r from-transparent via-border/80 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-80' />
											</div>
										</div>

										<div className='absolute right-4 top-4 text-6xl font-bold text-foreground/30 transition-colors duration-300 group-hover:text-primary/50'>
											{String(index + 1).padStart(2, '0')}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
