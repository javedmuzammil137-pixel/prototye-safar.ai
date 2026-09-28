export interface CostItem {
  label: string;
  amount: number;
}

export interface KarachiPlace {
  id: string;
  name: string;
  area: string;
  costPKR: number;
  rating: number;
  category: 'Food' | 'Seaside' | 'Heritage' | 'Bazaars' | 'Cafes';
  tags: ('Food' | 'Seaside' | 'Heritage' | 'Bazaars' | 'Cafes')[];
  duration: string;
  bestTime: string;
  description: string;
  imageSrc: string;
  costBreakdown: CostItem[];
  isTrending?: boolean;
  highlight: string;
}

export const KARACHI_PLACES: KarachiPlace[] = [
  {
    id: 'burns-road',
    name: 'Burns Road Food Street',
    area: 'Saddar',
    costPKR: 1200,
    rating: 4.8,
    category: 'Food',
    tags: ['Food', 'Bazaars'],
    duration: '2 hours',
    bestTime: '7:30 PM - 10:30 PM',
    description: 'The historic culinary epicenter of Karachi. Renowned for authentic Waheed fry kababs, rich beef nihari, spicy grilled fish, and chilled clay-pot matka rabri.',
    imageSrc: '/src/assets/images/karachi_burns_road_1790606263285.jpg',
    highlight: 'Legendary Waheed Nihari & Matka Rabri',
    isTrending: true,
    costBreakdown: [
      { label: 'Waheed Fry Kabab & Fresh Naan', amount: 750 },
      { label: 'Chilled Lassi or Doodh Patti Chai', amount: 150 },
      { label: 'Delhi Rabri House Matka Dessert', amount: 300 },
    ],
  },
  {
    id: 'mohatta-palace',
    name: 'Mohatta Palace Museum',
    area: 'Old Clifton',
    costPKR: 450,
    rating: 4.7,
    category: 'Heritage',
    tags: ['Heritage'],
    duration: '1.5 hours',
    bestTime: '3:00 PM - 5:30 PM',
    description: 'A 1927 Rajasthani pink-stone palace built by Shivratan Mohatta. Features intricate Mughal-Gothic stone carvings, tranquil courtyards, and rotating exhibitions of Pakistani art and textiles.',
    imageSrc: '/src/assets/images/karachi_mohatta_palace_1790606276957.jpg',
    highlight: 'Pink Jodhpur stone architecture & art exhibits',
    isTrending: true,
    costBreakdown: [
      { label: 'Palace Museum Entry Ticket', amount: 150 },
      { label: 'Garden grounds & exhibition guide', amount: 100 },
      { label: 'Courtyard cafe tea & cold water', amount: 200 },
    ],
  },
  {
    id: 'do-darya',
    name: 'Do Darya Waterfront Dining',
    area: 'DHA Phase 8',
    costPKR: 2800,
    rating: 4.6,
    category: 'Seaside',
    tags: ['Seaside', 'Food', 'Cafes'],
    duration: '2.5 hours',
    bestTime: '8:00 PM - 11:30 PM',
    description: 'A strip of seaside restaurants built directly on wooden decks over the Arabian Sea. Enjoy sizzling charcoal chicken sajji, seafood platters, and ocean waves at night.',
    imageSrc: '/src/assets/images/karachi_do_darya_1790606290872.jpg',
    highlight: 'Over-water open air dining on the Arabian Sea',
    isTrending: true,
    costBreakdown: [
      { label: 'Seafood Karahi / BBQ platter share', amount: 1800 },
      { label: 'Roghni Naan, raita & fresh lime', amount: 500 },
      { label: 'Karak chai pot & service tip', amount: 500 },
    ],
  },
  {
    id: 'clifton-beach',
    name: 'Clifton Beach (Sea View)',
    area: 'Clifton',
    costPKR: 350,
    rating: 4.3,
    category: 'Seaside',
    tags: ['Seaside'],
    duration: '1.5 hours',
    bestTime: '5:30 PM - 7:00 PM (Sunset)',
    description: 'Karachi’s beloved public coastal front along the Arabian Sea. Famous for evening sea breezes, brightly adorned camel rides, and street-roasted spicy corn.',
    imageSrc: '/src/assets/images/karachi_clifton_beach_1790606303682.jpg',
    highlight: 'Arabian Sea sunset & decorated camel rides',
    isTrending: true,
    costBreakdown: [
      { label: 'Shoreline camel or buggy spin', amount: 200 },
      { label: 'Spicy lemon-rubbed roasted bhutta (corn)', amount: 100 },
      { label: 'Dhabba tea from seaside vendor', amount: 50 },
    ],
  },
  {
    id: 'empress-market',
    name: 'Empress Market & Saddar Bazaar',
    area: 'Saddar',
    costPKR: 600,
    rating: 4.2,
    category: 'Bazaars',
    tags: ['Bazaars', 'Heritage'],
    duration: '2 hours',
    bestTime: '11:00 AM - 2:00 PM',
    description: 'A Victorian-era Gothic clocktower market constructed in 1889 during the British Raj. A sensory hub for rare spices, condiments, dry fruits, and heritage streets.',
    imageSrc: '/src/assets/images/hero_karachi_skyline_1790606250005.jpg',
    highlight: 'Historic Victorian clocktower & wholesale spice market',
    costBreakdown: [
      { label: 'Handcrafted spice pouch / dry fruits sample', amount: 400 },
      { label: 'Fresh chilled sugarcane juice (Gannay ka Ras)', amount: 100 },
      { label: 'Fresh hot samosa & dhabba tea', amount: 100 },
    ],
  },
  {
    id: 'tdf-ghar',
    name: 'TDF Ghar Heritage House',
    area: 'Jamshed Quarter',
    costPKR: 500,
    rating: 4.7,
    category: 'Heritage',
    tags: ['Heritage', 'Cafes'],
    duration: '1.5 hours',
    bestTime: '4:30 PM - 7:00 PM',
    description: 'A meticulously restored 1930s home celebrating Karachi’s multi-ethnic golden era. Includes vintage art deco furnishings, hand-painted tiles, and a rooftop cafe with direct views of Quaid’s Mausoleum.',
    imageSrc: '/src/assets/images/karachi_mohatta_palace_1790606276957.jpg',
    highlight: 'Art Deco architecture & rooftop cafe facing Mazar-e-Quaid',
    costBreakdown: [
      { label: 'Heritage house entry ticket', amount: 100 },
      { label: 'Rooftop Irani Chai & Bun Maska butter bun', amount: 350 },
      { label: 'Commemorative postcard / guide token', amount: 50 },
    ],
  },
  {
    id: 'port-grand',
    name: 'Port Grand Boardwalk',
    area: 'Native Jetty / Keamari',
    costPKR: 1600,
    rating: 4.4,
    category: 'Food',
    tags: ['Food', 'Seaside', 'Bazaars'],
    duration: '3 hours',
    bestTime: '7:00 PM - 10:30 PM',
    description: 'A restored pedestrian boulevard along the 19th-century Native Jetty bridge. Features waterfront food pavilions, live musicians, night boat tours, and seaport panoramas.',
    imageSrc: '/src/assets/images/karachi_do_darya_1790606290872.jpg',
    highlight: 'Waterfront promenade under historic 19th-century railway bridge',
    costBreakdown: [
      { label: 'Boardwalk entry pass (food voucher redeemable)', amount: 400 },
      { label: 'Gourmet street cuisine dinner', amount: 900 },
      { label: 'Harbor boat ride or ice cream cone', amount: 300 },
    ],
  },
  {
    id: 'frere-hall',
    name: 'Frere Hall & Sadequain Murals',
    area: 'Civil Lines',
    costPKR: 200,
    rating: 4.5,
    category: 'Heritage',
    tags: ['Heritage'],
    duration: '1.5 hours',
    bestTime: '10:00 AM - 1:00 PM (or Sunday Book Fair)',
    description: 'Venetian-Gothic architectural icon established in 1865 surrounded by the green Bagh-e-Jinnah park. Famous for Sadequain’s monumental ceiling masterpiece, "Arz-o-Samawat".',
    imageSrc: '/src/assets/images/karachi_mohatta_palace_1790606276957.jpg',
    highlight: 'Sadequain masterpiece ceiling mural & Sunday book bazaar',
    costBreakdown: [
      { label: 'Historic hall admission', amount: 0 },
      { label: 'Vintage paperback from lawn book fair', amount: 150 },
      { label: 'Cold drink & water from lawn canteen', amount: 50 },
    ],
  },
  {
    id: 'mazar-e-quaid',
    name: 'Mazar-e-Quaid (Founder Mausoleum)',
    area: 'M.A. Jinnah Road',
    costPKR: 150,
    rating: 4.8,
    category: 'Heritage',
    tags: ['Heritage'],
    duration: '1.5 hours',
    bestTime: '4:00 PM - 6:00 PM',
    description: 'Karachi’s grand white marble landmark honoring Muhammad Ali Jinnah. Set within 53 hectares of manicured terraces, fountains, and military ceremonial guard changes.',
    imageSrc: '/src/assets/images/hero_karachi_skyline_1790606250005.jpg',
    highlight: 'Iconic white marble dome & ceremonial guard change',
    costBreakdown: [
      { label: 'Monument entry & shoe custody', amount: 50 },
      { label: 'Founding archives gallery ticket', amount: 50 },
      { label: 'Chilled bottled mineral water', amount: 50 },
    ],
  },
  {
    id: 'zainab-market',
    name: 'Zainab Market & Rex Centre',
    area: 'Saddar',
    costPKR: 1900,
    rating: 4.4,
    category: 'Bazaars',
    tags: ['Bazaars', 'Food'],
    duration: '2 hours',
    bestTime: '3:00 PM - 7:00 PM',
    description: 'Karachi’s legendary bargain shopping destination for quality export apparel, hand-stitched leather jackets, traditional Kashmiri shawls, and brass handicrafts.',
    imageSrc: '/src/assets/images/karachi_burns_road_1790606263285.jpg',
    highlight: 'Export clothing bargains, leather goods & street snacks',
    costBreakdown: [
      { label: 'Cotton kurta or artisanal souvenir', amount: 1500 },
      { label: 'Tangy Saddar samosa chaat plate', amount: 250 },
      { label: 'Authentic Peshawari pistachio ice cream', amount: 150 },
    ],
  },
];

export interface TripPlanPreferences {
  budgetPKR: number;
  duration: 'Half Day' | 'Full Day' | 'Weekend';
  interests: ('Food' | 'Seaside' | 'Heritage' | 'Bazaars' | 'Cafes')[];
  group: 'Solo' | 'Friends' | 'Family' | 'Couple';
  transport: 'Rickshaw/Bykea' | 'Careem' | 'Own vehicle';
}

export const DEFAULT_PREFERENCES: TripPlanPreferences = {
  budgetPKR: 5000,
  duration: 'Full Day',
  interests: ['Food', 'Heritage', 'Seaside'],
  group: 'Friends',
  transport: 'Rickshaw/Bykea',
};

export const TRANSPORT_COSTS: Record<TripPlanPreferences['transport'], number> = {
  'Rickshaw/Bykea': 450,
  'Careem': 1200,
  'Own vehicle': 600,
};

export interface SavedTrip {
  id: string;
  name: string;
  savedAt: string;
  budgetPKR: number;
  totalCostPKR: number;
  transport: TripPlanPreferences['transport'];
  transportCostPKR: number;
  duration: TripPlanPreferences['duration'];
  group: TripPlanPreferences['group'];
  placeIds: string[];
  placeNames: string[];
}
