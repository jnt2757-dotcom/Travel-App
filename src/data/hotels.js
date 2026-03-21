// ─── Image Pool ───────────────────────────────────────────────────────────────
// 48 verified Unsplash photo IDs for luxury hotel/travel content
const UNSPLASH_BASE = 'https://images.unsplash.com/photo-';
const IMG = (id) => `${UNSPLASH_BASE}${id}?auto=format&fit=crop&w=900&q=80`;

const IMAGE_POOL = [
  // Pools & Water
  IMG('1566073771259-6a8506099945'), IMG('1520250497591-112f2f40a3f4'),
  IMG('1540541338537-d33b47e8c4e8'), IMG('1574691250077-03a929faece5'),
  IMG('1544161515-4be6fd5f2b1b'), IMG('1519913419-68e35b1b5f4c'),
  // Luxury Rooms
  IMG('1551882547-ff40c4a533f0'), IMG('1445019980597-93fa8acb246c'),
  IMG('1578683010236-d716f9a3f461'), IMG('1512918728672-d80f7a33fe23'),
  IMG('1631049307264-da0ec9d70304'), IMG('1616137466211-f939a420be84'),
  IMG('1613553507747-5f8d9ad956f4'), IMG('1611892440504-42a792e24d32'),
  IMG('1554995207-c18c203602cb'), IMG('1560347876-aeef00ee58a1'),
  // Bathrooms & Suites
  IMG('1571896349842-33c89424de2d'), IMG('1552321554-5fefe8c9ef14'),
  IMG('1582719508461-905c673771fd'), IMG('1598928636135-d9168d4d6b17'),
  // Exterior & Architecture
  IMG('1564501049412-61c2a3083791'), IMG('1596436100215-4c81b6e90c97'),
  IMG('1548574688-da2fa84bc5d9'), IMG('1590381105924-c72589b9ef3f'),
  IMG('1559599746-8823b38a4ff7'), IMG('1543968996-ee822b8176ba'),
  IMG('1590490360182-0fda4a66a4de'), IMG('1584132967334-10e028bd69f7'),
  // Fine Dining
  IMG('1414235077428-338989a2e8c0'), IMG('1561501900-3701fa59b6bc'),
  IMG('1424847651672-bf20a4b0982b'), IMG('1466978913421-dad2ebd01d17'),
  IMG('1555396273-367ea4eb4db5'), IMG('1600891964599-d9ae4b7c7f9a'),
  // Spa & Wellness
  IMG('1540555700478-4be290a303fd'), IMG('1529290130-6cf7c5d8a6b6'),
  IMG('1519823551278-64ac92734fb1'), IMG('1544161513-0179fe746fd5'),
  // Beach & Ocean
  IMG('1439130078399-6b5a5f2e62e8'), IMG('1469796466635-455ede6dbbf1'),
  IMG('1507525428034-b723cf961d3e'), IMG('1519046904884-53103b34b206'),
  // Views & Terraces
  IMG('1512917774080-9991f1c4c750'), IMG('1505832182049-8e1f9ac52e94'),
  IMG('1506905925346-21bda4d32df4'), IMG('1458442945022-e5db7a8e19d3'),
  IMG('1542314278228-a9da22b7b5ee'), IMG('1635773054018-d5b14edd5c8c'),
];

// Deterministic pseudo-random number generator
function seededRand(seed) {
  let s = Math.abs(seed) || 1;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function pickImages(hotelId, count = 12) {
  const rand = seededRand(hotelId * 31337);
  const pool = [...IMAGE_POOL];
  const result = [];
  while (result.length < count && pool.length > 0) {
    const idx = Math.floor(rand() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}

// ─── Brands ──────────────────────────────────────────────────────────────────
export const BRANDS = [
  { id: 'aman', name: 'Aman', tier: 1, priceMin: 1500, priceMax: 10000, website: 'https://www.aman.com' },
  { id: 'bulgari', name: 'Bvlgari Hotels', tier: 1, priceMin: 2000, priceMax: 12000, website: 'https://www.bulgarihotels.com' },
  { id: 'cheval-blanc', name: 'Cheval Blanc', tier: 1, priceMin: 2000, priceMax: 15000, website: 'https://www.chevalblanc.com' },
  { id: 'four-seasons', name: 'Four Seasons', tier: 1, priceMin: 600, priceMax: 5000, website: 'https://www.fourseasons.com' },
  { id: 'rosewood', name: 'Rosewood', tier: 1, priceMin: 700, priceMax: 6000, website: 'https://www.rosewoodhotels.com' },
  { id: 'six-senses', name: 'Six Senses', tier: 1, priceMin: 500, priceMax: 4500, website: 'https://www.sixsenses.com' },
  { id: 'peninsula', name: 'The Peninsula', tier: 1, priceMin: 600, priceMax: 5500, website: 'https://www.peninsula.com' },
  { id: 'oetker', name: 'Oetker Collection', tier: 1, priceMin: 800, priceMax: 8000, website: 'https://www.oetkercollection.com' },
  { id: 'belmond', name: 'Belmond', tier: 1, priceMin: 500, priceMax: 5000, website: 'https://www.belmond.com' },
  { id: 'como', name: 'COMO Hotels', tier: 1, priceMin: 400, priceMax: 4000, website: 'https://www.comohotels.com' },
  { id: 'mandarin-oriental', name: 'Mandarin Oriental', tier: 2, priceMin: 400, priceMax: 4000, website: 'https://www.mandarinoriental.com' },
  { id: 'raffles', name: 'Raffles', tier: 2, priceMin: 400, priceMax: 3500, website: 'https://www.raffles.com' },
  { id: 'ritz-carlton', name: 'The Ritz-Carlton', tier: 2, priceMin: 400, priceMax: 4000, website: 'https://www.ritzcarlton.com' },
  { id: 'st-regis', name: 'St. Regis', tier: 2, priceMin: 400, priceMax: 3500, website: 'https://www.marriott.com/en-us/hotel-search/find-hotels/hotel-overview.mi?brandCode=XR' },
  { id: 'waldorf-astoria', name: 'Waldorf Astoria', tier: 2, priceMin: 400, priceMax: 3500, website: 'https://www.waldorfastoria.com' },
  { id: 'park-hyatt', name: 'Park Hyatt', tier: 2, priceMin: 350, priceMax: 2500, website: 'https://www.hyatt.com/brands/park-hyatt' },
  { id: 'auberge', name: 'Auberge Resorts', tier: 2, priceMin: 400, priceMax: 3000, website: 'https://aubergeresorts.com' },
  { id: 'capella', name: 'Capella Hotels', tier: 2, priceMin: 500, priceMax: 3500, website: 'https://www.capellahotels.com' },
  { id: 'banyan-tree', name: 'Banyan Tree', tier: 2, priceMin: 300, priceMax: 2500, website: 'https://www.banyantree.com' },
  { id: 'edition', name: 'EDITION Hotels', tier: 2, priceMin: 300, priceMax: 2000, website: 'https://www.editionhotels.com' },
];

// ─── Destinations ─────────────────────────────────────────────────────────────
const DESTINATIONS = [
  // Europe
  { city: 'Paris', country: 'France', region: 'Europe', type: 'city' },
  { city: 'London', country: 'United Kingdom', region: 'Europe', type: 'city' },
  { city: 'Rome', country: 'Italy', region: 'Europe', type: 'city' },
  { city: 'Venice', country: 'Italy', region: 'Europe', type: 'city' },
  { city: 'Florence', country: 'Italy', region: 'Europe', type: 'city' },
  { city: 'Milan', country: 'Italy', region: 'Europe', type: 'city' },
  { city: 'Madrid', country: 'Spain', region: 'Europe', type: 'city' },
  { city: 'Barcelona', country: 'Spain', region: 'Europe', type: 'city' },
  { city: 'Lisbon', country: 'Portugal', region: 'Europe', type: 'city' },
  { city: 'Vienna', country: 'Austria', region: 'Europe', type: 'city' },
  { city: 'Prague', country: 'Czech Republic', region: 'Europe', type: 'city' },
  { city: 'Amsterdam', country: 'Netherlands', region: 'Europe', type: 'city' },
  { city: 'Zurich', country: 'Switzerland', region: 'Europe', type: 'city' },
  { city: 'Geneva', country: 'Switzerland', region: 'Europe', type: 'city' },
  { city: 'Monaco', country: 'Monaco', region: 'Europe', type: 'city' },
  { city: 'Santorini', country: 'Greece', region: 'Europe', type: 'island' },
  { city: 'Mykonos', country: 'Greece', region: 'Europe', type: 'island' },
  { city: 'Athens', country: 'Greece', region: 'Europe', type: 'city' },
  { city: 'Dubrovnik', country: 'Croatia', region: 'Europe', type: 'coastal' },
  { city: 'Amalfi Coast', country: 'Italy', region: 'Europe', type: 'coastal' },
  { city: 'Capri', country: 'Italy', region: 'Europe', type: 'island' },
  { city: 'Lake Como', country: 'Italy', region: 'Europe', type: 'lake' },
  { city: 'Tuscany', country: 'Italy', region: 'Europe', type: 'countryside' },
  { city: 'Côte d\'Azur', country: 'France', region: 'Europe', type: 'coastal' },
  { city: 'Porto', country: 'Portugal', region: 'Europe', type: 'city' },
  { city: 'Edinburgh', country: 'United Kingdom', region: 'Europe', type: 'city' },
  { city: 'Budapest', country: 'Hungary', region: 'Europe', type: 'city' },
  { city: 'Copenhagen', country: 'Denmark', region: 'Europe', type: 'city' },
  { city: 'Stockholm', country: 'Sweden', region: 'Europe', type: 'city' },
  { city: 'Brussels', country: 'Belgium', region: 'Europe', type: 'city' },
  { city: 'Salzburg', country: 'Austria', region: 'Europe', type: 'city' },
  // Asia
  { city: 'Tokyo', country: 'Japan', region: 'Asia', type: 'city' },
  { city: 'Kyoto', country: 'Japan', region: 'Asia', type: 'city' },
  { city: 'Osaka', country: 'Japan', region: 'Asia', type: 'city' },
  { city: 'Bangkok', country: 'Thailand', region: 'Asia', type: 'city' },
  { city: 'Bali', country: 'Indonesia', region: 'Asia', type: 'island' },
  { city: 'Phuket', country: 'Thailand', region: 'Asia', type: 'island' },
  { city: 'Maldives', country: 'Maldives', region: 'Asia', type: 'island' },
  { city: 'Singapore', country: 'Singapore', region: 'Asia', type: 'city' },
  { city: 'Hong Kong', country: 'China', region: 'Asia', type: 'city' },
  { city: 'Shanghai', country: 'China', region: 'Asia', type: 'city' },
  { city: 'Beijing', country: 'China', region: 'Asia', type: 'city' },
  { city: 'Mumbai', country: 'India', region: 'Asia', type: 'city' },
  { city: 'Udaipur', country: 'India', region: 'Asia', type: 'city' },
  { city: 'Jaipur', country: 'India', region: 'Asia', type: 'city' },
  { city: 'New Delhi', country: 'India', region: 'Asia', type: 'city' },
  { city: 'Colombo', country: 'Sri Lanka', region: 'Asia', type: 'city' },
  { city: 'Paro', country: 'Bhutan', region: 'Asia', type: 'mountain' },
  { city: 'Hoi An', country: 'Vietnam', region: 'Asia', type: 'city' },
  { city: 'Hanoi', country: 'Vietnam', region: 'Asia', type: 'city' },
  { city: 'Siem Reap', country: 'Cambodia', region: 'Asia', type: 'cultural' },
  { city: 'Langkawi', country: 'Malaysia', region: 'Asia', type: 'island' },
  { city: 'Seoul', country: 'South Korea', region: 'Asia', type: 'city' },
  { city: 'Chiang Mai', country: 'Thailand', region: 'Asia', type: 'city' },
  { city: 'Koh Samui', country: 'Thailand', region: 'Asia', type: 'island' },
  { city: 'Lombok', country: 'Indonesia', region: 'Asia', type: 'island' },
  { city: 'Nusa Dua', country: 'Indonesia', region: 'Asia', type: 'coastal' },
  // Americas
  { city: 'New York', country: 'United States', region: 'Americas', type: 'city' },
  { city: 'Miami', country: 'United States', region: 'Americas', type: 'coastal' },
  { city: 'Los Angeles', country: 'United States', region: 'Americas', type: 'city' },
  { city: 'San Francisco', country: 'United States', region: 'Americas', type: 'city' },
  { city: 'Chicago', country: 'United States', region: 'Americas', type: 'city' },
  { city: 'Washington D.C.', country: 'United States', region: 'Americas', type: 'city' },
  { city: 'Aspen', country: 'United States', region: 'Americas', type: 'mountain' },
  { city: 'Jackson Hole', country: 'United States', region: 'Americas', type: 'mountain' },
  { city: 'Maui', country: 'United States', region: 'Americas', type: 'island' },
  { city: 'Kauai', country: 'United States', region: 'Americas', type: 'island' },
  { city: 'Turks & Caicos', country: 'Turks & Caicos', region: 'Americas', type: 'island' },
  { city: 'St. Barts', country: 'France', region: 'Americas', type: 'island' },
  { city: 'Anguilla', country: 'Anguilla', region: 'Americas', type: 'island' },
  { city: 'Barbados', country: 'Barbados', region: 'Americas', type: 'island' },
  { city: 'Los Cabos', country: 'Mexico', region: 'Americas', type: 'coastal' },
  { city: 'Mexico City', country: 'Mexico', region: 'Americas', type: 'city' },
  { city: 'Tulum', country: 'Mexico', region: 'Americas', type: 'coastal' },
  { city: 'Punta Mita', country: 'Mexico', region: 'Americas', type: 'coastal' },
  { city: 'Riviera Maya', country: 'Mexico', region: 'Americas', type: 'coastal' },
  { city: 'Buenos Aires', country: 'Argentina', region: 'Americas', type: 'city' },
  { city: 'Rio de Janeiro', country: 'Brazil', region: 'Americas', type: 'coastal' },
  { city: 'Lima', country: 'Peru', region: 'Americas', type: 'city' },
  { city: 'Cartagena', country: 'Colombia', region: 'Americas', type: 'coastal' },
  { city: 'Patagonia', country: 'Chile', region: 'Americas', type: 'wilderness' },
  // Middle East
  { city: 'Dubai', country: 'UAE', region: 'Middle East', type: 'city' },
  { city: 'Abu Dhabi', country: 'UAE', region: 'Middle East', type: 'city' },
  { city: 'Doha', country: 'Qatar', region: 'Middle East', type: 'city' },
  { city: 'Muscat', country: 'Oman', region: 'Middle East', type: 'city' },
  { city: 'Amman', country: 'Jordan', region: 'Middle East', type: 'city' },
  // Africa
  { city: 'Marrakech', country: 'Morocco', region: 'Africa', type: 'city' },
  { city: 'Cape Town', country: 'South Africa', region: 'Africa', type: 'coastal' },
  { city: 'Serengeti', country: 'Tanzania', region: 'Africa', type: 'wilderness' },
  { city: 'Masai Mara', country: 'Kenya', region: 'Africa', type: 'wilderness' },
  { city: 'Zanzibar', country: 'Tanzania', region: 'Africa', type: 'island' },
  { city: 'Nairobi', country: 'Kenya', region: 'Africa', type: 'city' },
  // Oceania
  { city: 'Sydney', country: 'Australia', region: 'Oceania', type: 'city' },
  { city: 'Melbourne', country: 'Australia', region: 'Oceania', type: 'city' },
  { city: 'Queenstown', country: 'New Zealand', region: 'Oceania', type: 'mountain' },
  { city: 'Fiji', country: 'Fiji', region: 'Oceania', type: 'island' },
  { city: 'Bora Bora', country: 'French Polynesia', region: 'Oceania', type: 'island' },
];

// ─── Distinctions ─────────────────────────────────────────────────────────────
export const DISTINCTIONS_META = {
  'michelin-3-key': { label: '3 Michelin Keys', short: '⚿⚿⚿', color: 'text-gold border-gold/50 bg-gold/10', icon: '🗝️🗝️🗝️' },
  'michelin-2-key': { label: '2 Michelin Keys', short: '⚿⚿', color: 'text-gold border-gold/40 bg-gold/8', icon: '🗝️🗝️' },
  'michelin-1-key': { label: '1 Michelin Key', short: '⚿', color: 'text-gold-light border-gold/30 bg-gold/5', icon: '🗝️' },
  'forbes-5-star': { label: 'Forbes 5-Star', short: 'Forbes ★★★★★', color: 'text-amber-700 border-amber-700/30 bg-amber-700/10', icon: '⭐' },
  'top-50-global': { label: "World's 50 Best Hotels", short: 'Top 50 Global', color: 'text-blue-800 border-blue-800/30 bg-blue-800/10', icon: '🏆' },
  'conde-nast-gold': { label: 'Condé Nast Gold List', short: 'CN Gold List', color: 'text-yellow-800 border-yellow-800/30 bg-yellow-800/10', icon: '⬥' },
  'travel-leisure-top100': { label: 'T+L Top 100', short: 'T+L Top 100', color: 'text-stone-600 border-stone-600/30 bg-stone-600/10', icon: '✦' },
  'leading-hotels': { label: 'Leading Hotels of the World', short: 'LHW Member', color: 'text-purple-800 border-purple-800/30 bg-purple-800/10', icon: '◆' },
  'relais-chateaux': { label: 'Relais & Châteaux', short: 'R&C', color: 'text-rose-800 border-rose-800/30 bg-rose-800/10', icon: '⬡' },
  'small-luxury': { label: 'Small Luxury Hotels', short: 'SLH', color: 'text-slate-600 border-slate-600/30 bg-slate-600/10', icon: '◇' },
};

function generateDistinctions(brand, dest, rand) {
  const result = [];
  const r = rand();
  const r2 = rand();
  const r3 = rand();
  const r4 = rand();
  const r5 = rand();
  const r6 = rand();

  // Michelin Keys (not all hotels have them)
  if (r < 0.12) result.push('michelin-3-key');
  else if (r < 0.32) result.push('michelin-2-key');
  else if (r < 0.62) result.push('michelin-1-key');

  // Forbes 5-Star - ultra-luxury brands more likely
  if (brand.tier === 1 ? r2 < 0.75 : r2 < 0.45) result.push('forbes-5-star');

  // World's 50 Best Hotels - rare
  if (r3 < 0.08) result.push('top-50-global');

  // Condé Nast Gold List
  if (brand.tier === 1 ? r4 < 0.55 : r4 < 0.3) result.push('conde-nast-gold');

  // Travel + Leisure Top 100
  if (r5 < 0.22) result.push('travel-leisure-top100');

  // Leading Hotels of the World / Relais & Chateaux / SLH (mutually exclusive-ish)
  if (r6 < 0.25) result.push('leading-hotels');
  else if (r6 < 0.40) result.push('relais-chateaux');
  else if (r6 < 0.55) result.push('small-luxury');

  return result;
}

function generateAmenities(brand, dest) {
  const base = ['Concierge', 'Room Service', 'Valet Parking', 'Fitness Center'];
  const extras = [];

  if (['island', 'coastal', 'lake'].includes(dest.type)) extras.push('Private Beach', 'Water Sports');
  if (['mountain', 'wilderness'].includes(dest.type)) extras.push('Ski-In/Ski-Out', 'Nature Excursions');
  if (brand.tier === 1) extras.push('Butler Service', 'Private Pool', 'Helicopter Transfers');

  extras.push('Infinity Pool', 'Full-Service Spa', 'Fine Dining Restaurant', 'Bar & Lounge', 'Meeting Rooms');
  return [...new Set([...base, ...extras])].slice(0, 8);
}

const HOTEL_NAME_FORMATS = {
  'aman': (dest) => `Aman ${dest.city}`,
  'bulgari': (dest) => `Bvlgari ${dest.type === 'island' || dest.type === 'coastal' ? 'Resort' : 'Hotel'} ${dest.city}`,
  'cheval-blanc': (dest) => `Cheval Blanc ${dest.city}`,
  'four-seasons': (dest) => `Four Seasons ${dest.type === 'island' || dest.type === 'coastal' || dest.type === 'mountain' ? 'Resort' : 'Hotel'} ${dest.city}`,
  'rosewood': (dest) => `Rosewood ${dest.city}`,
  'six-senses': (dest) => `Six Senses ${dest.city}`,
  'peninsula': (dest) => `The Peninsula ${dest.city}`,
  'oetker': (dest) => `${dest.city} Palace`,
  'belmond': (dest) => `Belmond ${dest.city}`,
  'como': (dest) => `COMO ${dest.city}`,
  'mandarin-oriental': (dest) => `Mandarin Oriental ${dest.city}`,
  'raffles': (dest) => `Raffles Hotel ${dest.city}`,
  'ritz-carlton': (dest) => `The Ritz-Carlton ${dest.city}`,
  'st-regis': (dest) => `The St. Regis ${dest.city}`,
  'waldorf-astoria': (dest) => `Waldorf Astoria ${dest.city}`,
  'park-hyatt': (dest) => `Park Hyatt ${dest.city}`,
  'auberge': (dest) => `${dest.city} by Auberge`,
  'capella': (dest) => `Capella ${dest.city}`,
  'banyan-tree': (dest) => `Banyan Tree ${dest.city}`,
  'edition': (dest) => `${dest.city} EDITION`,
};

const DESCRIPTIONS = [
  (name, city, country) => `An extraordinary sanctuary of refined elegance, ${name} redefines the very concept of luxury in the heart of ${city}, ${country}. Each space is conceived to evoke a profound sense of place, where world-class service meets architectural brilliance.`,
  (name, city, country) => `Set against the breathtaking backdrop of ${city}, ${name} is a masterpiece of contemporary luxury. Guests are immersed in an atmosphere of understated opulence, where every detail has been crafted to create moments of genuine wonder.`,
  (name, city, country) => `Nestled within ${city}'s most coveted address, ${name} offers a rare combination of intimacy and grandeur. With personalised service elevated to an art form, this ${country} jewel has long been the preferred retreat for discerning global travellers.`,
  (name, city, country) => `${name} stands as a timeless testament to the art of hospitality in ${city}, ${country}. From the soaring spaces of its public areas to the serene privacy of its suites, every corner speaks of meticulous craftsmanship and effortless grace.`,
  (name, city, country) => `A place where the extraordinary becomes ordinary, ${name} occupies a position of singular prestige in ${city}. Drawing inspiration from ${country}'s rich cultural heritage while embracing the finest contemporary design, it offers an experience without parallel.`,
];

// ─── Generator ───────────────────────────────────────────────────────────────
function generateHotels() {
  const hotels = [];
  let id = 1;

  // Brand → destination count allocation (total ≈ 500)
  const brandAllocations = {
    'aman': 32, 'bulgari': 8, 'cheval-blanc': 6, 'four-seasons': 45,
    'rosewood': 34, 'six-senses': 28, 'peninsula': 14, 'oetker': 10,
    'belmond': 32, 'como': 18, 'mandarin-oriental': 38, 'raffles': 22,
    'ritz-carlton': 42, 'st-regis': 38, 'waldorf-astoria': 28, 'park-hyatt': 40,
    'auberge': 22, 'capella': 14, 'banyan-tree': 24, 'edition': 22,
  };

  for (const brand of BRANDS) {
    const count = brandAllocations[brand.id] || 20;
    const brandRand = seededRand(brand.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0));

    // Shuffle destinations for this brand
    const shuffled = [...DESTINATIONS].sort(() => brandRand() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, DESTINATIONS.length));

    for (const dest of selected) {
      const rand = seededRand(id * 9973 + brand.id.charCodeAt(0) * 131);
      const price = Math.round((brand.priceMin + rand() * (brand.priceMax - brand.priceMin)) / 50) * 50;
      const rating = parseFloat((4.4 + rand() * 0.6).toFixed(1));
      const name = HOTEL_NAME_FORMATS[brand.id]?.(dest) || `${brand.name} ${dest.city}`;
      const descFn = DESCRIPTIONS[Math.floor(rand() * DESCRIPTIONS.length)];

      hotels.push({
        id,
        name,
        brand: brand.name,
        brandId: brand.id,
        city: dest.city,
        country: dest.country,
        region: dest.region,
        locationType: dest.type,
        price,
        rating,
        reviewCount: Math.round(80 + rand() * 2400),
        distinctions: generateDistinctions(brand, dest, rand),
        images: pickImages(id),
        description: descFn(name, dest.city, dest.country),
        amenities: generateAmenities(brand, dest),
        officialUrl: brand.website,
      });

      id++;
      if (id > 500) break;
    }
    if (id > 500) break;
  }

  return hotels;
}

export const hotels = generateHotels();
export const ALL_REGIONS = [...new Set(hotels.map((h) => h.region))].sort();
export const ALL_BRANDS = BRANDS.map((b) => ({ id: b.id, name: b.name }));
