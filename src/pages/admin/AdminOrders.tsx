import { formatPrice } from '@/lib/utils';

export default function AdminOrders() {
  const orders = JSON.parse(localStorage.getItem('elite_orders') || '[]');
  return (
    <div className="space-y-2">
      {orders.length === 0 && <p className="text-sm text-muted">No orders.</p>}
      {orders.map((o: { id: string; status: string; total: number; user_id: string }) => (
        <div key={o.id} className="rounded-lg border border-border bg-surface p-3 text-sm">
          <p className="font-mono">{o.id}</p>
          <p className="text-xs text-muted">{o.status} · user {o.user_id}</p>
          <p className="text-accent">{formatPrice(o.total)}</p>
        </div>
      ))}
    </div>
  );
}
