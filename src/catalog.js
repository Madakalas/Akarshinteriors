/* Plans, brands, materials and extended designer profiles.
   NOTE: figures, brand lists and designer details are placeholder content — replace with real data. */

export const TIERS = [
  {
    id: 'essential', name: 'Essential', rate: 1400, tag: 'Smart, durable, great value', speed: 1, warranty: '5-year',
    inclusions: ['BWP-grade plywood carcass', 'Laminate & PU finishes', 'Standard soft-close hardware', 'LED panel & profile lighting', 'Free 2D layout + 3D views'],
  },
  {
    id: 'premium', name: 'Premium', rate: 2300, tag: 'Our most-loved balance', speed: 1.15, warranty: '10-year', popular: true,
    inclusions: ['HDHMR / marine ply carcass', 'Acrylic, veneer & duco finishes', 'Imported soft-close hardware', 'Designer lighting & cove lighting', 'Free photo-real 3D walkthrough', 'Dedicated project manager'],
  },
  {
    id: 'luxury', name: 'Luxury', rate: 3800, tag: 'Bespoke, uncompromising', speed: 1.4, warranty: '10-year + care',
    inclusions: ['Solid wood & imported stone', 'Italian marble, onyx & brass detailing', 'Fully bespoke furniture & joinery', 'Smart-home & scene lighting', 'Art, styling & soft furnishing curation', 'Senior designer + on-site architect'],
  },
];

export const PROPERTY_TYPES = [
  { id: '1bhk', name: '1 BHK', area: 650, beds: false },
  { id: '2bhk', name: '2 BHK', area: 1000, beds: true },
  { id: '3bhk', name: '3 BHK', area: 1450, beds: true },
  { id: '4bhk', name: '4 BHK', area: 2000, beds: true },
  { id: 'villa', name: 'Villa', area: 3500, beds: true, factor: 1.12 },
];

export const PLAN_ROOMS = [
  { id: 'living', name: 'Living Room', w: 18 },
  { id: 'kitchen', name: 'Modular Kitchen', w: 22 },
  { id: 'master', name: 'Master Bedroom', w: 16 },
  { id: 'bedrooms', name: 'Other Bedrooms', w: 14 },
  { id: 'bath', name: 'Bathrooms', w: 12 },
  { id: 'dining', name: 'Dining Area', w: 6 },
  { id: 'study', name: 'Study / Home Office', w: 5 },
  { id: 'balcony', name: 'Balcony & Utility', w: 4 },
  { id: 'pooja', name: 'Pooja Unit', w: 3 },
];

// cost is per sq ft of total area (array) or a flat amount (flat: [e, p, l])
export const ADDONS = [
  { id: 'ceiling', name: 'False Ceiling & Cove Lighting', perSqft: [85, 130, 200] },
  { id: 'wardrobe', name: 'Full-height Wardrobes', perSqft: [120, 210, 360] },
  { id: 'furnish', name: 'Furniture & Soft Furnishing', perSqft: [90, 170, 320] },
  { id: 'smart', name: 'Smart Home Automation', perSqft: [40, 95, 210] },
  { id: 'theatre', name: 'Home Theatre Room', flat: [150000, 320000, 700000] },
];

export const CITY_TIERS = [
  { id: 'metro', name: 'Metro city', factor: 1 },
  { id: 'tier2', name: 'Tier-2 city', factor: 0.92 },
];

export const BRAND_CATEGORIES = ['Paints & Finishes', 'Hardware & Fittings', 'Bath & Sanitaryware', 'Lighting & Electricals', 'Surfaces & Flooring', 'Appliances'];

// style: visual treatment for the text wordmark. Provide `logo` (image URL) to show a licensed logo instead.
export const BRANDS = [
  { name: 'Asian Paints', cat: 'Paints & Finishes', tiers: ['essential', 'premium', 'luxury'], style: 'bold' },
  { name: 'Berger', cat: 'Paints & Finishes', tiers: ['essential', 'premium'], style: 'caps' },
  { name: 'Dulux', cat: 'Paints & Finishes', tiers: ['premium', 'luxury'], style: 'wide' },
  { name: 'Nerolac', cat: 'Paints & Finishes', tiers: ['essential', 'premium'], style: 'bold' },
  { name: 'Hettich', cat: 'Hardware & Fittings', tiers: ['premium', 'luxury'], style: 'caps' },
  { name: 'Häfele', cat: 'Hardware & Fittings', tiers: ['premium', 'luxury'], style: 'serif' },
  { name: 'Ebco', cat: 'Hardware & Fittings', tiers: ['essential', 'premium'], style: 'bold' },
  { name: 'Blum', cat: 'Hardware & Fittings', tiers: ['luxury'], style: 'wide' },
  { name: 'Kohler', cat: 'Bath & Sanitaryware', tiers: ['premium', 'luxury'], style: 'serif' },
  { name: 'Jaquar', cat: 'Bath & Sanitaryware', tiers: ['essential', 'premium'], style: 'caps' },
  { name: 'Hindware', cat: 'Bath & Sanitaryware', tiers: ['essential', 'premium'], style: 'bold' },
  { name: 'Grohe', cat: 'Bath & Sanitaryware', tiers: ['luxury'], style: 'wide' },
  { name: 'Philips', cat: 'Lighting & Electricals', tiers: ['essential', 'premium'], style: 'wide' },
  { name: 'Havells', cat: 'Lighting & Electricals', tiers: ['essential', 'premium'], style: 'bold' },
  { name: 'Legrand', cat: 'Lighting & Electricals', tiers: ['premium', 'luxury'], style: 'serif' },
  { name: 'Osram', cat: 'Lighting & Electricals', tiers: ['luxury'], style: 'caps' },
  { name: 'Century Ply', cat: 'Surfaces & Flooring', tiers: ['essential', 'premium'], style: 'bold' },
  { name: 'Greenlam', cat: 'Surfaces & Flooring', tiers: ['essential', 'premium', 'luxury'], style: 'caps' },
  { name: 'Kajaria', cat: 'Surfaces & Flooring', tiers: ['essential', 'premium'], style: 'bold' },
  { name: 'Merino', cat: 'Surfaces & Flooring', tiers: ['premium', 'luxury'], style: 'serif' },
  { name: 'Bosch', cat: 'Appliances', tiers: ['premium', 'luxury'], style: 'caps' },
  { name: 'Faber', cat: 'Appliances', tiers: ['essential', 'premium'], style: 'wide' },
  { name: 'Elica', cat: 'Appliances', tiers: ['essential', 'premium'], style: 'bold' },
  { name: 'Siemens', cat: 'Appliances', tiers: ['luxury'], style: 'wide' },
];

export const MATERIAL_CATEGORIES = ['Stone', 'Wood', 'Engineered', 'Metal & Glass', 'Fabric'];

// swatch = CSS background used to depict the material
export const MATERIALS = [
  { id: 'statuario', name: 'Statuario Marble', cat: 'Stone', tiers: ['luxury'], dur: 3, price: 4, care: 'Seal annually; avoid acids', best: ['Feature walls', 'Flooring', 'Vanities'], brands: [], desc: 'Bright white stone with dramatic grey veining — the signature of high-end interiors.', swatch: 'linear-gradient(115deg,#f6f4f0 0%,#ecebe8 35%,#f8f7f4 36%,#d9d8d6 38%,#f4f3f0 40%,#fbfaf8 70%,#e6e4e1 100%)' },
  { id: 'quartz', name: 'Quartz Surfaces', cat: 'Stone', tiers: ['essential', 'premium', 'luxury'], dur: 5, price: 3, care: 'Wipe clean; stain & scratch resistant', best: ['Kitchen counters', 'Vanities'], brands: [], desc: 'Engineered stone that stays flawless in the hardest-working rooms.', swatch: 'linear-gradient(135deg,#e7e3dc,#d6d1c7 50%,#ece8e0)' },
  { id: 'granite', name: 'Granite', cat: 'Stone', tiers: ['essential', 'premium'], dur: 5, price: 2, care: 'Low maintenance', best: ['Kitchen counters', 'Outdoor decks'], brands: [], desc: 'Natural, heat-proof and extremely durable with a speckled depth.', swatch: 'radial-gradient(circle at 20% 30%,#5b5550 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,#2f2c2a 0 2px,transparent 3px),linear-gradient(135deg,#7b746d,#4a4541)' },
  { id: 'walnut', name: 'American Walnut', cat: 'Wood', tiers: ['premium', 'luxury'], dur: 4, price: 4, care: 'Occasional oiling', best: ['Panelling', 'Wardrobes', 'Doors'], brands: [], desc: 'Rich chocolate tones and a refined grain for warm, timeless rooms.', swatch: 'repeating-linear-gradient(95deg,#4b2f1f 0 6px,#5a3825 6px 11px,#43281a 11px 15px)' },
  { id: 'teak', name: 'Burma Teak', cat: 'Wood', tiers: ['premium', 'luxury'], dur: 5, price: 4, care: 'Weather-resistant; polish yearly', best: ['Furniture', 'Doors', 'Outdoor'], brands: [], desc: 'Golden, oil-rich and legendary for its longevity.', swatch: 'repeating-linear-gradient(92deg,#b8843f 0 7px,#c8954f 7px 12px,#a97a38 12px 16px)' },
  { id: 'oak', name: 'European Oak', cat: 'Wood', tiers: ['premium', 'luxury'], dur: 4, price: 3, care: 'Matt-lacquer finish', best: ['Flooring', 'Joinery'], brands: [], desc: 'Pale, calm and understated — a favourite for Scandinavian-inspired homes.', swatch: 'repeating-linear-gradient(94deg,#d6b98a 0 8px,#ddc496 8px 13px,#cfb07f 13px 17px)' },
  { id: 'ply', name: 'BWP / Marine Plywood', cat: 'Engineered', tiers: ['essential', 'premium'], dur: 4, price: 2, care: 'Moisture-resistant core', best: ['Cabinet carcass', 'Wardrobes'], brands: ['Century Ply', 'Greenlam'], desc: 'The strong, water-resistant backbone of every modular kitchen and wardrobe.', swatch: 'repeating-linear-gradient(0deg,#d8b684 0 4px,#c9a06c 4px 6px)' },
  { id: 'hdhmr', name: 'HDHMR Board', cat: 'Engineered', tiers: ['premium'], dur: 5, price: 3, care: 'Very high moisture resistance', best: ['Kitchens', 'Bathrooms vanities'], brands: ['Greenlam'], desc: 'High-density board that holds screws superbly and resists swelling.', swatch: 'linear-gradient(135deg,#c7b79f,#b7a58a)' },
  { id: 'laminate', name: 'Laminates & Veneers', cat: 'Engineered', tiers: ['essential', 'premium', 'luxury'], dur: 4, price: 2, care: 'Wipe-clean surfaces', best: ['Wardrobes', 'Panelling', 'Study'], brands: ['Greenlam', 'Merino'], desc: 'Hundreds of textures and tones — from matt to high-gloss, wood to stone.', swatch: 'linear-gradient(135deg,#c8a47a 0 33%,#9c7a58 33% 66%,#e1cfb6 66%)' },
  { id: 'brass', name: 'Brushed Brass', cat: 'Metal & Glass', tiers: ['premium', 'luxury'], dur: 4, price: 3, care: 'Lacquered to resist tarnish', best: ['Inlays', 'Handles', 'Lighting'], brands: [], desc: 'A warm metallic accent that elevates joinery, lighting and furniture.', swatch: 'linear-gradient(120deg,#8c6a2a,#e2bd6a 40%,#a7802f 60%,#d7b25c)' },
  { id: 'steel', name: 'PVD Stainless Steel', cat: 'Metal & Glass', tiers: ['essential', 'premium'], dur: 5, price: 2, care: 'Scratch & rust resistant', best: ['Trims', 'Bathroom fittings'], brands: ['Jaquar', 'Hindware'], desc: 'Gold, rose or black finishes with the durability of stainless steel.', swatch: 'linear-gradient(120deg,#b8bcc0,#eceef0 45%,#a0a5a9)' },
  { id: 'glass', name: 'Fluted & Tinted Glass', cat: 'Metal & Glass', tiers: ['premium', 'luxury'], dur: 3, price: 3, care: 'Clean with glass cleaner', best: ['Partitions', 'Wardrobe shutters'], brands: [], desc: 'Diffuses light beautifully while adding texture and privacy.', swatch: 'repeating-linear-gradient(90deg,rgba(210,225,220,.9) 0 6px,rgba(170,195,188,.9) 6px 9px)' },
  { id: 'linen', name: 'Linen & Bouclé', cat: 'Fabric', tiers: ['premium', 'luxury'], dur: 3, price: 3, care: 'Spot-clean; Scotchgard-treated', best: ['Sofas', 'Headboards', 'Drapes'], brands: [], desc: 'Soft, tactile upholstery with an effortless, layered look.', swatch: 'repeating-linear-gradient(45deg,#e9e1d1 0 3px,#ddd3bf 3px 6px)' },
  { id: 'velvet', name: 'Performance Velvet', cat: 'Fabric', tiers: ['luxury'], dur: 4, price: 3, care: 'Stain-resistant weave', best: ['Statement seating', 'Headboards'], brands: [], desc: 'Deep, rich colour with a luxe hand-feel that still stands up to family life.', swatch: 'linear-gradient(135deg,#1f3a2f,#2f5446 50%,#183025)' },
  { id: 'cane', name: 'Rattan & Cane', cat: 'Fabric', tiers: ['essential', 'premium'], dur: 3, price: 2, care: 'Dust regularly; keep dry', best: ['Shutters', 'Chairs', 'Accents'], brands: [], desc: 'Natural weave that brings an airy, crafted warmth to any room.', swatch: 'repeating-linear-gradient(45deg,#d9b980 0 4px,#c9a566 4px 5px),repeating-linear-gradient(-45deg,#d9b980 0 4px,#c9a566 4px 5px)' },
];

/* ---------- extended designer profiles ---------- */
export const DESIGNER_EXTRA = {
  'riya-sharma': {
    based: 'Hyderabad, Telangana', rating: 4.9, reviews: 64, languages: ['English', 'Hindi', 'Telugu'],
    expertise: [['Residential Interiors', 96], ['Space Planning', 92], ['Styling & Colour', 88], ['Modular Kitchens', 80]],
    highlights: [['2016', 'Joined Decora as a junior designer'], ['2019', 'Led the Gachibowli 3 BHK series — 18 homes delivered'], ['2022', 'Promoted to Interior Designer, residential studio'], ['2024', 'Decora Designer of the Year (residential)']],
    work: [
      { title: 'Modern Apartment', city: 'Bangalore', state: 'Karnataka', year: 2024, type: 'Residential', area: '1,850 sq ft', scope: 'Full home', img: 'apt1', id: 'modern-apartment' },
      { title: 'Garden-view 3 BHK', city: 'Hyderabad', state: 'Telangana', year: 2023, type: 'Residential', area: '1,600 sq ft', scope: 'Full home', img: 'living2' },
      { title: 'Warm Minimal Flat', city: 'Pune', state: 'Maharashtra', year: 2023, type: 'Residential', area: '1,250 sq ft', scope: 'Living, kitchen, bedrooms', img: 'living3' },
      { title: 'Skyline 2 BHK', city: 'Visakhapatnam', state: 'Andhra Pradesh', year: 2022, type: 'Residential', area: '1,100 sq ft', scope: 'Full home', img: 'bed3' },
      { title: 'Courtyard Home', city: 'Hyderabad', state: 'Telangana', year: 2021, type: 'Residential', area: '2,400 sq ft', scope: 'Full home + styling', img: 'living6' },
    ],
    brands: ['Asian Paints', 'Hettich', 'Greenlam', 'Philips'],
    recs: [['Neha & Kiran Rao', 'Modern Apartment, Bangalore', 'Riya understood our taste in the very first meeting. Every corner of our flat feels considered, and the storage is genius.', 5], ['Sandeep Varma', 'Garden-view 3 BHK, Hyderabad', 'Professional, patient and honest about budgets. We finished on time and exactly on quote.', 5]],
  },
  'arjun-patel': {
    based: 'Hyderabad, Telangana', rating: 4.9, reviews: 88, languages: ['English', 'Hindi', 'Gujarati'],
    expertise: [['Luxury Villas', 97], ['Architecture + Interiors', 92], ['Lighting Design', 90], ['Outdoor Living', 86]],
    highlights: [['2012', 'Founding member of the Decora villa studio'], ['2016', 'Delivered the first 5,000 sq ft signature villa'], ['2020', 'Designed the Chennai penthouse (6,400 sq ft)'], ['2024', 'Led the Jaipur Heritage Haveli restoration']],
    work: [
      { title: 'Penthouse', city: 'Chennai', state: 'Tamil Nadu', year: 2024, type: 'Luxury', area: '6,400 sq ft', scope: 'Turnkey', img: 'living5', id: 'penthouse' },
      { title: 'Heritage Haveli', city: 'Jaipur', state: 'Rajasthan', year: 2024, type: 'Luxury', area: '7,800 sq ft', scope: 'Restoration + interiors', img: 'living7', id: 'heritage-haveli' },
      { title: 'Garden Pavilion', city: 'Hyderabad', state: 'Telangana', year: 2023, type: 'Residential', area: '3,900 sq ft', scope: 'Turnkey', img: 'out4', id: 'garden-pavilion' },
      { title: 'Hillside Villa', city: 'Lonavala', state: 'Maharashtra', year: 2021, type: 'Luxury', area: '5,200 sq ft', scope: 'Turnkey', img: 'villa2' },
      { title: 'Lakeside Residence', city: 'Bangalore', state: 'Karnataka', year: 2020, type: 'Luxury', area: '4,300 sq ft', scope: 'Full home', img: 'out3' },
    ],
    brands: ['Kohler', 'Legrand', 'Häfele', 'Bosch'],
    recs: [['Mahesh Iyer', 'Penthouse, Chennai', 'Arjun orchestrated a dozen vendors without a single missed deadline. The end result is simply breathtaking.', 5], ['The Mehra Family', 'Hillside Villa, Lonavala', 'He treated our budget like his own and our home like a work of art.', 5]],
  },
  'sneha-rao': {
    based: 'Hyderabad, Telangana', rating: 5.0, reviews: 102, languages: ['English', 'Hindi', 'Telugu', 'Kannada'],
    expertise: [['Luxury Residences', 98], ['Hospitality Design', 93], ['Material Curation', 91], ['Team Leadership', 90]],
    highlights: [['2011', 'Started her career in hospitality interiors'], ['2015', 'Joined Decora as Lead Designer'], ['2019', 'Boutique Suite hospitality project delivered'], ['2023', 'Awarded Decora Lifetime Mentor']],
    work: [
      { title: 'Luxury Villa', city: 'Hyderabad', state: 'Telangana', year: 2024, type: 'Luxury', area: '5,000 sq ft', scope: 'Turnkey', img: 'villa1', id: 'luxury-villa' },
      { title: 'Villa Retreat', city: 'Kochi', state: 'Kerala', year: 2023, type: 'Luxury', area: '4,600 sq ft', scope: 'Turnkey', img: 'out3', id: 'villa-retreat' },
      { title: 'Boutique Suite', city: 'Hyderabad', state: 'Telangana', year: 2022, type: 'Commercial', area: '2,400 sq ft', scope: 'Hospitality', img: 'bed2', id: 'boutique-suite' },
      { title: 'Ocean View Apartment', city: 'Mumbai', state: 'Maharashtra', year: 2021, type: 'Luxury', area: '2,900 sq ft', scope: 'Full home', img: 'living1' },
      { title: 'Palm Grove Villa', city: 'Goa', state: 'Goa', year: 2020, type: 'Luxury', area: '3,800 sq ft', scope: 'Turnkey', img: 'out2' },
    ],
    brands: ['Kohler', 'Dulux', 'Häfele', 'Merino'],
    recs: [['Ananya & Rohit Reddy', 'Luxury Villa, Hyderabad', 'Sneha gave us a home that feels like a boutique hotel yet is unmistakably ours.', 5], ['Ravi Menon', 'Villa Retreat, Kochi', 'Her material eye is extraordinary — every finish felt chosen for us.', 5]],
  },
  'vikram-rao': {
    based: 'Pune, Maharashtra', rating: 4.8, reviews: 51, languages: ['English', 'Hindi', 'Marathi'],
    expertise: [['Modular Kitchens', 96], ['Ergonomics & Storage', 92], ['Compact Homes', 88], ['Industrial Style', 80]],
    highlights: [['2017', 'Joined Decora as kitchen specialist'], ['2020', 'Designed 60+ modular kitchens in a year'], ['2023', 'Urban Loft project featured in the portfolio']],
    work: [
      { title: 'Urban Loft', city: 'Pune', state: 'Maharashtra', year: 2024, type: 'Residential', area: '1,600 sq ft', scope: 'Full home', img: 'dining1', id: 'urban-loft' },
      { title: 'Chef’s Kitchen', city: 'Pune', state: 'Maharashtra', year: 2023, type: 'Residential', area: 'Kitchen · 280 sq ft', scope: 'Modular kitchen', img: 'kitchen1' },
      { title: 'Island Kitchen', city: 'Gurgaon', state: 'Delhi NCR', year: 2022, type: 'Residential', area: 'Kitchen · 220 sq ft', scope: 'Modular kitchen', img: 'kitchen3' },
      { title: 'Compact 2 BHK', city: 'Mumbai', state: 'Maharashtra', year: 2021, type: 'Residential', area: '820 sq ft', scope: 'Full home', img: 'apt2' },
    ],
    brands: ['Hettich', 'Blum', 'Century Ply', 'Faber'],
    recs: [['Aditi Joshi', 'Urban Loft, Pune', 'Vikram found storage we didn’t know we had. The kitchen is a joy to cook in.', 5], ['Rahul & Meera', 'Chef’s Kitchen, Pune', 'Precise, practical and quick — the fit and finish are factory-perfect.', 4.5]],
  },
  'priya-nair': {
    based: 'Kochi, Kerala', rating: 4.9, reviews: 47, languages: ['English', 'Malayalam', 'Hindi'],
    expertise: [['Minimalist Design', 95], ['Scandinavian Style', 92], ['Natural Light Planning', 90], ['Sustainable Materials', 86]],
    highlights: [['2018', 'Joined Decora’s Kochi studio'], ['2021', 'Introduced the Quiet Living collection'], ['2024', 'Scandi Home series delivered in Gurgaon']],
    work: [
      { title: 'Scandi Home', city: 'Gurgaon', state: 'Delhi NCR', year: 2024, type: 'Residential', area: '2,100 sq ft', scope: 'Full home', img: 'living8', id: 'scandi-home' },
      { title: 'Family Home', city: 'Mumbai', state: 'Maharashtra', year: 2023, type: 'Residential', area: '3,200 sq ft', scope: 'Full home', img: 'living6', id: 'family-home' },
      { title: 'Backwater Retreat', city: 'Alleppey', state: 'Kerala', year: 2022, type: 'Residential', area: '1,900 sq ft', scope: 'Full home', img: 'living12' },
      { title: 'Calm Studio', city: 'Kochi', state: 'Kerala', year: 2021, type: 'Residential', area: '780 sq ft', scope: 'Full home', img: 'bed4' },
    ],
    brands: ['Asian Paints', 'Greenlam', 'Jaquar', 'Havells'],
    recs: [['Shruti Kulkarni', 'Scandi Home, Gurgaon', 'Priya made a compact flat feel twice the size. Calm, bright, beautifully finished.', 5], ['Thomas George', 'Backwater Retreat, Alleppey', 'She listens first and designs second. The result is peaceful and perfectly us.', 5]],
  },
  'karan-mehta': {
    based: 'Delhi NCR', rating: 4.8, reviews: 73, languages: ['English', 'Hindi', 'Punjabi'],
    expertise: [['Workplace Strategy', 95], ['Commercial Interiors', 94], ['Acoustics & Lighting', 88], ['Brand Spaces', 85]],
    highlights: [['2010', 'Began his career in corporate fit-outs'], ['2014', 'Joined Decora to build the commercial studio'], ['2021', 'Delivered the 12,000 sq ft corporate HQ'], ['2024', 'Executive floor for a Bangalore enterprise']],
    work: [
      { title: 'Office Space HQ', city: 'Delhi NCR', state: 'Delhi NCR', year: 2024, type: 'Commercial', area: '12,000 sq ft', scope: 'Turnkey fit-out', img: 'office1', id: 'office-space' },
      { title: 'Corporate Lounge', city: 'Bangalore', state: 'Karnataka', year: 2024, type: 'Commercial', area: '8,500 sq ft', scope: 'Executive floor', img: 'office2', id: 'corporate-lounge' },
      { title: 'Studio Workspace', city: 'Hyderabad', state: 'Telangana', year: 2022, type: 'Commercial', area: '4,200 sq ft', scope: 'Creative studio', img: 'office3' },
      { title: 'Retail Flagship', city: 'Mumbai', state: 'Maharashtra', year: 2021, type: 'Commercial', area: '3,000 sq ft', scope: 'Retail', img: 'living11' },
    ],
    brands: ['Philips', 'Legrand', 'Greenlam', 'Kajaria'],
    recs: [['Priyanka Nair', 'Operations Head, Delhi NCR', 'Karan delivered a flawless workplace two weeks early. Our team genuinely loves coming in.', 5], ['A. Subramanian', 'Director, Bangalore', 'Strategic, calm under pressure and obsessive about detail.', 4.5]],
  },
};
