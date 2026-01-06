"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Filter, 
  Search, 
  ArrowLeft, 
  Star,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

// --- FULL PRODUCT DATA (25 Items) ---
const PRODUCTS = [
  // --- SWEETS ---
  {
    id: "s1",
    name: "Premium Diwali Sweets Box",
    price: "₹899",
    category: "Sweets",
    image: "/sweets.avif",
    desc: "A signature collection of Kaju Katli and Milk Cake, garnished with silver vark.",
    tag: "Bestseller"
  },
  {
    id: "s2",
    name: "Traditional Mithai Collection",
    price: "₹1,299",
    category: "Sweets",
    image: "/trad.webp",
    desc: "Authentic Ghee-based sweets including Motichoor Ladoo and Besan Burfi.",
    tag: "Traditional"
  },
  {
    id: "s3",
    name: "Gourmet Sweet Hamper",
    price: "₹1,599",
    category: "Sweets",
    image: "/gourmet.webp",
    desc: "Fusion sweets combining traditional recipes with modern flavors like Rose and Pistachio.",
    tag: "Premium"
  },
  {
    id: "s4",
    name: "Regional Special Sweets",
    price: "₹999",
    category: "Sweets",
    image: "/regional.jpeg",
    desc: "Handpicked regional specialties bringing the authentic taste of home.",
    tag: null
  },
  {
    id: "s5",
    name: "Sugar-Free Delights",
    price: "₹1,199",
    category: "Sweets",
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
    image: "/flowers.png",
    desc: "A classic bunch of 12 long-stemmed red roses, fresh from the farm.",
    tag: "Fresh"
  },
  {
    id: "f2",
    name: "Mixed Seasonal Flowers",
    price: "₹799",
    category: "Flowers",
    image: "/mixed.webp",
    desc: "Vibrant seasonal blooms arranged beautifully in a hand-tied bunch.",
    tag: null
  },
  {
    id: "f3",
    name: "Premium Orchid Arrangement",
    price: "₹1,299",
    category: "Flowers",
    image: "/orchid.webp",
    desc: "Exotic purple orchids arranged in a minimalist glass vase.",
    tag: "Luxury"
  },
  {
    id: "f4",
    name: "Marigold Garland Set",
    price: "₹399",
    category: "Flowers",
    image: "/marigold.webp",
    desc: "Traditional orange and yellow marigold garlands for festive pooja.",
    tag: "Festive"
  },
  {
    id: "f5",
    name: "Luxury Flower Basket",
    price: "₹1,499",
    category: "Flowers",
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
    image: "/hampers.png",
    desc: "The complete festive package: Sweets, Diyas, and Dry Fruits.",
    tag: "All-in-One"
  },
  {
    id: "h2",
    name: "Luxury Gift Hamper",
    price: "₹3,299",
    category: "Hampers",
    image: "/hampers.webp",
    desc: "Curated with gourmet chocolates, premium nuts, and a scented candle.",
    tag: "Luxury"
  },
  {
    id: "h3",
    name: "Corporate Gift Hamper",
    price: "₹4,999",
    category: "Hampers",
    image: "/corporate.webp",
    desc: "Professional and elegant packaging suitable for business partners.",
    tag: "Corporate"
  },
  {
    id: "h4",
    name: "Custom Curated Hamper",
    price: "₹1,999",
    category: "Hampers",
    image: "/hampers.webp",
    desc: "A balanced mix of snacks and sweets, perfect for family sharing.",
    tag: null
  },
  {
    id: "h5",
    name: "Deluxe Celebration Box",
    price: "₹3,799",
    category: "Hampers",
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
    image: "/almonds.webp",
    desc: "Jumbo California Almonds and Mangalorean Cashews in a gift box.",
    tag: "Healthy"
  },
  {
    id: "d2",
    name: "Mixed Dry Fruits Box",
    price: "₹1,599",
    category: "Dry Fruits",
    image: "/mixeddry.webp",
    desc: "A four-partition box containing Almonds, Cashews, Raisins, and Pistachios.",
    tag: null
  },
  {
    id: "d3",
    name: "Luxury Dry Fruits Hamper",
    price: "₹2,299",
    category: "Dry Fruits",
    image: "/luxory-dry.webp",
    desc: "Exotic dry fruits including Apricots, Figs, and Pecans.",
    tag: "Premium"
  },
  {
    id: "d4",
    name: "Organic Dry Fruits Collection",
    price: "₹1,899",
    category: "Dry Fruits",
    image: "/organic.webp",
    desc: "Certified organic nuts sourced directly from sustainable farms.",
    tag: "Organic"
  },
  {
    id: "d5",
    name: "Gourmet Nuts Selection",
    price: "₹999",
    category: "Dry Fruits",
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
    image: "/belgian.webp",
    desc: "Rich and creamy Belgian milk chocolates in a signature box.",
    tag: "Imported"
  },
  {
    id: "c2",
    name: "Premium Chocolate Collection",
    price: "₹1,499",
    category: "Chocolates",
    image: "/pc.png",
    desc: "An assortment of dark, milk, and white chocolates.",
    tag: null
  },
  {
    id: "c3",
    name: "Artisan Chocolate Hamper",
    price: "₹1,999",
    category: "Chocolates",
    image: "/artisan.png",
    desc: "Handcrafted chocolates with unique fillings like Paan and Chilli.",
    tag: "Artisan"
  },
  {
    id: "c4",
    name: "Gourmet Chocolate Gift Set",
    price: "₹1,299",
    category: "Chocolates",
    image: "/gc.png",
    desc: "Gourmet bars tailored for the true chocolate connoisseur.",
    tag: "Gourmet"
  },
  {
    id: "c5",
    name: "Luxury Chocolate Box",
    price: "₹2,299",
    category: "Chocolates",
    image: "/pc.png",
    desc: "Gold-dusted truffles in a velvet-finish box.",
    tag: "Luxury"
  },
];

const CATEGORIES = ["All", "Hampers", "Sweets", "Flowers", "Dry Fruits", "Chocolates"];

export default function ProductsPage() {
  const { addToCart, setIsOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setIsOpen(true); // Open the drawer
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-200">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </Link>
            <span className="font-serif text-2xl font-bold tracking-widest text-stone-900 uppercase">
              Tyohar<span className="text-amber-700">.</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-stone-100 px-4 py-2 rounded-full">
              <Search className="w-4 h-4 text-stone-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search gifts..." 
                className="bg-transparent border-none outline-none text-sm text-stone-900 placeholder-stone-400 w-32 focus:w-48 transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO BANNER --- */}
      <div className="bg-stone-900 text-stone-300 py-16 px-6 relative overflow-hidden">
        {/* Background Texture/Gradient for depth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-900/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">The Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">Curated Emotions</h1>
          <p className="max-w-2xl mx-auto text-lg font-light leading-relaxed text-stone-400">
            Each item in our collection is handpicked from India's finest artisans and confectioners. 
            Authentic taste, premium presentation, and delivered with care.
          </p>
        </div>
      </div>

      {/* --- FILTER BAR --- */}
      <div className="sticky top-20 z-30 bg-stone-50 border-b border-stone-200 py-4 px-6 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-4 min-w-max">
          <Filter className="w-4 h-4 text-stone-400 mr-2" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? "bg-amber-700 text-white shadow-md" 
                  : "bg-white text-stone-500 border border-stone-200 hover:border-stone-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-xl overflow-hidden border border-stone-100 hover:shadow-xl hover:border-stone-200 transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Badges */}
                  {product.tag && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-stone-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm z-10">
                      {product.tag}
                    </div>
                  )}

                  {/* Quick Add Overlay (Desktop) */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden lg:block z-20">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-stone-900 text-white py-3 uppercase text-xs font-bold tracking-widest hover:bg-amber-700 transition-colors shadow-lg"
                    >
                      Add to Gift Box
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest">{product.category}</p>
                    <div className="flex gap-0.5">
                       {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-lg text-stone-900 mb-2 leading-tight group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-stone-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
                    {product.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                    <span className="font-serif text-xl text-stone-900">{product.price}</span>
                    
                    {/* Mobile Add Button */}
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="lg:hidden p-2 bg-stone-100 rounded-full text-stone-900 hover:bg-amber-100 hover:text-amber-700 transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- LOAD MORE / END --- */}
        <div className="mt-20 text-center">
          <p className="text-stone-400 text-sm mb-6 italic">Showing all curated items for this season.</p>
          <div className="inline-flex items-center gap-2 text-stone-500 border border-stone-200 px-6 py-3 rounded-full bg-white">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-xs uppercase tracking-widest">Verified Authentic Vendors</span>
          </div>
        </div>
      </main>

    </div>
  );
}