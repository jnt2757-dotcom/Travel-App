/**
 * MakCorps Hotel Price API
 * https://api.makcorps.com
 *
 * NOTE: Move the API key to VITE_MAKCORPS_KEY in .env for production.
 */

const MAKCORPS_KEY = '69bfb467b87c6ab92bdca2d5';
const BASE_URL = 'https://api.makcorps.com';

/**
 * Autocomplete a city/destination name and return its MakCorps cityid.
 * Returns null if nothing is found.
 */
export async function searchDestination(query) {
  const url = `${BASE_URL}/geo?query=${encodeURIComponent(query)}&api_key=${MAKCORPS_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`searchDestination HTTP ${res.status}`);
  const data = await res.json();
  const results = Array.isArray(data) ? data : (data?.data ?? []);
  if (!results.length) return null;
  // Prefer city-type results; fall back to first
  return results.find((d) => d.type?.toLowerCase() === 'city') ?? results[0];
}

/**
 * Fetch hotel prices for a city from MakCorps.
 * Returns an array of { bookingId, name, pricePerNight, totalPrice, currency, nights }.
 */
export async function searchHotelsWithPricing({
  cityId,
  checkIn,
  checkOut,
  adults = 2,
}) {
  const params = new URLSearchParams({
    cityid: cityId,
    rooms: '1',
    adults: String(adults),
    checkin: checkIn,
    checkout: checkOut,
    api_key: MAKCORPS_KEY,
  });

  const res = await fetch(`${BASE_URL}/city?${params}`);
  if (!res.ok) throw new Error(`searchHotels HTTP ${res.status}`);
  const data = await res.json();

  const hotels = Array.isArray(data) ? data : (data?.hotels ?? data?.data ?? []);

  const msPerNight = 86400000;
  const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / msPerNight));

  return hotels
    .map((h) => {
      // MakCorps returns price1…price8 from different OTAs — take the lowest available
      const prices = [h.price1, h.price2, h.price3, h.price4, h.price5, h.price6, h.price7, h.price8]
        .map((p) => parseFloat(p))
        .filter((p) => !isNaN(p) && p > 0);

      if (!prices.length) return null;

      const totalPrice = Math.min(...prices);

      return {
        bookingId: h.hotelid ?? h.hotel_id ?? null,
        name: h.name ?? h.hotel_name ?? '',
        pricePerNight: Math.round(totalPrice / nights),
        totalPrice: Math.round(totalPrice),
        currency: h.currency ?? 'USD',
        nights,
      };
    })
    .filter(Boolean);
}

/**
 * Fetch prices for a single hotel by its MakCorps hotelid.
 * Returns the lowest available price across all OTAs, or null.
 */
export async function getRoomAvailability({
  hotelId,
  checkIn,
  checkOut,
  adults = 2,
}) {
  const params = new URLSearchParams({
    hotelid: hotelId,
    rooms: '1',
    adults: String(adults),
    checkin: checkIn,
    checkout: checkOut,
    api_key: MAKCORPS_KEY,
  });

  const res = await fetch(`${BASE_URL}/hotel?${params}`);
  if (!res.ok) throw new Error(`getRoomAvailability HTTP ${res.status}`);
  const data = await res.json();

  const record = Array.isArray(data) ? data[0] : data;
  if (!record) return null;

  const prices = [record.price1, record.price2, record.price3, record.price4,
                  record.price5, record.price6, record.price7, record.price8]
    .map((p) => parseFloat(p))
    .filter((p) => !isNaN(p) && p > 0);

  if (!prices.length) return null;

  const msPerNight = 86400000;
  const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / msPerNight));
  const totalPrice = Math.min(...prices);

  return {
    pricePerNight: Math.round(totalPrice / nights),
    totalPrice: Math.round(totalPrice),
    currency: record.currency ?? 'USD',
    nights,
  };
}
