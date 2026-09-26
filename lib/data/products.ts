export type Product = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  badge: string;
  image: string;
  accent: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "aurora-lamp",
    name: "Aurora Accent Lamp",
    category: "Home",
    tagline: "Soft-glow statement piece",
    description:
      "A sculptural lamp designed for wrapped evenings and elevated corners.",
    price: 249,
    oldPrice: 299,
    rating: 4.9,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    accent: "from-amber-200/80 via-yellow-100/30 to-transparent",
    featured: true,
  },
  {
    id: "velvet-hooded",
    name: "Velvet Harbour Hoodie",
    category: "Essentials",
    tagline: "Refined everyday comfort",
    description:
      "Luxury knit texture with a tailored drape and all-day warmth.",
    price: 179,
    oldPrice: 220,
    rating: 4.8,
    badge: "New Drop",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    accent: "from-stone-300/80 via-zinc-100/30 to-transparent",
    featured: true,
  },
  {
    id: "atlas-scent",
    name: "Atlas Scent Candle",
    category: "Wellness",
    tagline: "Golden cedar and amber notes",
    description:
      "A balanced fragrance ritual that transforms any room into a boutique retreat.",
    price: 68,
    oldPrice: 84,
    rating: 4.7,
    badge: "Limited",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    accent: "from-orange-200/80 via-amber-100/30 to-transparent",
    featured: true,
  },
  {
    id: "solstice-watch",
    name: "Solstice Leather Watch",
    category: "Accessories",
    tagline: "Quiet confidence in motion",
    description:
      "Minimalist chronograph silhouettes paired with handcrafted leather straps.",
    price: 320,
    oldPrice: 390,
    rating: 5,
    badge: "Signature",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    accent: "from-neutral-300/80 via-stone-100/30 to-transparent",
    featured: true,
  },
  {
    id: "cove-trunk",
    name: "Cove Carry Trunk",
    category: "Travel",
    tagline: "Built for grand departures",
    description:
      "Italian-inspired storage with matte finish and a room for every essential.",
    price: 410,
    oldPrice: 520,
    rating: 4.9,
    badge: "Travel Edit",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
    accent: "from-emerald-200/80 via-stone-100/30 to-transparent",
    featured: true,
  },
  {
    id: "noir-ceramic",
    name: "Noir Ceramic Set",
    category: "Dining",
    tagline: "Dining elevated daily",
    description:
      "Hand-finished dinnerware in a warm matte tone for effortless hosting.",
    price: 94,
    oldPrice: 128,
    rating: 4.8,
    badge: "Curated",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    accent: "from-zinc-300/80 via-stone-100/30 to-transparent",
    featured: false,
  },
];
