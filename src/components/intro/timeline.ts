/**
 * Fonte única da verdade da abertura. Os percentuais aqui são os mesmos
 * usados nos @keyframes de intro.module.css — mexeu num lado, mexe no outro,
 * senão o som descola do quique.
 */

export const FALL_MS = 1500;

/** momentos em que a letra encosta no chão, em % da queda */
const IMPACT_PERCENTS = [0.4, 0.605, 0.74, 0.84] as const;

/** força relativa de cada impacto: o primeiro é o que importa */
const IMPACT_STRENGTH = [1, 0.48, 0.22, 0.1] as const;

export const IMPACTS = IMPACT_PERCENTS.map((p, i) => ({
  at: Math.round(p * FALL_MS),
  strength: IMPACT_STRENGTH[i],
}));

/** entrada das letras U, C, A e do ponto — começa logo depois do primeiro baque */
export const LETTER_DELAYS = [640, 730, 820, 980] as const;
export const LETTER_MS = 620;

/** quando a extrusão começa a recolher para virar o C do logotipo */
export const FLATTEN_AT_MS = 1520;
export const FLATTEN_MS = 720;

/** quando a seleção de região começa a aparecer */
export const HANDOFF_MS = 2300;

/** quanto a abertura inteira leva, incluindo o respiro final */
export const INTRO_TOTAL_MS = 3000;
