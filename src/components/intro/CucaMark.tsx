'use client';

import {
  LETTER_DELAYS,
  LETTER_MS,
  FALL_MS,
  FLATTEN_AT_MS,
  FLATTEN_MS,
} from './timeline';
import styles from './intro.module.css';

const REST = 'UCA.' as const;

type Props = {
  /** 'still' = já pousado (skip, reduced motion, visitante recorrente) */
  phase: 'still' | 'running';
  /** versão leve: menos camadas e sem 3D real */
  lite: boolean;
  /** 1 = tempo real. Menor deixa em câmera lenta (usado só na bancada). */
  speed?: number;
};

/**
 * Extrusão simulada: várias cópias da letra empilhadas em Z, a da frente
 * laranja e as de trás escurecendo. Custa alguns spans em vez de um
 * renderer 3D inteiro, e some no fim da animação de qualquer jeito.
 */
function depthLayers(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0 : i / (count - 1);
    const keep = Math.round((1 - t) * 78);
    return {
      z: i + 1,
      color: `color-mix(in srgb, #EB5416 ${keep}%, #8C2F06)`,
    };
  });
}

export default function CucaMark({ phase, lite, speed = 1 }: Props) {
  const layers = depthLayers(lite ? 8 : 20);
  const running = phase === 'running';

  return (
    <div
      className={[
        styles.shaker,
        lite ? styles.lite : '',
        running ? styles.running : styles.settled,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--fall': `${Math.round(FALL_MS / speed)}ms`,
          '--flatten-at': `${Math.round(FLATTEN_AT_MS / speed)}ms`,
          '--flatten-dur': `${Math.round(FLATTEN_MS / speed)}ms`,
        } as React.CSSProperties
      }
    >
      <div className={styles.word} aria-label="CUCA.">
        <span className={styles.slot} aria-hidden="true">
          <span className={styles.dropper}>
            <span className={styles.squasher}>
              <span className={styles.stack}>
                {layers.map((layer) => (
                  <span
                    key={layer.z}
                    className={styles.layer}
                    style={{
                      ['--z' as string]: layer.z,
                      ['--layer-color' as string]: layer.color,
                      color: '#8C2F06',
                    }}
                  >
                    C
                  </span>
                ))}
                <span className={styles.face}>C</span>
              </span>
            </span>
          </span>
          <span className={styles.shadow} />
        </span>

        {REST.split('').map((char, i) => (
          <span
            key={`${char}-${i}`}
            aria-hidden="true"
            className={[styles.letter, char === '.' ? styles.dot : '']
              .filter(Boolean)
              .join(' ')}
            style={{
              animationDelay: `${Math.round(LETTER_DELAYS[i] / speed)}ms`,
              animationDuration: `${Math.round(LETTER_MS / speed)}ms`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
