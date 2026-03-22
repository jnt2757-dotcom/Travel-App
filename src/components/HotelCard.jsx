import ImageGallery from './ImageGallery';
import { DISTINCTIONS_META } from '../data/hotels';
import { getBookingUrl } from '../utils/bookingUrl';

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3 h-3 ${i <= full ? 'text-gold' : i === full + 1 && partial >= 0.5 ? 'text-gold/50' : 'text-dark-border'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function HotelCard({ hotel, dateRange, livePrice, isPricingLoading, nights }) {
  const bookingUrl = getBookingUrl(hotel, dateRange);

  // Show up to 4 distinctions on the card
  const topDistinctions = hotel.distinctions.slice(0, 4);

  // Pricing resolution:
  // - livePrice available  → show live per-night + optional total
  // - isPricingLoading     → show shimmer skeleton
  // - neither              → show static catalogue price
  const hasDates = dateRange?.from && dateRange?.to;
  const showLive = !!livePrice;
  const showSkeleton = isPricingLoading && hasDates && !livePrice;
  const displayPrice = livePrice?.pricePerNight ?? hotel.price;
  const totalPrice = livePrice?.totalPrice ?? (hasDates && nights ? hotel.price * nights : null);
  const currency = livePrice?.currency ?? 'USD';
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';

  function handleBook(e) {
    e.preventDefault();
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <article className="card-luxury group hover:shadow-xl hover:shadow-black/40 transition-all duration-500 flex flex-col">
      {/* Image Gallery */}
      <ImageGallery images={hotel.images} hotelName={hotel.name} />

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Brand & Region */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] tracking-[0.25em] uppercase text-gold font-medium">
            {hotel.brand}
          </span>
          <span className="text-[9px] tracking-[0.15em] uppercase text-cream-muted">
            {hotel.region}
          </span>
        </div>

        {/* Hotel Name */}
        <h3 className="font-serif text-cream text-lg leading-snug mb-1 group-hover:text-gold-light transition-colors duration-300">
          {hotel.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-4">
          <svg className="w-3 h-3 text-cream-muted flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span className="text-cream-muted text-xs">{hotel.city}, {hotel.country}</span>
        </div>

        {/* Distinctions */}
        {topDistinctions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {topDistinctions.map((key) => {
              const meta = DISTINCTIONS_META[key];
              if (!meta) return null;
              return (
                <span
                  key={key}
                  className={`distinction-badge text-[9px] ${meta.color}`}
                  title={meta.label}
                >
                  {meta.short}
                </span>
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-dark-border mb-4 mt-auto" />

        {/* Price, Rating, Book */}
        <div className="flex items-end justify-between gap-4">
          <div>
            {/* Live indicator */}
            {showLive && (
              <div className="flex items-center gap-1 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[8px] tracking-[0.2em] uppercase text-gold font-medium">
                  {livePrice?.roomName ? `${livePrice.roomName} · Live` : 'Live price'}
                </span>
              </div>
            )}
            {!showLive && !showSkeleton && (
              <p className="text-[9px] tracking-[0.2em] uppercase text-cream-muted mb-0.5">From</p>
            )}

            {/* Price */}
            {showSkeleton ? (
              <div className="space-y-1">
                <div className="skeleton h-6 w-20 rounded-sm" />
                <div className="skeleton h-3 w-14 rounded-sm" />
              </div>
            ) : (
              <>
                <p className={`font-serif text-xl leading-none ${showLive ? 'text-cream' : 'text-cream'}`}>
                  {currencySymbol}{displayPrice.toLocaleString()}
                </p>
                <p className="text-cream-muted text-[10px] mt-0.5">
                  per night
                  {totalPrice && nights && nights > 1 && (
                    <span className="ml-1.5 text-gold">
                      · {currencySymbol}{totalPrice.toLocaleString()} total
                    </span>
                  )}
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1.5">
              <StarRating rating={hotel.rating} />
              <span className="text-cream text-xs font-medium">{hotel.rating}</span>
            </div>
            <p className="text-cream-muted text-[10px]">
              {hotel.reviewCount.toLocaleString()} reviews
            </p>
          </div>
        </div>

        {/* Book Now Button */}
        <button
          onClick={handleBook}
          className="mt-4 btn-gold w-full flex items-center justify-center gap-2 group/btn"
        >
          <span>Book Now</span>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Description — hidden by default, shown on hover */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-in-out">
          <p className="text-cream-muted text-[11px] leading-relaxed mt-4 line-clamp-3">
            {hotel.description}
          </p>
        </div>
      </div>
    </article>
  );
}
