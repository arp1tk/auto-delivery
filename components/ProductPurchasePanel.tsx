"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/app/data/products";

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, setIsOpen } = useCart();

  const addProductToCart = () => {
    addToCart({
      category: product.category,
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
    });
    setIsOpen(true);
  };

  const buyNow = () => {
    addProductToCart();
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={addProductToCart}
        className="mt-6 inline-flex items-center justify-center gap-3 rounded-md bg-[#7D4047] px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#6b353c]"
      >
        <ShoppingBag className="h-4 w-4" />
        Add to Gift Box
      </button>
      <button
        onClick={buyNow}
        className="sm:mt-6 inline-flex items-center justify-center gap-3 rounded-md border border-stone-300 px-8 py-4 text-xs font-bold uppercase tracking-widest text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
      >
        Checkout
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
