import { useState, useRef, useEffect } from 'react';
import DateRangePicker from './DateRangePicker';
import hotelsData from '../data/hotels-real.json';

// Build autocomplete suggestions from all unique cities/countries
const SUGGESTIONS = [
  ...new Set([
    ...hotelsData.map((h) => h.city),
    ...hotelsData.map((h) => h.country),
    ...hotelsData.map((h) => h.region),
  ]),
].sort();

export default function SearchSection({ locationQuery, onLocationChange, dateRange, onDateRangeChange, resultCount }) {
  const [inputValue, setInputValue] = useState(locationQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggRef = useRef(null);

  useEffect(() => {
    setInputValue(locationQuery);
  }, [locationQuery]);

  useEffect(() => {
    function handleClick(e) {
      if (suggRef.current && !suggRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleInput(e) {
    const val = e.target.value;
    setInputValue(val);
    onLocationChange(val);

    if (val.length > 0) {
      const filtered = SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function selectSuggestion(s) {
    setInputValue(s);
    onLocationChange(s);
    setShowSuggestions(false);
  }

  function clearLocation() {
    setInputValue('');
    onLocationChange('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  return (
    <section className="relative pt-28 pb-0 px-4 sm:px-6">
      {/* Hero background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark to-transparent pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-10">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-light">
            895 Curated Properties
          </p>
          <h1 className="font-serif text-cream text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-4">
            The World's Most
            <br />
            <em className="text-gold">Extraordinary Stays</em>
          </h1>
          <p className="text-cream-muted text-sm font-light max-w-xl mx-auto">
            895 hand-selected properties — Michelin-recognized, Forbes-rated, and globally acclaimed.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-dark-card border border-dark-border max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-dark-border">
            {/* Location Input */}
            <div className="flex-1 px-6 py-5 relative" ref={suggRef}>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-gold mb-2">
                Destination
              </label>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cream-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInput}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  placeholder="City, country, or region…"
                  className="input-luxury w-full border-none text-sm py-0 placeholder-cream-muted/60"
                />
                {inputValue && (
                  <button onClick={clearLocation} className="text-cream-muted hover:text-gold transition-colors flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {showSuggestions && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-dark-card border border-dark-border z-50 shadow-xl shadow-black/40">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onMouseDown={() => selectSuggestion(s)}
                      className="w-full text-left px-6 py-3 text-sm text-cream-muted hover:text-cream hover:bg-dark-border/30 transition-colors flex items-center gap-3"
                    >
                      <svg className="w-3 h-3 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date Range Picker */}
            <div className="flex-1 px-6 py-5">
              <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
            </div>

            {/* Search Button */}
            <div className="flex items-center justify-center px-6 py-5">
              <button className="btn-gold w-full md:w-auto whitespace-nowrap flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Result count */}
        <div className="text-center mt-6">
          <p className="text-cream-muted text-xs tracking-wider">
            {resultCount === 0 ? (
              <span className="text-gold">No properties match your search</span>
            ) : (
              <>
                Showing <span className="text-cream font-medium">{resultCount}</span> curated properties
                {locationQuery && (
                  <> matching <span className="text-gold italic">"{locationQuery}"</span></>
                )}
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
