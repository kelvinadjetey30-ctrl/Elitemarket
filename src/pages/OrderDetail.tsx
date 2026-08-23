import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';

const ORDERS_KEY = 'elite_orders';

export default function OrderDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const order = useMemo(() => {
    try {
      const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      return all.find((o: { id: string; user_id: string }) => o.id === id && o.user_id === user?.id);
    } catch {
      return null;
    }
  }, [id, user]);

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-8 space-y-4">
        <Link to="/orders" className="text-sm text-accent">← Orders</Link>
        {!order ? (
          <p className="text-muted text-sm">Order not found.</p>
        ) : (
          <div className="rounded-xl border border-border bg-surface p-4 space-y-2">
            <p className="font-mono text-sm">{order.id}</p>
            <p className="text-xs text-muted">{order.status}</p>
            <p className="text-accent font-bold">{formatPrice(order.total)}</p>
            <p className="text-xs text-muted">{order.payment_method}</p>
          </div>
        )}
      </main>
    </div>
  );
}
