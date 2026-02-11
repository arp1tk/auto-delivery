import { PRODUCTS } from "@/app/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div className="relative w-full aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="space-y-6">
          {product.tag && (
            <span className="text-xs font-bold uppercase tracking-widest text-[#7D4047] bg-amber-50 px-3 py-1 rounded-sm">
              {product.tag}
            </span>
          )}
          <h1 className="text-4xl font-serif text-[#2E2E2E]">
            {product.name}
          </h1>
          <p className="text-2xl font-medium text-[#2E2E2E]">
            {product.price}
          </p>
          <p className="text-stone-600 leading-relaxed">
            {product.desc}
          </p>
          <button className="mt-6 px-8 py-4 bg-[#7D4047] text-white rounded-md hover:bg-[#6b353c] transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
