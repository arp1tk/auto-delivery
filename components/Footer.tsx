"use client";

import { useState } from "react";
import Section from "./layout/Section";
import { Loader2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleJoin = async () => {
    if (!email) return;
    setStatus("loading");
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, countryCode: "", source: "Footer" }),
      });
      setStatus("success");
      setEmail("");
      setPhone("");
    } catch (e) {
      console.error(e);
      setStatus("idle"); 
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-400 px-6 border-t border-stone-800">
      <Section>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          
          <div className="max-w-sm">
            <h4 className="text-white font-serif text-2xl mb-6">Real Emotions. <br />Delivered.</h4>
            <p className="text-sm mb-6">
              Our mission is simple: bring you closer to home.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-end w-full md:w-auto">
            <span className="uppercase text-xs tracking-widest text-stone-500">Stay Connected</span>
            
            <div className="flex flex-col gap-3 w-full md:w-80">
              {status === "success" ? (
                 <div className="text-amber-500 text-sm font-medium py-4 text-right">
                   Welcome to the family.
                 </div>
              ) : (
                <>
                  <div className="flex border-b border-stone-700 pb-2 focus-within:border-amber-700 transition-colors">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent w-full text-white outline-none placeholder-stone-600" 
                    />
                    <button 
                      onClick={handleJoin}
                      disabled={status === "loading"}
                      className="text-white uppercase text-xs font-bold hover:text-amber-500 transition-colors disabled:opacity-50"
                    >
                      {status === "loading" ? "..." : "Join"}
                    </button>
                  </div>
                  <div className="flex border-b border-stone-700 pb-2 focus-within:border-amber-700 transition-colors">
                    <input 
                      type="tel" 
                      placeholder="Phone Number (Optional)" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-transparent w-full text-white text-sm outline-none placeholder-stone-600" 
                    />
                  </div>
                </>
              )}
            </div>
            
            <p className="text-[10px] uppercase tracking-widest mt-4 opacity-50">© 2025 Devix</p>
          </div>

        </div>
      </Section>
    </footer>
  );
}