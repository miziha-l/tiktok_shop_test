export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  sold: string;
  badge?: string;
  image: string;
  images: string[];
  colors: { name: string; value: string }[];
  sizes?: string[];
  description: string;
  details: string[];
  seller: string;
  sellerRating: number;
  delivery: string;
};

const img = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=88`;

export const products: Product[] = [
  {
    id: 'studio-hoodie',
    name: 'Studio Oversized Hoodie',
    category: 'Fashion',
    price: 48,
    originalPrice: 72,
    rating: 4.9,
    reviews: 2184,
    sold: '12.8K',
    badge: 'Best seller',
    image: img('photo-1556821840-3a63f95609a7'),
    images: [
      img('photo-1556821840-3a63f95609a7'),
      img('photo-1620799140408-edc6dcb6d633'),
      img('photo-1503341504253-dff4815485f1'),
    ],
    colors: [
      { name: 'Stone', value: '#c5bfb2' },
      { name: 'Midnight', value: '#1b1b1f' },
      { name: 'Cherry', value: '#a9343a' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'The everyday layer, perfected. Cut from heavyweight brushed cotton with a relaxed silhouette and subtly dropped shoulders.',
    details: ['420gsm brushed cotton', 'Relaxed unisex fit', 'Pre-washed for a soft hand feel', 'Machine wash cold'],
    seller: 'North Studio',
    sellerRating: 4.9,
    delivery: 'Free delivery in 2–4 days',
  },
  {
    id: 'sonic-headphones',
    name: 'Sonic Air Max Headphones',
    category: 'Tech',
    price: 89,
    originalPrice: 129,
    rating: 4.8,
    reviews: 3659,
    sold: '24.1K',
    badge: 'Trending',
    image: img('photo-1505740420928-5e560c06d30e'),
    images: [
      img('photo-1505740420928-5e560c06d30e'),
      img('photo-1484704849700-f032a568e944'),
      img('photo-1546435770-a3e426bf472b'),
    ],
    colors: [
      { name: 'Sand', value: '#d1bfa7' },
      { name: 'Ink', value: '#22252a' },
      { name: 'Cloud', value: '#eeeeea' },
    ],
    description:
      'Immersive sound with adaptive noise cancellation, spatial audio, and cloud-soft ear cushions made for all-day listening.',
    details: ['40-hour battery life', 'Adaptive ANC', 'Bluetooth 5.3', 'USB-C fast charging'],
    seller: 'Sonic Works',
    sellerRating: 4.8,
    delivery: 'Free next-day delivery',
  },
  {
    id: 'cloud-runner',
    name: 'Cloud Runner 02',
    category: 'Fashion',
    price: 68,
    originalPrice: 98,
    rating: 4.7,
    reviews: 1642,
    sold: '8.7K',
    badge: '30% off',
    image: img('photo-1542291026-7eec264c27ff'),
    images: [
      img('photo-1542291026-7eec264c27ff'),
      img('photo-1549298916-b41d501d3772'),
      img('photo-1600269452121-4f2416e55c28'),
    ],
    colors: [
      { name: 'Signal red', value: '#e73836' },
      { name: 'Bone', value: '#dedbd0' },
    ],
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    description:
      'A light, responsive everyday sneaker with a sculpted sole and breathable knit upper.',
    details: ['Recycled knit upper', 'High-rebound foam', 'Rubber traction pods', 'Fits true to size'],
    seller: 'Runwell',
    sellerRating: 4.7,
    delivery: 'Delivery in 3–5 days',
  },
  {
    id: 'dew-serum',
    name: 'Glass Skin Dew Serum',
    category: 'Beauty',
    price: 24,
    originalPrice: 32,
    rating: 4.9,
    reviews: 5284,
    sold: '38.3K',
    badge: 'Viral pick',
    image: img('photo-1620916566398-39f1143ab7be'),
    images: [
      img('photo-1620916566398-39f1143ab7be'),
      img('photo-1611930022073-b7a4ba5fcccd'),
      img('photo-1598440947619-2c35fc9aa908'),
    ],
    colors: [{ name: '30ml', value: '#efddd1' }],
    description:
      'A daily barrier-support serum powered by niacinamide, peptides, and snow mushroom for instant, cushiony hydration.',
    details: ['Dermatologist tested', 'Fragrance free', 'Vegan and cruelty free', 'For all skin types'],
    seller: 'Then I Met Dew',
    sellerRating: 4.9,
    delivery: 'Free delivery in 2–4 days',
  },
  {
    id: 'orbit-lamp',
    name: 'Orbit Ambient Lamp',
    category: 'Home',
    price: 54,
    originalPrice: 65,
    rating: 4.8,
    reviews: 874,
    sold: '5.2K',
    badge: 'Editor’s pick',
    image: img('photo-1507473885765-e6ed057f782c'),
    images: [
      img('photo-1507473885765-e6ed057f782c'),
      img('photo-1513506003901-1e6a229e2d15'),
      img('photo-1540932239986-30128078f3c5'),
    ],
    colors: [
      { name: 'Chrome', value: '#b8b9b9' },
      { name: 'Tangerine', value: '#ef7448' },
    ],
    description:
      'A dimmable sculptural lamp that casts a warm, cinematic glow across desks, shelves, and bedside tables.',
    details: ['Touch dimmer', '2700K warm LED', 'Braided 1.8m cable', 'Energy efficient'],
    seller: 'Good Space',
    sellerRating: 4.8,
    delivery: 'Delivery in 3–5 days',
  },
  {
    id: 'muse-bag',
    name: 'Muse Mini Shoulder Bag',
    category: 'Fashion',
    price: 42,
    originalPrice: 56,
    rating: 4.6,
    reviews: 942,
    sold: '6.1K',
    image: img('photo-1584917865442-de89df76afd3'),
    images: [
      img('photo-1584917865442-de89df76afd3'),
      img('photo-1559563458-527698bf5295'),
      img('photo-1594223274512-ad4803739b7c'),
    ],
    colors: [
      { name: 'Espresso', value: '#48352d' },
      { name: 'Butter', value: '#e7d79f' },
      { name: 'Black', value: '#161616' },
    ],
    description:
      'A compact baguette silhouette with a surprising amount of space and a smooth adjustable strap.',
    details: ['Soft vegan leather', 'Magnetic closure', 'Interior card pocket', 'Adjustable strap'],
    seller: 'Muse Objects',
    sellerRating: 4.7,
    delivery: 'Free delivery in 2–4 days',
  },
  {
    id: 'pocket-camera',
    name: 'Pocket Digital Camera',
    category: 'Tech',
    price: 76,
    originalPrice: 99,
    rating: 4.7,
    reviews: 1208,
    sold: '9.5K',
    badge: 'Creator favorite',
    image: img('photo-1526170375885-4d8ecf77b99f'),
    images: [
      img('photo-1526170375885-4d8ecf77b99f'),
      img('photo-1516035069371-29a1b244cc32'),
      img('photo-1502920917128-1aa500764cbd'),
    ],
    colors: [
      { name: 'Silver', value: '#c6c5c0' },
      { name: 'Black', value: '#282828' },
    ],
    description:
      'Pocket-sized nostalgia with modern ease. Capture warm, flash-lit stills and lo-fi video wherever you go.',
    details: ['48MP stills', '1080p video', 'Built-in flash', 'Includes 32GB card'],
    seller: 'Good Days Camera',
    sellerRating: 4.7,
    delivery: 'Delivery in 3–5 days',
  },
  {
    id: 'sunday-throw',
    name: 'Sunday Woven Throw',
    category: 'Home',
    price: 38,
    originalPrice: 49,
    rating: 4.8,
    reviews: 611,
    sold: '3.8K',
    image: img('photo-1583845112203-454c2254ed89'),
    images: [
      img('photo-1583845112203-454c2254ed89'),
      img('photo-1600369671236-e74521d4b6ad'),
    ],
    colors: [
      { name: 'Oat', value: '#d6c7ab' },
      { name: 'Sage', value: '#9da894' },
    ],
    description: 'A soft, textural layer woven from a breathable cotton blend for slow Sundays and cool evenings.',
    details: ['130 x 170cm', 'Cotton blend', 'Tassel edge', 'Machine washable'],
    seller: 'Sunday Supply',
    sellerRating: 4.8,
    delivery: 'Free delivery in 2–4 days',
  },
];

export const categories = ['All', 'Fashion', 'Beauty', 'Tech', 'Home'];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function money(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
