'use client';

import { useEffect, useState } from 'react';

type NetworkInfo = {
  effectiveType?: string;
  saveData?: boolean;
};

/**
 * Decide se a abertura roda na versão cheia ou na leve.
 * Leve quando: tela pequena, aparelho modesto, conexão ruim, ou o
 * usuário pediu menos movimento no sistema.
 */
export function useLiteMode() {
  // null enquanto não sabemos — a abertura só começa depois de decidir,
  // assim ninguém vê a versão errada por um frame
  const [lite, setLite] = useState<boolean | null>(null);

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: NetworkInfo;
      deviceMemory?: number;
    };

    const smallScreen = window.matchMedia('(max-width: 820px)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const thinDevice = (nav.deviceMemory ?? 8) <= 4;
    const slowLink =
      nav.connection?.saveData === true ||
      ['slow-2g', '2g', '3g'].includes(nav.connection?.effectiveType ?? '');

    setLite(smallScreen || coarse || thinDevice || slowLink);
  }, []);

  return lite;
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
