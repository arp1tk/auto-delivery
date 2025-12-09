"use client";

import { useState } from "react";
import Section from "./layout/Section";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface SubItem {
  id: string;
  name: string;
  image: string;
  price?: string;
}

interface Category {
  id: string;
  label: string;
  image: string;
  subItems: SubItem[];
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const categories: Category[] = [
    {
      id: "sweets",
      label: "Sweets",
      image: "/sweets.avif",
      subItems: [
        { id: "1", name: "Premium Diwali Sweets Box", image: "/sweets.avif", price: "₹899" },
        { id: "2", name: "Traditional Mithai Collection", image: "/trad.webp", price: "₹1,299" },
        { id: "3", name: "Gourmet Sweet Hamper", image: "/gourmet.webp", price: "₹1,599" },
        { id: "4", name: "Regional Special Sweets", image: "/regional.jpeg", price: "₹999" },
        { id: "5", name: "Sugar-Free Delights", image: "/sugar.jpg", price: "₹1,199" },
      ],
    },
    {
      id: "flowers",
      label: "Flowers",
      image: "/flowers.png",
      subItems: [
        { id: "1", name: "Fresh Rose Bouquet", image: "/flowers.png", price: "₹599" },
        { id: "2", name: "Mixed Seasonal Flowers", image: "/mixed.webp", price: "₹799" },
        { id: "3", name: "Premium Orchid Arrangement", image: "/orchid.webp", price: "₹1,299" },
        { id: "4", name: "Marigold Garland Set", image: "/marigold.webp", price: "₹399" },
        { id: "5", name: "Luxury Flower Basket", image: "/luxory.webp", price: "₹1,499" },
      ],
    },
    {
      id: "hampers",
      label: "Hampers",
      image: "/hampers.png",
      subItems: [
        { id: "1", name: "Premium Festival Hamper", image: "/hampers.png", price: "₹2,499" },
        { id: "2", name: "Luxury Gift Hamper", image: "/hampers.webp", price: "₹3,299" },
        { id: "3", name: "Corporate Gift Hamper", image: "/corporate.webp", price: "₹4,999" },
        { id: "4", name: "Custom Curated Hamper", image: "/hampers.webp", price: "₹1,999" },
        { id: "5", name: "Deluxe Celebration Box", image: "/deluxe.webp", price: "₹3,799" },
      ],
    },
    {
      id: "dry-fruits",
      label: "Dry Fruits",
      image: "/luxory-dry.webp",
      subItems: [
        { id: "1", name: "Premium Almonds & Cashews", image: "/almonds.webp", price: "₹1,299" },
        { id: "2", name: "Mixed Dry Fruits Box", image: "/mixeddry.webp", price: "₹1,599" },
        { id: "3", name: "Luxury Dry Fruits Hamper", image: "/luxory-dry.webp", price: "₹2,299" },
        { id: "4", name: "Organic Dry Fruits Collection", image: "/organic.webp", price: "₹1,899" },
        { id: "5", name: "Gourmet Nuts Selection", image: "/hampers.webp", price: "₹999" },
      ],
    },
    {
      id: "chocolates",
      label: "Chocolates",
      image: "/belgian.webp",
      subItems: [
        { id: "1", name: "Belgian Chocolate Box", image: "/belgian.webp", price: "₹899" },
        { id: "2", name: "Premium Chocolate Collection", image: "/pc.png", price: "₹1,499" },
        { id: "3", name: "Artisan Chocolate Hamper", image: "/artisan.png", price: "₹1,999" },
        { id: "4", name: "Gourmet Chocolate Gift Set", image: "/gc.png", price: "₹1,299" },
        { id: "5", name: "Luxury Chocolate Box", image: "/pc.png", price: "₹2,299" },
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

  return (
    <Section>
      <div className="mb-12 text-center">
        <h2 className="font-serif text-4xl mb-4 text-stone-900">Our Catalogue</h2>
        <p className="text-stone-600">Explore our curated collection of premium gifts</p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className={`relative group overflow-hidden bg-stone-200 cursor-pointer h-64 rounded-lg ${
              selectedCategory === category.id ? "ring-4 ring-amber-700" : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={category.image}
              alt={category.label}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            <div className="absolute bottom-4 left-4 text-white font-serif text-xl drop-shadow-lg">
              {category.label}
            </div>

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          </motion.div>
        ))}
      </div>

      {/* Carousel Section */}
      <AnimatePresence mode="wait">
        {selectedCategory && currentSubItem && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <div className="bg-white rounded-lg shadow-xl border-4 border-stone-200 p-8">
              {/* Carousel Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-stone-900 mb-2">
                    {selectedCategoryData?.label} Collection
                  </h3>
                  <p className="text-stone-500 text-sm">
                    {carouselIndex + 1} of {currentSubItems.length}
                  </p>
                </div>
                <button
                  onClick={handleCloseCarousel}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                  aria-label="Close carousel"
                >
                  <X className="w-5 h-5 text-stone-600" />
                </button>
              </div>

              {/* Carousel Content */}
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Image */}
                  <div className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSubItem.id}
                        src={currentSubItem.image}
                        alt={currentSubItem.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-3xl text-stone-900">{currentSubItem.name}</h4>
                    {currentSubItem.price && (
                      <p className="text-2xl font-semibold text-amber-700">{currentSubItem.price}</p>
                    )}
                    <p className="text-stone-600">
                      Premium quality {selectedCategoryData?.label.toLowerCase()} carefully curated for your special occasions.
                    </p>
                    <button className="mt-6 px-8 py-3 bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors rounded-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Navigation Arrows */}
                {currentSubItems.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-stone-50 transition-colors border-2 border-stone-200"
                      aria-label="Previous item"
                    >
                      <ChevronLeft className="w-6 h-6 text-stone-700" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-stone-50 transition-colors border-2 border-stone-200"
                      aria-label="Next item"
                    >
                      <ChevronRight className="w-6 h-6 text-stone-700" />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {currentSubItems.length > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {currentSubItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === carouselIndex ? "bg-amber-700 w-8" : "bg-stone-300"
                        }`}
                        aria-label={`Go to item ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
