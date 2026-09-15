import type { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { pt } from '@/content/pt';

export const metadata: Metadata = {
  title: pt.meta.title,
  description: pt.meta.description,
  alternates: { canonical: '/pt/', languages: { 'pt-PT': '/pt/', 'pt-BR': '/br/' } },
};

export default function PortugalPage() {
  return <SiteShell content={pt} />;
}
