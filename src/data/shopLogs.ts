/** Coinbase Logs — simulated demo listings (school project) */
export type ShopLogAccount = {
  id: string;
  /** Account balance amount in USD ($400 – $40,000) */
  amount: number;
  /** Sale price in USD (varies with amount) */
  price: number;
  country: string;
};

const COUNTRIES = [
  'USA', 'UK', 'CANADA', 'GERMANY', 'FRANCE', 'ITALY', 'SPAIN',
  'AUSTRALIA', 'NETHERLANDS', 'BELGIUM', 'MEXICO', 'BRAZIL',
] as const;

function priceFromAmount(amount: number): number {
  const base = amount * 0.012;
  const tier =
    amount >= 25000 ? 180 :
    amount >= 15000 ? 120 :
    amount >= 8000 ? 75 :
    amount >= 3000 ? 45 :
    amount >= 1000 ? 28 : 18;
  const noise = (amount % 97) * 0.15;
  return Math.max(15, Math.round((base + tier + noise) * 100) / 100);
}

function buildLogs(): ShopLogAccount[] {
  const amounts = [
    400, 520, 650, 800, 950, 1100, 1350, 1600, 1850, 2100,
    2500, 2800, 3200, 3750, 4200, 4800, 5500, 6200, 7000, 7800,
    8500, 9200, 10000, 11500, 12800, 14000, 15500, 17200, 19000, 21000,
    23500, 25000, 27500, 30000, 32500, 35000, 37500, 40000,
    450, 725, 1450, 2900, 5600, 8900, 16700, 22800, 31000, 36500,
  ];
  return amounts.map((amount, i) => ({
    id: `cb-log-${String(i + 1).padStart(3, '0')}`,
    amount,
    price: priceFromAmount(amount),
    country: COUNTRIES[i % COUNTRIES.length],
  }));
}

export const SHOP_LOG_ACCOUNTS: ShopLogAccount[] = buildLogs();
