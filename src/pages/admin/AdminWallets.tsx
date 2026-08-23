import { useState } from 'react';
import { CRYPTO_OPTIONS, getWalletAddress } from '@/lib/crypto';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const WALLETS_KEY = 'elite_admin_wallets';

export default function AdminWallets() {
  const [wallets, setWallets] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem(WALLETS_KEY) || '{}');
    } catch {
      return {};
    }
  });

  const save = () => {
    localStorage.setItem(WALLETS_KEY, JSON.stringify(wallets));
  };

  return (
    <div className="space-y-4">
      {CRYPTO_OPTIONS.map((c) => (
        <div key={c.id} className="rounded-lg border border-border bg-surface p-3 space-y-2">
          <p className="text-sm font-medium text-accent">{c.symbol} · {c.network}</p>
          <Input
            value={wallets[c.envKey] ?? getWalletAddress(c.envKey)}
            onChange={(e) => setWallets((w) => ({ ...w, [c.envKey]: e.target.value }))}
          />
        </div>
      ))}
      <Button onClick={save}>Save wallets</Button>
    </div>
  );
}
