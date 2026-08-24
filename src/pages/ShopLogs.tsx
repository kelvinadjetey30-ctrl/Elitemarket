import { useMemo, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/Button';
import { SHOP_LOG_ACCOUNTS, type ShopLogAccount } from '@/data/shopLogs';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Search } from 'lucide-react';
import { countryFlag } from '@/lib/flags';
import type { Product } from '@/types';

const PAGE = 15;
const PRICE_MIN = 8;
const PRICE_MAX = 500;

function CoinbaseLogo({ size = 28 }: { size?: number }) {
  return (
    <img
      src="https://cdn.simpleicons.org/coinbase/0052FF"
      alt="Coinbase"
      width={size}
      height={size}
      className="shrink-0 rounded-full bg-white p-0.5 object-contain"
      style={{ width: size, height: size }}
      loading="lazy"
      onError={(e) => {
        const t = e.currentTarget;
        t.onerror = null;
        t.src =
          'data:image/svg+xml,' +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#0052FF"/><path fill="#fff" d="M16 8.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm0 12.2a4.7 4.7 0 1 1 0-9.4 4.7 4.7 0 0 1 0 9.4z"/></svg>`
          );
      }}
    />
  );
}

function toProduct(a: ShopLogAccount): Product {
  const now = new Date().toISOString();
  return {
    id: a.id,
    bin: String(a.amount).slice(0, 6).padStart(6, '0'),
    country: a.country,
    brand: 'COINBASE LOG',
    card_type: `AMOUNT ${formatPrice(a.amount)}`,
    card_level: 'LOG',
    issuer: 'COINBASE LOG',
    price: a.price,
    zip_code: '00000',
    stock: 1,
    name: 'COINBASE LOG',
    category: 'coinbase-logs',
    description: `COINBASE LOG · ${a.country} · ${formatPrice(a.amount)}`,
    image: '',
    status: 'active',
    created_at: now,
    updated_at: now,
  };
}

export default function ShopLogs() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [priceMin, setPriceMin] = useState(PRICE_MIN);
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return SHOP_LOG_ACCOUNTS.filter((a) => {
      if (a.price < priceMin || a.price > priceMax) return false;
      if (!s) return true;
      return (
        a.country.toLowerCase().includes(s) ||
        String(a.amount).includes(s) ||
        String(a.price).includes(s)
      );
    });
  }, [q, priceMin, priceMax]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * PAGE, safePage * PAGE);

  const buy = (a: ShopLogAccount) => {
    addItem(toProduct(a));
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-bg elite-page">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pt-5 pb-8">
        <div className="mb-4 rounded-2xl border border-border bg-surface px-4 py-4 md:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">LOGS</p>
          <div className="mt-1 flex items-center gap-3">
            <CoinbaseLogo size={40} />
            <h1 className="text-xl font-bold tracking-tight md:text-2xl uppercase">
              COINBASE LOGS
            </h1>
          </div>

          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search country or amount…"
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
              className="w-full rounded-xl border border-border bg-surface-2 py-2 pl-10 pr-3 text-sm focus:border-accent focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text">Price (USD)</p>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-[11px] text-muted">
                Min
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1}
                  value={priceMin}
                  onChange={(e) => {
                    setPage(1);
                    const v = e.target.value === '' ? 0 : Number(e.target.value);
                    setPriceMin(Number.isFinite(v) ? v : 0);
                  }}
                  className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm text-text focus:border-accent focus:outline-none"
                  placeholder="8"
                />
              </label>
              <label className="block text-[11px] text-muted">
                Max
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1}
                  value={priceMax}
                  onChange={(e) => {
                    setPage(1);
                    const v = e.target.value === '' ? 0 : Number(e.target.value);
                    setPriceMax(Number.isFinite(v) ? v : 0);
                  }}
                  className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm text-text focus:border-accent focus:outline-none"
                  placeholder="500"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="elite-list-stack">
          {slice.map((a) => (
            <div key={a.id} className="elite-list-row">
              <CoinbaseLogo size={32} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold uppercase tracking-wide">COINBASE LOG</p>
                <p className="mt-0.5 text-xs text-muted flex items-center gap-1.5">
                  <span className="text-sm leading-none">{countryFlag(a.country)}</span>
                  <span className="uppercase">{a.country}</span>
                </p>
                <p className="mt-0.5 text-xs font-semibold uppercase text-sky-400">
                  Amount {formatPrice(a.amount)}
                </p>
              </div>
              <p className="text-sm font-bold text-accent shrink-0">{formatPrice(a.price)}</p>
              <div className="flex gap-1.5 shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  className="!px-2 !py-1"
                  onClick={() => addItem(toProduct(a))}
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" className="!px-2 !py-1" onClick={() => buy(a)}>
                  <Zap className="h-3.5 w-3.5" />
                  BUY
                </Button>
              </div>
            </div>
          ))}
        </div>

        {slice.length === 0 && (
          <p className="py-14 text-center text-sm text-muted">No logs match your filters.</p>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button variant="secondary" size="sm" disabled={safePage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              PREV
            </Button>
            <span className="text-sm text-muted">{safePage} / {totalPages}</span>
            <Button variant="secondary" size="sm" disabled={safePage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              NEXT
            </Button>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
