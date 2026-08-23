import { useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';

const PURCHASED_KEY = 'elite_purchased';

export default function MyCards() {
  const { user } = useAuth();
  const cards = useMemo(() => {
    if (!user) return [];
    try {
      const all = JSON.parse(localStorage.getItem(PURCHASED_KEY) || '{}');
      return (all[user.id] || []) as Array<{
        bin: string;
        brand: string;
        country: string;
        price: number;
        purchased_at?: string;
      }>;
    } catch {
      return [];
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-bg elite-page">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-8 space-y-4">
        <h1 className="text-xl font-bold">My Cards</h1>
        {cards.length === 0 ? (
          <p className="text-sm text-muted">No purchases yet.</p>
        ) : (
          cards.map((c, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-surface p-4">
              <p className="font-mono text-accent font-semibold">{c.bin}</p>
              <p className="text-xs text-muted">{c.brand} · {c.country}</p>
              <p className="text-sm mt-1">{formatPrice(c.price)}</p>
            </div>
          ))
        )}
      </main>
      <BottomNav />
    </div>
  );
}
