import { Link } from 'react-router-dom';
export default function AdminSettings() {
  return (
    <div className="space-y-2 text-sm">
      <p className="text-muted">Settings</p>
      <Link to="/admin/settings/wallets" className="text-accent block">Manage wallets →</Link>
    </div>
  );
}
