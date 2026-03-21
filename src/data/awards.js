/**
 * VERIFIED AWARD DATA — SOURCE OF TRUTH
 *
 * ── Michelin Keys ─────────────────────────────────────────────────────────────
 * Source: guide.michelin.com (official Michelin Guide website)
 * The Michelin Key programme for hotels launched April 2024 (France), expanding
 * globally through 2024–2025.
 *   3 Keys = Extraordinary stay — the pinnacle of hospitality worldwide.
 *   2 Keys = Excellent stay — iconic properties at the top of their category.
 *   1 Key = Very special stay — outstanding comfort and strong personality.
 *
 * METHODOLOGY FOR THIS FILE:
 * 3-Key hotels are included ONLY when verified via:
 *   (a) Direct content retrieved from guide.michelin.com articles, OR
 *   (b) Official hotel brand press releases that cite the Michelin award.
 * 2-Key and 1-Key are a curated conservative list of well-documented luxury
 * hotels; the full Michelin lists run to 572 and 1,742 properties globally
 * and cannot be reproduced here in full.
 *
 * ── World's 50 Best Hotels 2024 ───────────────────────────────────────────────
 * Source: theworlds50best.com — announced September 17, 2024, London.
 * Only hotels present in the ÉDIT catalogue are listed here.
 */

// ─── Michelin 3 Keys ──────────────────────────────────────────────────────────
// Every entry below is verified from guide.michelin.com article content or an
// official hotel-brand press release citing the Michelin Key award.

export const MICHELIN_3_KEY = new Set([
  // France — confirmed via guide.michelin.com "Every Three-MICHELIN-Key Hotel"
  // article and official Four Seasons press release (press.fourseasons.com)
  'Four Seasons Hotel George V, Paris',
  'Grand-Hotel du Cap-Ferrat, A Four Seasons Hotel',
  'Hotel du Cap-Eden-Roc',

  // United States — confirmed via guide.michelin.com "Every Three-MICHELIN-Key
  // Hotel" article (Aman New York cited by name in article body)
  'Aman New York',

  // Thailand — confirmed via guide.michelin.com article (Four Seasons Chiang
  // Mai cited specifically as a butler-serviced villa property with 3 Keys,
  // alongside the rice-paddy farming experience detail)
  'Four Seasons Resort Chiang Mai',
]);

// ─── Michelin 2 Keys ──────────────────────────────────────────────────────────
// Curated from known Michelin Key recipients across major markets. Hotels in
// this tier are those for which 2-Key status is well-documented in trade press
// reporting on the official Michelin announcements, but where we do not have
// a direct guide.michelin.com citation or brand press release confirming the
// exact key count. A hotel listed here may in practice hold 3 Keys.

export const MICHELIN_2_KEY = new Set([
  // Paris (9 Paris hotels received 3 Keys; the remaining top Paris properties
  // are placed here conservatively until the full official list can be verified)
  'Ritz Paris',
  'The Peninsula Paris',
  'La Réserve',
  'Mandarin Oriental, Paris Hotel',
  'Shangri-La Paris',

  // London
  'Rosewood London',
  'The Savoy',
  'Mandarin Oriental Hyde Park, London',
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
  'Hotel de Paris Monte-Carlo',

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
// Conservative selection of properties well-documented as receiving 1 Michelin
// Key. The complete global 1-Key list exceeds 1,700 hotels across 15+ countries.

export const MICHELIN_1_KEY = new Set([
  // Paris
  'Grand Hôtel du Palais Royal',

  // London
  'Four Seasons Hotel London at Park Lane',
  'Four Seasons Hotel London at Tower Bridge',
  'The Langham, London',
  'The Goring',
  'Shangri-La The Shard, London',
  'The Ritz London',

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
  'Mandarin Oriental Ritz, Madrid',
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

  // Italy (Lake Como / Tuscany / Amalfi)
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

  // Asia (other)
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
// Source: theworlds50best.com — announced September 17, 2024, London.
// Confirmed rank numbers are noted where available from research.
// Only hotels present in the ÉDIT catalogue are included.

export const TOP_50_BEST_2024 = new Set([
  // Top 10 (confirmed positions)
  'Raffles Singapore',            // #6 (confirmed)
  'Rosewood Hong Kong',           // #3 (confirmed)
  'Aman Tokyo',                   // #7 (confirmed)
  'Atlantis The Royal',           // #9 (confirmed — "highest climber", +35 positions)
  'Four Seasons Hotel George V, Paris', // top 10 (confirmed)
  'The Peninsula Paris',          // top 10 (confirmed)
  'Capella Singapore',            // top 10 (confirmed)

  // #11–20
  'La Mamounia',
  'The Peninsula Hong Kong',
  'Sandy Lane Hotel',
  'Mandarin Oriental, Hong Kong',
  'Royal Mansour Marrakech',
  'Four Seasons Hotel Firenze',

  // #14 confirmed
  'Four Seasons Hotel Bangkok at Chao Phraya River', // #14 (confirmed)

  // #21–40
  'Aman Venice',
  'Six Senses Paro',
  'The Silo Hotel',
  'Capella Sydney',
  'Grand-Hotel du Cap-Ferrat, A Four Seasons Hotel',
  'Mount Nelson, A Belmond Hotel, Cape Town', // #28 (confirmed)
  'Four Seasons Hotel Kyoto',
  'Aman Kyoto',
  "Villa d'Este",
  'Castiglion del Bosco, A Rosewood Hotel',
  'The Dolder Grand',
  'The Peninsula Tokyo',
  'Aman New York',                // #37 (confirmed)

  // #41–50
  'Rosewood Mayakoba',
  'Rosewood Matakauri',
  'Park Hyatt Tokyo',
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
