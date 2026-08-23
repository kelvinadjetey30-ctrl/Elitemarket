import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function Cart() {
  const { items, removeItem, total, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg elite-page">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-8 space-y-4">
        <h1 className="text-xl font-bold">Cart</h1>
        {items.length === 0 ? (
          <p className="text-muted text-sm">Your cart is empty. <Link to="/dashboard" className="text-accent">Browse catalog</Link></p>
        ) : (
          <>
            {items.map((i) => (
              <div key={i.product.id} className="rounded-xl border border-border bg-surface p-4 flex justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-accent font-semibold">{i.product.bin}</p>
                  <p className="text-xs text-muted truncate">{i.product.brand} · {i.product.country}</p>
                  <p className="text-sm mt-1">{formatPrice(i.product.price)} × {i.quantity}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeItem(i.product.id)}>Remove</Button>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <p className="text-lg font-bold text-accent">{formatPrice(total)}</p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={clearCart}>Clear</Button>
                <Button size="sm" onClick={() => navigate('/checkout')}>Checkout</Button>
              </div>
            </div>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
