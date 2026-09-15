'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import type { SiteContent } from '@/content/types';
import { writeRegion } from '@/lib/region';
import QualifyForm from './QualifyForm';
import Reveal from './Reveal';
import styles from './site.module.css';

const OTHER = { br: 'pt', pt: 'br' } as const;

export default function SiteShell({ content }: { content: SiteContent }) {
  const { hero, about, services, form, footer, nav, navCta, region } = content;
  const [scrolled, setScrolled] = useState(false);
  const applyId = nav[nav.length - 1].href.replace('#', '');
  /* manchete curta fica na escala de display; frase inteira precisa recuar */
  const longHeadline = (hero.line1 + hero.line2).length > 36;

  /* a região visitada vira a preferida, mesmo quando se chega pelo link direto */
  useEffect(() => {
    writeRegion(region);
    // o export é estático e a tag <html> é única, então o idioma da página
    // é acertado aqui — importa para leitor de tela e para tradução automática
    document.documentElement.lang = content.lang;
  }, [region, content.lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.page}>
      <header
        className={[styles.nav, scrolled ? styles.navSolid : '']
          .filter(Boolean)
          .join(' ')}
      >
        <div className={`${styles.shell} ${styles.navInner}`}>
          <Link href={`/${region}/`} className={styles.mark}>
            CUCA<em>.</em>
          </Link>

          <nav className={styles.navLinks}>
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <a href={`#${applyId}`} className={styles.navCta}>
            {navCta}
          </a>
        </div>
      </header>

      <main>
        {/* ---------- hero ---------- */}
        <section className={styles.hero}>
          <div className={`${styles.shell} ${styles.heroInner}`}>
            <Reveal>
              <span className={styles.eyebrow}>{hero.eyebrow}</span>
              <h1
                className={[styles.heroTitle, longHeadline ? styles.heroTitleLong : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <span>{hero.line1}</span>
                <span className={styles.accent}>{hero.line2}</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className={styles.heroLead}>{hero.lead}</p>
            </Reveal>

            <Reveal delay={220}>
              <div className={styles.heroActions}>
                <a href={`#${applyId}`} className={styles.btnSolid}>
                  {hero.cta}
                </a>
                <a href="#estudio" className={styles.btnGhost}>
                  {hero.ctaSecondary}
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className={styles.heroMarks}>
                {hero.marks.map((mark) => (
                  <span key={mark}>{mark}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- estúdio ---------- */}
        <section id="estudio" className={styles.about}>
          <div className={styles.shell}>
            <div className={styles.aboutGrid}>
              <Reveal>
                <span className={styles.eyebrow}>{about.eyebrow}</span>
                <h2 className={styles.sectionTitle}>{about.title}</h2>
              </Reveal>

              <Reveal delay={120} className={styles.aboutBody}>
                {about.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </Reveal>
            </div>

            <div className={styles.pillars}>
              {about.pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 110} className={styles.pillar}>
                  <div className={styles.pillarRule} />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- serviços ---------- */}
        <section id="servicos" className={styles.services}>
          <div className={styles.shell}>
            <Reveal className={styles.servicesHead}>
              <span className={styles.eyebrow}>{services.eyebrow}</span>
              <h2 className={styles.sectionTitle}>{services.title}</h2>
              <p className={styles.servicesLead}>{services.lead}</p>
            </Reveal>

            <div className={styles.serviceList}>
              {services.items.map((item) => (
                <Reveal key={item.n} className={styles.service}>
                  <div className={styles.serviceN}>{item.n}</div>
                  <div>
                    <h3 className={styles.serviceTitle}>{item.title}</h3>
                    <p className={styles.serviceText}>{item.text}</p>
                  </div>
                  <ul className={styles.serviceBullets}>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- contato ---------- */}
        <section id={applyId} className={styles.apply}>
          <div className={styles.shell}>
            <div className={styles.applyGrid}>
              <Reveal>
                <span className={styles.eyebrow}>{form.eyebrow}</span>
                <h2 className={styles.sectionTitle}>{form.title}</h2>
                <p className={styles.applyLead}>{form.lead}</p>
              </Reveal>

              <div>
                <QualifyForm content={content} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <div className={styles.footerTop}>
            <div>
              <div className={styles.footerMark}>
                CUCA<em>.</em>
              </div>
              <p className={styles.footerLine}>{footer.line}</p>
            </div>

            <a href={`mailto:${footer.email}`} className={styles.footerMail}>
              {footer.email}
            </a>
          </div>

          <div className={styles.footerBottom}>
            {/* o ano vem do relógio do visitante; o HTML exportado é estático,
                então a divergência de hidratação no virar do ano é esperada */}
            <span suppressHydrationWarning>
              © {new Date().getFullYear()} CUCA. {footer.rights}
            </span>

            <Link
              href={`/${OTHER[region]}/`}
              className={styles.switch}
              prefetch={false}
            >
              {footer.switchLabel}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
