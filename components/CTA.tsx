"use client";

import { useState } from "react";
import { ChevronDown, Loader2, CheckCircle2 } from "lucide-react";
import Section from "./layout/Section";

export default function CTA() {
  const [formData, setFormData] = useState({
    email: "",
    countryCode: "+91",
    phone: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!formData.email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "CTA Section" }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ email: "", countryCode: "+91", phone: "" });
      } else {
        setStatus("error");
      }
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#2D2D2D] w-full py-3 px-6 border-t border-stone-700">
      <Section>
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-8">
          
          <div className="text-white max-w-md text-center xl:text-left">
            <h3 className="font-serif text-2xl mb-1">Join the Waitlist</h3>
            <p className="text-stone-400 text-sm">
              We're launching soon. Join the waitlist and be the first to get notified!
            </p>
          </div>

          {status === "success" ? (
            <div className="bg-green-900/20 border border-green-800 text-green-100 px-8 py-4 rounded w-full xl:w-auto flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <div>
                <p className="font-bold text-sm">You're on the list.</p>
                <p className="text-xs opacity-80">Check your email for confirmation.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto items-stretch">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-white px-4 py-3 min-w-[220px] text-sm h-[48px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />

              <div className="relative pb-8 md:pb-0">
                <div className="flex bg-white h-[48px]">
                  <div className="relative border-r border-gray-200 h-full">
                    <select 
                      value={formData.countryCode}
                      onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                      className="appearance-none pl-4 pr-8 py-3 text-sm font-bold h-full bg-transparent text-stone-900 focus:outline-none cursor-pointer"
                    >
                      <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+1">🇨🇦 +1</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+965">🇰🇼 +965</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+968">🇴🇲 +968</option>
                    <option value="+973">🇧🇭 +973</option>
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                  </div>

                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="px-4 py-3 w-full text-sm h-full text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                {/* Mobile padding helper */}
                <span className="absolute -bottom-5 md:hidden left-0 right-0 text-stone-400 text-xs text-center">(Optional)</span>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="bg-[#F3EDE7] text-[#2D2D2D] px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-amber-100 transition-all whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 h-[48px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join Waitlist"}
              </button>
            </div>
          )}

        </div>
      </Section>
    </div>
  );
}



