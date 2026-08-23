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

  const isList = view === 'list';

  return (
    <article
      className={
        isList
          ? 'elite-listing elite-listing--list relative overflow-hidden rounded-2xl border border-border'
          : 'elite-listing elite-listing--grid relative overflow-hidden rounded-2xl border border-border flex flex-col h-full min-h-[210px]'
      }
    >
      <div className="elite-listing-bg-wrap" aria-hidden>
        <div
          className="elite-listing-bg"
          style={{ backgroundImage: `url(${bg})` }}
        />
      </div>
      <div className="elite-listing-overlay" aria-hidden />

      <div
        className={
          isList
            ? 'relative z-10 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5'
            : 'relative z-10 flex h-full flex-col gap-2 p-4'
        }
      >
        <div className={isList ? 'min-w-0 flex-1' : 'min-w-0'}>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl leading-none shrink-0" title={product.country}>
                {countryFlag(product.country)}
              </span>
              <p
                className={`font-mono font-bold tracking-wide text-accent drop-shadow-sm ${
                  isList ? 'text-xl' : 'text-base'
                }`}
              >
                {product.bin}
              </p>
            </div>
            {!isList && (
              <span className="text-base font-bold text-accent shrink-0">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <p className={`mt-1 text-text/95 ${isList ? 'text-sm' : 'text-xs'}`}>
            {product.country} · {product.brand}
          </p>
          <p className="mt-0.5 text-xs text-muted line-clamp-1">
            {product.card_level} · {product.card_type}
          </p>
          <p className="mt-0.5 text-xs text-muted line-clamp-1">{product.issuer}</p>
          <p className="mt-1 font-mono text-xs text-muted">ZIP {product.zip_code}</p>
        </div>

        <div
          className={
            isList
              ? 'flex items-center gap-3 sm:flex-col sm:items-end shrink-0'
              : 'mt-auto flex flex-col gap-2 pt-2'
          }
        >
          {isList && (
            <p className="text-xl font-bold text-accent">{formatPrice(product.price)}</p>
          )}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className={isList ? '' : 'flex-1'}
              onClick={() => addItem(product)}
            >
              <ShoppingCart className="h-4 w-4" />
              {isList ? 'Cart' : ''}
            </Button>
            <Button size="sm" className={isList ? '' : 'flex-1'} onClick={buy}>
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
