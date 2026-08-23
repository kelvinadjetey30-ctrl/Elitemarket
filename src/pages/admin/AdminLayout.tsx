import { NavLink, Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

const links = [
  { to: '/admin', end: true, label: 'Overview' },
  { to: '/admin/cards', label: 'Cards' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/deposits', label: 'Deposits' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/settings/wallets', label: 'Wallets' },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-xl font-bold text-accent mb-4">Admin</h1>
        <nav className="flex flex-wrap gap-2 mb-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-xs border ${
                  isActive ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
