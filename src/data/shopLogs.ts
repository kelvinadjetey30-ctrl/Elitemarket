/** Coinbase Logs — simulated demo listings (school project) */
export type ShopLogAccount = {
  id: string;
  amount: number;
  price: number;
  country: string;
};

const COUNTRIES = [
  'USA', 'UK', 'CANADA', 'GERMANY', 'FRANCE', 'ITALY', 'SPAIN',
  'AUSTRALIA', 'NETHERLANDS', 'BELGIUM', 'MEXICO', 'BRAZIL',
  'COLOMBIA', 'PERU',
] as const;

function priceFromAmount(amount: number, i: number): number {
  const base = amount * 0.011;
  const tier =
    amount >= 30000 ? 200 :
    amount >= 20000 ? 150 :
    amount >= 12000 ? 100 :
    amount >= 6000 ? 65 :
    amount >= 2500 ? 40 :
    amount >= 1000 ? 26 : 16;
  const noise = ((i * 17 + amount) % 113) * 0.22;
  return Math.max(12, Math.round((base + tier + noise) * 100) / 100);
}

function buildLogs(): ShopLogAccount[] {
  const logs: ShopLogAccount[] = [];
  for (let i = 0; i < 600; i++) {
    const t = i / 599;
    const wave = Math.sin(i * 0.37) * 0.5 + 0.5;
    const amount = Math.round(400 + t * 39600 + wave * 800 - 400);
    const clamped = Math.min(40000, Math.max(400, amount));
    const jitter = ((i * 41) % 500) - 250;
    const finalAmount = Math.min(40000, Math.max(400, clamped + jitter));
    logs.push({
      id: `cb-log-${String(i + 1).padStart(3, '0')}`,
      amount: finalAmount,
      price: priceFromAmount(finalAmount, i),
      country: COUNTRIES[i % COUNTRIES.length],
    });
  }
  return logs;
}

export const SHOP_LOG_ACCOUNTS: ShopLogAccount[] = buildLogs();
