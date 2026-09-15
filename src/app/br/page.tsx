import type { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { br } from '@/content/br';

export const metadata: Metadata = {
  title: br.meta.title,
  description: br.meta.description,
  alternates: { canonical: '/br/', languages: { 'pt-BR': '/br/', 'pt-PT': '/pt/' } },
};

export default function BrasilPage() {
  return <SiteShell content={br} />;
}
