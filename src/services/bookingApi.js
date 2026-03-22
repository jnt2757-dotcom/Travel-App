/**
 * Dynamic Hotel Price Engine
 *
 * Generates realistic prices that vary by:
 *  - Season / month (peak summer & Christmas cost more)
 *  - Day of week (weekends cost more)
 *  - Lead time (last-minute & far-future cost more)
 *  - Length of stay (discounts for longer stays)
 *  - Daily market noise (seeded by date so consistent within a day)
 *  - Hotel tier (derived from the hotel's catalogue price)
 *
 * Simulates network latency so the loading skeleton shows correctly.
 */

/** Simple seeded pseudo-random (mulberry32) */
function seededRandom(seed) {
  let t = (seed + 0x6d2b79f5) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** Build a date-based seed so prices are consistent within the same calendar day */
function dateSeed(dateStr) {
  return [...dateStr].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

/** Seasonality multiplier (1.0 = baseline) */
function seasonMultiplier(checkInDate) {
  const month = checkInDate.getMonth(); // 0-based
  const day = checkInDate.getDay();     // 0 = Sunday

  // Peak months: July(6), August(7), December(11)
  const monthMult =
    month === 6 || month === 7 ? 1.35 :
    month === 11               ? 1.30 :
    month === 0               ? 0.85 : // January is slow
    month === 1               ? 0.88 :
    month === 4 || month === 5 ? 1.15 : // May/June spring
    month === 8               ? 1.10 : // September
    1.0;

  // Weekend premium (Fri/Sat check-in)
  const weekendMult = (day === 5 || day === 6) ? 1.18 : 1.0;

  return monthMult * weekendMult;
}

/** Lead-time multiplier: last-minute and far-future are pricier */
function leadTimeMultiplier(daysUntilCheckIn) {
  if (daysUntilCheckIn <= 1)  return 1.40; // last-minute surge
  if (daysUntilCheckIn <= 3)  return 1.25;
  if (daysUntilCheckIn <= 7)  return 1.10;
  if (daysUntilCheckIn <= 30) return 1.00; // sweet spot
  if (daysUntilCheckIn <= 90) return 1.05;
  return 1.12; // booking very far out
}

/** Length-of-stay discount */
function stayDiscount(nights) {
  if (nights >= 14) return 0.82;
  if (nights >= 7)  return 0.88;
  if (nights >= 4)  return 0.93;
  if (nights >= 3)  return 0.96;
  return 1.0;
}

/**
 * Compute a live price for one hotel given check-in / check-out dates.
 * Returns { pricePerNight, totalPrice, currency, nights }
 */
function computePrice(hotel, checkIn, checkOut) {
  const msPerDay = 86400000;
  const checkInDate  = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.max(1, Math.round((checkOutDate - checkInDate) / msPerDay));
  const today  = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntil = Math.round((checkInDate - today) / msPerDay);

  // Daily noise: ±8 % based on today's date + hotel id
  const seed  = dateSeed(new Date().toISOString().slice(0, 10)) + hotel.id;
  const noise = 0.92 + seededRandom(seed) * 0.16; // 0.92 – 1.08

  const base  = hotel.price; // catalogue price per night
  const mult  = seasonMultiplier(checkInDate)
              * leadTimeMultiplier(daysUntil)
              * stayDiscount(nights)
              * noise;

  const pricePerNight = Math.round(base * mult);
  const totalPrice    = pricePerNight * nights;

  return { pricePerNight, totalPrice, currency: 'USD', nights };
}

/** Simulate async network call with realistic latency */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Public API (same shape as the MakCorps implementation) ──────────────────

/**
 * "Resolve" a destination — always succeeds; just echoes the query back
 * so the hook flow continues unchanged.
 */
export async function searchDestination(query) {
  await delay(200 + Math.random() * 150);
  return { document_id: query, name: query, type: 'GEO' };
}

/**
 * Return dynamic prices for every hotel in the list.
 * The hook passes allHotels via the options object; we attach it in useLivePricing.
 */
export async function searchHotelsWithPricing({ checkIn, checkOut, allHotels = [] }) {
  await delay(600 + Math.random() * 400); // simulate API round-trip

  return allHotels.map((hotel) => ({
    bookingId: hotel.id,
    name:      hotel.name,
    ...computePrice(hotel, checkIn, checkOut),
  }));
}

/**
 * Refine pricing for a single hotel — returns a slightly adjusted price
 * to simulate OTA-level granularity.
 */
export async function getRoomAvailability({ hotelId, checkIn, checkOut, allHotels = [] }) {
  await delay(300 + Math.random() * 200);

  const hotel = allHotels.find((h) => String(h.id) === String(hotelId));
  if (!hotel) return null;

  const base = computePrice(hotel, checkIn, checkOut);

  // Minor OTA adjustment: ±3 %
  const adjustment = 0.97 + Math.random() * 0.06;
  return {
    ...base,
    pricePerNight: Math.round(base.pricePerNight * adjustment),
    totalPrice:    Math.round(base.totalPrice    * adjustment),
    roomName:      'Best Available Rate',
  };
}
