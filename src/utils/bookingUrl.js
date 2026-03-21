import { format } from 'date-fns';

/**
 * Constructs a booking URL for a given hotel and date range.
 * Attempts to pre-fill check-in/check-out dates in the brand's native URL format.
 */
export function getBookingUrl(hotel, dateRange) {
  const base = hotel.officialUrl;

  if (!dateRange?.from) {
    return base;
  }

  const checkIn = format(dateRange.from, 'yyyy-MM-dd');
  const checkOut = dateRange.to
    ? format(dateRange.to, 'yyyy-MM-dd')
    : format(new Date(dateRange.from.getTime() + 3 * 86400000), 'yyyy-MM-dd');

  const paramsByBrand = {
    'aman': `arrive=${checkIn}&depart=${checkOut}&adults=2`,
    'bulgari': `checkin=${checkIn}&checkout=${checkOut}&adults=2`,
    'cheval-blanc': `checkin=${checkIn}&checkout=${checkOut}`,
    'four-seasons': `checkIn=${checkIn}&checkOut=${checkOut}&adults=2`,
    'rosewood': `checkin=${checkIn}&checkout=${checkOut}&adults=2`,
    'six-senses': `check_in=${checkIn}&check_out=${checkOut}&adults=2`,
    'peninsula': `arrivalDate=${checkIn}&departureDate=${checkOut}&adults=2`,
    'oetker': `arrival=${checkIn}&departure=${checkOut}&adults=2`,
    'belmond': `checkIn=${checkIn}&checkOut=${checkOut}&adults=2`,
    'como': `arrive=${checkIn}&depart=${checkOut}`,
    'mandarin-oriental': `arrivalDate=${checkIn}&departureDate=${checkOut}&numberOfAdults=2`,
    'raffles': `checkin=${checkIn}&checkout=${checkOut}&adults=2`,
    'ritz-carlton': `fromDate=${checkIn}&toDate=${checkOut}&clusterCode=NONE`,
    'st-regis': `fromDate=${checkIn}&toDate=${checkOut}&clusterCode=NONE`,
    'waldorf-astoria': `fromDate=${checkIn}&toDate=${checkOut}&clusterCode=NONE`,
    'park-hyatt': `checkinDate=${checkIn}&checkoutDate=${checkOut}&adults=2`,
    'auberge': `check_in=${checkIn}&check_out=${checkOut}&adults=2`,
    'capella': `arrivalDate=${checkIn}&departureDate=${checkOut}&adults=2`,
    'banyan-tree': `checkin=${checkIn}&checkout=${checkOut}&adults=2`,
    'edition': `fromDate=${checkIn}&toDate=${checkOut}&adults=2`,
  };

  const params = paramsByBrand[hotel.brandId] || `checkIn=${checkIn}&checkOut=${checkOut}&adults=2`;
  return `${base}?${params}`;
}

export function formatDateDisplay(date) {
  if (!date) return '';
  return format(date, 'MMM d, yyyy');
}

export function formatNights(from, to) {
  if (!from || !to) return '';
  const nights = Math.round((to - from) / 86400000);
  return `${nights} night${nights !== 1 ? 's' : ''}`;
}
