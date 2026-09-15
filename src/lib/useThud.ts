'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Impacto grave sintetizado na hora, em vez de um arquivo de áudio.
 * Motivo: um mp3 de "thud" só resolve depois de baixar, e se ele atrasa
 * o som descola do quique. Aqui o disparo é agendado no relógio do
 * próprio AudioContext, então bate exatamente quando a letra pousa.
 */

type Ctx = AudioContext & { __cucaUnlock?: () => void };

function makeNoise(ctx: AudioContext, seconds: number) {
  const frames = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i += 1) {
    // decai rápido, é só o "estalo" do contato
    data[i] = (Math.random() * 2 - 1) * (1 - i / frames) ** 3;
  }
  return buffer;
}

export function useThud() {
  const ctxRef = useRef<Ctx | null>(null);

  const getCtx = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC() as Ctx;
    }
    return ctxRef.current;
  }, []);

  /**
   * Navegador nenhum deixa tocar som antes de um gesto do usuário.
   * Então destravamos o contexto no primeiro toque, clique ou tecla,
   * seja qual for — inclusive o clique no próprio botão de som.
   */
  useEffect(() => {
    const unlock = () => {
      const ctx = ctxRef.current;
      if (ctx && ctx.state === 'suspended') void ctx.resume();
    };
    const opts = { passive: true } as const;
    window.addEventListener('pointerdown', unlock, opts);
    window.addEventListener('keydown', unlock, opts);
    window.addEventListener('touchstart', unlock, opts);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, []);

  const resume = useCallback(() => {
    const ctx = getCtx();
    if (ctx && ctx.state === 'suspended') return ctx.resume();
    return Promise.resolve();
  }, [getCtx]);

  /**
   * @param delayMs quanto falta para o pouso, em milissegundos
   * @param strength 1 no primeiro impacto, menor nos quiques seguintes
   */
  const thud = useCallback(
    (delayMs = 0, strength = 1) => {
      const ctx = getCtx();
      if (!ctx || ctx.state !== 'running') return;

      const t = ctx.currentTime + Math.max(0, delayMs) / 1000;
      const peak = 0.42 * strength;
      const tail = 0.22 + 0.24 * strength;

      // corpo: seno que despenca de grave para muito grave
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(164 * (0.82 + 0.18 * strength), t);
      osc.frequency.exponentialRampToValueAtTime(41, t + tail * 0.75);

      const bodyGain = ctx.createGain();
      bodyGain.gain.setValueAtTime(0.0001, t);
      bodyGain.gain.exponentialRampToValueAtTime(peak, t + 0.006);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + tail);

      // estalo: ruído curtíssimo passando por um lowpass, dá a madeira
      const click = ctx.createBufferSource();
      click.buffer = makeNoise(ctx, 0.07);

      const clickFilter = ctx.createBiquadFilter();
      clickFilter.type = 'lowpass';
      clickFilter.frequency.setValueAtTime(1200, t);
      clickFilter.frequency.exponentialRampToValueAtTime(220, t + 0.07);

      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(0.16 * strength, t);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

      osc.connect(bodyGain).connect(ctx.destination);
      click.connect(clickFilter).connect(clickGain).connect(ctx.destination);

      osc.start(t);
      osc.stop(t + tail + 0.05);
      click.start(t);
    },
    [getCtx],
  );

  useEffect(
    () => () => {
      void ctxRef.current?.close();
      ctxRef.current = null;
    },
    [],
  );

  return { thud, resume };
}
