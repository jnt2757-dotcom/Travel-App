export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-dark-border">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-gold/60 flex items-center justify-center">
            <span className="font-serif italic text-gold text-lg leading-none">A</span>
          </div>
          <div>
            <span className="font-serif text-cream text-xl tracking-[0.2em] uppercase">Aurum</span>
          </div>
        </div>

        {/* Tagline — hidden on mobile */}
        <p className="hidden md:block text-cream-muted text-xs tracking-[0.25em] uppercase font-light">
          500 Curated Luxury Properties &middot; One Seamless Experience
        </p>

        {/* Right nav */}
        <nav className="flex items-center gap-6">
          <a
            href="#"
            className="text-cream-muted text-xs tracking-widest uppercase hover:text-cream transition-colors duration-300 hidden sm:block"
          >
            Collections
          </a>
          <a
            href="#"
            className="text-cream-muted text-xs tracking-widest uppercase hover:text-cream transition-colors duration-300 hidden sm:block"
          >
            About
          </a>
          <button className="btn-gold-outline text-[10px] py-2 px-4">
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
}
