import { useState, FormEvent } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { CRYPTO_OPTIONS, getWalletAddress, usdToCrypto, type CryptoOption } from '@/lib/crypto';
import { CryptoIcon } from '@/components/crypto/CryptoIcon';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check } from 'lucide-react';

const DEPOSITS_KEY = 'elite_deposits';

export default function Deposit() {
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<CryptoOption | null>(null);
  const [amount, setAmount] = useState('50');
  const [txid, setTxid] = useState('');
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const usd = parseFloat(amount) || 0;
  const wallet = selected ? getWalletAddress(selected.envKey) : '';
  const cryptoAmount = selected ? usdToCrypto(usd, selected.rateUsd, selected.symbol) : 0;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!selected || !txid.trim() || usd <= 0) return;
    const deposits = JSON.parse(localStorage.getItem(DEPOSITS_KEY) || '[]');
    deposits.push({
      id: `dep_${Date.now()}`,
      user_id: user.id,
      amount_usd: usd,
      crypto_type: selected.id,
      crypto_amount: cryptoAmount,
      wallet_address: wallet,
      txid: txid.trim(),
      status: 'pending',
      created_at: new Date().toISOString(),
    });
    localStorage.setItem(DEPOSITS_KEY, JSON.stringify(deposits));
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-bg elite-page">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-8 space-y-4">
        <h1 className="text-xl font-bold">Deposit</h1>
        {done ? (
          <Card>
            <p className="text-success font-medium">Deposit submitted. Pending confirmation.</p>
          </Card>
        ) : (
          <>
            {step === 1 && (
              <Card className="space-y-3">
                <Input label="Amount USD" type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} />
                <p className="text-sm font-medium">Choose crypto</p>
                <div className="grid grid-cols-2 gap-2">
                  {CRYPTO_OPTIONS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => { setSelected(c); setStep(2); }}
                      className="rounded-lg border border-border bg-surface px-3 py-3 text-left flex items-center gap-2"
                    >
                      <CryptoIcon option={c} size={28} />
                      <span className="text-sm font-semibold text-accent">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              </Card>
            )}
            {step === 2 && selected && (
              <Card className="space-y-3">
                <p className="text-sm">{usd} USD ≈ {cryptoAmount} {selected.symbol}</p>
                <p className="text-xs text-muted">{selected.network}</p>
                <p className="break-all font-mono text-xs bg-surface-2 p-2 rounded-lg">{wallet}</p>
                <Button size="sm" variant="secondary" onClick={async () => {
                  await navigator.clipboard.writeText(wallet);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}>
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <div className="flex justify-center bg-white p-3 rounded-xl w-fit mx-auto">
                  <QRCodeSVG value={wallet || ' '} size={140} />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                  <Button className="flex-1" onClick={() => setStep(3)}>I paid</Button>
                </div>
              </Card>
            )}
            {step === 3 && selected && (
              <Card>
                <form onSubmit={submit} className="space-y-3">
                  <Input label="TXID" value={txid} onChange={(e) => setTxid(e.target.value)} required />
                  <Button type="submit" className="w-full">Submit</Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(2)}>Back</Button>
                </form>
              </Card>
            )}
          </>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
