export default function AdminUsers() {
  let users: Array<{ email: string; profile: { role: string; balance: number } }> = [];
  try {
    users = Object.values(JSON.parse(localStorage.getItem('elite_users') || '{}'));
  } catch { /* ignore */ }
  return (
    <div className="space-y-2">
      {users.length === 0 && <p className="text-sm text-muted">No local users yet.</p>}
      {users.map((u, i) => (
        <div key={i} className="rounded-lg border border-border bg-surface p-3 text-sm">
          <p>{u.email}</p>
          <p className="text-xs text-muted">{u.profile.role} · balance {u.profile.balance}</p>
        </div>
      ))}
    </div>
  );
}
