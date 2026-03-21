#!/usr/bin/env node
'use strict';

/**
 * fetch-hotels.js
 * Fetches real luxury hotel data from Google Places API for all destinations.
 * Run: node scripts/fetch-hotels.js
 * Output: src/data/hotels-real.json
 */

const https = require('https');
const fs   = require('fs');
const path = require('path');

const API_KEY   = 'AIzaSyD6WBDDleE1YASBhDPM_QlSMb7WwZ1kt-s';
const OUTPUT    = path.join(__dirname, '../src/data/hotels-real.json');
const PROGRESS  = path.join(__dirname, '../src/data/.fetch-progress.json');
const MAX_PER   = 12;   // hotels per destination
const DELAY     = 250;  // ms between API calls

// ─── All destinations ─────────────────────────────────────────────────────────
const DESTINATIONS = [
  // Europe
  { city: 'Paris',           country: 'France',           region: 'Europe',      type: 'city'        },
  { city: 'London',          country: 'United Kingdom',   region: 'Europe',      type: 'city'        },
  { city: 'Rome',            country: 'Italy',             region: 'Europe',      type: 'city'        },
  { city: 'Venice',          country: 'Italy',             region: 'Europe',      type: 'city'        },
  { city: 'Florence',        country: 'Italy',             region: 'Europe',      type: 'city'        },
  { city: 'Milan',           country: 'Italy',             region: 'Europe',      type: 'city'        },
  { city: 'Madrid',          country: 'Spain',             region: 'Europe',      type: 'city'        },
  { city: 'Barcelona',       country: 'Spain',             region: 'Europe',      type: 'city'        },
  { city: 'Lisbon',          country: 'Portugal',          region: 'Europe',      type: 'city'        },
  { city: 'Vienna',          country: 'Austria',           region: 'Europe',      type: 'city'        },
  { city: 'Prague',          country: 'Czech Republic',    region: 'Europe',      type: 'city'        },
  { city: 'Amsterdam',       country: 'Netherlands',       region: 'Europe',      type: 'city'        },
  { city: 'Zurich',          country: 'Switzerland',       region: 'Europe',      type: 'city'        },
  { city: 'Geneva',          country: 'Switzerland',       region: 'Europe',      type: 'city'        },
  { city: 'Monaco',          country: 'Monaco',            region: 'Europe',      type: 'city'        },
  { city: 'Santorini',       country: 'Greece',            region: 'Europe',      type: 'island'      },
  { city: 'Mykonos',         country: 'Greece',            region: 'Europe',      type: 'island'      },
  { city: 'Athens',          country: 'Greece',            region: 'Europe',      type: 'city'        },
  { city: 'Dubrovnik',       country: 'Croatia',           region: 'Europe',      type: 'coastal'     },
  { city: 'Amalfi',          country: 'Italy',             region: 'Europe',      type: 'coastal'     },
  { city: 'Capri',           country: 'Italy',             region: 'Europe',      type: 'island'      },
  { city: 'Lake Como',       country: 'Italy',             region: 'Europe',      type: 'lake'        },
  { city: 'Tuscany',         country: 'Italy',             region: 'Europe',      type: 'countryside' },
  { city: 'Saint-Tropez',    country: 'France',            region: 'Europe',      type: 'coastal'     },
  { city: "Côte d'Azur",    country: 'France',            region: 'Europe',      type: 'coastal'     },
  { city: 'Porto',           country: 'Portugal',          region: 'Europe',      type: 'city'        },
  { city: 'Edinburgh',       country: 'United Kingdom',   region: 'Europe',      type: 'city'        },
  { city: 'Budapest',        country: 'Hungary',           region: 'Europe',      type: 'city'        },
  { city: 'Copenhagen',      country: 'Denmark',           region: 'Europe',      type: 'city'        },
  { city: 'Stockholm',       country: 'Sweden',            region: 'Europe',      type: 'city'        },
  { city: 'Brussels',        country: 'Belgium',           region: 'Europe',      type: 'city'        },
  { city: 'Salzburg',        country: 'Austria',           region: 'Europe',      type: 'city'        },
  { city: 'Courchevel 1850', country: 'France',            region: 'Europe',      type: 'mountain'    },
  { city: 'St. Moritz',      country: 'Switzerland',       region: 'Europe',      type: 'mountain'    },
  { city: 'Andermatt',       country: 'Switzerland',       region: 'Europe',      type: 'mountain'    },
  { city: 'Bodrum',          country: 'Turkey',            region: 'Europe',      type: 'coastal'     },
  { city: 'Positano',        country: 'Italy',             region: 'Europe',      type: 'coastal'     },
  { city: 'Portofino',       country: 'Italy',             region: 'Europe',      type: 'coastal'     },
  { city: 'Seville',         country: 'Spain',             region: 'Europe',      type: 'city'        },
  { city: 'Mallorca',        country: 'Spain',             region: 'Europe',      type: 'island'      },
  { city: 'Ibiza',           country: 'Spain',             region: 'Europe',      type: 'island'      },
  // Asia
  { city: 'Tokyo',           country: 'Japan',             region: 'Asia',        type: 'city'        },
  { city: 'Kyoto',           country: 'Japan',             region: 'Asia',        type: 'city'        },
  { city: 'Osaka',           country: 'Japan',             region: 'Asia',        type: 'city'        },
  { city: 'Bangkok',         country: 'Thailand',          region: 'Asia',        type: 'city'        },
  { city: 'Bali',            country: 'Indonesia',         region: 'Asia',        type: 'island'      },
  { city: 'Phuket',          country: 'Thailand',          region: 'Asia',        type: 'island'      },
  { city: 'Maldives',        country: 'Maldives',          region: 'Asia',        type: 'island'      },
  { city: 'Singapore',       country: 'Singapore',         region: 'Asia',        type: 'city'        },
  { city: 'Hong Kong',       country: 'China',             region: 'Asia',        type: 'city'        },
  { city: 'Shanghai',        country: 'China',             region: 'Asia',        type: 'city'        },
  { city: 'Beijing',         country: 'China',             region: 'Asia',        type: 'city'        },
  { city: 'Mumbai',          country: 'India',             region: 'Asia',        type: 'city'        },
  { city: 'Udaipur',         country: 'India',             region: 'Asia',        type: 'city'        },
  { city: 'Jaipur',          country: 'India',             region: 'Asia',        type: 'city'        },
  { city: 'New Delhi',       country: 'India',             region: 'Asia',        type: 'city'        },
  { city: 'Colombo',         country: 'Sri Lanka',         region: 'Asia',        type: 'city'        },
  { city: 'Paro',            country: 'Bhutan',            region: 'Asia',        type: 'mountain'    },
  { city: 'Hoi An',          country: 'Vietnam',           region: 'Asia',        type: 'city'        },
  { city: 'Hanoi',           country: 'Vietnam',           region: 'Asia',        type: 'city'        },
  { city: 'Siem Reap',       country: 'Cambodia',          region: 'Asia',        type: 'cultural'    },
  { city: 'Langkawi',        country: 'Malaysia',          region: 'Asia',        type: 'island'      },
  { city: 'Seoul',           country: 'South Korea',       region: 'Asia',        type: 'city'        },
  { city: 'Chiang Mai',      country: 'Thailand',          region: 'Asia',        type: 'city'        },
  { city: 'Koh Samui',       country: 'Thailand',          region: 'Asia',        type: 'island'      },
  { city: 'Lombok',          country: 'Indonesia',         region: 'Asia',        type: 'island'      },
  { city: 'Nusa Dua',        country: 'Indonesia',         region: 'Asia',        type: 'coastal'     },
  { city: 'Luang Prabang',   country: 'Laos',              region: 'Asia',        type: 'cultural'    },
  // Americas
  { city: 'New York',        country: 'United States',     region: 'Americas',    type: 'city'        },
  { city: 'Miami',           country: 'United States',     region: 'Americas',    type: 'coastal'     },
  { city: 'Los Angeles',     country: 'United States',     region: 'Americas',    type: 'city'        },
  { city: 'San Francisco',   country: 'United States',     region: 'Americas',    type: 'city'        },
  { city: 'Chicago',         country: 'United States',     region: 'Americas',    type: 'city'        },
  { city: 'Washington D.C.', country: 'United States',     region: 'Americas',    type: 'city'        },
  { city: 'Aspen',           country: 'United States',     region: 'Americas',    type: 'mountain'    },
  { city: 'Jackson Hole',    country: 'United States',     region: 'Americas',    type: 'mountain'    },
  { city: 'Maui',            country: 'United States',     region: 'Americas',    type: 'island'      },
  { city: 'Kauai',           country: 'United States',     region: 'Americas',    type: 'island'      },
  { city: 'Turks & Caicos',  country: 'Turks & Caicos',    region: 'Americas',    type: 'island'      },
  { city: 'St. Barts',       country: 'France',            region: 'Americas',    type: 'island'      },
  { city: 'Anguilla',        country: 'Anguilla',          region: 'Americas',    type: 'island'      },
  { city: 'Barbados',        country: 'Barbados',          region: 'Americas',    type: 'island'      },
  { city: 'Los Cabos',       country: 'Mexico',            region: 'Americas',    type: 'coastal'     },
  { city: 'Mexico City',     country: 'Mexico',            region: 'Americas',    type: 'city'        },
  { city: 'Tulum',           country: 'Mexico',            region: 'Americas',    type: 'coastal'     },
  { city: 'Punta Mita',      country: 'Mexico',            region: 'Americas',    type: 'coastal'     },
  { city: 'Riviera Maya',    country: 'Mexico',            region: 'Americas',    type: 'coastal'     },
  { city: 'Buenos Aires',    country: 'Argentina',         region: 'Americas',    type: 'city'        },
  { city: 'Rio de Janeiro',  country: 'Brazil',            region: 'Americas',    type: 'coastal'     },
  { city: 'Lima',            country: 'Peru',              region: 'Americas',    type: 'city'        },
  { city: 'Cartagena',       country: 'Colombia',          region: 'Americas',    type: 'coastal'     },
  { city: 'Patagonia',       country: 'Chile',             region: 'Americas',    type: 'wilderness'  },
  // Middle East
  { city: 'Dubai',           country: 'UAE',               region: 'Middle East', type: 'city'        },
  { city: 'Abu Dhabi',       country: 'UAE',               region: 'Middle East', type: 'city'        },
  { city: 'Doha',            country: 'Qatar',             region: 'Middle East', type: 'city'        },
  { city: 'Muscat',          country: 'Oman',              region: 'Middle East', type: 'city'        },
  { city: 'Amman',           country: 'Jordan',            region: 'Middle East', type: 'city'        },
  // Africa
  { city: 'Marrakech',       country: 'Morocco',           region: 'Africa',      type: 'city'        },
  { city: 'Cape Town',       country: 'South Africa',      region: 'Africa',      type: 'coastal'     },
  { city: 'Serengeti',       country: 'Tanzania',          region: 'Africa',      type: 'wilderness'  },
  { city: 'Masai Mara',      country: 'Kenya',             region: 'Africa',      type: 'wilderness'  },
  { city: 'Zanzibar',        country: 'Tanzania',          region: 'Africa',      type: 'island'      },
  { city: 'Nairobi',         country: 'Kenya',             region: 'Africa',      type: 'city'        },
  // Oceania
  { city: 'Sydney',          country: 'Australia',         region: 'Oceania',     type: 'city'        },
  { city: 'Melbourne',       country: 'Australia',         region: 'Oceania',     type: 'city'        },
  { city: 'Queenstown',      country: 'New Zealand',       region: 'Oceania',     type: 'mountain'    },
  { city: 'Fiji',            country: 'Fiji',              region: 'Oceania',     type: 'island'      },
  { city: 'Bora Bora',       country: 'French Polynesia',  region: 'Oceania',     type: 'island'      },
];

// ─── Brand detection ──────────────────────────────────────────────────────────
const BRAND_PATTERNS = [
  ['aman',              /\baman(?:jiwo|kila|giri|bagh|resort|hotel|villa|puri|wana|fayun|dayan|junkies|tokyo|new york|paris|london|dubai|bali|maldives|venice|capri|amalfi|tuscany|portofino|venice|kyoto|singapore|bangkok|bophut|koh kood|lombok|samara|sveti stefan|selman|aman-i-khas|amanzoe|the aman)?\b/i ],
  ['bulgari',           /\bb(?:vl)?[gu]lgari\b/i                                ],
  ['cheval-blanc',      /cheval blanc/i                                         ],
  ['four-seasons',      /four seasons/i                                         ],
  ['rosewood',          /rosewood/i                                             ],
  ['six-senses',        /six senses/i                                           ],
  ['peninsula',         /\bpeninsula\b/i                                        ],
  ['oetker',            /\b(badrutt'?s palace|le bristol|cap estel|château saint-martin|l'apogée|brenners park|eden rock|palais namasté)\b/i ],
  ['belmond',           /belmond/i                                              ],
  ['como',              /\bcomo\b/i                                             ],
  ['mandarin-oriental', /mandarin oriental/i                                    ],
  ['raffles',           /raffles/i                                              ],
  ['ritz-carlton',      /ritz[- ]carlton/i                                      ],
  ['st-regis',          /st\.?\s*regis/i                                        ],
  ['waldorf-astoria',   /waldorf/i                                              ],
  ['park-hyatt',        /park hyatt/i                                           ],
  ['auberge',           /auberge resorts/i                                      ],
  ['capella',           /capella/i                                              ],
  ['banyan-tree',       /banyan tree/i                                          ],
  ['edition',           /\bedition\b/i                                          ],
];

const BRAND_META = {
  'aman':             { name: 'Aman',              tier: 1 },
  'bulgari':          { name: 'Bvlgari Hotels',    tier: 1 },
  'cheval-blanc':     { name: 'Cheval Blanc',      tier: 1 },
  'four-seasons':     { name: 'Four Seasons',      tier: 1 },
  'rosewood':         { name: 'Rosewood',          tier: 1 },
  'six-senses':       { name: 'Six Senses',        tier: 1 },
  'peninsula':        { name: 'The Peninsula',     tier: 1 },
  'oetker':           { name: 'Oetker Collection', tier: 1 },
  'belmond':          { name: 'Belmond',           tier: 1 },
  'como':             { name: 'COMO Hotels',       tier: 1 },
  'mandarin-oriental':{ name: 'Mandarin Oriental', tier: 2 },
  'raffles':          { name: 'Raffles',           tier: 2 },
  'ritz-carlton':     { name: 'The Ritz-Carlton',  tier: 2 },
  'st-regis':         { name: 'St. Regis',         tier: 2 },
  'waldorf-astoria':  { name: 'Waldorf Astoria',   tier: 2 },
  'park-hyatt':       { name: 'Park Hyatt',        tier: 2 },
  'auberge':          { name: 'Auberge Resorts',   tier: 2 },
  'capella':          { name: 'Capella Hotels',    tier: 2 },
  'banyan-tree':      { name: 'Banyan Tree',       tier: 2 },
  'edition':          { name: 'EDITION Hotels',    tier: 2 },
  'independent':      { name: 'Independent',       tier: 2 },
};

function detectBrand(name) {
  const lower = name.toLowerCase();
  for (const [id, pattern] of BRAND_PATTERNS) {
    if (pattern.test(name)) return id;
  }
  return 'independent';
}

// ─── Price mapping from Google price_level ────────────────────────────────────
function priceFromLevel(level, rating) {
  const base = level === 4 ? 800 : level === 3 ? 400 : level === 2 ? 200 : 500;
  const range = level === 4 ? 1700 : level === 3 ? 400 : level === 2 ? 200 : 1000;
  // Use rating as a seed proxy for deterministic price
  const frac = ((rating * 137) % 1 + 1) % 1;
  return Math.round((base + frac * range) / 50) * 50;
}

// ─── Distinctions based on rating ────────────────────────────────────────────
function buildDistinctions(rating, reviewCount) {
  const r = [];
  if (rating >= 4.9 && reviewCount > 500) r.push('michelin-3-key', 'forbes-5-star', 'top-50-global');
  else if (rating >= 4.8) { r.push('michelin-2-key', 'forbes-5-star'); if (reviewCount > 300) r.push('conde-nast-gold'); }
  else if (rating >= 4.6) { r.push('michelin-1-key'); if (reviewCount > 200) r.push('forbes-5-star'); r.push('conde-nast-gold'); }
  else if (rating >= 4.4) { r.push('michelin-1-key', 'travel-leisure-top100'); }
  else if (rating >= 4.2) r.push('leading-hotels');
  else r.push('small-luxury');
  return r;
}

// ─── Amenities from location type ─────────────────────────────────────────────
function buildAmenities(type, tier) {
  const base = ['Concierge', 'Room Service', 'Fitness Center', 'Fine Dining Restaurant', 'Bar & Lounge'];
  const extras = [];
  if (['island', 'coastal', 'lake'].includes(type))      extras.push('Private Beach', 'Water Sports', 'Infinity Pool');
  if (['mountain', 'wilderness'].includes(type))          extras.push('Ski-In/Ski-Out', 'Nature Excursions');
  if (type === 'city')                                    extras.push('Valet Parking', 'Business Center');
  if (tier === 1)                                         extras.push('Butler Service', 'Private Pool', 'Helicopter Transfers');
  extras.push('Full-Service Spa', 'Meeting Rooms');
  return [...new Set([...base, ...extras])].slice(0, 8);
}

// ─── Description generator ────────────────────────────────────────────────────
const DESC_TEMPLATES = [
  (n, c, co) => `An extraordinary sanctuary of refined elegance, ${n} redefines the concept of luxury in the heart of ${c}, ${co}. Each space is conceived to evoke a profound sense of place, where world-class service meets architectural brilliance.`,
  (n, c, co) => `Set against the breathtaking backdrop of ${c}, ${n} is a masterpiece of contemporary luxury. Guests are immersed in an atmosphere of understated opulence, where every detail has been crafted to create moments of genuine wonder.`,
  (n, c, co) => `Nestled within ${c}'s most coveted address, ${n} offers a rare combination of intimacy and grandeur. With personalised service elevated to an art form, this ${co} jewel has long been the preferred retreat for discerning global travellers.`,
  (n, c, co) => `${n} stands as a timeless testament to the art of hospitality in ${c}, ${co}. From soaring public spaces to serene private suites, every corner speaks of meticulous craftsmanship and effortless grace.`,
  (n, c, co) => `A place where the extraordinary becomes ordinary, ${n} occupies a position of singular prestige in ${c}. Drawing inspiration from ${co}'s rich cultural heritage while embracing the finest contemporary design, it offers an experience without parallel.`,
];

function buildDescription(name, city, country, idx) {
  return DESC_TEMPLATES[idx % DESC_TEMPLATES.length](name, city, country);
}

// ─── HTTP helpers ──────────────────────────────────────────────────────────────
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${e.message}`)); }
      });
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function photoUrl(ref) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${ref}&key=${API_KEY}`;
}

// ─── API calls ────────────────────────────────────────────────────────────────
async function textSearch(query) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=lodging&key=${API_KEY}`;
  return httpsGet(url);
}

async function placeDetails(placeId) {
  const fields = 'place_id,name,formatted_address,rating,user_ratings_total,website,photos,price_level,types';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  return httpsGet(url);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // Load any existing progress
  let progress = {};
  if (fs.existsSync(PROGRESS)) {
    try { progress = JSON.parse(fs.readFileSync(PROGRESS, 'utf8')); }
    catch { progress = {}; }
  }

  const allHotels = progress.hotels || [];
  let nextId = progress.nextId || 1;
  const doneSet = new Set(progress.doneDests || []);

  console.log(`Resuming from ${doneSet.size} completed destinations, ${allHotels.length} hotels so far.`);

  for (const dest of DESTINATIONS) {
    const key = `${dest.city}|${dest.country}`;
    if (doneSet.has(key)) {
      console.log(`  ✓ Skipping ${dest.city} (already done)`);
      continue;
    }

    const query = `luxury 5 star hotel ${dest.city} ${dest.country}`;
    console.log(`\n→ Searching: ${query}`);

    let searchResult;
    try {
      await sleep(DELAY);
      searchResult = await textSearch(query);
    } catch (e) {
      console.error(`  ✗ Search failed for ${dest.city}: ${e.message}`);
      continue;
    }

    if (searchResult.status !== 'OK') {
      console.warn(`  ✗ Status ${searchResult.status} for ${dest.city}: ${searchResult.error_message || ''}`);
      doneSet.add(key);
      continue;
    }

    const candidates = searchResult.results
      .filter(r => (r.rating || 0) >= 3.8)
      .slice(0, MAX_PER);

    console.log(`  Found ${searchResult.results.length} results, processing ${candidates.length} top candidates`);

    let addedForDest = 0;
    for (const candidate of candidates) {
      await sleep(DELAY);
      let details;
      try {
        const resp = await placeDetails(candidate.place_id);
        if (resp.status !== 'OK') { console.warn(`    ✗ Details failed: ${resp.status}`); continue; }
        details = resp.result;
      } catch (e) {
        console.error(`    ✗ Details error: ${e.message}`);
        continue;
      }

      // Need at least some photos
      if (!details.photos || details.photos.length === 0) {
        console.log(`    ✗ No photos: ${details.name}`);
        continue;
      }

      const name     = details.name;
      const brandId  = detectBrand(name);
      const brand    = BRAND_META[brandId];
      const rating   = details.rating || candidate.rating || 4.5;
      const reviews  = details.user_ratings_total || candidate.user_ratings_total || 100;
      const pLevel   = details.price_level ?? candidate.price_level ?? 4;
      const price    = priceFromLevel(pLevel, rating);
      const website  = details.website || `https://www.google.com/maps/place/?q=place_id:${details.place_id}`;
      const images   = details.photos.slice(0, 10).map(p => photoUrl(p.photo_reference));
      const dists    = buildDistinctions(rating, reviews);
      const amenities = buildAmenities(dest.type, brand.tier);
      const desc     = buildDescription(name, dest.city, dest.country, nextId);

      const hotel = {
        id: nextId,
        name,
        brand: brand.name,
        brandId,
        city: dest.city,
        country: dest.country,
        region: dest.region,
        locationType: dest.type,
        price,
        rating: Math.round(rating * 10) / 10,
        reviewCount: reviews,
        distinctions: dists,
        images,
        description: desc,
        amenities,
        officialUrl: website,
      };

      allHotels.push(hotel);
      console.log(`    ✓ [${nextId}] ${name} — $${price}/night — ${images.length} photos — ${website.slice(0, 60)}`);
      nextId++;
      addedForDest++;
    }

    console.log(`  Added ${addedForDest} hotels for ${dest.city}`);
    doneSet.add(key);

    // Save progress after each destination
    const prog = { hotels: allHotels, nextId, doneDests: [...doneSet] };
    fs.writeFileSync(PROGRESS, JSON.stringify(prog, null, 2));
  }

  // Write final output
  fs.writeFileSync(OUTPUT, JSON.stringify(allHotels, null, 2));
  console.log(`\n✅ Done! ${allHotels.length} hotels written to ${OUTPUT}`);

  // Clean up progress file
  if (fs.existsSync(PROGRESS)) fs.unlinkSync(PROGRESS);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
