const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  living1: '1618221195710-dd6b41faaea6',
  living2: '1600210492486-724fe5c67fb0',
  living3: '1616486338812-3dadae4b4ace',
  living4: '1600607687939-ce8a6c25118c',
  living5: '1600121848594-d8644e57abab',
  living6: '1560448204-e02f11c3d0e2',
  living7: '1600210491892-03d54c0aaf87',
  living8: '1583847268964-b28dc8f51f92',
  living9: '1631679706909-1844bbd07221',
  living10: '1556228453-efd6c1ff04f6',
  living11: '1600566753086-00f18fb6b3ea',
  living12: '1604014237800-1c9102c219da',
  bed1: '1616594039964-ae9021a400a0',
  bed2: '1615874959474-d609969a20ed',
  bed3: '1540518614846-7eded433c457',
  bed4: '1595526114035-0d45ed16cfbf',
  kitchen1: '1556911220-bff31c812dba',
  kitchen2: '1600489000022-c2086d79f9d4',
  kitchen3: '1600585152220-90363fe7e115',
  dining1: '1600607687920-4e2a09cf159d',
  dining2: '1617806118233-18e1de247200',
  bath1: '1600566752355-35792bedcfea',
  bath2: '1584622650111-993a426fbf0a',
  office1: '1497366811353-6870744d04b2',
  office2: '1497366216548-37526070297c',
  office3: '1502672260266-1c1ef2d93688',
  out1: '1600573472550-8090b5e0745e',
  out2: '1564013799919-ab600027ffc6',
  out3: '1512917774080-9991f1c4c750',
  out4: '1613490493576-7fde63acd811',
  villa1: '1600585154340-be6161a56a0c',
  villa2: '1600566753190-17f0baa2a6c3',
  villa3: '1600607688969-a5bfcd646154',
  villa4: '1558036117-15d82a90b9b1',
  apt1: '1522708323590-d24dbb6b0267',
  apt2: '1493809842364-78817add7ffb',
  apt3: '1618219908412-a29a1bb7b86e',
  apt4: '1586023492125-27b2c045efd7',
  p1: '1573496359142-b8d87734a5a2',
  p2: '1507003211169-0a1dd7228f2d',
  p3: '1494790108377-be9c29b29330',
  p4: '1472099645785-5658abf4ff4e',
  p5: '1438761681033-6461ffad8d80',
  p6: '1500648767791-00dcc994a43e',
};

export const img = (key, w) => u(IMG[key], w);

export const ROOMS = [
  { id: 'living', name: 'Living Room', tag: 'Comfort & Style', img: 'living1', desc: 'Statement sofas, layered lighting and warm natural textures.' },
  { id: 'bedroom', name: 'Bedroom', tag: 'Rest & Relax', img: 'bed1', desc: 'Serene sanctuaries finished in soft fabrics and rich tones.' },
  { id: 'kitchen', name: 'Kitchen', tag: 'Cook & Connect', img: 'kitchen1', desc: 'Modular luxury kitchens engineered for beauty and flow.' },
  { id: 'dining', name: 'Dining Room', tag: 'Dine in Elegance', img: 'dining2', desc: 'Gather around tables designed to turn meals into moments.' },
  { id: 'bathroom', name: 'Bathroom', tag: 'Spa-Like Living', img: 'bath1', desc: 'Calm, spa-inspired retreats in stone, brass and glass.' },
  { id: 'office', name: 'Office', tag: 'Work in Style', img: 'office1', desc: 'Workspaces that inspire focus and leave a lasting impression.' },
  { id: 'outdoor', name: 'Outdoor', tag: 'Live Outdoors', img: 'out2', desc: 'Terraces, pools and gardens that extend your living space.' },
  { id: 'luxury', name: 'Luxury', tag: 'Timeless Elegance', img: 'living7', desc: 'Bespoke, high-end interiors with uncompromising detail.' },
  { id: 'minimal', name: 'Minimalist', tag: 'Less is More', img: 'living8', desc: 'Quiet, uncluttered spaces where every piece earns its place.' },
];

export const STATES = ['Telangana', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Kerala', 'Delhi NCR', 'Others'];
export const STYLES = ['Modern', 'Minimalist', 'Luxury', 'Traditional', 'Scandinavian'];
export const ROOM_FILTERS = ['Living Room', 'Bedroom', 'Kitchen', 'Dining Room', 'Bathroom', 'Office', 'Outdoor'];

export const DESIGNS = [
  { id: 1, title: 'Elegant Living Room', city: 'Hyderabad', state: 'Telangana', room: 'Living Room', style: 'Luxury', img: 'living1' },
  { id: 2, title: 'Sunlit Lounge', city: 'Bangalore', state: 'Karnataka', room: 'Living Room', style: 'Modern', img: 'living2' },
  { id: 3, title: 'Midnight Suite', city: 'Mumbai', state: 'Maharashtra', room: 'Bedroom', style: 'Luxury', img: 'bed1' },
  { id: 4, title: 'Boho Retreat', city: 'Chennai', state: 'Tamil Nadu', room: 'Living Room', style: 'Scandinavian', img: 'living3' },
  { id: 5, title: 'Gallery Kitchen', city: 'Hyderabad', state: 'Telangana', room: 'Kitchen', style: 'Minimalist', img: 'kitchen1' },
  { id: 6, title: 'Emerald Dining', city: 'Kochi', state: 'Kerala', room: 'Dining Room', style: 'Luxury', img: 'dining2' },
  { id: 7, title: 'Open Plan Loft', city: 'Delhi', state: 'Delhi NCR', room: 'Living Room', style: 'Modern', img: 'living4' },
  { id: 8, title: 'Spa Bathroom', city: 'Bangalore', state: 'Karnataka', room: 'Bathroom', style: 'Minimalist', img: 'bath1' },
  { id: 9, title: 'Sky Terrace Pool', city: 'Mumbai', state: 'Maharashtra', room: 'Outdoor', style: 'Modern', img: 'out1' },
  { id: 10, title: 'Studio Workspace', city: 'Hyderabad', state: 'Telangana', room: 'Office', style: 'Modern', img: 'office1' },
  { id: 11, title: 'Heritage Parlour', city: 'Chennai', state: 'Tamil Nadu', room: 'Living Room', style: 'Traditional', img: 'living7' },
  { id: 12, title: 'Calm Bedroom', city: 'Pune', state: 'Maharashtra', room: 'Bedroom', style: 'Scandinavian', img: 'bed3' },
  { id: 13, title: 'Island Kitchen', city: 'Gurgaon', state: 'Delhi NCR', room: 'Kitchen', style: 'Modern', img: 'kitchen3' },
  { id: 14, title: 'Marble Bath', city: 'Kochi', state: 'Kerala', room: 'Bathroom', style: 'Luxury', img: 'bath2' },
  { id: 15, title: 'Garden Terrace', city: 'Hyderabad', state: 'Telangana', room: 'Outdoor', style: 'Traditional', img: 'out3' },
  { id: 16, title: 'Executive Suite', city: 'Bangalore', state: 'Karnataka', room: 'Office', style: 'Luxury', img: 'office2' },
  { id: 17, title: 'Linen Living', city: 'Jaipur', state: 'Others', room: 'Living Room', style: 'Minimalist', img: 'living8' },
  { id: 18, title: 'Warm Dining Hall', city: 'Mumbai', state: 'Maharashtra', room: 'Dining Room', style: 'Modern', img: 'dining1' },
];

export const DESIGNERS = [
  { id: 'riya-sharma', name: 'Riya Sharma', role: 'Interior Designer', title: 'Interior Designer', img: 'p3', years: 9, projects: 120, speciality: 'Residential · Warm Modern', bio: 'Riya blends warm textures with clean lines to create homes that feel instantly lived-in. She leads our residential studio in Hyderabad.' },
  { id: 'arjun-patel', name: 'Arjun Patel', role: 'Senior Designer', title: 'Senior Designer', img: 'p2', years: 12, projects: 210, speciality: 'Luxury Villas · Contemporary', bio: 'Arjun specialises in large-format luxury villas, orchestrating architecture, joinery and lighting into one seamless vision.' },
  { id: 'sneha-rao', name: 'Sneha Rao', role: 'Lead Designer', title: 'Lead Designer', img: 'p1', years: 14, projects: 260, speciality: 'Luxury · Hospitality', bio: 'With fourteen years of experience, Sneha leads our flagship luxury projects and mentors the studio’s design team.' },
  { id: 'vikram-rao', name: 'Vikram Rao', role: 'Design Expert', title: 'Design Expert', img: 'p6', years: 8, projects: 95, speciality: 'Kitchens · Modular', bio: 'Vikram obsesses over proportion and ergonomics, crafting modular kitchens and wardrobes that are as functional as they are beautiful.' },
  { id: 'priya-nair', name: 'Priya Nair', role: 'Interior Designer', title: 'Interior Designer', img: 'p5', years: 7, projects: 88, speciality: 'Minimalist · Scandinavian', bio: 'Priya’s calm, pared-back interiors are built around natural light, quality materials and quiet detail.' },
  { id: 'karan-mehta', name: 'Karan Mehta', role: 'Design Consultant', title: 'Design Consultant', img: 'p4', years: 15, projects: 300, speciality: 'Commercial · Offices', bio: 'Karan advises businesses on workplace strategy and designs offices that attract talent and impress clients.' },
];

export const PROJECT_FILTERS = ['All', 'Residential', 'Commercial', 'Luxury', 'Modern', 'Traditional'];

export const PROJECTS = [
  {
    id: 'luxury-villa', title: 'Luxury Villa', city: 'Hyderabad', state: 'Telangana', cats: ['Residential', 'Luxury', 'Modern'], style: 'Modern Luxury', cover: 'villa1',
    summary: 'A modern luxury villa designed with elegant interiors, premium materials and open spaces.', bhk: '4 BHK Villa', area: '5,000 Sq Ft', duration: '9 months', palette: ['#1f3a2e', '#c9a35b', '#e9dfcf', '#6b4a33', '#f6f0e6'], designer: 'sneha-rao',
    gallery: ['villa1', 'living7', 'bed1', 'kitchen1', 'bath1', 'out2'],
    materials: [['Italian Marble', 'Statuario slabs for floors and feature walls'], ['American Walnut', 'Custom veneer joinery and panelling'], ['Brushed Brass', 'Hardware, trims and fixtures'], ['Fluted Glass', 'Partitions that diffuse natural light']],
  },
  {
    id: 'modern-apartment', title: 'Modern Apartment', city: 'Bangalore', state: 'Karnataka', cats: ['Residential', 'Modern'], style: 'Contemporary', cover: 'apt1',
    summary: 'A compact 3 BHK reimagined with smart storage, layered lighting and a warm neutral palette.', bhk: '3 BHK Apartment', area: '1,850 Sq Ft', duration: '5 months', palette: ['#2f4a3c', '#d8b36a', '#efe7da', '#8a6a4f', '#fbf8f2'], designer: 'riya-sharma',
    gallery: ['apt1', 'living2', 'apt2', 'kitchen3', 'bath2', 'apt3'],
    materials: [['Oak Veneer', 'Light wood tones throughout'], ['Quartz', 'Seamless kitchen countertops'], ['Linen & Bouclé', 'Soft, tactile upholstery'], ['Matte Black Metal', 'Slim accents and frames']],
  },
  {
    id: 'family-home', title: 'Family Home', city: 'Mumbai', state: 'Maharashtra', cats: ['Residential', 'Traditional'], style: 'Transitional', cover: 'living6',
    summary: 'A welcoming family residence that balances classic character with everyday comfort.', bhk: '4 BHK Home', area: '3,200 Sq Ft', duration: '7 months', palette: ['#2a4235', '#c79a52', '#eadfcb', '#5f4330', '#f7f1e6'], designer: 'priya-nair',
    gallery: ['living6', 'living3', 'bed2', 'dining2', 'kitchen2', 'bed4'],
    materials: [['Teak Wood', 'Warm, durable furniture and doors'], ['Handloom Textiles', 'Locally woven rugs and drapes'], ['Terrazzo', 'Hard-wearing kitchen flooring'], ['Cane', 'Natural weave detailing']],
  },
  {
    id: 'office-space', title: 'Office Space', city: 'Delhi NCR', state: 'Delhi NCR', cats: ['Commercial', 'Modern'], style: 'Corporate Modern', cover: 'office1',
    summary: 'A headquarter workplace that fuses collaboration zones, acoustic comfort and brand storytelling.', bhk: 'Corporate HQ', area: '12,000 Sq Ft', duration: '6 months', palette: ['#1b2f27', '#e0b25a', '#d9d4c8', '#44505a', '#f4f1ea'], designer: 'karan-mehta',
    gallery: ['office1', 'office2', 'office3', 'living11', 'dining1', 'living4'],
    materials: [['Acoustic Panels', 'Felt and timber baffles'], ['Polished Concrete', 'Industrial, honest flooring'], ['Steel & Glass', 'Light-filled partitions'], ['Biophilic Planting', 'Living walls and planters']],
  },
  {
    id: 'penthouse', title: 'Penthouse', city: 'Chennai', state: 'Tamil Nadu', cats: ['Residential', 'Luxury', 'Modern'], style: 'Contemporary Luxury', cover: 'living5',
    summary: 'A sky-high penthouse with panoramic views, dramatic double-height volumes and bespoke furniture.', bhk: '5 BHK Penthouse', area: '6,400 Sq Ft', duration: '11 months', palette: ['#1d362b', '#b98f4a', '#e6dccb', '#3d3a36', '#f5efe4'], designer: 'arjun-patel',
    gallery: ['living5', 'living1', 'bed1', 'dining1', 'out1', 'bath1'],
    materials: [['Onyx', 'Backlit feature panels'], ['Smoked Oak', 'Deep, dramatic flooring'], ['Bronze', 'Sculptural lighting and handles'], ['Velvet', 'Rich upholstery accents']],
  },
  {
    id: 'villa-retreat', title: 'Villa Retreat', city: 'Kochi', state: 'Kerala', cats: ['Residential', 'Luxury', 'Traditional'], style: 'Tropical Contemporary', cover: 'out3',
    summary: 'A tropical retreat where indoor and outdoor living merge around a private pool and garden.', bhk: '4 BHK Villa', area: '4,600 Sq Ft', duration: '10 months', palette: ['#27412f', '#c3a15f', '#e8dfcc', '#69523a', '#f7f2e8'], designer: 'sneha-rao',
    gallery: ['out3', 'out4', 'out2', 'living12', 'bed3', 'bath2'],
    materials: [['Laterite Stone', 'Locally quarried facade cladding'], ['Rosewood', 'Intricate carved screens'], ['Granite', 'Pool decks and bathrooms'], ['Terracotta', 'Hand-finished tiles']],
  },
  {
    id: 'urban-loft', title: 'Urban Loft', city: 'Pune', state: 'Maharashtra', cats: ['Residential', 'Modern'], style: 'Industrial Chic', cover: 'dining1',
    summary: 'A loft with exposed textures, black steel and warm timber for a gallery-like city home.', bhk: '2 BHK Loft', area: '1,600 Sq Ft', duration: '4 months', palette: ['#222b27', '#cfa459', '#dcd5c8', '#4b3a2d', '#f2ede4'], designer: 'vikram-rao',
    gallery: ['dining1', 'living4', 'bath1', 'kitchen2', 'bed4', 'apt2'],
    materials: [['Exposed Concrete', 'Raw, honest ceilings'], ['Blackened Steel', 'Stair and partitions'], ['Reclaimed Wood', 'Warm, characterful shelves'], ['Glass', 'Light-sharing dividers']],
  },
  {
    id: 'boutique-suite', title: 'Boutique Suite', city: 'Hyderabad', state: 'Telangana', cats: ['Commercial', 'Luxury'], style: 'Hospitality Luxury', cover: 'bed2',
    summary: 'A hospitality suite that layers velvet, brass and soft lighting for a five-star mood.', bhk: 'Boutique Hotel', area: '2,400 Sq Ft', duration: '5 months', palette: ['#20382d', '#d1a95e', '#e7dccb', '#5a3f2d', '#f7f1e7'], designer: 'sneha-rao',
    gallery: ['bed2', 'bed1', 'bed4', 'bath2', 'living3', 'dining2'],
    materials: [['Velvet', 'Rich headboards and drapery'], ['Brass', 'Warm metallic detailing'], ['Marble', 'Bathroom vanities'], ['Silk', 'Wall coverings']],
  },
  {
    id: 'heritage-haveli', title: 'Heritage Haveli', city: 'Jaipur', state: 'Others', cats: ['Residential', 'Traditional', 'Luxury'], style: 'Contemporary Heritage', cover: 'living7',
    summary: 'A restored haveli where archways, handcrafted jaali and contemporary comfort coexist.', bhk: '6 BHK Haveli', area: '7,800 Sq Ft', duration: '14 months', palette: ['#2b3f30', '#bf9a56', '#ebdfca', '#704c34', '#f7f0e3'], designer: 'arjun-patel',
    gallery: ['living7', 'living6', 'bed2', 'dining2', 'out3', 'living12'],
    materials: [['Jaipur Sandstone', 'Hand-carved screens'], ['Brass Inlay', 'Traditional craft detailing'], ['Block-Printed Fabric', 'Local artisans’ textiles'], ['Lime Plaster', 'Breathable, textured walls']],
  },
  {
    id: 'scandi-home', title: 'Scandi Home', city: 'Gurgaon', state: 'Delhi NCR', cats: ['Residential', 'Modern'], style: 'Scandinavian', cover: 'living8',
    summary: 'Pale woods, soft textiles and abundant daylight make this home feel calm and open.', bhk: '3 BHK Apartment', area: '2,100 Sq Ft', duration: '5 months', palette: ['#31493c', '#d9bb7a', '#f0eadf', '#9a7b5c', '#fcfaf6'], designer: 'priya-nair',
    gallery: ['living8', 'apt4', 'bed3', 'kitchen1', 'bath2', 'apt3'],
    materials: [['Ash Wood', 'Pale, grain-forward joinery'], ['Wool', 'Soft rugs and throws'], ['Ceramic', 'Handmade accessories'], ['Frosted Glass', 'Gentle light diffusion']],
  },
  {
    id: 'corporate-lounge', title: 'Corporate Lounge', city: 'Bangalore', state: 'Karnataka', cats: ['Commercial', 'Luxury', 'Modern'], style: 'Executive Modern', cover: 'office2',
    summary: 'An executive lounge and boardroom designed for confident, understated hospitality.', bhk: 'Executive Floor', area: '8,500 Sq Ft', duration: '6 months', palette: ['#1d3329', '#c9a45c', '#d8d2c6', '#3c3f45', '#f5f2ea'], designer: 'karan-mehta',
    gallery: ['office2', 'office1', 'office3', 'living11', 'dining1', 'living9'],
    materials: [['Leather', 'Hand-stitched seating'], ['Walnut Veneer', 'Boardroom paneling'], ['Bronze Mirror', 'Reflective accents'], ['Wool Carpet', 'Acoustic, plush flooring']],
  },
  {
    id: 'garden-pavilion', title: 'Garden Pavilion', city: 'Hyderabad', state: 'Telangana', cats: ['Residential', 'Modern'], style: 'Indoor-Outdoor', cover: 'out4',
    summary: 'A glass pavilion and pool terrace built for long evenings and effortless entertaining.', bhk: 'Pool Villa', area: '3,900 Sq Ft', duration: '8 months', palette: ['#26402f', '#d1ab5f', '#e9e2d3', '#4f6a74', '#f8f4ec'], designer: 'arjun-patel',
    gallery: ['out4', 'out2', 'out1', 'villa2', 'living11', 'living12'],
    materials: [['Travertine', 'Cool, slip-resistant decks'], ['Teak Decking', 'Warm outdoor lounges'], ['Aluminium Glazing', 'Slim, floor-to-ceiling frames'], ['Mosaic Tile', 'Pool lining']],
  },
];

export const VALUES = [
  { icon: 'Gem', title: 'Design Excellence', text: 'Every line, joint and finish is considered by senior designers.' },
  { icon: 'Handshake', title: 'Client First', text: 'Your lifestyle leads the brief — we listen before we draw.' },
  { icon: 'ShieldCheck', title: 'Premium Quality', text: 'Certified materials and master craftsmen, backed by warranty.' },
  { icon: 'Leaf', title: 'Sustainable Living', text: 'Responsibly sourced materials and energy-smart design.' },
];

export const PROCESS = [
  { n: '01', title: 'Discover', text: 'A private consultation to understand your space, taste and budget.' },
  { n: '02', title: 'Design', text: 'Concept boards, 3D walkthroughs and a curated material palette.' },
  { n: '03', title: 'Deliver', text: 'In-house craftsmen build, install and style to the last detail.' },
  { n: '04', title: 'Delight', text: 'A white-glove handover with a 10-year structural warranty.' },
];

export const TESTIMONIALS = [
  { name: 'Ananya & Rohit Reddy', place: 'Luxury Villa, Hyderabad', text: 'Decora turned our blueprint into a home that feels like a boutique hotel — yet is unmistakably ours. Flawless execution and zero stress.', img: 'p3' },
  { name: 'Mahesh Iyer', place: 'Penthouse, Chennai', text: 'The attention to detail is extraordinary. Every material was explained, every deadline met. Our friends think we hired a magazine stylist.', img: 'p4' },
  { name: 'Shruti Kulkarni', place: 'Modern Apartment, Pune', text: 'They made a compact apartment feel twice the size. Smart storage, gorgeous finishes and a team that truly listens.', img: 'p5' },
];

export const STATS = [
  { value: '5K+', label: 'Happy Clients' },
  { value: '500+', label: 'Projects' },
  { value: '25+', label: 'States' },
  { value: '12', label: 'Years of Craft' },
];

export const MARQUEE = ['Bespoke Joinery', 'Italian Marble', 'Turnkey Execution', 'Smart Home Ready', '3D Walkthroughs', '10-Year Warranty', 'Master Craftsmen', 'Sustainable Materials'];

export const SERVICES = [
  { icon: 'Home', title: 'Full Home Interiors', text: 'End-to-end design and build for apartments, villas and independent homes.' },
  { icon: 'CookingPot', title: 'Modular Kitchens', text: 'Precision-engineered cabinetry with premium hardware and finishes.' },
  { icon: 'Sofa', title: 'Living & Dining', text: 'Layered, comfortable spaces made for hosting and everyday life.' },
  { icon: 'Lamp', title: 'Lighting & Styling', text: 'Curated lighting plans, art and soft furnishings for the final polish.' },
  { icon: 'Building2', title: 'Luxury Villas', text: 'Large-format residences with bespoke furniture and detailing.' },
  { icon: 'Briefcase', title: 'Offices & Retail', text: 'Brand-led commercial interiors that impress clients and teams.' },
];

export const PROMISES = [
  { icon: 'Box', title: 'Free 3D Visualisation', text: 'Walk through your home before a single wall is touched.' },
  { icon: 'Wallet', title: 'Transparent Pricing', text: 'Itemised quotes. No hidden charges, ever.' },
  { icon: 'UserCheck', title: 'Dedicated Manager', text: 'One point of contact from first sketch to handover.' },
  { icon: 'ShieldCheck', title: '10-Year Warranty', text: 'Long-term cover on structure and core workmanship.' },
];

export const FAQS = [
  ['How long does a full-home interior project take?', 'Most 2–3 BHK homes are completed in 45–75 days after design sign-off. Villas and large commercial spaces typically take 4–8 months.'],
  ['Do you work outside Hyderabad?', 'Yes. We deliver projects across 25+ states with local site teams and a dedicated project manager.'],
  ['Can I see the design before work begins?', 'Always. You receive 3D renders and a material board for approval before production starts.'],
  ['How is pricing structured?', 'You get an itemised quotation covering design, materials, labour and installation, so you know exactly where every rupee goes.'],
  ['What warranty do you provide?', 'We offer a 10-year warranty on structure and core workmanship, plus manufacturer warranties on hardware and appliances.'],
];

export const MILESTONES = [
  { year: '2013', title: 'Decora is founded', text: 'A two-person studio opens in Hyderabad with a single idea: honest, beautiful design.' },
  { year: '2016', title: 'First luxury villa', text: 'Our first 5,000 sq ft villa sets the standard for craftsmanship and detail.' },
  { year: '2019', title: 'Going national', text: 'Studios and site teams expand across ten states.' },
  { year: '2022', title: '5,000 homes', text: 'A milestone reached by a team of 150+ designers and craftsmen.' },
  { year: '2025', title: '25+ states', text: 'Decora homes now stretch from Kerala to Delhi NCR and beyond.' },
];
