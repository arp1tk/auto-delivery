"use client";

import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation"; 

export default function GiftBox() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, total } = useCart();
  const router = useRouter(); 

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  
  const handleCheckout = () => {
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 bg-stone-900 text-white p-4 rounded-full shadow-2xl border-2 border-amber-700/50 hover:bg-stone-800 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-amber-700 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-stone-900">
              {itemCount}
            </span>
          )}
        </div>
      </motion.button>

      {/* Gift Box Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-stone-50 shadow-2xl z-50 border-l border-stone-200 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-white border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-stone-900">Your Gift Box</h2>
                  <p className="text-stone-500 text-sm">Curating love for India</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-stone-500" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                    <ShoppingBag className="w-16 h-16 opacity-20" />
                    <p>Your gift box is empty.</p>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="text-amber-700 font-bold text-sm uppercase tracking-widest hover:underline"
                    >
                      Start Adding Gifts
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex gap-4 bg-white p-4 rounded-lg shadow-sm border border-stone-200"
                    >
                      <div className="w-20 h-20 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-stone-900 line-clamp-1">{item.name}</h4>
                          <p className="text-amber-700 font-bold text-sm">{item.price}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-stone-100 rounded-full px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-stone-200 rounded-full transition-colors"
                            >
                              <Minus className="w-3 h-3 text-stone-600" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-stone-200 rounded-full transition-colors"
                            >
                              <Plus className="w-3 h-3 text-stone-600" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer / Checkout */}
              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-stone-200 space-y-4">
                  <div className="flex items-center justify-between text-stone-600 text-sm">
                    <span>Subtotal</span>
                    <span className="font-bold text-stone-900">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600 text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold">Free</span>
                  </div>
                  <div className="border-t border-stone-100 pt-4 flex items-center justify-between">
                    <span className="font-serif text-xl">Total</span>
                    <span className="font-serif text-2xl text-amber-700">₹{total.toLocaleString()}</span>
                  </div>
                  
                  {/* 4. Updated Button with handleCheckout */}
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-colors rounded-sm shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}