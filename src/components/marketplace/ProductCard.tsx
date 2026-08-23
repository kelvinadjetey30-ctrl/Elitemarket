import { memo } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap } from 'lucide-react';
import { countryFlag, countryBgUrl } from '@/lib/flags';

function ProductCardInner({
  product,
  view = 'list',
}: {
  product: Product;
  view?: 'list' | 'grid';
}) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const bg = countryBgUrl(product.country);

  const buy = () => {
    addItem(product);
    navigate('/checkout');
  };

  if (view === 'list') {
    return (
      <div className="elite-list-row">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">{countryFlag(product.country)}</span>
            <span className="font-mono text-sm font-semibold text-accent">{product.bin}</span>
          </div>
          <p className="mt-0.5 text-xs text-muted truncate">
            {product.country} · {product.brand} · {product.card_level}
          </p>
          <p className="text-[11px] text-muted truncate">
            {product.issuer} · ZIP {product.zip_code}
          </p>
        </div>
        <p className="text-sm font-bold text-accent shrink-0">{formatPrice(product.price)}</p>
        <div className="flex gap-1.5 shrink-0">
          <Button variant="secondary" size="sm" className="!px-2 !py-1" onClick={() => addItem(product)}>
            <ShoppingCart className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" className="!px-2 !py-1" onClick={buy}>
            Buy
          </Button>
        </div>
      </div>
    );
  }

  return (
    <article className="elite-listing elite-listing--grid relative overflow-hidden rounded-2xl border border-border w-full">
      <div className="elite-listing-bg-wrap" aria-hidden>
        <div className="elite-listing-bg" style={{ backgroundImage: `url(${bg})` }} />
      </div>
      <div className="elite-listing-overlay" aria-hidden />
      <div className="relative z-10 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg leading-none">{countryFlag(product.country)}</span>
            <p className="font-mono text-sm font-bold tracking-wide text-accent drop-shadow-sm sm:text-base">
              {product.bin}
            </p>
          </div>
          <p className="mt-2 text-sm text-text/95">
            {product.country} · {product.brand}
          </p>
          <p className="mt-1 text-xs text-muted">
            {product.card_level} · {product.card_type}
          </p>
          <p className="mt-0.5 text-xs text-muted truncate">{product.issuer}</p>
          <p className="mt-1 font-mono text-xs text-muted">ZIP {product.zip_code}</p>
        </div>
        <div className="flex items-center gap-3 sm:flex-col sm:items-end shrink-0">
          <p className="text-base font-bold text-accent sm:text-lg">{formatPrice(product.price)}</p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => addItem(product)}>
              <ShoppingCart className="h-4 w-4" />
              Cart
            </Button>
            <Button size="sm" onClick={buy}>
              <Zap className="h-4 w-4" />
              Buy
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardInner);
