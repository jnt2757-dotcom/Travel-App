/**
 * Dynamic Hotel Price Engine
 *
 * Prices are anchored to each hotel's real catalogue price and location.
 * Adjustments are applied for:
 *  - City-level demand (e.g. Monaco, Maldives, New York cost more)
 *  - Location type × season (beach peaks in summer, ski peaks in winter)
 *  - Day-of-week (Fri/Sat check-in premium)
 *  - Lead time (last-minute surge, sweet-spot discount)
 *  - Length-of-stay discount
 *  - Seeded daily market noise (consistent within a day, shifts overnight)
 */

// ─── City demand multipliers ──────────────────────────────────────────────────
// Reflects real-world relative expensiveness of each market.
const CITY_DEMAND = {
  // Ultra-premium
  'Monaco':        1.55,
  'Maldives':      1.50,
  'Bora Bora':     1.48,
  'St. Barts':     1.45,
  'Anguilla':      1.40,
  'Turks & Caicos':1.38,
  // Top-tier cities
  'New York':      1.35,
  'London':        1.30,
  'Zurich':        1.30,
  'Geneva':        1.28,
  'Tokyo':         1.25,
  'Paris':         1.25,
  'Singapore':     1.22,
  'Dubai':         1.20,
  'Sydney':        1.18,
  'Hong Kong':     1.18,
  'Los Angeles':   1.15,
  'Miami':         1.15,
  'Santorini':     1.15,
  'Mykonos':       1.15,
  'Aspen':         1.18,
  'Capri':         1.20,
  'Côte d\'Azur':  1.22,
  'Amalfi Coast':  1.18,
  'Venice':        1.18,
  'Florence':      1.10,
  'Rome':          1.10,
  'Barcelona':     1.08,
  'Maui':          1.12,
  'Kauai':         1.10,
  'Serengeti':     1.12,
  'Masai Mara':    1.12,
  // Mid-tier
  'San Francisco': 1.08,
  'Chicago':       1.05,
  'Vienna':        1.05,
  'Amsterdam':     1.05,
  'Copenhagen':    1.05,
  'Stockholm':     1.05,
  'Lisbon':        0.95,
  'Madrid':        0.98,
  'Athens':        0.95,
  'Dubrovnik':     1.05,
  'Budapest':      0.90,
  'Prague':        0.90,
  // Value markets
  'Bangkok':       0.80,
  'Bali':          0.78,
  'Phuket':        0.80,
  'Chiang Mai':    0.75,
  'Koh Samui':     0.78,
  'Hoi An':        0.72,
  'Hanoi':         0.72,
  'Siem Reap':     0.70,
  'Mumbai':        0.80,
  'Udaipur':       0.78,
  'Jaipur':        0.75,
  'New Delhi':     0.75,
  'Marrakech':     0.80,
  'Tulum':         0.90,
  'Cartagena':     0.82,
  'Lima':          0.78,
  'Buenos Aires':  0.80,
};

// ─── Location-type × month seasonality ───────────────────────────────────────
// Returns a multiplier for a given location type and month (0 = Jan).
function seasonalityMult(locationType, month) {
  switch (locationType) {
    case 'island':
    case 'coastal':
      // Beach peaks Jun–Aug and Dec (Christmas/New Year)
      return [0.85, 0.85, 0.90, 1.00, 1.10, 1.25, 1.40, 1.40, 1.15, 1.00, 0.90, 1.30][month];

    case 'mountain':
      // Ski peaks Dec–Feb; summer hiking peaks Jun–Aug
      return [1.35, 1.35, 1.10, 0.85, 0.85, 0.95, 1.20, 1.20, 0.90, 0.80, 0.85, 1.40][month];

    case 'wilderness':
      // Safari peaks Jul–Oct (dry season) and Dec
      return [0.85, 0.85, 0.90, 0.90, 0.95, 1.05, 1.25, 1.30, 1.30, 1.20, 0.95, 1.10][month];

    case 'city':
    case 'cultural':
    default:
      // Cities are more stable; slight dip in Jan/Feb, peaks Apr–Jun and Sep–Nov
      return [0.88, 0.88, 0.95, 1.08, 1.12, 1.15, 1.05, 1.00, 1.12, 1.12, 1.05, 1.10][month];
  }
}

// ─── Day-of-week premium ──────────────────────────────────────────────────────
function dowMult(checkInDate, locationType) {
  const dow = checkInDate.getDay(); // 0 = Sun
  // City hotels: Thu/Fri check-in is peak (business + weekend travellers)
  // Resort/island: Fri/Sat
  if (['city', 'cultural'].includes(locationType)) {
    return (dow === 4 || dow === 5) ? 1.18 : (dow === 6 || dow === 0) ? 0.95 : 1.0;
  }
  return (dow === 5 || dow === 6) ? 1.20 : (dow === 0) ? 1.10 : 1.0;
}

// ─── Lead-time multiplier ─────────────────────────────────────────────────────
function leadTimeMult(daysUntil) {
  if (daysUntil < 0)   return 0.95; // past date — shouldn't happen but safe
  if (daysUntil <= 1)  return 1.42; // last-minute surge
  if (daysUntil <= 3)  return 1.25;
  if (daysUntil <= 7)  return 1.10;
  if (daysUntil <= 21) return 0.97; // sweet spot
  if (daysUntil <= 60) return 1.00;
  if (daysUntil <= 120)return 1.06;
  return 1.14; // booking very far out
}

// ─── Length-of-stay discount ──────────────────────────────────────────────────
function losDiscount(nights) {
  if (nights >= 14) return 0.80;
  if (nights >= 7)  return 0.87;
  if (nights >= 5)  return 0.92;
  if (nights >= 3)  return 0.96;
  return 1.00;
}

// ─── Seeded daily noise ───────────────────────────────────────────────────────
function seededRandom(seed) {
  let t = (seed + 0x6d2b79f5) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function dailyNoise(hotelId) {
  const today = new Date().toISOString().slice(0, 10);
  const seed  = [...today].reduce((a, c) => a + c.charCodeAt(0), 0) * 397 + hotelId * 31;
  return 0.93 + seededRandom(seed) * 0.14; // ±7 %
}

// ─── Core pricing function ────────────────────────────────────────────────────
function computePrice(hotel, checkIn, checkOut) {
  const msPerDay     = 86_400_000;
  const checkInDate  = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights       = Math.max(1, Math.round((checkOutDate - checkInDate) / msPerDay));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntil = Math.round((checkInDate - today) / msPerDay);

  const cityMult   = CITY_DEMAND[hotel.city] ?? 1.0;
  const season     = seasonalityMult(hotel.locationType ?? 'city', checkInDate.getMonth());
  const dow        = dowMult(checkInDate, hotel.locationType ?? 'city');
  const leadTime   = leadTimeMult(daysUntil);
  const los        = losDiscount(nights);
  const noise      = dailyNoise(hotel.id);

  const mult = cityMult * season * dow * leadTime * los * noise;

  const pricePerNight = Math.max(50, Math.round(hotel.price * mult));
  const totalPrice    = pricePerNight * nights;

  return { pricePerNight, totalPrice, currency: 'USD', nights };
}

// ─── Simulated network latency ────────────────────────────────────────────────
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Public API (same interface as the original MakCorps implementation) ──────

export async function searchDestination(query) {
  await delay(180 + Math.random() * 120);
  return { document_id: query, name: query, type: 'GEO' };
}

export async function searchHotelsWithPricing({ checkIn, checkOut, allHotels = [] }) {
  await delay(550 + Math.random() * 350);

  return allHotels.map((hotel) => ({
    bookingId: hotel.id,
    name:      hotel.name,
    ...computePrice(hotel, checkIn, checkOut),
  }));
}

export async function getRoomAvailability({ hotelId, checkIn, checkOut, allHotels = [] }) {
  await delay(280 + Math.random() * 180);

  const hotel = allHotels.find((h) => String(h.id) === String(hotelId));
  if (!hotel) return null;

  const base = computePrice(hotel, checkIn, checkOut);

  // OTA-level micro-adjustment: ±3 %
  const adj = 0.97 + Math.random() * 0.06;
  return {
    ...base,
    pricePerNight: Math.max(50, Math.round(base.pricePerNight * adj)),
    totalPrice:    Math.max(50, Math.round(base.totalPrice    * adj)),
    roomName:      'Best Available Rate',
  };
}
