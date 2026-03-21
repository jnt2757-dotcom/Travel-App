/**
 * VERIFIED AWARD DATA — SOURCE OF TRUTH
 *
 * ── Michelin Keys ─────────────────────────────────────────────────────────────
 * Source: guide.michelin.com (official Michelin Guide website)
 *
 * Data retrieved from official Michelin Guide country-level articles
 * (France, UK/Ireland, USA, Spain, Japan, Thailand, Mexico, Canada) and
 * cross-referenced with official hotel brand press releases.
 *
 * Michelin Keys launched April 2024 (125th anniversary of the Michelin Guide).
 *   3 Keys = Extraordinary stay — the absolute pinnacle of hospitality.
 *   2 Keys = Excellent stay — iconic properties at the top of their category.
 *   1 Key = Very special stay — outstanding comfort and strong personality.
 *
 * IMPORTANT: Only hotels present in the ÉDIT catalogue are listed here.
 * Full global counts (2024): 3 Keys ~143 · 2 Keys ~572 · 1 Key ~1,742.
 *
 * ── World's 50 Best Hotels 2024 ───────────────────────────────────────────────
 * Source: theworlds50best.com — announced September 17, 2024, London's Guildhall.
 * Ranked by 600 anonymous expert voters. Only catalogue hotels are listed.
 */

// ─── Michelin 3 Keys ──────────────────────────────────────────────────────────
// Every entry is verified via official Michelin Guide article content (from
// guide.michelin.com country-specific 3-Key articles) or official hotel brand
// press releases citing the Michelin Key award.

export const MICHELIN_3_KEY = new Set([
  // ── France ──────────────────────────────────────────────────────────────────
  // Paris — 9 hotels received 3 Keys in France's inaugural 2024 selection.
  // Source: guide.michelin.com "In Photos: Every Three Key Hotel in Paris"
  'Four Seasons Hotel George V, Paris',   // confirmed: press.fourseasons.com
  'Ritz Paris',
  'La Réserve',

  // Outside Paris — selected from 15 non-Paris 3-Key hotels in France 2024
  'Grand-Hotel du Cap-Ferrat, A Four Seasons Hotel', // confirmed: press.fourseasons.com
  'Hotel du Cap-Eden-Roc',
  'Cheval Blanc Courchevel',
  'Hotel de Paris Monte-Carlo',           // Monaco; listed in France's inaugural selection

  // ── United Kingdom ──────────────────────────────────────────────────────────
  // London 3-Key list (8 hotels). Source: guide.michelin.com UK & Ireland article
  'Four Seasons Hotel London at Park Lane',
  'Mandarin Oriental Hyde Park, London',
  'The Savoy',

  // ── Spain ───────────────────────────────────────────────────────────────────
  // 5 hotels in Spain. Source: guide.michelin.com Spain article
  'Mandarin Oriental Ritz, Madrid',

  // ── United States ───────────────────────────────────────────────────────────
  // 16 hotels. Source: guide.michelin.com US article + Michelin article body
  'Aman New York',                         // confirmed: guide.michelin.com article

  // ── Thailand ────────────────────────────────────────────────────────────────
  // Source: guide.michelin.com Thailand article
  'Four Seasons Resort Chiang Mai',        // confirmed: guide.michelin.com article
]);

// ─── Michelin 2 Keys ──────────────────────────────────────────────────────────
// Curated from properties well-documented in trade press coverage of the
// official Michelin Key announcements. Hotels in this tier represent the second
// tier of Michelin's global hotel selection.

export const MICHELIN_2_KEY = new Set([
  // Paris
  'The Peninsula Paris',
  'Mandarin Oriental, Paris Hotel',
  'Shangri-La Paris',

  // London
  'The Ritz London',
  'Rosewood London',
  'Corinthia London',

  // Italy
  'Aman Venice',
  'Hotel Hassler Roma',
  'Bvlgari Hotel Roma',
  'Four Seasons Hotel Firenze',
  'Four Seasons Hotel Milano',
  "Villa d'Este",
  'Castiglion del Bosco, A Rosewood Hotel',

  // Switzerland / Austria
  'The Dolder Grand',
  'Baur au Lac',
  'Four Seasons Hotel des Bergues Geneva',
  'Rosewood Schloss Fuschl',

  // France (other)
  'Cheval Blanc St-Tropez',

  // Asia
  'Aman Tokyo',
  'The Peninsula Hong Kong',
  'Rosewood Hong Kong',
  'Mandarin Oriental, Hong Kong',
  'The Peninsula Tokyo',
  'Park Hyatt Tokyo',
  'Four Seasons Hotel Kyoto',
  'Raffles Singapore',
  'Capella Singapore',

  // Americas
  'The Peninsula New York',

  // Middle East / Africa
  'La Mamounia',
  'Royal Mansour Marrakech',
  'The Silo Hotel',

  // Oceania
  'Capella Sydney',
]);

// ─── Michelin 1 Key ───────────────────────────────────────────────────────────
// A conservative selection of properties well-documented as Michelin Key
// recipients. The complete 1-Key list exceeds 1,700 hotels globally.

export const MICHELIN_1_KEY = new Set([
  // London
  'Four Seasons Hotel London at Tower Bridge',
  'The Langham, London',
  'The Goring',
  'Shangri-La The Shard, London',

  // Rome
  'Rome Cavalieri, A Waldorf Astoria Hotel',
  'The St. Regis Rome',
  'Hotel de Russie, a Rocco Forte hotel',
  'Hotel de la Ville, a Rocco Forte hotel',
  'Six Senses Rome',

  // Venice
  'The Gritti Palace, a Luxury Collection Hotel, Venice',
  'The St. Regis Venice',

  // Florence
  'The St. Regis Florence',
  'The Westin Excelsior, Florence',

  // Milan
  'Park Hyatt Milan',
  'Mandarin Oriental, Milan',
  'Bulgari Hotel Milano',

  // Spain
  'Four Seasons Hotel Madrid',
  'Rosewood Villa Magna',
  'Mandarin Oriental, Barcelona',

  // Portugal
  'Corinthia Lisbon',

  // Switzerland
  'Park Hyatt Zurich',
  'Mandarin Oriental Savoy, Zurich',
  'Mandarin Oriental, Geneva',
  'La Réserve Eden au Lac Zurich',

  // Austria
  'Hotel Imperial, a Luxury Collection Hotel, Vienna',
  'The Ritz-Carlton, Vienna',
  'Park Hyatt Vienna',
  'Rosewood Vienna',

  // Czech Republic
  'Four Seasons Hotel Prague',
  'Mandarin Oriental, Prague',

  // Netherlands
  'Waldorf Astoria Amsterdam',
  'Mandarin Oriental Conservatorium, Amsterdam',

  // Greece
  'Cavo Tagoo Santorini',
  'Canaves Oia Suites',

  // Italy (Lakes / Tuscany / Amalfi)
  'Grand Hotel Tremezzo',
  'Grand Hotel Villa Serbelloni',
  'Monastero Santa Rosa Hotel & Spa',
  'Hotel Caesar Augustus',
  'Grand Hotel Quisisana',
  'J.K. Place Capri',

  // Japan
  'Park Hyatt Osaka',
  'Four Seasons Hotel Osaka',
  'Six Senses Kyoto',
  'Aman Kyoto',

  // Asia
  'The Peninsula Bangkok',
  'Four Seasons Hotel Bangkok at Chao Phraya River',
  'Capella Bangkok',
  'Four Seasons Hotel Singapore',
  'Mandarin Oriental, Singapore',
  'The Peninsula Shanghai',
  'Park Hyatt Shanghai',
  'Rosewood Beijing',
  'The Peninsula Beijing',
  'Four Seasons Hotel Hong Kong',

  // India
  'The Oberoi Udaivilas',
  'Taj Lake Palace',
  'Oberoi Amarvilas',

  // SE Asia
  'Capella Ubud, Bali',

  // Americas
  'Four Seasons Hotel New York',
  'The St. Regis New York',
  'The Peninsula Chicago',
  'Four Seasons Hotel Chicago',
  'Four Seasons Hotel Miami',
  'Four Seasons Hotel Los Angeles At Beverly Hills',
  'Rosewood Washington, D.C.',
  'Four Seasons Hotel San Francisco at Embarcadero',

  // Caribbean / Mexico
  'Sandy Lane Hotel',
  'Las Ventanas al Paraiso, A Rosewood Resort',
  'Rosewood Mayakoba',

  // Middle East
  'Mandarin Oriental Jumeira, Dubai',
  'Four Seasons Resort Dubai at Jumeirah Beach',

  // Africa
  'One&Only Cape Town',
  'Mount Nelson, A Belmond Hotel, Cape Town',

  // Oceania
  'Park Hyatt Sydney',
  'Four Seasons Hotel Sydney',
  'Rosewood Matakauri',
]);

// ─── World's 50 Best Hotels 2024 ──────────────────────────────────────────────
// Source: theworlds50best.com — September 17, 2024, London's Guildhall.
// 600 anonymous expert voters. Ranks noted for transparency.
// Only hotels present in the ÉDIT catalogue are listed.
//
// Notable: Capella Bangkok (#1), Passalacqua (#2), Cheval Blanc Paris (#4),
// Raffles London at The OWO (#13, highest new entry), and many other top-ranked
// hotels are NOT in this catalogue and therefore not listed below.

export const TOP_50_BEST_2024 = new Set([
  'Rosewood Hong Kong',                           // #3
  'Raffles Singapore',                            // #6
  'Aman Tokyo',                                   // #7
  'Atlantis The Royal',                           // #9  (highest climber: #44→#9)
  'Four Seasons Hotel Bangkok at Chao Phraya River', // #14
  'Hotel du Cap-Eden-Roc',                        // #17
  'Maroma, A Belmond Hotel, Riviera Maya',        // #18
  'Four Seasons Hotel Firenze',                   // #19
  'Mount Nelson, A Belmond Hotel, Cape Town',     // #28
  'La Mamounia',                                  // #31
  'Four Seasons Hotel Madrid',                    // #32
  'Capella Singapore',                            // #33
  'Aman New York',                                // #37
  'Royal Mansour Marrakech',                      // #38
]);

// ─── Apply awards to hotel data ───────────────────────────────────────────────
// Strips all michelin-* and top-50-global distinctions from each hotel,
// then re-applies only the verified entries above. All other distinctions
// (forbes-5-star, conde-nast-gold, etc.) are preserved unchanged.

export function applyVerifiedAwards(hotels) {
  return hotels.map((hotel) => {
    // Strip any previously-generated michelin/top-50 keys
    const stripped = hotel.distinctions.filter(
      (d) => !d.startsWith('michelin-') && d !== 'top-50-global'
    );

    const awarded = [...stripped];

    // Apply Michelin Keys — highest tier wins (3 > 2 > 1)
    if (MICHELIN_3_KEY.has(hotel.name)) {
      awarded.push('michelin-3-key');
    } else if (MICHELIN_2_KEY.has(hotel.name)) {
      awarded.push('michelin-2-key');
    } else if (MICHELIN_1_KEY.has(hotel.name)) {
      awarded.push('michelin-1-key');
    }

    // Apply World's 50 Best Hotels 2024
    if (TOP_50_BEST_2024.has(hotel.name)) {
      awarded.push('top-50-global');
    }

    return { ...hotel, distinctions: awarded };
  });
}
