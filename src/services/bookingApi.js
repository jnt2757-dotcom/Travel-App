/**
 * Booking.com API via RapidAPI (booking-com15.p.rapidapi.com)
 *
 * NOTE: In production, move the API key to an environment variable
 * (e.g. VITE_RAPIDAPI_KEY in .env) rather than committing it to source.
 */

const RAPIDAPI_KEY = '2dfceef874msh9d20eab2496f7aep119617jsnd3dfd43703eb';
const RAPIDAPI_HOST = 'booking-com15.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}/api/v1/hotels`;

const HEADERS = {
  'x-rapidapi-key': RAPIDAPI_KEY,
  'x-rapidapi-host': RAPIDAPI_HOST,
};

/**
 * Search for a destination (city / region / country) and return its
 * Booking.com dest_id + dest_type for use in hotel search calls.
 * Returns null if nothing is found.
 */
export async function searchDestination(query) {
  const url = `${BASE_URL}/searchDestination?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`searchDestination HTTP ${res.status}`);
  const data = await res.json();
  if (!data?.data?.length) return null;
  // Prefer city-type results; fall back to first result
  const city = data.data.find((d) => d.dest_type === 'city');
  return city ?? data.data[0];
}

/**
 * Search hotels for a destination + date range and return an array of
 * { bookingId, name, pricePerNight, currency, totalPrice, nights }.
 *
 * Uses the searchHotels endpoint which already includes pricing
 * in priceBreakdown, so a separate getRoomAvailability call is only
 * needed for deep room-level detail (not required for card display).
 */
export async function searchHotelsWithPricing({
  destId,
  destType,
  checkIn,
  checkOut,
  adults = 2,
  currency = 'USD',
}) {
  const params = new URLSearchParams({
    dest_id: destId,
    search_type: destType,
    arrival_date: checkIn,
    departure_date: checkOut,
    adults: String(adults),
    room_qty: '1',
    currency_code: currency,
    page_number: '1',
    languagecode: 'en-us',
  });

  const res = await fetch(`${BASE_URL}/searchHotels?${params}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`searchHotels HTTP ${res.status}`);
  const data = await res.json();

  const hotels = data?.data?.hotels ?? [];

  // Calculate nights for per-night price derivation
  const msPerNight = 86400000;
  const ciDate = new Date(checkIn);
  const coDate = new Date(checkOut);
  const nights = Math.max(1, Math.round((coDate - ciDate) / msPerNight));

  return hotels
    .map((h) => {
      const prop = h.property ?? {};
      const gross = prop.priceBreakdown?.grossPrice;
      if (!gross?.value) return null;

      const totalPrice = Math.round(gross.value);
      const pricePerNight = Math.round(totalPrice / nights);

      return {
        bookingId: h.hotel_id,
        name: prop.name ?? '',
        pricePerNight,
        totalPrice,
        currency: gross.currency ?? currency,
        nights,
        reviewScore: prop.reviewScore,
      };
    })
    .filter(Boolean);
}

/**
 * Fetch per-room availability for a specific Booking.com hotel_id.
 * Returns the cheapest available room or null.
 * Used for individual hotel lookups when a hotel_id is already known.
 */
export async function getRoomAvailability({
  hotelId,
  checkIn,
  checkOut,
  adults = 2,
  currency = 'USD',
}) {
  const params = new URLSearchParams({
    hotel_id: hotelId,
    arrival_date: checkIn,
    departure_date: checkOut,
    adults: String(adults),
    room_qty: '1',
    currency_code: currency,
    languagecode: 'en-us',
    units: 'metric',
  });

  const res = await fetch(`${BASE_URL}/getRoomAvailability?${params}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`getRoomAvailability HTTP ${res.status}`);
  const data = await res.json();

  const rooms = data?.data ?? [];
  if (!rooms.length) return null;

  // Find the cheapest available room
  const cheapest = rooms
    .flatMap((block) => block.block ?? [])
    .filter((r) => !r.soldout)
    .sort((a, b) => (a.min_price?.price ?? Infinity) - (b.min_price?.price ?? Infinity))[0];

  if (!cheapest?.min_price?.price) return null;

  const msPerNight = 86400000;
  const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / msPerNight));

  return {
    pricePerNight: Math.round(cheapest.min_price.price / nights),
    totalPrice: Math.round(cheapest.min_price.price),
    currency: cheapest.min_price.currency ?? currency,
    roomName: cheapest.name ?? '',
    nights,
  };
}
