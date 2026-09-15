'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import CucaMark from './CucaMark';
import { IMPACTS, HANDOFF_MS, LETTER_DELAYS } from './timeline';
import { useThud } from '@/lib/useThud';
import styles from './lab.module.css';

/**
 * Bancada da abertura. Serve para olhar a curva de quique sozinha,
 * comparar a versão cheia com a leve e conferir se o som bate no
 * frame certo, sem o resto da página no caminho.
 */
export default function IntroLab() {
  const [lite, setLite] = useState(false);
  const [sound, setSound] = useState(true);
  const [slow, setSlow] = useState(false);
  const [run, setRun] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const { thud, resume } = useThud();
  const raf = useRef<number | null>(null);

  const speed = slow ? 0.25 : 1;

  const replay = useCallback(() => {
    setRun((n) => n + 1);
  }, []);

  useEffect(() => {
    if (run === 0) return;

    if (sound) {
      void resume().then(() => {
        IMPACTS.forEach(({ at, strength }) =>
          thud(Math.round(at / speed), strength),
        );
      });
    }

    const start = performance.now();
    const tick = () => {
      const t = performance.now() - start;
      setElapsed(t);
      if (t < HANDOFF_MS / speed) {
        raf.current = requestAnimationFrame(tick);
      }
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [run, sound, speed, thud, resume]);

  const marks = [
    ...IMPACTS.map((i, n) => ({
      label: `quique ${n + 1}`,
      at: Math.round(i.at / speed),
    })),
    ...LETTER_DELAYS.map((d, n) => ({
      label: `letra ${['U', 'C', 'A', '.'][n]}`,
      at: Math.round(d / speed),
    })),
  ].sort((a, b) => a.at - b.at);

  return (
    <div className={styles.lab}>
      <div className={styles.stage}>
        {run === 0 ? (
          <div className={styles.idle}>
            <CucaMark phase="still" lite={lite} />
          </div>
        ) : (
          <MarkRunner key={run} lite={lite} speed={speed} />
        )}
      </div>

      <aside className={styles.panel}>
        <h1 className={styles.title}>Abertura, isolada</h1>

        <button type="button" className={styles.play} onClick={replay}>
          {run === 0 ? 'Rodar' : 'Rodar de novo'}
        </button>

        <div className={styles.switches}>
          <Toggle
            label="Versão leve (mobile / conexão ruim)"
            on={lite}
            onChange={setLite}
          />
          <Toggle label="Som" on={sound} onChange={setSound} />
          <Toggle label="Câmera lenta (1/4)" on={slow} onChange={setSlow} />
        </div>

        <div className={styles.readout}>
          <div className={styles.clock}>
            {run === 0 ? '—' : `${Math.round(elapsed)} ms`}
          </div>
          <ul className={styles.marks}>
            {marks.map((m) => (
              <li
                key={m.label}
                className={
                  run > 0 && elapsed >= m.at ? styles.markHit : styles.mark
                }
              >
                <span>{m.label}</span>
                <span>{m.at} ms</span>
              </li>
            ))}
            <li className={styles.markEnd}>
              <span>entrega para a escolha</span>
              <span>{Math.round(HANDOFF_MS / speed)} ms</span>
            </li>
          </ul>
        </div>

        <p className={styles.note}>
          Camadas de profundidade: {lite ? 8 : 20}. Na versão leve o 3D sai e
          a profundidade vira deslocamento diagonal, mantendo a mesma curva e
          o mesmo tempo.
        </p>
      </aside>
    </div>
  );
}

function MarkRunner({ lite, speed }: { lite: boolean; speed: number }) {
  return (
    <div className={styles.runner}>
      <CucaMark phase="running" lite={lite} speed={speed} />
    </div>
  );
}

function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.track} aria-hidden="true">
        <span className={styles.knob} />
      </span>
      {label}
    </label>
  );
}
