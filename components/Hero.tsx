// components/Hero.tsx
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative bg-stone-100 flex flex-col">
      {/* Logo */}
      <div className="absolute top-8 left-6 md:left-12 lg:left-24 z-20">
        <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] text-stone-900 uppercase">
          Tyohar
        </span>
      </div>

      {/* Main Hero */}
      <div className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Text */}
          <div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
              A lighter way <br />
              <span className="text-amber-700">to send love.</span>
            </h1>

            <p className="text-stone-600 text-lg max-w-md leading-relaxed mb-8">
              Leave the logistics to us. Introducing Tyohar, the premium gifting service that bridges the distance to India.
            </p>

            {/* Bullets */}
            <div className="space-y-4 mb-8">
              {[
                ["Curated:", "Festival-ready hampers for every religion."],
                ["Shipping:", "10,000+ pin codes covered across India."],
                ["Design:", "Premium packaging that feels personal."],
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-stone-900 mt-1" />
                  <p className="text-sm text-stone-700">
                    <strong>{item[0]}</strong> {item[1]}
                  </p>
                </div>
              ))}
            </div>
            <Link href="/products">
              <button className="group bg-stone-900 text-white px-8 py-4 uppercase text-xs font-bold tracking-widest hover:bg-stone-800 transition-all flex items-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Start Gifting
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5] bg-white shadow-2xl p-4 rotate-1 hover:rotate-0 transition-transform duration-700">
              <img src="/hero.png" alt="Premium Hamper" className="object-cover w-full h-full" />
            </div>
            <div className="absolute top-10 right-10 w-full h-full border-2 border-amber-700/20 -z-10"></div>
          </div>

        </div>
      </div>
    </div>
  );
}
