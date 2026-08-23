import { memo } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap } from 'lucide-react';
import { countryFlag } from '@/lib/flags';

function ProductCardInner({
  product,
  view = 'list',
}: {
  product: Product;
  view?: 'list' | 'grid';
}) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const buy = () => {
    addItem(product);
    navigate('/checkout');
  };

  if (view === 'grid') {
    return (
      <article className="elite-grid-card flex flex-col gap-2 rounded-xl border border-border bg-surface p-3 hover:border-accent/40 transition-colors">
        <div className="flex items-start justify-between gap-1">
          <p className="font-mono text-sm font-bold tracking-wide text-accent">{product.bin}</p>
          <span className="text-sm font-bold text-accent shrink-0">{formatPrice(product.price)}</span>
        </div>
        <p className="text-[11px] text-muted flex items-center gap-1 truncate">
          <span>{countryFlag(product.country)}</span>
          {product.country}
        </p>
        <p className="text-xs font-medium truncate">{product.brand}</p>
        <p className="text-[11px] text-muted truncate">{product.card_level} · {product.card_type}</p>
        <p className="text-[11px] text-muted truncate">{product.issuer}</p>
        <p className="text-[11px] font-mono text-muted">ZIP {product.zip_code}</p>
        <div className="mt-auto flex gap-1.5 pt-1">
          <Button variant="secondary" size="sm" className="flex-1 !px-2 !py-1.5 text-xs" onClick={() => addItem(product)}>
            <ShoppingCart className="h-3 w-3" />
          </Button>
          <Button size="sm" className="flex-1 !px-2 !py-1.5 text-xs" onClick={buy}>
            <Zap className="h-3 w-3" />
            Buy
          </Button>
        </div>
      </article>
    );
  }

  return (
    <article className="elite-row-compact">
      <div className="min-w-0">
        <p className="font-mono text-sm font-bold text-accent">{product.bin}</p>
        <p className="text-[11px] text-muted flex items-center gap-1">
          <span>{countryFlag(product.country)}</span>
          {product.country}
        </p>
      </div>
      <div className="min-w-0 hidden sm:block">
        <p className="text-xs font-medium truncate">{product.brand}</p>
        <p className="text-[11px] text-muted truncate">{product.card_type}</p>
      </div>
      <div className="min-w-0 hidden md:block">
        <p className="text-[11px] text-muted truncate">{product.issuer}</p>
        <p className="text-[11px] font-mono">{product.zip_code}</p>
      </div>
      <p className="text-sm font-bold text-accent text-right">{formatPrice(product.price)}</p>
      <div className="flex gap-1.5 justify-end">
        <Button variant="secondary" size="sm" className="!px-2 !py-1 text-xs" onClick={() => addItem(product)}>
          <ShoppingCart className="h-3 w-3" />
        </Button>
        <Button size="sm" className="!px-2 !py-1 text-xs" onClick={buy}>
          Buy
        </Button>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardInner);
