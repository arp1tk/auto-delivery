"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CalendarDays, CheckCircle2, Gift, MapPin, MessageSquare, RotateCw } from "lucide-react";
import { formatINR, parsePrice, type OrderRecord } from "@/lib/orders";

const missingOrderMessage = "Missing order id in the confirmation link.";

type ConfirmationState =
  | { status: "loading" }
  | { status: "ready"; order: OrderRecord }
  | { status: "error"; message: string };

export default function ConfirmationDetails() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [state, setState] = useState<ConfirmationState>(
    orderId ? { status: "loading" } : { message: missingOrderMessage, status: "error" },
  );

  useEffect(() => {
    if (!orderId) {
      return;
    }

    const confirmedOrderId = orderId;
    let isCurrentRequest = true;

    async function loadOrder() {
      const response = await fetch(`/api/orders?id=${encodeURIComponent(confirmedOrderId)}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`Order lookup failed with ${response.status}: ${responseBody}`);
      }

      const payload = (await response.json()) as { order: OrderRecord };

      if (isCurrentRequest) {
        setState({ order: payload.order, status: "ready" });
      }
    }

    loadOrder().catch((error) => {
      console.error("Confirmation load failed.", { orderId: confirmedOrderId, error });
      const message = error instanceof Error ? error.message : "Unknown confirmation failure.";

      if (isCurrentRequest) {
        setState({ message, status: "error" });
      }
    });

    return () => {
      isCurrentRequest = false;
    };
  }, [orderId]);

  if (state.status === "loading") {
    return (
      <main className="min-h-screen bg-[#FDFBF7] px-6 py-20 text-center text-stone-600">
        Confirming your demo order...
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main className="min-h-screen bg-[#FDFBF7] px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="font-serif text-3xl text-stone-900">Confirmation failed</h1>
          <p className="mt-4 text-sm leading-relaxed text-red-700">{state.message}</p>
          <Link
            href="/products"
            className="mt-8 inline-flex rounded-md bg-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white"
          >
            Return to products
          </Link>
        </div>
      </main>
    );
  }

  const { order } = state;
  const deliveryDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(order.delivery.date));

  return (
    <main className="min-h-screen bg-[#FDFBF7] px-6 py-10 text-stone-800">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 text-green-700">
              <CheckCircle2 className="h-8 w-8" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Demo order confirmed</span>
            </div>
            <h1 className="mt-6 font-serif text-4xl text-stone-950 md:text-5xl">
              Tyohar has your gift run.
            </h1>
            <p className="mt-4 max-w-2xl text-stone-600">
              Order {order.id} is saved and ready for concierge review. The recipient journey now continues beyond the
              checkout button instead of ending at a dead stop.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md bg-stone-50 p-5">
                <CalendarDays className="mb-3 h-5 w-5 text-[#7D4047]" />
                <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Delivery</p>
                <p className="mt-1 font-serif text-xl text-stone-950">
                  {order.delivery.occasion} on {deliveryDate}
                </p>
              </div>
              <div className="rounded-md bg-stone-50 p-5">
                <MapPin className="mb-3 h-5 w-5 text-[#7D4047]" />
                <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Recipient</p>
                <p className="mt-1 font-serif text-xl text-stone-950">{order.delivery.recipientName}</p>
                <p className="mt-1 text-sm text-stone-500">
                  {order.delivery.city} {order.delivery.pincode}
                </p>
              </div>
              <div className="rounded-md bg-stone-50 p-5">
                <Gift className="mb-3 h-5 w-5 text-[#7D4047]" />
                <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Total</p>
                <p className="mt-1 font-serif text-xl text-stone-950">{formatINR(order.total)}</p>
              </div>
              <div className="rounded-md bg-stone-50 p-5">
                <RotateCw className="mb-3 h-5 w-5 text-[#7D4047]" />
                <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Set & Forget</p>
                <p className="mt-1 font-serif text-xl text-stone-950">{order.isAnnual ? "Enabled" : "Off"}</p>
              </div>
            </div>

            {order.delivery.message && (
              <div className="mt-6 rounded-md border border-amber-100 bg-amber-50/60 p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-800">
                  <MessageSquare className="h-4 w-4" />
                  Card message
                </div>
                <p className="font-serif text-lg italic text-stone-700">{order.delivery.message}</p>
              </div>
            )}

            <Link
              href="/products"
              className="mt-8 inline-flex rounded-md bg-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-stone-800"
            >
              Continue shopping
            </Link>
          </section>

          <aside className="rounded-lg border border-stone-200 bg-[#2E2E2E] p-6 text-[#F1ECE6] shadow-sm">
            <h2 className="font-serif text-2xl">Gift box</h2>
            <div className="mt-6 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-md bg-white/8 p-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-white/10">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg leading-tight">{item.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-stone-300">Qty {item.quantity}</p>
                    <p className="mt-2 text-sm font-bold text-amber-200">
                      {formatINR(parsePrice(item.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
