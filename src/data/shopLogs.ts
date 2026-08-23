/** Coinbase Logs — simulated demo listings (school project) */
export type ShopLogAccount = {
  id: string;
  amount: number;
  price: number;
  country: string;
};

const COUNTRIES = ['USA', 'UK', 'GERMANY', 'CANADA', 'FRANCE', 'AUSTRALIA'] as const;

/** Sale price $8–$500 scales with balance amount ($30–$18,000) */
function priceFromAmount(amount: number, salt: number): number {
  const t = (amount - 30) / (18000 - 30);
  const curved = Math.pow(Math.min(1, Math.max(0, t)), 0.85);
  let price = 8 + curved * (500 - 8);
  price += ((salt * 19) % 37) - 18;
  return Math.min(500, Math.max(8, Math.round(price * 100) / 100));
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildLogs(): ShopLogAccount[] {
  const TOTAL = 1600;
  const rng = mulberry32(42);
  const amounts: number[] = [];

  for (let i = 0; i < TOTAL; i++) {
    const r = rng();
    let amount: number;
    if (r < 0.25) {
      amount = 30 + rng() * 400;
    } else if (r < 0.5) {
      amount = 400 + rng() * 1600;
    } else if (r < 0.75) {
      amount = 2000 + rng() * 6000;
    } else {
      amount = 8000 + rng() * 10000;
    }
    amounts.push(Math.round(Math.min(18000, Math.max(30, amount))));
  }

  for (let i = amounts.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [amounts[i], amounts[j]] = [amounts[j], amounts[i]];
  }

  // Shuffle countries independently so order is mixed
  const countries = amounts.map((_, i) => COUNTRIES[i % COUNTRIES.length]);
  for (let i = countries.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [countries[i], countries[j]] = [countries[j], countries[i]];
  }

  return amounts.map((amount, i) => ({
    id: `cb-log-${String(i + 1).padStart(4, '0')}`,
    amount,
    price: priceFromAmount(amount, i + 1),
    country: countries[i],
  }));
}

export const SHOP_LOG_ACCOUNTS: ShopLogAccount[] = buildLogs();
