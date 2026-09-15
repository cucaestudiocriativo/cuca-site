import type { Metadata, Viewport } from 'next';
import { Sora, Montserrat } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CUCA. — Estúdio de marca',
  description:
    'Estúdio de branding e marketing digital. Poucos projetos por vez, no Brasil e em Portugal.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'CUCA. — Estúdio de marca',
    description:
      'Estúdio de branding e marketing digital. Poucos projetos por vez, no Brasil e em Portugal.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F3EE',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
