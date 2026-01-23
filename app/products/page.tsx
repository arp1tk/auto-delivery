"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Filter, Search, ArrowLeft, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  desc: string;
  tag?: string | null;
  festival?: string[];
};

/* ---------- FESTIVAL COPY ---------- */
const FESTIVAL_HEADER_COPY: Record<string, string> = {
  All: "Each item in our collection is handpicked from India's finest artisans and confectioners. Authentic taste, premium presentation, and delivered with care.",
  Diwali:
    "Celebrate the festival of lights with handpicked sweets, hampers, and gifts that spread warmth and joy.",
  Eid:
    "Share love and blessings this Eid with elegant gifts curated for meaningful celebrations.",
  Rakhi:
    "Honor the bond of siblings with thoughtful gifts that express care, love, and gratitude.",
  Christmas:
    "Spread festive cheer with warm, joyful gifts curated for Christmas celebrations.",
};

// ----FULL PRODUCT DATA (25 Items)----
const PRODUCTS: Product[] = [
  // --- SWEETS ---
  {
    id: "s1",
    name: "Premium Diwali Sweets Box",
    price: "₹899",
    category: "Sweets",
    festival: ["Diwali"],
    image: "/sweets.avif",
    desc: "A signature collection of Kaju Katli and Milk Cake, garnished with silver vark.",
    tag: "Bestseller"
  },
  {
    id: "s2",
    name: "Traditional Mithai Collection",
    price: "₹1,299",
    category: "Sweets",
    festival: ["Diwali", "Rakhi"],
    image: "/trad.webp",
    desc: "Authentic Ghee-based sweets including Motichoor Ladoo and Besan Burfi.",
    tag: "Traditional"
  },
  {
    id: "s3",
    name: "Gourmet Sweet Hamper",
    price: "₹1,599",
    category: "Sweets",
    festival: ["Diwali", "Christmas"],
    image: "/gourmet.webp",
    desc: "Fusion sweets combining traditional recipes with modern flavors like Rose and Pistachio.",
    tag: "Premium"
  },
  {
    id: "s4",
    name: "Regional Special Sweets",
    price: "₹999",
    category: "Sweets",
    festival: ["Diwali", "Eid"],
    image: "/regional.jpeg",
    desc: "Handpicked regional specialties bringing the authentic taste of home.",
    tag: null
  },
  {
    id: "s5",
    name: "Sugar-Free Delights",
    price: "₹1,199",
    category: "Sweets",
    festival: ["Diwali", "Rakhi", "Eid"],
    image: "/sugar.jpg",
    desc: "Naturally sweetened Date and Fig rolls for a guilt-free celebration.",
    tag: "Healthy"
  },

  // --- FLOWERS ---
  {
    id: "f1",
    name: "Fresh Rose Bouquet",
    price: "₹599",
    category: "Flowers",
    festival: [ "Christmas"],
    image: "/flowers.png",
    desc: "A classic bunch of 12 long-stemmed red roses, fresh from the farm.",
    tag: "Fresh"
  },
  {
    id: "f2",
    name: "Mixed Seasonal Flowers",
    price: "₹799",
    category: "Flowers",
    festival: ["Eid"],
    image: "/mixed.webp",
    desc: "Vibrant seasonal blooms arranged beautifully in a hand-tied bunch.",
    tag: null
  },
  {
    id: "f3",
    name: "Premium Orchid Arrangement",
    price: "₹1,299",
    category: "Flowers",
    festival: ["Christmas", "Diwali"],
    image: "/orchid.webp",
    desc: "Exotic purple orchids arranged in a minimalist glass vase.",
    tag: "Luxury"
  },
  {
    id: "f4",
    name: "Marigold Garland Set",
    price: "₹399",
    category: "Flowers",
    festival: ["Diwali"],
    image: "/marigold.webp",
    desc: "Traditional orange and yellow marigold garlands for festive pooja.",
    tag: "Festive"
  },
  {
    id: "f5",
    name: "Luxury Flower Basket",
    price: "₹1,499",
    category: "Flowers",
    festival: ["Diwali", "Christmas"],
    image: "/luxory.webp",
    desc: "A grand basket featuring lilies, carnations, and roses.",
    tag: "Grand"
  },

  // --- HAMPERS ---
  {
    id: "h1",
    name: "Premium Festival Hamper",
    price: "₹2,499",
    category: "Hampers",
    festival: ["Diwali", "Rakhi"],
    image: "/hampers.png",
    desc: "The complete festive package: Sweets, Diyas, and Dry Fruits.",
    tag: "All-in-One"
  },
  {
    id: "h2",
    name: "Luxury Gift Hamper",
    price: "₹3,299",
    category: "Hampers",
    festival: ["Diwali", "Christmas"],
    image: "/hampers.webp",
    desc: "Curated with gourmet chocolates, premium nuts, and a scented candle.",
    tag: "Luxury"
  },
  {
    id: "h3",
    name: "Corporate Gift Hamper",
    price: "₹4,999",
    category: "Hampers",
    festival: ["Diwali", "Christmas"],
    image: "/corporate.webp",
    desc: "Professional and elegant packaging suitable for business partners.",
    tag: "Corporate"
  },
  {
    id: "h4",
    name: "Custom Curated Hamper",
    price: "₹1,999",
    category: "Hampers",
    festival: ["Diwali", "Rakhi"],
    image: "/hampers.webp",
    desc: "A balanced mix of snacks and sweets, perfect for family sharing.",
    tag: null
  },
  {
    id: "h5",
    name: "Deluxe Celebration Box",
    price: "₹3,799",
    category: "Hampers",
    festival: ["Diwali", "Christmas"],
    image: "/deluxe.webp",
    desc: "Our largest hamper featuring an assortment of our finest products.",
    tag: "Exclusive"
  },

  // --- DRY FRUITS ---
  {
    id: "d1",
    name: "Premium Almonds & Cashews",
    price: "₹1,299",
    category: "Dry Fruits",
    festival: ["Diwali", "Rakhi"],
    image: "/almonds.webp",
    desc: "Jumbo California Almonds and Mangalorean Cashews in a gift box.",
    tag: "Healthy"
  },
  {
    id: "d2",
    name: "Mixed Dry Fruits Box",
    price: "₹1,599",
    category: "Dry Fruits",
    festival: ["Diwali", "Rakhi"],
    image: "/mixeddry.webp",
    desc: "A four-partition box containing Almonds, Cashews, Raisins, and Pistachios.",
    tag: null
  },
  {
    id: "d3",
    name: "Luxury Dry Fruits Hamper",
    price: "₹2,299",
    category: "Dry Fruits",
    festival: ["Diwali"],
    image: "/luxory-dry.webp",
    desc: "Exotic dry fruits including Apricots, Figs, and Pecans.",
    tag: "Premium"
  },
  {
    id: "d4",
    name: "Organic Dry Fruits Collection",
    price: "₹1,899",
    category: "Dry Fruits",
    festival: ["Diwali"],
    image: "/organic.webp",
    desc: "Certified organic nuts sourced directly from sustainable farms.",
    tag: "Organic"
  },
  {
    id: "d5",
    name: "Gourmet Nuts Selection",
    price: "₹999",
    category: "Dry Fruits",
    festival: ["Diwali"],
    image: "/hampers.webp",
    desc: "Roasted and salted nuts for a savory snacking experience.",
    tag: "Snack"
  },

  // --- CHOCOLATES ---
  {
    id: "c1",
    name: "Belgian Chocolate Box",
    price: "₹899",
    category: "Chocolates",
    festival: ["Rakhi","Christmas"],
    image: "/belgian.webp",
    desc: "Rich and creamy Belgian milk chocolates in a signature box.",
    tag: "Imported"
  },
  {
    id: "c2",
    name: "Premium Chocolate Collection",
    price: "₹1,499",
    category: "Chocolates",
    festival: [ "Christmas"],
    image: "/pc.png",
    desc: "An assortment of dark, milk, and white chocolates.",
    tag: null
  },
  {
    id: "c3",
    name: "Artisan Chocolate Hamper",
    price: "₹1,999",
    category: "Chocolates",
    festival: ["Rakhi", "Christmas"],
    image: "/artisan.png",
    desc: "Handcrafted chocolates with unique fillings like Paan and Chilli.",
    tag: "Artisan"
  },
  {
    id: "c4",
    name: "Gourmet Chocolate Gift Set",
    price: "₹1,299",
    category: "Chocolates",
    festival: ["Christmas"],
    image: "/gc.png",
    desc: "Gourmet bars tailored for the true chocolate connoisseur.",
    tag: "Gourmet"
  },
  {
    id: "c5",
    name: "Luxury Chocolate Box",
    price: "₹2,299",
    category: "Chocolates",
    festival: ["Christmas"],
    image: "/pc.png",
    desc: "Gold-dusted truffles in a velvet-finish box.",
    tag: "Luxury"
  }
];


const CATEGORIES = ["All", "Hampers", "Sweets", "Flowers", "Dry Fruits", "Chocolates"];
const FESTIVALS = ["All", "Diwali", "Rakhi", "Eid", "Christmas"];


export default function ProductsPage() {
  const { addToCart, setIsOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFestival, setActiveFestival] = useState("All");

  // filter products based on festivals and categories
  const filteredProducts = PRODUCTS.filter((p) => {
    const categoryMatch =
      activeCategory === "All" || p.category === activeCategory;

    const festivalMatch =
      activeFestival === "All" ||
      (Array.isArray(p.festival) && p.festival.includes(activeFestival));

    return categoryMatch && festivalMatch;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-200">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-stone-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </Link>
            <span className="font-serif text-2xl font-bold tracking-widest uppercase">
              Tyohar<span className="text-amber-700">.</span>
            </span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div className="bg-stone-900 text-stone-300 py-16 px-6 text-center">
        <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">
          The Collection
        </p>

        <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
          Curated Emotions
        </h1>

        <motion.p
          key={activeFestival}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg text-stone-400"
        >
          {FESTIVAL_HEADER_COPY[activeFestival]}
        </motion.p>
      </div>

      {/* FESTIVAL FILTER */}
      <div className="bg-stone-50 py-8 px-6 text-center border-b">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
          Browse by Festival
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          {FESTIVALS.map((fest) => (
            <button
              key={fest}
              onClick={() => {
                setActiveFestival(fest);
                setActiveCategory("All");
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${
                activeFestival === fest
                  ? "bg-stone-900 text-white"
                  : "bg-white border text-stone-500"
              }`}
            >
              {fest}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="sticky top-20 z-30 bg-stone-50 border-b py-4 px-6">
        <div className="flex gap-4 items-center overflow-x-auto">
          <Filter className="w-4 h-4 text-stone-400" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase ${
                activeCategory === cat
                  ? "bg-amber-700 text-white"
                  : "bg-white border text-stone-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout="position"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white rounded-xl border overflow-hidden flex flex-col">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-serif text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-stone-500 mb-4">{product.desc}</p>

                  <div className="mt-auto flex justify-between items-center">
                    <span className="font-serif text-xl">{product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 bg-stone-100 rounded-full hover:bg-amber-100"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
