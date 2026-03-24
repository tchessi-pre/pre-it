import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://pre-it.vercel.app/'),
	title: {
		default: 'PRE-IT — Freelance Fullstack Engineer',
		template: '%s | PRE-IT',
	},
	description:
		'Freelance fullstack engineer building high-performance web products (SaaS, MVP) from idea to production with Next.js, TypeScript, and Node.js.',
	keywords: [
		'Freelance Fullstack Engineer',
		'Freelance Web Developer',
		'Next.js',
		'React',
		'TypeScript',
		'Node.js',
		'SaaS development',
		'MVP development',
		'Fullstack engineer',
	],
	authors: [{ name: 'PRE-IT' }],
	creator: 'PRE-IT',
	publisher: 'PRE-IT',
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: 'PRE-IT — Freelance Fullstack Engineer',
		description:
			'Freelance full‑stack engineer crafting SaaS and MVPs with Next.js, TypeScript and Node.js — from scoping to launch with fast, reliable, production‑ready code.',
		url: 'https://pre-it.vercel.app/',
		siteName: 'PRE-IT',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: 'PRE-IT — Freelance Fullstack Engineer',
		description:
			'Freelance full‑stack engineer crafting SaaS and MVPs with Next.js, TypeScript and Node.js — from scoping to launch with fast, reliable, production‑ready code.',
	},
	icons: {
		icon: '/icon.svg',
	},
};

export const viewport: Viewport = {
	themeColor: '#0a0a12',
	colorScheme: 'dark',
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale?: string }>;
}>) {
	const { locale } = await params;
	const lang = locale || 'en';

	return (
		<html
			lang={lang}
			className='dark'
			suppressHydrationWarning
			data-scroll-behavior='smooth'
		>
			<body className={`${inter.variable} font-sans antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
