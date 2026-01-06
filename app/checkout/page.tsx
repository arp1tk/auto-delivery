"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { 
  Calendar as CalendarIcon, 
  User, 
  Gift, 
  Repeat, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [isAnnual, setIsAnnual] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    occasion: "Diwali",
    date: "",
    recipientName: "",
    recipientPhone: "",
    address: "",
    city: "",
    pincode: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-200">
      
      {/* Header */}
      <header className="bg-white border-b border-stone-200 py-6 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-2xl tracking-widest uppercase text-stone-900 font-bold">
            Tyohar<span className="text-amber-700">.</span>
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Secure Concierge
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT COLUMN: The Concierge Form */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* SECTION 1: The Occasion */}
            <section>
              <h2 className="font-serif text-2xl mb-6 text-stone-900 flex items-center gap-3">
                <span className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm font-sans font-bold">1</span>
                The Occasion
              </h2>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Select Festival / Occasion</label>
                    <div className="relative">
                      <select 
                        name="occasion" 
                        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-md appearance-none focus:outline-none focus:border-amber-700 transition-colors cursor-pointer text-stone-700"
                        value={formData.occasion}
                        onChange={handleInputChange}
                      >
                        <option value="Diwali">Diwali (Festival of Lights)</option>
                        <option value="Raksha Bandhan">Raksha Bandhan</option>
                        <option value="Eid">Eid al-Fitr</option>
                        <option value="Christmas">Christmas</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                      </select>
                      <Gift className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Delivery Date</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        name="date"
                        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-amber-700 transition-colors text-stone-700 placeholder:text-stone-400"
                        onChange={handleInputChange}
                      />
                      <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* --- THE AUTOMATION UPSELL --- */}
                <motion.div 
                  className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${isAnnual ? 'border-amber-600 bg-amber-50/50' : 'border-stone-100 bg-stone-50'}`}
                  whileTap={{ scale: 0.995 }}
                >
                  <label className="flex items-start gap-4 p-6 cursor-pointer">
                    <div className="relative flex items-center pt-1">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={isAnnual}
                        onChange={() => setIsAnnual(!isAnnual)}
                      />
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${isAnnual ? 'bg-amber-600 border-amber-600' : 'border-stone-300 bg-white'}`}>
                        {isAnnual && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Repeat className={`w-4 h-4 ${isAnnual ? 'text-amber-700' : 'text-stone-400'}`} />
                        <h3 className={`font-serif text-lg ${isAnnual ? 'text-amber-900' : 'text-stone-600'}`}>
                          Enable "Set & Forget"
                        </h3>
                        {isAnnual && <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Active</span>}
                      </div>
                      
                      <p className={`text-sm leading-relaxed mb-4 ${isAnnual ? 'text-amber-900' : 'text-stone-500'}`}>
                        Never miss this occasion again. We will automatically reserve a similar hamper for <span className="font-bold">{formData.occasion} {new Date().getFullYear() + 1}</span>.
                      </p>

                      {/* Expandable details about Set & Forget */}
                      <AnimatePresence>
                        {isAnnual && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white/60 rounded-md p-4 text-xs text-amber-900 border border-amber-200 space-y-2"
                          >
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                              <p><strong>Zero Risk:</strong> You are <u>not</u> charged today for next year.</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                              <p><strong>Review First:</strong> We email you a cart link 2 weeks before the date. You can approve, change items, or cancel.</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                              <p><strong>Priority Slot:</strong> Your delivery slot is guaranteed even during peak festival rush.</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </label>
                </motion.div>
                {/* ----------------------------- */}

              </div>
            </section>

            {/* SECTION 2: The Recipient */}
            <section>
              <h2 className="font-serif text-2xl mb-6 text-stone-900 flex items-center gap-3">
                <span className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm font-sans font-bold">2</span>
                The Recipient
              </h2>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Full Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="recipientName"
                        placeholder="e.g. Anjali Sharma"
                        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-amber-700 text-stone-700 placeholder:text-stone-400"
                        onChange={handleInputChange}
                      />
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Indian Mobile (+91)</label>
                    <input 
                      type="tel" 
                      name="recipientPhone"
                      placeholder="98765 43210"
                      className="w-full p-4 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-amber-700 text-stone-700 placeholder:text-stone-400"
                      onChange={handleInputChange}
                    />
                    <p className="text-[10px] text-stone-400 mt-1">Required for delivery coordination via WhatsApp.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Complete Address</label>
                  <textarea 
                    name="address"
                    placeholder="Flat No, Building, Street Area..."
                    rows={3}
                    className="w-full p-4 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-amber-700 resize-none text-stone-700 placeholder:text-stone-400"
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">City</label>
                    <input 
                      type="text" 
                      name="city"
                      placeholder="e.g. Mumbai" 
                      className="w-full p-4 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-amber-700 text-stone-700 placeholder:text-stone-400" 
                      onChange={handleInputChange}
                    />
                   </div>
                   <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Pincode</label>
                    <input 
                      type="text" 
                      name="pincode"
                      placeholder="400050" 
                      className="w-full p-4 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-amber-700 text-stone-700 placeholder:text-stone-400" 
                      onChange={handleInputChange}
                    />
                   </div>
                </div>
              </div>
            </section>

             {/* SECTION 3: The Message */}
             <section>
              <h2 className="font-serif text-2xl mb-6 text-stone-900 flex items-center gap-3">
                <span className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm font-sans font-bold">3</span>
                Personal Touch
              </h2>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Card Message</label>
                  <textarea 
                    name="message"
                    placeholder="Write a heartfelt note..."
                    rows={4}
                    className="w-full p-6 bg-[#FAF9F6] border border-stone-200 rounded-md focus:outline-none focus:border-amber-700 font-serif text-lg italic text-stone-700 placeholder:text-stone-400/70"
                    onChange={handleInputChange}
                  ></textarea>
                  <p className="text-right text-xs text-stone-400">Printed on premium cardstock</p>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Order Summary (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              
              <div className="bg-white p-8 rounded-xl shadow-2xl border border-stone-100">
                <h3 className="font-serif text-2xl text-stone-900 mb-6 pb-4 border-b border-stone-100">
                  Your Selection
                </h3>
                
                {/* Cart Items List */}
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2">
                  {items.length === 0 ? (
                    <p className="text-stone-400 italic text-sm">Your cart is empty.</p>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-stone-100 rounded-md overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-stone-900 text-sm">{item.name}</h4>
                          <p className="text-xs text-stone-500 mt-1">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm text-stone-700">₹{parseInt(item.price.replace(/\D/g,'')) * item.quantity}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-6 border-t border-stone-100">
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-600">
                     <span>Concierge Fee</span>
                     <span className="text-stone-400 line-through">₹500</span>
                  </div>
                   <div className="flex justify-between text-sm text-green-700 font-bold bg-green-50 p-2 rounded">
                     <span>Shipping</span>
                     <span>FREE</span>
                  </div>
                  {isAnnual && (
                    <div className="flex justify-between text-sm text-amber-700 font-bold bg-amber-50 p-2 rounded">
                      <span>Automated Renewal</span>
                      <span>Active (₹0 Today)</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-end pt-4 border-t border-stone-200 mt-4">
                    <span className="font-serif text-xl">Total</span>
                    <div className="text-right">
                       <span className="block text-2xl font-bold text-stone-900">₹{total.toLocaleString()}</span>
                       <span className="text-[10px] text-stone-400 uppercase tracking-wide">Includes all taxes</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full mt-8 bg-stone-900 text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all flex items-center justify-center gap-3 group">
                  Proceed to Pay
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-center text-[10px] text-stone-400 mt-4 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3 h-3" />
                  Payments processed securely via Stripe/Razorpay
                </p>

              </div>
              
              {/* Trust Badge */}
              <div className="bg-[#F3EDE7] p-6 rounded-lg border border-stone-200 text-center">
                 <p className="font-serif text-lg italic text-stone-600 mb-2">"Tyohar Promise"</p>
                 <p className="text-xs text-stone-500 leading-relaxed">
                   We verify every address before shipping. If the recipient is unavailable, we coordinate a new time slot at no extra cost.
                 </p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}