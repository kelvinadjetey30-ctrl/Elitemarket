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

  const buy = () => {
    addItem(product);
    navigate('/checkout');
  };

  const bg = countryBgUrl(product.country);

  if (view === 'list') {
    return (
      <article className="elite-listing relative overflow-hidden rounded-2xl border border-border">
        <div
          className="elite-listing-bg"
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden
        />
        <div className="elite-listing-overlay" aria-hidden />

        <div className="relative z-10 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl leading-none" title={product.country}>
                {countryFlag(product.country)}
              </span>
              <p className="font-mono text-xl font-bold tracking-wide text-accent drop-shadow-sm">
                {product.bin}
              </p>
            </div>
            <p className="mt-1 text-sm text-text/90">
              {product.country} · {product.brand}
            </p>
            <p className="mt-0.5 text-xs text-muted line-clamp-1">
              {product.card_level} · {product.card_type}
            </p>
            <p className="mt-0.5 text-xs text-muted line-clamp-1">{product.issuer}</p>
            <p className="mt-1 font-mono text-xs text-muted">ZIP {product.zip_code}</p>
          </div>

          <div className="flex items-center gap-3 sm:flex-col sm:items-end shrink-0">
            <p className="text-xl font-bold text-accent">{formatPrice(product.price)}</p>
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

  return (
    <article className="elite-listing relative overflow-hidden rounded-2xl border border-border flex flex-col min-h-[220px]">
      <div
        className="elite-listing-bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden
      />
      <div className="elite-listing-overlay" aria-hidden />
      <div className="relative z-10 flex h-full flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="font-mono text-lg font-bold text-accent">{product.bin}</p>
          <span className="text-lg font-bold text-accent">{formatPrice(product.price)}</span>
        </div>
        <p className="text-sm flex items-center gap-1.5">
          <span>{countryFlag(product.country)}</span>
          {product.country}
        </p>
        <p className="text-sm font-medium truncate">{product.brand}</p>
        <p className="text-xs text-muted truncate">{product.card_level} · {product.card_type}</p>
        <p className="text-xs text-muted truncate">{product.issuer}</p>
        <p className="text-xs font-mono text-muted">ZIP {product.zip_code}</p>
        <div className="mt-auto flex gap-2 pt-2">
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => addItem(product)}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button size="sm" className="flex-1" onClick={buy}>
            Buy
          </Button>
        </div>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardInner);
