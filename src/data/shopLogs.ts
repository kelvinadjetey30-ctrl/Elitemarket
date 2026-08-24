/** Coinbase Logs — simulated demo listings (school project) */
export type ShopLogAccount = {
  id: string;
  amount: number;
  price: number;
  country: string;
};

const COUNTRIES = ['USA', 'UK', 'GERMANY', 'CANADA', 'FRANCE', 'AUSTRALIA'] as const;

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Amount $400–$8000 scales with price $12–$150 */
function amountFromPrice(price: number, rng: () => number): number {
  const t = (price - 12) / (150 - 12);
  const base = 400 + t * (8000 - 400);
  const noise = (rng() - 0.5) * 600;
  return Math.round(Math.min(8000, Math.max(400, base + noise)));
}

function buildLogs(): ShopLogAccount[] {
  const TOTAL = 1600;
  const PAGE = 15;
  const FIRST_PAGES = 2;
  const SMALL_PER_PAGE = 8;

  const rng = mulberry32(77);

  const nLow = Math.round(TOTAL * 0.6);
  const nMid = Math.round(TOTAL * 0.25);
  const nHigh = TOTAL - nLow - nMid;

  const prices: number[] = [];

  for (let i = 0; i < nLow; i++) {
    prices.push(Math.round((12 + rng() * (80 - 12)) * 100) / 100);
  }
  for (let i = 0; i < nMid; i++) {
    prices.push(Math.round((80 + rng() * (110 - 80)) * 100) / 100);
  }
  for (let i = 0; i < nHigh; i++) {
    prices.push(Math.round((110 + rng() * (150 - 110)) * 100) / 100);
  }

  const cheap = shuffle(
    prices.filter((p) => p <= 80),
    rng
  );
  const rest = shuffle(
    prices.filter((p) => p > 80),
    rng
  );

  const ordered: number[] = [];
  let cIdx = 0;
  let rIdx = 0;

  for (let page = 0; page < FIRST_PAGES; page++) {
    const pageItems: number[] = [];
    for (let k = 0; k < SMALL_PER_PAGE; k++) {
      pageItems.push(cheap[cIdx++] ?? 12 + rng() * 40);
    }
    while (pageItems.length < PAGE) {
      pageItems.push(rest[rIdx++] ?? 90 + rng() * 40);
    }
    ordered.push(...shuffle(pageItems, rng));
  }

  const leftover: number[] = [];
  while (cIdx < cheap.length) leftover.push(cheap[cIdx++]);
  while (rIdx < rest.length) leftover.push(rest[rIdx++]);
  ordered.push(...shuffle(leftover, rng));

  while (ordered.length < TOTAL) {
    ordered.push(12 + rng() * 138);
  }

  const finalPrices = ordered.slice(0, TOTAL).map((p) =>
    Math.min(150, Math.max(12, Math.round(p * 100) / 100))
  );

  const countries = shuffle(
    finalPrices.map((_, i) => COUNTRIES[i % COUNTRIES.length]),
    rng
  );

  return finalPrices.map((price, i) => {
    let p = price;
    if (i === 0) p = 12;
    else if (i === 1) p = 13.5;
    else if (i === 2) p = 15;

    return {
      id: `cb-log-${String(i + 1).padStart(4, '0')}`,
      amount: amountFromPrice(p, rng),
      price: p,
      country: countries[i],
    };
  });
}

export const SHOP_LOG_ACCOUNTS: ShopLogAccount[] = buildLogs();
