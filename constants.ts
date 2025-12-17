
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Velvet Rose Cleanser',
    description: 'A gentle, hydrating cleanser infused with Bulgarian rose water and vitamin E. Perfectly balances skin pH while removing impurities.',
    price: 32,
    category: 'Skincare',
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d521?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.8,
    ingredients: ['Rose Water', 'Vitamin E', 'Glycerin', 'Aloe Vera'],
    howToUse: 'Massage 2-3 pumps onto damp skin in circular motions. Rinse with lukewarm water.'
  },
  {
    id: '2',
    name: 'Blonde Honey Lip Mask',
    description: 'Overnight repair for chapped lips using medical-grade manuka honey and shea butter. Wake up to soft, supple lips.',
    price: 18,
    category: 'Lipcare',
    images: [
      'https://images.unsplash.com/photo-1616150840617-6644621c10ba?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.9,
    ingredients: ['Manuka Honey', 'Shea Butter', 'Beeswax', 'Jojoba Oil'],
    howToUse: 'Apply a generous layer before bed. Can also be used as a heavy balm during the day.'
  },
  {
    id: '3',
    name: 'Burgundy Berry Tint',
    description: 'A deeply moisturizing lip tint with a rich burgundy finish and SPF 15. Natural pigments meet luxury hydration.',
    price: 15,
    category: 'Lipcare',
    images: [
      'https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1625006023674-87113ec4b6d8?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.5,
    ingredients: ['Wild Berry Extract', 'Coconut Oil', 'Vitamin E'],
    howToUse: 'Swipe across lips for a sheer tint. Layer for more intense burgundy pigment.'
  },
  {
    id: '4',
    name: 'Golden Glow Serum',
    description: 'High-potency Vitamin C serum that brightens skin tone and reduces fine lines. Our best-selling radiance booster.',
    price: 58,
    category: 'Serums',
    images: [
      'https://images.unsplash.com/photo-1620917670397-dc7bc43e8111?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.7,
    ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Ferulic Acid'],
    howToUse: 'Apply 3-4 drops to clean, dry face and neck every morning before moisturizing.'
  },
  {
    id: '5',
    name: 'Silk Peony Moisturizer',
    description: 'A whipped, lightweight moisturizer for 24-hour hydration and silk-smooth finish. Infused with peony extract.',
    price: 45,
    category: 'Skincare',
    images: [
      'https://images.unsplash.com/photo-1556228443-72212c7a23b8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.9,
    ingredients: ['Peony Extract', 'Squalane', 'Rosehip Oil'],
    howToUse: 'Smooth over face and neck morning and night after serums.'
  },
  {
    id: '6',
    name: 'Vanilla Bean Lip Scrub',
    description: 'Sugar-based exfoliant that removes dead skin and leaves lips prepped for color. Delicious vanilla scent.',
    price: 12,
    category: 'Lipcare',
    images: [
      'https://images.unsplash.com/photo-1631730359585-38a4935ccbb2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1629732047847-50bad7558259?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.6,
    ingredients: ['Cane Sugar', 'Vanilla Extract', 'Almond Oil'],
    howToUse: 'Gently rub onto lips in a circular motion. Wipe away with a damp cloth.'
  },
  {
    id: '7',
    name: 'Amber Glow Overnight Oil',
    description: 'A rich, restorative oil that works while you sleep. Infused with rare botanicals to deeply nourish and repair the skin barrier.',
    price: 65,
    category: 'Skincare',
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 5.0,
    ingredients: ['Bakuchiol', 'Evening Primrose Oil', 'Argan Oil'],
    howToUse: 'Massage 2-3 drops into clean skin after moisturizing at night.'
  },
  {
    id: '8',
    name: 'Botanical Lip Glaze',
    description: 'The ultimate glass-shine finish without the stickiness. Nourishes with cold-pressed fruit oils.',
    price: 22,
    category: 'Lipcare',
    images: [
      'https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    ingredients: ['Watermelon Seed Oil', 'Squalane', 'Peppermint Oil'],
    howToUse: 'Apply directly to lips for a high-shine finish or over tint for added dimension.'
  },
  {
    id: '9',
    name: 'Ceramide Silk Essence',
    description: 'A pre-moisturizer treatment that plumps and strengthens. Mimics the skin’s natural lipid barrier.',
    price: 42,
    category: 'Serums',
    images: [
      'https://images.unsplash.com/photo-1594411133999-119c83b40027?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.7,
    ingredients: ['Ceramides', 'Niacinamide', 'Rice Water'],
    howToUse: 'Press into clean skin with palms after cleansing and before serums.'
  }
];
