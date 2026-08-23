import { memo } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap } from 'lucide-react';
import { countryFlag } from '@/lib/flags';

function ProductCardInner({ product }: { product: Product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <article className="elite-row">
      <div>
        <p className="elite-bin">{product.bin}</p>
        <p className="mt-1 text-xs text-muted flex items-center gap-1">
          <span>{countryFlag(product.country)}</span>
          {product.country}
        </p>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate">{product.brand}</p>
        <p className="text-xs text-muted truncate">{product.card_type}</p>
        <span className="elite-pill mt-1">{product.card_level}</span>
      </div>
      <div className="min-w-0 text-xs">
        <p className="text-muted">Issuer</p>
        <p className="font-medium truncate">{product.issuer}</p>
        <p className="text-muted mt-1">ZIP</p>
        <p className="font-mono">{product.zip_code}</p>
      </div>
      <div className="text-right md:text-center">
        <p className="text-lg font-bold text-accent">{formatPrice(product.price)}</p>
      </div>
      <div className="flex gap-2 md:justify-end">
        <Button variant="secondary" size="sm" onClick={() => addItem(product)}>
          <ShoppingCart className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Cart</span>
        </Button>
        <Button
          size="sm"
          onClick={() => {
            addItem(product);
            navigate('/checkout');
          }}
        >
          <Zap className="h-3.5 w-3.5" />
          Buy
        </Button>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardInner);
