import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Wallet, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';

export function Header() {
  const { user, signOut } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [accountOpen, setAccountOpen] = useState(false);

  const isHome = location.pathname === '/dashboard' || location.pathname === '/marketplace';

  return (
    <header className="elite-topbar sticky top-0 z-50 shadow-lg shadow-black/40">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-4">
        {!isHome ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full p-2 text-muted hover:bg-surface-2 hover:text-text"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <div className="w-2 sm:w-9" />
        )}

        <Link to="/dashboard" className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <Logo size={26} />
          <div className="min-w-0 text-center sm:text-left">
            <p className="text-sm font-bold tracking-[0.2em] text-accent">ELITE</p>
            <p className="hidden text-[10px] uppercase tracking-widest text-muted sm:block">Marketplace</p>
          </div>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {user && (
            <button
              type="button"
              onClick={() => navigate('/deposit')}
              className="flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2 py-1 sm:gap-1.5 sm:px-3 sm:py-1.5"
              title="Wallet balance"
            >
              <Wallet className="h-3.5 w-3.5 text-accent shrink-0" />
              <span className="text-[11px] font-semibold text-accent sm:text-xs">
                {formatPrice(user.balance ?? 0)}
              </span>
            </button>
          )}
          <Link to="/cart" className="relative rounded-full p-2 text-muted hover:bg-surface-2 hover:text-text">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-bg">
                {count}
              </span>
            )}
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen((v) => !v)}
              className="rounded-full p-2 text-muted hover:bg-surface-2 hover:text-text"
            >
              <User className="h-5 w-5" />
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-surface py-1 shadow-xl z-50">
                <Link to="/account" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-text">Account</Link>
                <Link to="/orders" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-text">Orders</Link>
                <Link to="/shop-logs" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-text">Shop Logs</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 text-sm text-accent hover:bg-surface-2">Admin</Link>
                )}
                <button
                  type="button"
                  onClick={async () => {
                    setAccountOpen(false);
                    await signOut();
                    navigate('/login');
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-surface-2"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
