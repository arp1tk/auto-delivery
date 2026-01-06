"use client";

import { useState } from "react";
import Section from "./layout/Section";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface SubItem {
  id: string;
  name: string;
  image: string;
  price: string;
}

interface Category {
  id: string;
  label: string;
  image: string;
  subItems: SubItem[];
}

export default function Gallery() {
  const { addToCart, setIsOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const categories: Category[] = [
    {
      id: "sweets",
      label: "Sweets",
      image: "/sweets.avif",
      subItems: [
        { id: "s1", name: "Premium Diwali Sweets Box", image: "/sweets.avif", price: "₹899" },
        { id: "s2", name: "Traditional Mithai Collection", image: "/trad.webp", price: "₹1,299" },
        { id: "s3", name: "Gourmet Sweet Hamper", image: "/gourmet.webp", price: "₹1,599" },
        { id: "s4", name: "Regional Special Sweets", image: "/regional.jpeg", price: "₹999" },
        { id: "s5", name: "Sugar-Free Delights", image: "/sugar.jpg", price: "₹1,199" },
      ],
    },
    {
      id: "flowers",
      label: "Flowers",
      image: "/flowers.png",
      subItems: [
        { id: "f1", name: "Fresh Rose Bouquet", image: "/flowers.png", price: "₹599" },
        { id: "f2", name: "Mixed Seasonal Flowers", image: "/mixed.webp", price: "₹799" },
        { id: "f3", name: "Premium Orchid Arrangement", image: "/orchid.webp", price: "₹1,299" },
        { id: "f4", name: "Marigold Garland Set", image: "/marigold.webp", price: "₹399" },
        { id: "f5", name: "Luxury Flower Basket", image: "/luxory.webp", price: "₹1,499" },
      ],
    },
    {
      id: "hampers",
      label: "Hampers",
      image: "/hampers.png",
      subItems: [
        { id: "h1", name: "Premium Festival Hamper", image: "/hampers.png", price: "₹2,499" },
        { id: "h2", name: "Luxury Gift Hamper", image: "/hampers.webp", price: "₹3,299" },
        { id: "h3", name: "Corporate Gift Hamper", image: "/corporate.webp", price: "₹4,999" },
        { id: "h4", name: "Custom Curated Hamper", image: "/hampers.webp", price: "₹1,999" },
        { id: "h5", name: "Deluxe Celebration Box", image: "/deluxe.webp", price: "₹3,799" },
      ],
    },
    {
      id: "dry-fruits",
      label: "Dry Fruits",
      image: "/luxory-dry.webp",
      subItems: [
        { id: "d1", name: "Premium Almonds & Cashews", image: "/almonds.webp", price: "₹1,299" },
        { id: "d2", name: "Mixed Dry Fruits Box", image: "/mixeddry.webp", price: "₹1,599" },
        { id: "d3", name: "Luxury Dry Fruits Hamper", image: "/luxory-dry.webp", price: "₹2,299" },
        { id: "d4", name: "Organic Dry Fruits Collection", image: "/organic.webp", price: "₹1,899" },
        { id: "d5", name: "Gourmet Nuts Selection", image: "/hampers.webp", price: "₹999" },
      ],
    },
    {
      id: "chocolates",
      label: "Chocolates",
      image: "/belgian.webp",
      subItems: [
        { id: "c1", name: "Belgian Chocolate Box", image: "/belgian.webp", price: "₹899" },
        { id: "c2", name: "Premium Chocolate Collection", image: "/pc.png", price: "₹1,499" },
        { id: "c3", name: "Artisan Chocolate Hamper", image: "/artisan.png", price: "₹1,999" },
        { id: "c4", name: "Gourmet Chocolate Gift Set", image: "/gc.png", price: "₹1,299" },
        { id: "c5", name: "Luxury Chocolate Box", image: "/pc.png", price: "₹2,299" },
      ],
    },
  ];

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory);
  const currentSubItems = selectedCategoryData?.subItems || [];
  const currentSubItem = currentSubItems[carouselIndex];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCarouselIndex(0);
  };

  const handleCloseCarousel = () => {
    setSelectedCategory(null);
    setCarouselIndex(0);
  };

  const handlePrevious = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : currentSubItems.length - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev < currentSubItems.length - 1 ? prev + 1 : 0));
  };

  const handleAddToCart = () => {
    if (currentSubItem && selectedCategoryData) {
      addToCart({
        id: currentSubItem.id,
        name: currentSubItem.name,
        price: currentSubItem.price,
        image: currentSubItem.image,
        category: selectedCategoryData.label,
      });
      // Optional: Logic handled in Context to open cart, but we can force it here if preferred
      setIsOpen(true);
    }
  };

  return (
    <Section>
      <div className="mb-12 text-center">
        <h2 className="font-serif text-4xl mb-4 text-stone-900">Our Catalogue</h2>
        <p className="text-stone-600 max-w-lg mx-auto">
          Explore our curated collection of premium gifts, designed to bring warmth to every occasion.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className={`relative group overflow-hidden bg-stone-200 cursor-pointer h-64 rounded-lg shadow-sm ${
              selectedCategory === category.id ? "ring-4 ring-amber-700 ring-offset-2" : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={category.image}
              alt={category.label}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute bottom-4 left-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                View Collection
              </span>
              <h3 className="text-white font-serif text-xl drop-shadow-md">
                {category.label}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Carousel Section */}
      <AnimatePresence mode="wait">
        {selectedCategory && currentSubItem && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl shadow-2xl border border-stone-100 p-6 md:p-12 relative">
              
              {/* Carousel Header */}
              <div className="flex items-start justify-between mb-8 pb-4 border-b border-stone-100">
                <div>
                  <h3 className="font-serif text-3xl text-stone-900">
                    {selectedCategoryData?.label} <span className="text-stone-300 italic">Collection</span>
                  </h3>
                  <p className="text-stone-400 text-sm mt-1 uppercase tracking-widest">
                    Item {carouselIndex + 1} of {currentSubItems.length}
                  </p>
                </div>
                <button
                  onClick={handleCloseCarousel}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors group"
                  aria-label="Close carousel"
                >
                  <X className="w-6 h-6 text-stone-400 group-hover:text-stone-900" />
                </button>
              </div>

              {/* Carousel Content */}
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  
                  {/* Image Area */}
                  <div className="relative aspect-square bg-stone-50 rounded-lg overflow-hidden shadow-inner group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSubItem.id}
                        src={currentSubItem.image}
                        alt={currentSubItem.name}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    
                    {/* Floating Price Tag on Image (Mobile) */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg lg:hidden">
                       <span className="font-serif font-bold text-amber-700">{currentSubItem.price}</span>
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <h4 className="font-serif text-4xl text-stone-900 mb-2 leading-tight">
                        {currentSubItem.name}
                      </h4>
                      <p className="text-3xl font-serif text-amber-700 hidden lg:block">
                        {currentSubItem.price}
                      </p>
                    </div>
                    
                    <p className="text-stone-600 text-lg leading-relaxed">
                      Hand-picked premium quality {selectedCategoryData?.label.toLowerCase()}, beautifully packaged to convey your emotions across miles. Freshness and authenticity guaranteed.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-stone-900 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-3 rounded-sm group"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Gift Box
                      </button>
                      <button className="px-8 py-4 border border-stone-300 text-stone-600 font-bold uppercase tracking-widest text-xs hover:border-stone-900 hover:text-stone-900 transition-colors rounded-sm">
                        View Details
                      </button>
                    </div>
                    
                    <div className="pt-4 border-t border-stone-100">
                      <p className="text-xs text-stone-400 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Available for Express Delivery
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                {currentSubItems.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-stone-400 hover:text-stone-900 hover:scale-110 transition-all z-10"
                      aria-label="Previous item"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-stone-400 hover:text-stone-900 hover:scale-110 transition-all z-10"
                      aria-label="Next item"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Dots Indicator */}
              {currentSubItems.length > 1 && (
                <div className="flex justify-center gap-3 mt-10">
                  {currentSubItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === carouselIndex ? "bg-amber-700 w-8" : "bg-stone-200 w-4 hover:bg-stone-300"
                      }`}
                      aria-label={`Go to item ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}