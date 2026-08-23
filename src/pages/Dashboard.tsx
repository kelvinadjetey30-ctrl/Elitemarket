import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Filters } from '@/components/marketplace/Filters';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import type { FilterState } from '@/types';
import { Button } from '@/components/ui/Button';

const PAGE = 24;
const VIEW_KEY = 'elite_view_mode';

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
  const [view, setView] = useState<'list' | 'grid'>(() => {
    try {
      const v = localStorage.getItem(VIEW_KEY);
      return v === 'grid' || v === 'list' ? v : 'list';
    } catch {
      return 'list';
    }
  });

  const filtered = useFilteredProducts(filters);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const slice = useMemo(
    () => filtered.slice((page - 1) * PAGE, page * PAGE),
    [filtered, page]
  );

  const setViewMode = (mode: 'list' | 'grid') => {
    setView(mode);
    try {
      localStorage.setItem(VIEW_KEY, mode);
    } catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen bg-bg elite-page">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pt-5">
        <div className="mb-4 rounded-2xl border border-border bg-surface px-4 py-4 md:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">ELITEMARKET</p>
          <h1 className="mt-0.5 text-xl font-bold tracking-tight md:text-2xl">Browse listings</h1>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
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
                className="w-full rounded-xl border border-border bg-surface-2 py-2 pl-10 pr-3 text-sm focus:border-accent focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowFilters((v) => !v)}>
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1.5 ${view === 'grid' ? 'bg-accent/20 text-accent' : 'text-muted hover:bg-surface-2'}`}
                  title="Grid"
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`px-2.5 py-1.5 ${view === 'list' ? 'bg-accent/20 text-accent' : 'text-muted hover:bg-surface-2'}`}
                  title="List"
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mb-4">
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

        <div className={view === 'grid' ? 'elite-grid-stack' : 'elite-list-stack'}>
          {slice.map((p) => (
            <ProductCard key={p.id} product={p} view={view} />
          ))}
        </div>

        {slice.length === 0 && (
          <p className="py-14 text-center text-muted text-sm">No listings match your filters.</p>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3">
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
