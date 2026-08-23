import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="min-h-screen bg-bg elite-page">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-8 space-y-4">
        <h1 className="text-xl font-bold">Account</h1>
        <div className="rounded-xl border border-border bg-surface p-4 space-y-2">
          <p className="text-sm"><span className="text-muted">Email:</span> {user.email}</p>
          <p className="text-sm"><span className="text-muted">Role:</span> {user.role}</p>
          <p className="text-sm"><span className="text-muted">Balance:</span> <span className="text-accent font-semibold">{formatPrice(user.balance)}</span></p>
        </div>
        <Button variant="secondary" className="w-full" onClick={() => navigate('/deposit')}>Deposit</Button>
        <Button
          variant="ghost"
          className="w-full text-danger"
          onClick={async () => {
            await signOut();
            navigate('/login');
          }}
        >
          Sign out
        </Button>
      </main>
      <BottomNav />
    </div>
  );
}
