import { useState, FormEvent } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function Support() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-bg elite-page">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-8 space-y-4">
        <h1 className="text-xl font-bold">Support</h1>
        {sent ? (
          <p className="text-success text-sm">Message submitted. We will respond soon.</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border bg-surface p-4">
            <Input label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <div>
              <label className="mb-1.5 block text-sm text-muted">Message</label>
              <textarea
                className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm min-h-[120px] focus:border-accent focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Send</Button>
          </form>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
