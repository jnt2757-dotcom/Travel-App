import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { formatDateDisplay, formatNights } from '../utils/bookingUrl';
import 'react-day-picker/dist/style.css';

export default function DateRangePicker({ dateRange, onDateRangeChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const hasRange = dateRange?.from;
  const nights = dateRange?.from && dateRange?.to ? formatNights(dateRange.from, dateRange.to) : null;

  const displayText = hasRange
    ? `${formatDateDisplay(dateRange.from)}${dateRange.to ? ` → ${formatDateDisplay(dateRange.to)}` : ' → Check-out'}`
    : 'Select Dates';

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-3 w-full group ${open ? 'text-cream' : 'text-cream-muted hover:text-cream'} transition-colors duration-300`}
      >
        <div className="flex flex-col items-start">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gold mb-1">Dates</span>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
            </svg>
            <span className={`text-sm font-light ${hasRange ? 'text-cream' : ''}`}>{displayText}</span>
            {nights && (
              <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-sm">{nights}</span>
            )}
          </div>
        </div>
      </button>

      {/* Calendar Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-3 z-50 bg-dark-card border border-dark-border shadow-2xl shadow-black/60 animate-fade-in">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-dark-border">
              <h3 className="font-serif text-cream text-sm">Select your stay</h3>
              {hasRange && (
                <button
                  onClick={() => {
                    onDateRangeChange({ from: undefined, to: undefined });
                  }}
                  className="text-cream-muted hover:text-gold text-xs transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              showOutsideDays
            />

            {hasRange && dateRange.to && (
              <div className="mt-3 pt-3 border-t border-dark-border flex items-center justify-between">
                <div className="text-cream-muted text-xs">
                  <span className="text-cream">{formatDateDisplay(dateRange.from)}</span>
                  <span className="mx-2">→</span>
                  <span className="text-cream">{formatDateDisplay(dateRange.to)}</span>
                  <span className="ml-2 text-gold">· {nights}</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="btn-gold text-[10px] py-2 px-4"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
