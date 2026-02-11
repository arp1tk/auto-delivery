"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, LayoutGrid } from "lucide-react";
import { PRODUCTS, type Product } from "@/app/data/products";
import Image from "next/image";
import { useRouter } from "next/navigation";


/* ---------- FESTIVAL COPY ---------- */
const FESTIVAL_HEADER_COPY: Record<string, string> = {
  All: "Each item in our collection is handpicked from India's finest artisans and confectioners. Authentic taste, premium presentation, and delivered with care.",
  Diwali: "Celebrate the festival of lights with handpicked sweets, hampers, and gifts that spread warmth and joy.",
  Eid: "Share love and blessings this Eid with elegant gifts curated for meaningful celebrations.",
  Rakhi: "Honor the bond of siblings with thoughtful gifts that express care, love, and gratitude.",
  Christmas: "Spread festive cheer with warm, joyful gifts curated for Christmas celebrations.",
};

const CATEGORIES = [
  { id: "All", label: "All", icon: LayoutGrid },
  { id: "Sweets", label: "Sweets", icon: "/icons/sweetsicon.png" },
  { id: "Flowers", label: "Flowers", icon: "/icons/flowericon.png" },
  { id: "Dry Fruits", label: "Dry Fruits", icon: "/icons/dryfruiticon.png" },
  { id: "Chocolates", label: "Chocolates", icon: "/icons/chocolateicon.png" },
  { id: "Hampers", label: "Hampers", icon: "/icons/hampericon.png" },
];

const FESTIVALS = ["All", "Diwali", "Eid", "Rakhi", "Christmas"];

export default function ProductsPage() {
  const router = useRouter();
  const { addToCart, setIsOpen } = useCart();
  const [activeFestival, setActiveFestival] = useState("All"); // Default
  const [activeCategory, setActiveCategory] = useState("All");

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
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800 selection:bg-amber-200">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-4">
          <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            {/* <LayoutGrid className="w-5 h-5 text-stone-600" /> */}
          </button>
          <span className="font-serif text-2xl font-bold tracking-widest uppercase text-[#7D4047]">
            Tyohar<span className="text-[#7D4047]">.</span>
          </span>
        </div>
      </header>

      {/* HERO */}
      <div className="pt-16 pb-8 px-6 text-center bg-[#2E2E2E]">
        <p className="text-[#a54a55] text-xs font-bold uppercase tracking-[0.2em] mb-4">
          The Collection</p>
        <h1 className="font-serif text-4xl md:text-5xl text-[#F1ECE6] mb-6">
          Curated Emotions</h1>

        <motion.p
          key={activeFestival}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto text-lg text-[#F1ECE6] font-light">
          {FESTIVAL_HEADER_COPY[activeFestival]}
        </motion.p>
      </div>

      {/* FESTIVAL TABS */}
      <div className="bg-stone-50 py-8 px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-[#7D4047] mb-4">
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
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${activeFestival === fest
                  ? "bg-[#363434] text-[#F1ECE6]"
                  : "bg-white border text-stone-500"
                }`}>
              {fest}
            </button>
          ))}
        </div>
      </div>

      {/* 2) CATEGORY ICON BAR */}
      <div className="sticky top-20 z-30 bg-stone-50 py-4 px-6">
        <div className="flex justify-center gap-6 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex flex-col items-center gap-1 text-[11px] font-semibold uppercase transition-all">
              {typeof cat.icon !== "string" ? (
                <cat.icon
                  className={`w-6 h-6 transition-all translate-y-3 ${activeCategory === cat.id
                      ? "text-[#a54a55] scale-110"
                      : "text-stone-400"
                    }`}/>
              ) : (
                <Image
                  src={cat.icon}
                  alt={cat.label}
                  width={40}
                  height={40}
                  className={`transition-all ${activeCategory === cat.id
                      ? "scale-110 opacity-100"
                      : "opacity-70"
                    }`}
                />
              )}
              <span
                className={`${activeCategory === cat.id
                    ? "text-[#a54a55]"
                    : "text-stone-500"
                  } ${cat.id === "All" ? "mt-4" : ""}`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* 3) PRODUCTS SHOWCASE */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                onClick={() => router.push(`/products/${product.slug}`)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col items-center text-center">
                {/* Image with rounded background */}
                <div className="relative w-full aspect-square mb-6 flex items-center justify-center">
                  <div className="absolute w-64 h-64 rounded-full bg-[#EFEFE9] z-0 
                group-hover:scale-105 transition-transform duration-500 ease-out" />
                  <Image src={product.image}
                    alt={product.name}
                    height={400}
                    width={400}
                    className="relative z-10 w-3/4 h-3/4 object-contain drop-shadow-lg group-hover:-translate-y-2 transition-transform duration-500 ease-out" />

                  {/* Floating Action Button*/}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                    className="absolute bottom-6 right-6 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#7D4047] hover:text-[#94545b] transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                    title="Add to Cart">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  {product.tag && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#7D4047] bg-amber-50 px-2 py-1 rounded-sm">
                      {product.tag}
                    </span>
                  )}
                  <h3 className="font-serif text-xl text-[#2E2E2E] group-hover:text-[#7D4047] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#2E2E2E] font-light max-w-[200px] mx-auto line-clamp-2">
                    {product.desc}
                  </p>
                  <p className="font-medium text-stone-900 mt-2">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            
            ))}
          </AnimatePresence>
        </motion.div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="font-serif text-xl italic text-stone-400">No products found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
}



