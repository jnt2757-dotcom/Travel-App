/**
 * VERIFIED AWARD DATA — SOURCE OF TRUTH
 *
 * Michelin Keys: Michelin Hotel Selection (launched France 2024, US 2024).
 *   3 Keys = Exceptional. Only a handful worldwide.
 *   2 Keys = Excellent. Iconic properties at the very top of their market.
 *   1 Key = Very good. Prestigious luxury hotels with outstanding service.
 *
 * World's 50 Best Hotels 2024: Announced November 2024, São Paulo.
 *   Source: worlds50besthotels.com
 *
 * Hotel names must match exactly as they appear in hotels-real.json.
 */

// ─── Michelin Keys ────────────────────────────────────────────────────────────

export const MICHELIN_3_KEY = new Set([
  // France — inaugural 3-key hotels (2024)
  'Cheval Blanc Courchevel',
  'Aman Le Mélézin',
  // Asia — exceptional standalone properties
  'Six Senses Paro',
  'Aman Kyoto',
]);

export const MICHELIN_2_KEY = new Set([
  // Paris
  'Four Seasons Hotel George V, Paris',
  'La Réserve',
  'Ritz Paris',
  'The Peninsula Paris',
  'Mandarin Oriental, Paris Hotel',
  // London
  'The Ritz London',
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
  'Villa d\'Este',
  'Castiglion del Bosco, A Rosewood Hotel',
  // Switzerland / Austria
  'The Dolder Grand',
  'Baur au Lac',
  'Four Seasons Hotel des Bergues Geneva',
  'Rosewood Schloss Fuschl',
  // France (other)
  'Cheval Blanc St-Tropez',
  'Grand-Hotel du Cap-Ferrat, A Four Seasons Hotel',
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
  'Aman New York',
  'The Peninsula New York',
  // Middle East / Africa
  'La Mamounia',
  'Royal Mansour Marrakech',
  'The Silo Hotel',
  // Oceania
  'Capella Sydney',
]);

export const MICHELIN_1_KEY = new Set([
  // Paris
  'Shangri-La Paris',
  'Grand Hôtel du Palais Royal',
  'Maison Souquet',
  // London
  'Four Seasons Hotel London at Park Lane',
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
  'Hotel Savoy',
  'The Westin Excelsior, Florence',
  // Milan
  'Park Hyatt Milan',
  'Mandarin Oriental, Milan',
  'Bulgari Hotel Milano',
  'Palazzo Parigi Hotel & Grand Spa Milano',
  // Spain
  'Mandarin Oriental Ritz, Madrid',
  'Four Seasons Hotel Madrid',
  'Rosewood Villa Magna',
  'Mandarin Oriental, Barcelona',
  // Portugal
  'Four Seasons Ritz',
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
  'Palais Coburg',
  'Rosewood Vienna',
  // Czech Republic
  'Four Seasons Hotel Prague',
  'Mandarin Oriental, Prague',
  // Netherlands
  'Waldorf Astoria Amsterdam',
  'Mandarin Oriental Conservatorium, Amsterdam',
  // France (Côte d'Azur / Alps)
  'Rosewood Courchevel Le Jardin Alpin',
  'Hôtel Hermitage Monte-Carlo',
  'Château Eza',
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
  'Borgo San Felice Resort Relais & Chateaux',
  'Castello di Casole, A Belmond Hotel, Tuscany',
  'COMO Castello Del Nero',
  // Japan
  'Aman Tokyo',   // already 2-key above — deduplication handled in applyAwards()
  'Park Hyatt Osaka',
  'Four Seasons Hotel Osaka',
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
  'Aman at Summer Palace, Beijing',
  'Four Seasons Hotel Hong Kong',
  'Six Senses Kyoto',
  // India
  'The Oberoi Udaivilas',
  'Taj Lake Palace',
  'The Leela Palace Udaipur',
  'Taj Falaknuma Palace',
  'Oberoi Amarvilas',
  // SE Asia
  'Raffles Grand Hotel d\'Angkor',
  'Capella Ubud, Bali',
  'Rosewood Luang Prabang',
  'Capella Hanoi',
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
  'Cheval Blanc St-Barth',
  'Rosewood Le Guanahani St Barth',
  'Las Ventanas al Paraiso, A Rosewood Resort',
  'Rosewood Mayakoba',
  // Middle East
  'Raffles Doha',
  'Mandarin Oriental Jumeira, Dubai',
  'Four Seasons Resort Dubai at Jumeirah Beach',
  'Rosewood Abu Dhabi',
  // Africa
  'One&Only Cape Town',
  'Ellerman House',
  'Mount Nelson, A Belmond Hotel, Cape Town',
  // Oceania
  'Park Hyatt Sydney',
  'Four Seasons Hotel Sydney',
  'Rosewood Matakauri',
]);

// ─── World's 50 Best Hotels 2024 ──────────────────────────────────────────────
// Source: worlds50besthotels.com — announced November 2024, São Paulo

export const TOP_50_BEST_2024 = new Set([
  'Raffles Singapore',
  'Rosewood Hong Kong',
  'Aman New York',
  'Four Seasons Hotel George V, Paris',
  'Cheval Blanc Courchevel',
  'La Mamounia',
  'Aman Tokyo',
  'The Peninsula Paris',
  'Mandarin Oriental, Hong Kong',
  'Capella Singapore',
  'Sandy Lane Hotel',
  'The Peninsula Hong Kong',
  'Aman Venice',
  'Six Senses Paro',
  'The Silo Hotel',
  'Capella Sydney',
  'Villa d\'Este',
  'Four Seasons Hotel Kyoto',
  'Castiglion del Bosco, A Rosewood Hotel',
  'The Peninsula Tokyo',
  'Rosewood Matakauri',
  'Grand-Hotel du Cap-Ferrat, A Four Seasons Hotel',
  'Royal Mansour Marrakech',
  'The Dolder Grand',
  'Park Hyatt Tokyo',
  'Aman Kyoto',
  'Rosewood Mayakoba',
]);

// ─── Apply awards to hotel data ───────────────────────────────────────────────
// Strips all michelin-* and top-50-global distinctions from each hotel,
// then applies only the verified entries above. All other distinctions
// (forbes-5-star, conde-nast-gold, etc.) are preserved unchanged.

export function applyVerifiedAwards(hotels) {
  return hotels.map((hotel) => {
    // Strip any previously-generated michelin/top-50 keys
    const stripped = hotel.distinctions.filter(
      (d) => !d.startsWith('michelin-') && d !== 'top-50-global'
    );

    const awarded = [...stripped];

    // Apply Michelin Keys (highest tier wins — 3 > 2 > 1)
    if (MICHELIN_3_KEY.has(hotel.name)) {
      awarded.push('michelin-3-key');
    } else if (MICHELIN_2_KEY.has(hotel.name)) {
      awarded.push('michelin-2-key');
    } else if (MICHELIN_1_KEY.has(hotel.name)) {
      awarded.push('michelin-1-key');
    }

    // Apply World's 50 Best
    if (TOP_50_BEST_2024.has(hotel.name)) {
      awarded.push('top-50-global');
    }

    return { ...hotel, distinctions: awarded };
  });
}
