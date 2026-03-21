import { useState } from 'react';

export default function ImageGallery({ images, hotelName }) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [lightbox, setLightbox] = useState(false);

  function prev(e) {
    e.stopPropagation();
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }

  function next(e) {
    e.stopPropagation();
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }

  function handleKeyDown(e) {
    if (!lightbox) return;
    if (e.key === 'ArrowRight') setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    if (e.key === 'ArrowLeft') setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    if (e.key === 'Escape') setLightbox(false);
  }

  return (
    <div className="relative group aspect-[4/3] overflow-hidden bg-dark-border" onKeyDown={handleKeyDown} tabIndex={-1}>
      {/* Main Image */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${hotelName} — ${i + 1}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          onLoad={() => setLoaded((l) => ({ ...l, [i]: true }))}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          onClick={() => setLightbox(true)}
          className={`absolute inset-0 w-full h-full object-cover cursor-zoom-in transition-opacity duration-500
            ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            ${loaded[i] ? '' : 'skeleton'}
          `}
        />
      ))}

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark/80 to-transparent z-20 pointer-events-none" />

      {/* Image counter */}
      <div className="absolute top-3 right-3 z-30 bg-dark/70 backdrop-blur-sm px-2 py-1 text-[10px] text-cream-muted tracking-wider">
        {current + 1} / {images.length}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-dark/60 backdrop-blur-sm border border-white/10
                   flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   hover:bg-dark/80 hover:border-gold/30"
        aria-label="Previous image"
      >
        <svg className="w-4 h-4 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-dark/60 backdrop-blur-sm border border-white/10
                   flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   hover:bg-dark/80 hover:border-gold/30"
        aria-label="Next image"
      >
        <svg className="w-4 h-4 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators (show first 8) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1">
        {images.slice(0, 10).map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-4 h-1.5 bg-gold'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail strip — visible on hover */}
      <div className="absolute bottom-0 left-0 right-0 z-40 flex gap-1 p-2 pt-8 bg-gradient-to-t from-dark/90 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`flex-shrink-0 w-12 h-9 overflow-hidden border transition-colors duration-200
              ${i === current ? 'border-gold' : 'border-transparent hover:border-white/30'}`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          autoFocus
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-cream-muted hover:text-cream z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/20 flex items-center justify-center hover:border-gold text-cream"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img
            src={images[current]}
            alt={`${hotelName} — ${current + 1}`}
            className="max-w-5xl max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/20 flex items-center justify-center hover:border-gold text-cream"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream-muted text-xs tracking-widest">
            {current + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
