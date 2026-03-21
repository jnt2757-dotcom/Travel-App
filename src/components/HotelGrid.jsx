import { useState } from 'react';
import HotelCard from './HotelCard';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name A–Z' },
];

const PAGE_SIZE = 24;

export default function HotelGrid({
  hotels,
  dateRange,
  priceMap,
  isPricingLoading,
  pricingError,
  nights,
}) {
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);

  // When live prices are available, use them for price-based sorting
  function resolvePrice(hotel) {
    return priceMap?.[hotel.id]?.pricePerNight ?? hotel.price;
  }

  const sorted = [...hotels].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return resolvePrice(a) - resolvePrice(b);
      case 'price-desc': return resolvePrice(b) - resolvePrice(a);
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const visible = sorted.slice(0, page * PAGE_SIZE);

  const liveCount = Object.keys(priceMap ?? {}).length;

  function loadMore() {
    setPage((p) => Math.min(p + 1, totalPages));
  }

  if (hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 border border-dark-border flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-cream-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="font-serif text-cream text-xl mb-2">No properties found</h3>
        <p className="text-cream-muted text-sm max-w-xs">
          Try adjusting your search or filters to discover extraordinary places.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Live Pricing Status Bar — only visible when dates are selected */}
      {dateRange?.from && dateRange?.to && (
        <div className="mb-4 px-4 py-3 border border-dark-border bg-dark-card flex items-center gap-3">
          {isPricingLoading ? (
            <>
              {/* Spinner */}
              <svg className="w-3.5 h-3.5 text-gold animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span className="text-cream-muted text-xs tracking-wide">
                Fetching live prices from Booking.com…
              </span>
            </>
          ) : pricingError ? (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-cream-muted/60 flex-shrink-0" />
              <span className="text-cream-muted text-xs">{pricingError}</span>
            </>
          ) : liveCount > 0 ? (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
              <span className="text-cream-muted text-xs">
                Live prices for{' '}
                <span className="text-cream">{nights} night{nights !== 1 ? 's' : ''}</span>
                {' '}·{' '}
                <span className="text-gold">{liveCount} properties updated</span>
                {' '}via Booking.com
              </span>
            </>
          ) : null}
        </div>
      )}

      {/* Sort Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-border">
        <p className="text-cream-muted text-xs">
          <span className="text-cream font-medium">{hotels.length}</span> properties
        </p>
        <div className="flex items-center gap-3">
          <span className="text-cream-muted text-[10px] tracking-[0.2em] uppercase hidden sm:block">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
            className="bg-dark-card border border-dark-border text-cream text-xs px-3 py-2 focus:outline-none focus:border-gold cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {visible.map((hotel, i) => (
          <div
            key={hotel.id}
            className="slide-up"
            style={{ animationDelay: `${(i % PAGE_SIZE) * 30}ms` }}
          >
            <HotelCard
              hotel={hotel}
              dateRange={dateRange}
              livePrice={priceMap?.[hotel.id] ?? null}
              isPricingLoading={isPricingLoading}
              nights={nights}
            />
          </div>
        ))}
      </div>

      {/* Load More */}
      {page < totalPages && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            className="btn-gold-outline px-12 py-4 text-xs"
          >
            Load More Properties
            <span className="ml-2 text-cream-muted">({sorted.length - visible.length} remaining)</span>
          </button>
        </div>
      )}

      {hotels.length > 0 && page >= totalPages && (
        <div className="text-center mt-12 pb-4">
          <p className="text-cream-muted text-xs tracking-widest">
            — All {hotels.length} properties displayed —
          </p>
        </div>
      )}
    </div>
  );
}
