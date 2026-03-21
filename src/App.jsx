import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import FilterPanel from './components/FilterPanel';
import HotelGrid from './components/HotelGrid';
import { hotels } from './data/hotels';

const DEFAULT_FILTERS = {
  brands: [],
  distinctions: [],
  regions: [],
  maxPrice: 15000,
};

export default function App() {
  const [locationQuery, setLocationQuery] = useState('');
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredHotels = useMemo(() => {
    let result = hotels;

    // Location search
    if (locationQuery.trim()) {
      const q = locationQuery.toLowerCase().trim();
      result = result.filter(
        (h) =>
          h.city.toLowerCase().includes(q) ||
          h.country.toLowerCase().includes(q) ||
          h.region.toLowerCase().includes(q) ||
          h.name.toLowerCase().includes(q) ||
          h.brand.toLowerCase().includes(q)
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((h) => filters.brands.includes(h.brandId));
    }

    // Distinction filter (hotel must have at least one selected)
    if (filters.distinctions.length > 0) {
      result = result.filter((h) =>
        filters.distinctions.some((d) => h.distinctions.includes(d))
      );
    }

    // Region filter
    if (filters.regions.length > 0) {
      result = result.filter((h) => filters.regions.includes(h.region));
    }

    // Price filter
    if (filters.maxPrice < 15000) {
      result = result.filter((h) => h.price <= filters.maxPrice);
    }

    return result;
  }, [locationQuery, filters]);

  return (
    <div className="min-h-screen bg-dark text-cream">
      <Header />

      {/* Search */}
      <SearchSection
        locationQuery={locationQuery}
        onLocationChange={setLocationQuery}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        resultCount={filteredHotels.length}
      />

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters((v) => !v)}
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-cream-muted border border-dark-border px-4 py-2.5 hover:border-gold hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters
            {(filters.brands.length + filters.distinctions.length + filters.regions.length > 0 || filters.maxPrice < 15000) && (
              <span className="bg-gold text-dark text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {filters.brands.length + filters.distinctions.length + filters.regions.length + (filters.maxPrice < 15000 ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters — Desktop always visible, mobile toggleable */}
          <div className={`w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              totalCount={hotels.length}
              filteredCount={filteredHotels.length}
            />
          </div>

          {/* Hotel Grid */}
          <div className="flex-1 min-w-0">
            <HotelGrid hotels={filteredHotels} dateRange={dateRange} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-border bg-dark-card">
        <div className="max-w-screen-2xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 border border-gold/40 flex items-center justify-center">
                <span className="font-serif italic text-gold text-base leading-none">A</span>
              </div>
              <div>
                <span className="font-serif text-cream text-lg tracking-[0.2em] uppercase">Aurum</span>
                <p className="text-cream-muted text-[10px] tracking-widest mt-0.5">
                  Curated Luxury Travel
                </p>
              </div>
            </div>
            <p className="text-cream-muted text-xs tracking-wider text-center">
              500 hand-selected properties · Michelin-recognized · Forbes-rated
            </p>
            <p className="text-cream-muted text-[10px] tracking-wider">
              © {new Date().getFullYear()} Aurum Travel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
