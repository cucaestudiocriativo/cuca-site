import type { Region } from '@/lib/region';

export type Field =
  | { name: string; label: string; kind: 'text' | 'email' | 'tel'; placeholder?: string; required?: boolean }
  | { name: string; label: string; kind: 'select'; options: string[]; required?: boolean }
  | { name: string; label: string; kind: 'textarea'; placeholder?: string; required?: boolean; hint?: string };

export type SiteContent = {
  region: Region;
  lang: string;
  meta: { title: string; description: string };

  nav: { label: string; href: string }[];
  navCta: string;

  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    lead: string;
    cta: string;
    ctaSecondary: string;
    marks: string[];
  };

  about: {
    eyebrow: string;
    title: string;
    body: string[];
    pillars: { title: string; text: string }[];
  };

  services: {
    eyebrow: string;
    title: string;
    lead: string;
    items: { n: string; title: string; text: string; bullets: string[] }[];
  };

  form: {
    eyebrow: string;
    title: string;
    lead: string;
    fields: Field[];
    submit: string;
    sending: string;
    /** linha ao lado do botão */
    note: string;
    /** uso dos dados — LGPD no Brasil, RGPD em Portugal */
    privacy: string;
    success: { title: string; text: string };
    error: string;
  };

  footer: {
    line: string;
    email: string;
    switchLabel: string;
    rights: string;
  };
};
