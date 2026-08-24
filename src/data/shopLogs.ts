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

/** Sale price $12–$110 varies due to account amount $400–$8000 */
function priceFromAmount(amount: number, rng: () => number): number {
  const t = (amount - 400) / (8000 - 400);
  const curved = Math.pow(Math.min(1, Math.max(0, t)), 0.9);
  let price = 12 + curved * (110 - 12);
  price += (rng() - 0.5) * 6;
  return Math.min(110, Math.max(12, Math.round(price * 100) / 100));
}

function buildLogs(): ShopLogAccount[] {
  const TOTAL = 1600;
  const PAGE = 15;
  const FIRST_PAGES = 2;
  const CHEAP_PER_PAGE = 10;

  const rng = mulberry32(103);

  const nLow = Math.round(TOTAL * 0.75);
  const nMid = Math.round(TOTAL * 0.15);
  const nHigh = TOTAL - nLow - nMid;

  const amounts: number[] = [];
  for (let i = 0; i < nLow; i++) {
    amounts.push(Math.round(400 + rng() * (2500 - 400)));
  }
  for (let i = 0; i < nMid; i++) {
    amounts.push(Math.round(2500 + rng() * (5000 - 2500)));
  }
  for (let i = 0; i < nHigh; i++) {
    amounts.push(Math.round(5000 + rng() * (8000 - 5000)));
  }

  const small = shuffle(amounts.filter((a) => a < 2500), rng);
  const rest = shuffle(amounts.filter((a) => a >= 2500), rng);

  const ordered: number[] = [];
  let sIdx = 0;
  let rIdx = 0;

  for (let page = 0; page < FIRST_PAGES; page++) {
    const pageItems: number[] = [];
    for (let k = 0; k < CHEAP_PER_PAGE; k++) {
      pageItems.push(small[sIdx++] ?? Math.round(400 + rng() * 1500));
    }
    while (pageItems.length < PAGE) {
      pageItems.push(rest[rIdx++] ?? Math.round(2500 + rng() * 3000));
    }
    ordered.push(...shuffle(pageItems, rng));
  }

  const leftover: number[] = [];
  while (sIdx < small.length) leftover.push(small[sIdx++]);
  while (rIdx < rest.length) leftover.push(rest[rIdx++]);
  ordered.push(...shuffle(leftover, rng));

  while (ordered.length < TOTAL) {
    ordered.push(Math.round(400 + rng() * 2000));
  }

  const finalAmounts = ordered.slice(0, TOTAL).map((a) =>
    Math.min(8000, Math.max(400, a))
  );

  const countries = shuffle(
    finalAmounts.map((_, i) => COUNTRIES[i % COUNTRIES.length]),
    rng
  );

  return finalAmounts.map((amount, i) => {
    let amt = amount;
    if (i === 0) amt = 420;
    else if (i === 1) amt = 480;
    else if (i === 2) amt = 550;

    return {
      id: `cb-log-${String(i + 1).padStart(4, '0')}`,
      amount: amt,
      price: priceFromAmount(amt, rng),
      country: countries[i],
    };
  });
}

export const SHOP_LOG_ACCOUNTS: ShopLogAccount[] = buildLogs();
