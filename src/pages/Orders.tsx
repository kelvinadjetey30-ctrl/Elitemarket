import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';

const ORDERS_KEY = 'elite_orders';

export default function Orders() {
  const { user } = useAuth();
  const orders = useMemo(() => {
    if (!user) return [];
    try {
      const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      return all.filter((o: { user_id: string }) => o.user_id === user.id);
    } catch {
      return [];
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-bg elite-page">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-8 space-y-4">
        <h1 className="text-xl font-bold">Orders</h1>
        {orders.length === 0 ? (
          <p className="text-sm text-muted">No orders yet.</p>
        ) : (
          orders.map((o: { id: string; status: string; total: number; created_at: string }) => (
            <Link
              key={o.id}
              to={`/orders/${o.id}`}
              className="block rounded-xl border border-border bg-surface p-4 hover:border-accent/40"
            >
              <p className="text-sm font-medium">{o.id}</p>
              <p className="text-xs text-muted">{o.status} · {new Date(o.created_at).toLocaleString()}</p>
              <p className="text-accent font-semibold mt-1">{formatPrice(o.total)}</p>
            </Link>
          ))
        )}
      </main>
      <BottomNav />
    </div>
  );
}
