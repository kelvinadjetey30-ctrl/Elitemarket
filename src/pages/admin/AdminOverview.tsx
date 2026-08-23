import { Card } from '@/components/ui/Card';

export default function AdminOverview() {
  const orders = JSON.parse(localStorage.getItem('elite_orders') || '[]');
  const deposits = JSON.parse(localStorage.getItem('elite_deposits') || '[]');
  const pending = deposits.filter((d: { status: string }) => d.status === 'pending').length;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <p className="text-xs text-muted">Orders</p>
        <p className="text-2xl font-bold text-accent">{orders.length}</p>
      </Card>
      <Card>
        <p className="text-xs text-muted">Deposits</p>
        <p className="text-2xl font-bold text-accent">{deposits.length}</p>
      </Card>
      <Card>
        <p className="text-xs text-muted">Pending deposits</p>
        <p className="text-2xl font-bold text-warning">{pending}</p>
      </Card>
    </div>
  );
}
