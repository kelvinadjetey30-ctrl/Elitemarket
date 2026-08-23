import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

const DEPOSITS_KEY = 'elite_deposits';
const USERS_KEY = 'elite_users';

export default function AdminDeposits() {
  const [deposits, setDeposits] = useState(() => JSON.parse(localStorage.getItem(DEPOSITS_KEY) || '[]'));

  const setStatus = (id: string, status: 'approved' | 'rejected') => {
    const next = deposits.map((d: { id: string; status: string; user_id: string; amount_usd: number }) => {
      if (d.id !== id) return d;
      if (status === 'approved') {
        try {
          const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
          if (users[d.user_id]) {
            users[d.user_id].profile.balance = (users[d.user_id].profile.balance || 0) + d.amount_usd;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
          }
        } catch { /* ignore */ }
      }
      return { ...d, status };
    });
    setDeposits(next);
    localStorage.setItem(DEPOSITS_KEY, JSON.stringify(next));
  };

  return (
    <div className="space-y-2">
      {deposits.length === 0 && <p className="text-sm text-muted">No deposits.</p>}
      {deposits.map((d: { id: string; status: string; amount_usd: number; txid: string; crypto_type: string }) => (
        <div key={d.id} className="rounded-lg border border-border bg-surface p-3 text-sm space-y-2">
          <p className="font-mono text-xs">{d.id}</p>
          <p>{formatPrice(d.amount_usd)} · {d.crypto_type} · {d.status}</p>
          <p className="text-xs text-muted break-all">TX: {d.txid}</p>
          {d.status === 'pending' && (
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setStatus(d.id, 'approved')}>Approve</Button>
              <Button size="sm" variant="secondary" onClick={() => setStatus(d.id, 'rejected')}>Reject</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
