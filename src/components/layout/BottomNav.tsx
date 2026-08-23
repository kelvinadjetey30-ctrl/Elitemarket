import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Wallet, ShoppingBag, Headphones, CreditCard } from 'lucide-react';

const items = [
  { to: '/dashboard', label: 'Shop', icon: LayoutGrid },
  { to: '/deposit', label: 'Deposit', icon: Wallet },
  { to: '/my-cards', label: 'Cards', icon: CreditCard },
  { to: '/cart', label: 'Cart', icon: ShoppingBag },
  { to: '/support', label: 'Help', icon: Headphones },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="elite-bottom-nav md:hidden">
      {items.map(({ to, label, icon: Icon }) => {
        const active = pathname === to || (to === '/dashboard' && pathname === '/marketplace');
        return (
          <Link key={to} to={to} className={active ? 'active' : ''}>
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
