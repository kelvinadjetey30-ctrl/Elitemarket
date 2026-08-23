import { useState } from 'react';
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

function toProduct(a: ShopLogAccount): Product {
  const now = new Date().toISOString();
  return {
    id: a.id,
    bin: String(a.amount).slice(0, 6).padStart(6, '0'),
    country: a.country,
    brand: 'Coinbase Log',
    card_type: `Balance ${formatPrice(a.amount)}`,
    card_level: 'LOG',
    issuer: 'Coinbase Log',
    price: a.price,
    zip_code: '00000',
    stock: 1,
    name: 'Coinbase Log',
    category: 'coinbase-logs',
    description: `Coinbase Log · ${a.country} · ${formatPrice(a.amount)}`,
    image: '',
    status: 'active',
    created_at: now,
    updated_at: now,
  };
}

export default function ShopLogs() {
  const [q, setQ] = useState('');
  const { addItem } = useCart();
  const navigate = useNavigate();

  const filtered = SHOP_LOG_ACCOUNTS.filter((a) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (
      a.country.toLowerCase().includes(s) ||
      String(a.amount).includes(s) ||
      String(a.price).includes(s) ||
      'coinbase log'.includes(s)
    );
  });

  const buy = (a: ShopLogAccount) => {
    addItem(toProduct(a));
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-bg elite-page">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pt-5">
        <div className="mb-4 rounded-2xl border border-border bg-surface px-4 py-4 md:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">LOGS</p>
          <h1 className="mt-0.5 text-xl font-bold tracking-tight md:text-2xl">Coinbase Logs</h1>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search country or amount…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-2 py-2 pl-10 pr-3 text-sm focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="elite-list-stack">
          {filtered.map((a) => (
            <div key={a.id} className="elite-list-row">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Coinbase Log</p>
                <p className="mt-0.5 text-xs text-muted flex items-center gap-1.5">
                  <span className="text-sm leading-none">{countryFlag(a.country)}</span>
                  {a.country}
                </p>
                <p className="mt-0.5 text-xs text-muted">
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
                  Buy
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-14 text-center text-sm text-muted">No logs match your search.</p>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
