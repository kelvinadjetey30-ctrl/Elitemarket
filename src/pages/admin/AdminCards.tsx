import { useState } from 'react';
import { loadAdminCards, saveAdminCards, CATALOG } from '@/data/catalog';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

export default function AdminCards() {
  const [cards, setCards] = useState(() => loadAdminCards());

  const toggle = (id: string) => {
    const next = cards.map((c) =>
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' as const : 'active' as const } : c
    );
    setCards(next);
    saveAdminCards(next);
  };

  const reset = () => {
    setCards(CATALOG);
    saveAdminCards(CATALOG);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted">{cards.length} listings</p>
        <Button size="sm" variant="secondary" onClick={reset}>Reset catalog</Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-2 text-muted">
            <tr>
              <th className="p-2">BIN</th>
              <th className="p-2">Brand</th>
              <th className="p-2">Price</th>
              <th className="p-2">Status</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {cards.slice(0, 50).map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="p-2 font-mono text-accent">{c.bin}</td>
                <td className="p-2">{c.brand}</td>
                <td className="p-2">{formatPrice(c.price)}</td>
                <td className="p-2">{c.status}</td>
                <td className="p-2">
                  <Button size="sm" variant="ghost" onClick={() => toggle(c.id)}>Toggle</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted">Showing first 50 rows.</p>
    </div>
  );
}
