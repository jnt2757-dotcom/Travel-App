import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { searchDestination, searchHotelsWithPricing, getRoomAvailability } from '../services/bookingApi';

/**
 * Normalise a hotel name for fuzzy matching:
 * lowercase, strip punctuation/articles, collapse spaces.
 */
function normaliseName(name) {
  return name
    .toLowerCase()
    .replace(/\b(the|a|an|hotel|resort|&|and)\b/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Score similarity between two normalised strings.
 * Returns a value in [0, 1]; ≥ 0.55 is considered a match.
 */
function matchScore(a, b) {
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.9;
  const wordsA = new Set(a.split(' '));
  const wordsB = b.split(' ');
  const overlap = wordsB.filter((w) => w.length > 3 && wordsA.has(w)).length;
  return overlap / Math.max(wordsA.size, wordsB.length);
}

/**
 * Given our hotel list and Booking.com search results, build a map:
 *   { [ourHotelId]: { pricePerNight, totalPrice, currency, nights, bookingId } }
 *
 * Each Booking.com result is matched to the closest hotel in our list
 * by normalised name; matches below 0.55 are discarded.
 */
function buildPriceMap(ourHotels, bookingResults) {
  const map = {};

  for (const result of bookingResults) {
    const normResult = normaliseName(result.name);
    let bestScore = 0;
    let bestHotel = null;

    for (const hotel of ourHotels) {
      const score = matchScore(normaliseName(hotel.name), normResult);
      if (score > bestScore) {
        bestScore = score;
        bestHotel = hotel;
      }
    }

    if (bestHotel && bestScore >= 0.55) {
      // Keep the higher-confidence match if a hotel appears twice
      if (!map[bestHotel.id] || bestScore > (map[bestHotel.id]._score ?? 0)) {
        map[bestHotel.id] = { ...result, _score: bestScore };
      }
    }
  }

  return map;
}

/**
 * useLivePricing
 *
 * Fetches live Booking.com prices whenever locationQuery + dateRange
 * (with both from + to set) change. Debounces 600 ms to avoid firing
 * on every keystroke.
 *
 * Returns:
 *   priceMap  – { [hotelId]: { pricePerNight, totalPrice, currency, nights } }
 *   isLoading – true while the API call is in flight
 *   error     – string | null
 *   nights    – number of nights from the date range
 */
export function useLivePricing(locationQuery, dateRange, allHotels) {
  const [priceMap, setPriceMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const checkIn = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : null;
  const checkOut = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : null;

  useEffect(() => {
    // Clear prices if dates are removed
    if (!checkIn || !checkOut) {
      setPriceMap({});
      setError(null);
      return;
    }

    // Cancel previous in-flight request
    if (abortRef.current) {
      abortRef.current.cancelled = true;
    }
    const guard = { cancelled: false };
    abortRef.current = guard;

    // Debounce
    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Step 1: resolve destination
        // If no location query, use a generic broad search by trying the
        // first city seen in the current hotel list as a representative dest.
        const query = locationQuery?.trim() || allHotels[0]?.city || 'Paris';
        const dest = await searchDestination(query);

        if (guard.cancelled) return;

        if (!dest) {
          setError('Destination not found — showing catalogue prices');
          setIsLoading(false);
          return;
        }

        // Step 2: search hotels with bulk pricing
        // Use search_type from the destination result (more accurate than dest_type)
        const results = await searchHotelsWithPricing({
          destId: dest.dest_id,
          destType: dest.search_type ?? dest.dest_type,
          checkIn,
          checkOut,
        });

        if (guard.cancelled) return;

        // Step 3: match Booking.com results to our hotel catalogue by name
        const initialMap = buildPriceMap(allHotels, results);

        // Publish initial prices immediately so cards update without waiting for step 4
        if (!guard.cancelled) setPriceMap({ ...initialMap });

        // Step 4: refine top-confidence matches using getRoomAvailability.
        // This gives exact per-room pricing for the selected dates.
        const topMatches = Object.entries(initialMap)
          .filter(([, data]) => data._score >= 0.7 && data.bookingId)
          .slice(0, 5);

        if (topMatches.length > 0 && !guard.cancelled) {
          const roomResults = await Promise.allSettled(
            topMatches.map(([ourHotelId, data]) =>
              getRoomAvailability({ hotelId: data.bookingId, checkIn, checkOut })
                .then((room) => (room ? { ourHotelId, room } : null))
                .catch(() => null)
            )
          );

          if (guard.cancelled) return;

          // Merge refined room prices over the initial search prices
          const refinedMap = { ...initialMap };
          for (const result of roomResults) {
            if (result.status === 'fulfilled' && result.value) {
              const { ourHotelId, room } = result.value;
              refinedMap[ourHotelId] = {
                ...refinedMap[ourHotelId],
                pricePerNight: room.pricePerNight,
                totalPrice: room.totalPrice,
                currency: room.currency,
                nights: room.nights,
                roomName: room.roomName,
              };
            }
          }

          if (!guard.cancelled) setPriceMap(refinedMap);
        }
      } catch (err) {
        if (guard.cancelled) return;
        console.error('[useLivePricing]', err);
        setError('Live pricing unavailable — showing catalogue prices');
      } finally {
        if (!guard.cancelled) setIsLoading(false);
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      guard.cancelled = true;
    };
  }, [locationQuery, checkIn, checkOut]);

  const nights =
    dateRange?.from && dateRange?.to
      ? Math.max(1, Math.round((dateRange.to - dateRange.from) / 86400000))
      : null;

  return { priceMap, isLoading, error, nights };
}
