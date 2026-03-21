import { useState } from 'react';
import { ALL_BRANDS, DISTINCTIONS_META } from '../data/hotels';

const REGIONS = ['Europe', 'Asia', 'Americas', 'Middle East', 'Africa', 'Oceania'];

const DISTINCTION_GROUPS = [
  {
    label: 'Michelin Keys',
    keys: ['michelin-3-key', 'michelin-2-key', 'michelin-1-key'],
  },
  {
    label: 'Global Rankings',
    keys: ['top-50-global', 'forbes-5-star', 'conde-nast-gold', 'travel-leisure-top100'],
  },
  {
    label: 'Memberships',
    keys: ['leading-hotels', 'relais-chateaux', 'small-luxury'],
  },
];

function FilterSection({ title, open, onToggle, children }) {
  return (
    <div className="border-b border-dark-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-5 hover:bg-dark-border/20 transition-colors text-left"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-cream font-medium">{title}</span>
        <svg
          className={`w-3.5 h-3.5 text-cream-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="pb-4 px-5">{children}</div>}
    </div>
  );
}

function Chip({ active, onClick, children, color }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded-sm mb-2 mr-2 transition-all duration-200 font-light tracking-wide
        ${active
          ? 'border-gold bg-gold/15 text-gold'
          : 'border-dark-border text-cream-muted hover:border-dark-border-hover hover:text-cream'
        }`}
    >
      {children}
    </button>
  );
}

export default function FilterPanel({ filters, onFiltersChange, totalCount, filteredCount }) {
  const [openSections, setOpenSections] = useState({
    brands: true,
    distinctions: true,
    regions: true,
    price: true,
  });

  function toggleSection(key) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleBrand(brandId) {
    const current = filters.brands;
    onFiltersChange({
      ...filters,
      brands: current.includes(brandId) ? current.filter((b) => b !== brandId) : [...current, brandId],
    });
  }

  function toggleDistinction(key) {
    const current = filters.distinctions;
    onFiltersChange({
      ...filters,
      distinctions: current.includes(key) ? current.filter((d) => d !== key) : [...current, key],
    });
  }

  function toggleRegion(region) {
    const current = filters.regions;
    onFiltersChange({
      ...filters,
      regions: current.includes(region) ? current.filter((r) => r !== region) : [...current, region],
    });
  }

  function handlePriceChange(e) {
    onFiltersChange({ ...filters, maxPrice: Number(e.target.value) });
  }

  function clearAll() {
    onFiltersChange({ brands: [], distinctions: [], regions: [], maxPrice: 15000 });
  }

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.distinctions.length > 0 ||
    filters.regions.length > 0 ||
    filters.maxPrice < 15000;

  return (
    <aside className="bg-dark-card border border-dark-border h-fit sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
        <div>
          <h2 className="text-[10px] tracking-[0.25em] uppercase text-cream font-medium">Refine</h2>
          <p className="text-cream-muted text-xs mt-0.5">
            {filteredCount} of {totalCount} properties
          </p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-gold text-[10px] tracking-widest uppercase hover:text-gold-light transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection title="Max Price / Night" open={openSections.price} onToggle={() => toggleSection('price')}>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-cream-muted text-xs">Any</span>
            <span className="text-gold font-medium text-sm">
              {filters.maxPrice >= 15000 ? 'No limit' : `$${filters.maxPrice.toLocaleString()}`}
            </span>
          </div>
          <input
            type="range"
            min={200}
            max={15000}
            step={100}
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-cream-muted">
            <span>$200</span>
            <span>$15,000+</span>
          </div>
        </div>
      </FilterSection>

      {/* Regions */}
      <FilterSection title="Region" open={openSections.regions} onToggle={() => toggleSection('regions')}>
        <div className="flex flex-wrap">
          {REGIONS.map((r) => (
            <Chip key={r} active={filters.regions.includes(r)} onClick={() => toggleRegion(r)}>
              {r}
            </Chip>
          ))}
        </div>
      </FilterSection>

      {/* Distinctions */}
      <FilterSection title="Awards & Distinctions" open={openSections.distinctions} onToggle={() => toggleSection('distinctions')}>
        <div className="space-y-4">
          {DISTINCTION_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-[9px] tracking-[0.2em] uppercase text-cream-muted mb-2">{group.label}</p>
              <div className="flex flex-wrap">
                {group.keys.map((key) => {
                  const meta = DISTINCTIONS_META[key];
                  return (
                    <Chip key={key} active={filters.distinctions.includes(key)} onClick={() => toggleDistinction(key)}>
                      {meta?.short || key}
                    </Chip>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brand" open={openSections.brands} onToggle={() => toggleSection('brands')}>
        <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
          {ALL_BRANDS.map((b) => (
            <label
              key={b.id}
              className="flex items-center gap-3 py-1.5 cursor-pointer group"
            >
              <span
                className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${
                  filters.brands.includes(b.id)
                    ? 'border-gold bg-gold'
                    : 'border-dark-border group-hover:border-dark-border-hover'
                }`}
              >
                {filters.brands.includes(b.id) && (
                  <svg className="w-2.5 h-2.5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={filters.brands.includes(b.id)}
                onChange={() => toggleBrand(b.id)}
              />
              <span className={`text-xs transition-colors ${
                filters.brands.includes(b.id) ? 'text-cream' : 'text-cream-muted group-hover:text-cream'
              }`}>
                {b.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
}
