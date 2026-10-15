// Logica di valutazione degli investimenti (specchio delle formule Excel)

/** VAN: somma dei flussi attualizzati. flows[0] è l'anno 0 (non scontato). */
export function npv(rate: number, flows: number[]): number {
  return flows.reduce((acc, f, i) => acc + f / Math.pow(1 + rate, i), 0);
}

/** TIR: tasso che azzera il VAN (bisezione). Null se non esiste nell'intervallo. */
export function irr(flows: number[]): number | null {
  const f = (r: number) => npv(r, flows);
  let lo = -0.99;
  let hi = 10;
  if (!isFinite(f(lo)) || !isFinite(f(hi)) || f(lo) * f(hi) > 0) return null;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

/** Payback semplice (anni). Null se i flussi non bastano mai a rientrare. */
export function payback(flows: number[]): number | null {
  const cum: number[] = [];
  let c = 0;
  for (const f of flows) {
    c += f;
    cum.push(c);
  }
  const nNeg = cum.filter((x) => x < 0).length;
  if (nNeg === 0) return 0;
  if (nNeg === cum.length) return null;
  return nNeg - 1 + Math.abs(cum[nNeg - 1]) / flows[nNeg];
}

/** Flussi attualizzati anno per anno (per il grafico). */
export function discountedFlows(rate: number, flows: number[]): number[] {
  return flows.map((f, i) => f / Math.pow(1 + rate, i));
}

export function eur(n: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

export function eur2(n: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function pct(n: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(n);
}
