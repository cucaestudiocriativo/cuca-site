'use client';

import styles from './intro.module.css';

type Props = {
  soundOn: boolean;
  onToggleSound: () => void;
  onSkip: () => void;
};

export default function IntroControls({
  soundOn,
  onToggleSound,
  onSkip,
}: Props) {
  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.control}
        onClick={onToggleSound}
        aria-pressed={soundOn}
      >
        <span
          className={`${styles.wave} ${soundOn ? styles.waveOn : styles.waveOff}`}
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
          <i />
        </span>
        {soundOn ? 'Som ligado' : 'Som desligado'}
      </button>

      <button type="button" className={styles.control} onClick={onSkip}>
        Pular abertura
      </button>
    </div>
  );
}
