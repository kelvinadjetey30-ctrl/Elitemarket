import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Filters } from '@/components/marketplace/Filters';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import type { FilterState } from '@/types';
import { Button } from '@/components/ui/Button';

const PAGE = 24;

const empty: FilterState = {
  country: [],
  brand: [],
  cardType: [],
  cardLevel: [],
  issuer: [],
  zip: [],
  bin: [],
  priceMin: 5,
  priceMax: 25,
  search: '',
};

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterState>(empty);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useFilteredProducts(filters);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const slice = useMemo(
    () => filtered.slice((page - 1) * PAGE, page * PAGE),
    [filtered, page]
  );

  return (
    <div className="min-h-screen bg-bg elite-page">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pt-6">
        <div className="mb-6 rounded-2xl border border-border bg-surface px-5 py-6 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Elite catalog</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Browse listings</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Filter by brand, type, bank, BIN, or ZIP. Add to cart or buy in one tap.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                placeholder="Search brand, bank, country…"
                value={filters.search}
                onChange={(e) => {
                  setPage(1);
                  setFilters((f) => ({ ...f, search: e.target.value }));
                }}
                className="w-full rounded-xl border border-border bg-surface-2 py-2.5 pl-10 pr-3 text-sm focus:border-accent focus:outline-none"
              />
            </div>
            <Button variant="secondary" className="sm:w-auto" onClick={() => setShowFilters((v) => !v)}>
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? 'Hide filters' : 'Filters'}
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6">
            <Filters
              filters={filters}
              onChange={(f) => {
                setPage(1);
                setFilters(f);
              }}
              resultCount={filtered.length}
            />
          </div>
        )}

        <div className="space-y-3">
          {slice.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {slice.length === 0 && (
            <p className="py-16 text-center text-muted">No listings match your filters.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
            <span className="text-sm text-muted">{page} / {totalPages}</span>
            <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
