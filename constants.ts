
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // --- New Premium Skincare Collection (Replacing Defaults) ---
  {
    id: 's1',
    name: 'Opulent Orchid Facial Elixir',
    description: 'A transformative blend of rare orchid extracts and cold-pressed botanical oils. This elixir deeply replenishes the lipid barrier for an ageless, velvet-soft finish.',
    price: 85,
    category: 'Skincare',
    images: ['https://i.pinimg.com/736x/cc/6c/e0/cc6ce076e284234f31463d8ecdc3a995.jpg'],
    rating: 5.0,
    ingredients: ['Orchid Stem Cells', 'Squalane', 'Evening Primrose Oil', 'Vitamin E'],
    howToUse: 'Warm 3 drops between palms and press gently into clean, damp skin every evening.'
  },
  {
    id: 's2',
    name: 'Royal Jelly Youth Serum',
    description: 'A high-potency serum featuring concentrated royal jelly and stabilized Vitamin C. Targets fine lines and uneven texture for a regally radiant complexion.',
    price: 72,
    category: 'Serums',
    images: ['https://i.pinimg.com/736x/2e/12/b3/2e12b322d13a4120caad5e537e854b05.jpg'],
    rating: 4.9,
    ingredients: ['Royal Jelly', 'Vitamin C (THD Ascorbate)', 'Honey Extract', 'Propolis'],
    howToUse: 'Apply 2 pumps to face and neck after toning and before moisturizing.'
  },
  {
    id: 's3',
    name: 'Cloud Quartz Whipped Night Cream',
    description: 'A weightless yet deeply nourishing overnight mask that mimics the softest silk. Infused with crushed quartz and hyaluronic acid for intense hydration.',
    price: 68,
    category: 'Masks',
    images: ['https://i.pinimg.com/1200x/ca/1f/6d/ca1f6dfa1b249b232f07a06a18b6679b.jpg'],
    rating: 4.9,
    ingredients: ['Crushed Clear Quartz', 'Hyaluronic Acid', 'Shea Butter', 'Peptides'],
    howToUse: 'Apply as the final step of your nighttime routine. Massage upward until fully absorbed.'
  },
  {
    id: 's4',
    name: 'Celestial Glow Treatment Essence',
    description: 'A mineral-rich watery essence that preps the skin for better absorption of treatments while imparting a luminous, lit-from-within glow.',
    price: 54,
    category: 'Skincare',
    images: ['https://i.pinimg.com/1200x/8a/96/83/8a9683226ecded105fea36e2f8b5bdfa.jpg'],
    rating: 4.8,
    ingredients: ['Fermented Rice Water', 'Niacinamide', 'Copper Peptides', 'Sea Silt'],
    howToUse: 'Splash a small amount into palms and pat into the skin immediately after cleansing.'
  },
  {
    id: 's5',
    name: 'Moonstone Barrier Recovery Concentrate',
    description: 'A soothing rescue concentrate designed for sensitive or stressed skin. Cools on contact and repairs the moisture barrier with botanical ceramides.',
    price: 64,
    category: 'Serums',
    images: ['https://i.pinimg.com/736x/7f/cb/f8/7fcbf8b25a80dbd6f25d01bb7801c921.jpg'],
    rating: 5.0,
    ingredients: ['Ceramides NP/AP/EOP', 'Moonstone Extract', 'Allantoin', 'Oat Kernel Oil'],
    howToUse: 'Use morning and night when skin feels tight, red, or irritated.'
  },
  {
    id: 's6',
    name: 'Aurora Brightening Pearl Serum',
    description: 'Micro-encapsulated pearls suspended in a silk serum. Bursting on contact to deliver potent antioxidants that brighten and even skin tone.',
    price: 78,
    category: 'Serums',
    images: ['https://i.pinimg.com/1200x/8d/58/eb/8d58eb5938f89be41e352d2cb1b1d91e.jpg'],
    rating: 4.9,
    ingredients: ['Pearl Powder', 'Ferulic Acid', 'Licorice Root', 'Alpha Arbutin'],
    howToUse: 'Gently massage 1 pump into skin until pearls dissolve and absorb completely.'
  },

  // --- Lipcare Collection (Retained from previous requests) ---
  {
    id: '15',
    name: 'Rose Petal High-Shine Glaze',
    description: 'A luxurious, ultra-glossy lip treatment that provides intense shine with a hint of romantic rose tint.',
    price: 26,
    category: 'Lipcare',
    images: ['https://i.pinimg.com/736x/6e/54/14/6e54148901ac1bb10105d1ef783b8812.jpg'],
    rating: 4.9,
    ingredients: ['Rosehip Oil', 'Squalane', 'Vitamin E'],
    howToUse: 'Apply directly to lips for a glass-like finish.'
  },
  {
    id: '16',
    name: 'Blossom Lip Soufflé Mask',
    description: 'An airy, whipped overnight treatment that melts into lips to repair and soften.',
    price: 28,
    category: 'Lipcare',
    images: ['https://i.pinimg.com/736x/83/57/b0/8357b03d8de319bb0eb2367613c4f389.jpg'],
    rating: 5.0,
    ingredients: ['Shea Butter', 'Peony Extract', 'Hyaluronic Acid'],
    howToUse: 'Apply a generous layer before sleep.'
  },
  {
    id: '17',
    name: 'Golden Nectar Plumping Balm',
    description: 'A restorative balm that provides a subtle plumping effect while delivering deep nourishment.',
    price: 22,
    category: 'Lipcare',
    images: ['https://i.pinimg.com/736x/a1/6a/b7/a16ab73f227b7edfad3d2a190ecc01e4.jpg'],
    rating: 4.8,
    ingredients: ['Manuka Honey', 'Ginger Root Extract', 'Jojoba Oil'],
    howToUse: 'Use throughout the day as needed.'
  },
  {
    id: '18',
    name: 'Hibiscus Dew Lip Oil',
    description: 'A weightless, ultra-hydrating lip oil that provides a mirror-like shine and a subtle flush of hibiscus pink.',
    price: 24,
    category: 'Lipcare',
    images: ['https://i.pinimg.com/736x/b2/5e/bd/b25ebd87dc90c8034c0c36682a014fdb.jpg'],
    rating: 4.9,
    ingredients: ['Hibiscus Seed Oil', 'Squalane', 'Vitamin C'],
    howToUse: 'Sweep over bare lips for a natural glow.'
  },
  {
    id: '19',
    name: 'Orchid Petal Soft Tint',
    description: 'A velvet-finish lip tint that provides the softness of a rose petal.',
    price: 20,
    category: 'Lipcare',
    images: ['https://i.pinimg.com/1200x/b8/8c/52/b88c52c9d5c1028ebba4016a25a494fc.jpg'],
    rating: 4.7,
    ingredients: ['Orchid Extract', 'Shea Butter', 'Castor Seed Oil'],
    howToUse: 'Apply for a soft-focus velvet look.'
  },
  {
    id: '20',
    name: 'Midnight Lavender Sleep Mask',
    description: 'A calming overnight treatment that repairs the lip barrier with soothing lavender.',
    price: 25,
    category: 'Lipcare',
    images: ['https://i.pinimg.com/736x/86/60/7e/86607e65503afbc5ce005b1ab4bc765c.jpg'],
    rating: 5.0,
    ingredients: ['Lavender Essential Oil', 'Manuka Honey', 'Almond Oil'],
    howToUse: 'Smooth over lips before bed.'
  },
  {
    id: '21',
    name: 'Citrus Sorbet Lip Polish',
    description: 'A refreshing sugar scrub infused with citrus extracts to gently exfoliate.',
    price: 18,
    category: 'Lipcare',
    images: ['https://i.pinimg.com/1200x/61/34/1e/61341ecf66e85f592f84dcec4f8388cc.jpg'],
    rating: 4.8,
    ingredients: ['Fine Cane Sugar', 'Orange Peel Oil', 'Coconut Oil'],
    howToUse: 'Gently massage onto lips in circular motions.'
  },
  {
    id: '22',
    name: 'Pearl Shine Recovery Balm',
    description: 'A multi-corrective balm that provides iridescent shine while repairing damaged lip tissue.',
    price: 30,
    category: 'Lipcare',
    images: ['https://i.pinimg.com/1200x/0b/7a/7a/0b7a7ad22d10377c71f04b96cc6d7ddc.jpg'],
    rating: 4.9,
    ingredients: ['Silk Proteins', 'Crushed Pearl Powder', 'Avocado Oil'],
    howToUse: 'Apply whenever lips feel dry or tight.'
  },
  {
    id: '23',
    name: 'Nectarine Glaze Lip Treatment',
    description: 'A juicy, fruit-infused glaze that provides an explosion of hydration and a delicious nectarine scent.',
    price: 22,
    category: 'Lipcare',
    images: ['https://i.pinimg.com/736x/6e/f1/a6/6ef1a66aef9a250add4f3e23ec04484c.jpg'],
    rating: 4.7,
    ingredients: ['Nectarine Extract', 'Peach Kernel Oil', 'Vitamin E'],
    howToUse: 'Generously apply for a high-gloss finish.'
  }
];
