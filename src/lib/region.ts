export const REGIONS = ['br', 'pt'] as const;
export type Region = (typeof REGIONS)[number];

const KEY = 'cuca:region';

/** query que força a tela de escolha mesmo com região já salva */
export const SWITCH_PARAM = 'trocar';

export function isRegion(value: unknown): value is Region {
  return typeof value === 'string' && (REGIONS as readonly string[]).includes(value);
}

export function readRegion(): Region | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(KEY);
    return isRegion(saved) ? saved : null;
  } catch {
    // modo privado ou storage bloqueado: segue sem memória, não quebra
    return null;
  }
}

export function writeRegion(region: Region) {
  try {
    window.localStorage.setItem(KEY, region);
  } catch {
    /* sem storage, a escolha só vale nesta visita */
  }
}

export function clearRegion() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* idem */
  }
}

export function wantsToSwitch() {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has(SWITCH_PARAM);
}
