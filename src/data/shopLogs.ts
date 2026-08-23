/** Coinbase Logs — simulated demo listings (school project) */
export type ShopLogAccount = {
  id: string;
  amount: number;
  price: number;
  country: string;
};

const COUNTRIES = ['USA', 'UK', 'GERMANY', 'CANADA', 'FRANCE', 'AUSTRALIA'] as const;

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

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildLogs(): ShopLogAccount[] {
  const TOTAL = 1600;
  const PAGE = 15;
  const FIRST_PAGES = 2;
  const SMALL_PER_PAGE = 8;

  const rng = mulberry32(42);
  const smallPool: number[] = [];
  const bigPool: number[] = [];

  for (let i = 0; i < TOTAL; i++) {
    const r = rng();
    let amount: number;
    if (r < 0.35) {
      amount = 30 + rng() * 770;
      smallPool.push(Math.round(Math.min(800, Math.max(30, amount))));
    } else if (r < 0.6) {
      amount = 801 + rng() * 3200;
      bigPool.push(Math.round(amount));
    } else if (r < 0.8) {
      amount = 4000 + rng() * 6000;
      bigPool.push(Math.round(amount));
    } else {
      amount = 10000 + rng() * 8000;
      bigPool.push(Math.round(Math.min(18000, amount)));
    }
  }

  while (smallPool.length < SMALL_PER_PAGE * FIRST_PAGES + 20) {
    smallPool.push(Math.round(30 + rng() * 770));
  }
  while (smallPool.length + bigPool.length < TOTAL) {
    bigPool.push(Math.round(801 + rng() * 17199));
  }

  const smalls = shuffle(smallPool, rng);
  const bigs = shuffle(bigPool, rng);

  const ordered: number[] = [];
  let sIdx = 0;
  let bIdx = 0;

  for (let page = 0; page < FIRST_PAGES; page++) {
    const pageItems: number[] = [];
    for (let k = 0; k < SMALL_PER_PAGE; k++) {
      pageItems.push(smalls[sIdx++] ?? Math.round(30 + rng() * 770));
    }
    while (pageItems.length < PAGE) {
      pageItems.push(bigs[bIdx++] ?? Math.round(900 + rng() * 8000));
    }
    ordered.push(...shuffle(pageItems, rng));
  }

  const rest: number[] = [];
  while (sIdx < smalls.length) rest.push(smalls[sIdx++]);
  while (bIdx < bigs.length) rest.push(bigs[bIdx++]);
  ordered.push(...shuffle(rest, rng));

  const amounts = ordered.slice(0, TOTAL);
  while (amounts.length < TOTAL) {
    amounts.push(Math.round(30 + rng() * 17970));
  }

  const countries = shuffle(
    amounts.map((_, i) => COUNTRIES[i % COUNTRIES.length]),
    rng
  );

  return amounts.map((amount, i) => {
    let price = priceFromAmount(amount, i + 1);
    if (i === 0) price = 8;
    else if (i === 1) price = 9.5;
    else if (i === 2) price = 11;
    return {
      id: `cb-log-${String(i + 1).padStart(4, '0')}`,
      amount,
      price,
      country: countries[i],
    };
  });
}

export const SHOP_LOG_ACCOUNTS: ShopLogAccount[] = buildLogs();
