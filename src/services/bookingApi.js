/**
 * MakCorps Hotel Price API — proxied through Vite dev server at /api/makcorps
 * to avoid browser CORS restrictions and keep the key off the client.
 *
 * Docs: https://docs.makcorps.com/hotel-price-apis
 */

const MAKCORPS_KEY = '69bfb467b87c6ab92bdca2d5';
const BASE = '/api/makcorps';

/** Strip a leading "$" and parse to float; returns NaN on failure. */
function parsePrice(raw) {
  if (raw == null) return NaN;
  return parseFloat(String(raw).replace(/[^0-9.]/g, ''));
}

/**
 * Resolve a city/destination name to a MakCorps cityid via the Mapping API.
 * Returns null if nothing found.
 */
export async function searchDestination(query) {
  const url = `${BASE}/mapping?name=${encodeURIComponent(query)}&api_key=${MAKCORPS_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`searchDestination HTTP ${res.status}: ${body}`);
  }
  const data = await res.json();
  const results = Array.isArray(data) ? data : [];
  // Prefer GEO type (city); fall back to first result
  return results.find((r) => r.type === 'GEO') ?? results[0] ?? null;
}

/**
 * Fetch hotel prices for a city.
 * Returns [{ bookingId, name, pricePerNight, totalPrice, currency, nights }]
 */
export async function searchHotelsWithPricing({ cityId, checkIn, checkOut, adults = 2 }) {
  const params = new URLSearchParams({
    cityid: cityId,
    rooms: '1',
    adults: String(adults),
    checkin: checkIn,
    checkout: checkOut,
    api_key: MAKCORPS_KEY,
  });

  const res = await fetch(`${BASE}/city?${params}`);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`searchHotels HTTP ${res.status}: ${body}`);
  }
  const hotels = await res.json();
  if (!Array.isArray(hotels)) return [];

  const msPerNight = 86400000;
  const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / msPerNight));

  return hotels
    .map((h) => {
      // Prices come back as "$215" strings; up to 5 vendors per hotel
      const prices = [h.price1, h.price2, h.price3, h.price4, h.price5]
        .map(parsePrice)
        .filter((p) => !isNaN(p) && p > 0);

      if (!prices.length) return null;

      const totalPrice = Math.min(...prices);

      return {
        bookingId: h.hotelId ?? h.hotel_id ?? null,
        name: h.name ?? '',
        pricePerNight: Math.round(totalPrice / nights),
        totalPrice: Math.round(totalPrice),
        currency: 'USD',
        nights,
      };
    })
    .filter(Boolean);
}

/**
 * Fetch detailed pricing for a single hotel via the /hotel endpoint.
 * Returns the lowest price across all OTAs, or null.
 */
export async function getRoomAvailability({ hotelId, checkIn, checkOut, adults = 2 }) {
  const params = new URLSearchParams({
    hotelid: hotelId,
    rooms: '1',
    adults: String(adults),
    checkin: checkIn,
    checkout: checkOut,
    api_key: MAKCORPS_KEY,
  });

  const res = await fetch(`${BASE}/hotel?${params}`);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`getRoomAvailability HTTP ${res.status}: ${body}`);
  }
  const data = await res.json();

  // Response shape: { comparison: [[{vendor1,price1,tax1}, {vendor2,...}, ...]] }
  const vendors = data?.comparison?.[0];
  if (!Array.isArray(vendors) || !vendors.length) return null;

  const prices = vendors
    .flatMap((v) => Object.entries(v).filter(([k]) => k.startsWith('price')).map(([, val]) => parsePrice(val)))
    .filter((p) => !isNaN(p) && p > 0);

  if (!prices.length) return null;

  const msPerNight = 86400000;
  const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / msPerNight));
  const totalPrice = Math.min(...prices);

  return {
    pricePerNight: Math.round(totalPrice / nights),
    totalPrice: Math.round(totalPrice),
    currency: 'USD',
    nights,
  };
}
