import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'PRE-IT | SaaS Development Studio',
  description:
    'Build your SaaS faster. I design and develop scalable SaaS platforms from idea to production using React, Node.js and TypeScript.',
  keywords: [
    'SaaS Development',
    'Fullstack Developer',
    'React',
    'Node.js',
    'TypeScript',
    'Next.js',
    'MVP Development',
  ],
  authors: [{ name: 'PRE-IT' }],
  openGraph: {
    title: 'PRE-IT | SaaS Development Studio',
    description:
      'Build your SaaS faster. I design and develop scalable SaaS platforms from idea to production.',
    type: 'website',
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
      className="dark"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
