const PROMO_CODES: Record<string, number> = {
  COFFEE10: 0.1,
  WELCOME5: 0.05,
};

export function getPromoRate(code?: string): number {
  if (!code) return 0;
  return PROMO_CODES[code.trim().toUpperCase()] ?? 0;
}