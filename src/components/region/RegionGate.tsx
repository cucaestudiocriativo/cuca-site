'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import CucaMark from '@/components/intro/CucaMark';
import IntroControls from '@/components/intro/IntroControls';
import { HANDOFF_MS, IMPACTS } from '@/components/intro/timeline';
import { useLiteMode, prefersReducedMotion } from '@/lib/useLiteMode';
import { useThud } from '@/lib/useThud';
import {
  readRegion,
  writeRegion,
  wantsToSwitch,
  type Region,
} from '@/lib/region';
import styles from './region.module.css';

const SOUND_KEY = 'cuca:som';

type Phase = 'boot' | 'intro' | 'choose';

export default function RegionGate() {
  const router = useRouter();
  const lite = useLiteMode();

  const [phase, setPhase] = useState<Phase>('boot');
  const [skipped, setSkipped] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const { thud, resume } = useThud();
  const soundRef = useRef(soundOn);
  soundRef.current = soundOn;
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  /* preferência de som guardada entre visitas */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SOUND_KEY);
      if (saved === 'off') setSoundOn(false);
    } catch {
      /* sem storage, começa ligado */
    }
  }, []);

  /* quem já escolheu região vai direto, sem passar pela abertura de novo */
  useEffect(() => {
    if (lite === null) return;

    const saved = readRegion();
    if (saved && !wantsToSwitch()) {
      router.replace(`/${saved}/`);
      return;
    }

    if (prefersReducedMotion()) {
      setSkipped(true);
      setPhase('choose');
      return;
    }

    setPhase('intro');
  }, [lite, router]);

  /* a abertura em si: som agendado no mesmo relógio dos quiques */
  useEffect(() => {
    if (phase !== 'intro') return;

    if (soundRef.current) {
      void resume().then(() => {
        if (!soundRef.current) return;
        IMPACTS.forEach(({ at, strength }) => thud(at, strength));
      });
    }

    later(() => setPhase('choose'), HANDOFF_MS);

    return clearTimers;
  }, [phase, thud, resume, later, clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  const handleSkip = useCallback(() => {
    clearTimers();
    setSkipped(true);
    setPhase('choose');
  }, [clearTimers]);

  const handleToggleSound = useCallback(() => {
    setSoundOn((on) => {
      const next = !on;
      try {
        window.localStorage.setItem(SOUND_KEY, next ? 'on' : 'off');
      } catch {
        /* segue sem lembrar */
      }
      if (next) void resume();
      return next;
    });
  }, [resume]);

  const choose = useCallback(
    (region: Region) => {
      writeRegion(region);
      setLeaving(true);
      // deixa o fade terminar antes de trocar de rota, para não piscar
      setTimeout(() => router.push(`/${region}/`), 380);
    },
    [router],
  );

  if (lite === null) {
    // ainda decidindo versão cheia ou leve — tela limpa, sem flash
    return <div className={styles.gate} aria-hidden="true" />;
  }

  const choosing = phase === 'choose';

  return (
    <div
      className={[styles.gate, choosing ? styles.choosing : '', leaving ? styles.leaving : '']
        .filter(Boolean)
        .join(' ')}
    >
      <h1 className="sr-only">CUCA. — estúdio de marca no Brasil e em Portugal</h1>

      {phase === 'intro' && (
        <IntroControls
          soundOn={soundOn}
          onToggleSound={handleToggleSound}
          onSkip={handleSkip}
        />
      )}

      <div className={styles.inner}>
        <div className={styles.markHolder}>
          <CucaMark
            phase={phase === 'intro' && !skipped ? 'running' : 'still'}
            lite={lite}
          />
        </div>

        <div className={styles.choice}>
          <p className={styles.claim}>
            A CUCA não atende todo mundo. Atende quem entende por quê.
          </p>

          <div className={styles.pills}>
            <button
              type="button"
              className={styles.pill}
              onClick={() => choose('br')}
            >
              <span
                className={styles.flag}
                style={{
                  background:
                    'linear-gradient(120deg, #1F8A4C 0 46%, #F3D24B 46% 54%, #1F4E8A 54% 100%)',
                }}
                aria-hidden="true"
              />
              Brasil
            </button>

            <button
              type="button"
              className={styles.pill}
              onClick={() => choose('pt')}
            >
              <span
                className={styles.flag}
                style={{
                  background:
                    'linear-gradient(90deg, #1F6B41 0 40%, #D6232E 40% 100%)',
                }}
                aria-hidden="true"
              />
              Portugal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
