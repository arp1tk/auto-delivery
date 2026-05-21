"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, Camera, CalendarDays, CheckCircle2, Loader2, Mail, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/app/data/products";

type SavedSchedule = {
  id: string;
  sender: string;
  recipient: string;
  occasion: string;
  date: string;
  city: string;
  gift: string;
  reminderDays: number[];
  proofStatus: string;
};

const featuredGifts = PRODUCTS.filter((product) => product.category === "Hampers").slice(0, 3);

function displayDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function reminderDate(value: string, daysBefore: number) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - daysBefore);
  return displayDate(date.toISOString().slice(0, 10));
}

async function parseScheduleResponse(response: Response) {
  const body = (await response.json()) as { schedule?: SavedSchedule; error?: string; detail?: string };

  if (!response.ok || !body.schedule) {
    throw new Error(`Schedule save failed with ${response.status}: ${body.error ?? "No error"} ${body.detail ?? ""}`);
  }

  return body.schedule;
}

export default function AnnualGiftingPage() {
  const [sender, setSender] = useState("Aarav");
  const [recipient, setRecipient] = useState("Nani");
  const [occasion, setOccasion] = useState("Diwali");
  const [date, setDate] = useState("2026-10-20");
  const [city, setCity] = useState("Jaipur");
  const [giftId, setGiftId] = useState(featuredGifts[0]?.id ?? "");
  const [savedSchedule, setSavedSchedule] = useState<SavedSchedule | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState("");

  const gift = useMemo(() => {
    const selected = featuredGifts.find((product) => product.id === giftId);

    if (!selected) {
      throw new Error(`Unknown annual gifting gift id: ${giftId}.`);
    }

    return selected;
  }, [giftId]);

  const submitSchedule = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");
    setError("");

    try {
      const response = await fetch("/api/annual-gifting-schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender, recipient, occasion, date, city, gift: gift.name }),
      });
      const schedule = await parseScheduleResponse(response);
      setSavedSchedule(schedule);
      setStatus("saved");
    } catch (scheduleError) {
      const message =
        scheduleError instanceof Error ? scheduleError.message : "Unknown annual gifting schedule failure.";
      console.error("Annual gifting demo submit failed", {
        sender,
        recipient,
        occasion,
        date,
        city,
        gift,
        message,
        stack: scheduleError instanceof Error ? scheduleError.stack : undefined,
      });
      setError(message);
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-800">
            <ArrowLeft className="h-4 w-4" />
            Tyohar
          </Link>
          <span className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-500 sm:flex">
            <Sparkles className="h-4 w-4 text-amber-700" />
            Set once. Remember every year.
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_420px]">
        <form onSubmit={submitSchedule} className="rounded-lg border border-stone-200 bg-white p-6 shadow-xl md:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Annual concierge</p>
          <h1 className="font-serif text-4xl leading-tight md:text-6xl">Schedule the yearly gift.</h1>
          <p className="mt-4 max-w-2xl text-stone-600">
            A recruiter can see Tyohar&apos;s promise in one pass: choose the ritual, preview reminders, save it, and land on proof.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Sender</span>
              <input value={sender} onChange={(event) => setSender(event.target.value)} className="h-12 w-full rounded-md border border-stone-200 bg-stone-50 px-4 outline-none focus:border-amber-700" />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Recipient</span>
              <input value={recipient} onChange={(event) => setRecipient(event.target.value)} className="h-12 w-full rounded-md border border-stone-200 bg-stone-50 px-4 outline-none focus:border-amber-700" />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Occasion</span>
              <select value={occasion} onChange={(event) => setOccasion(event.target.value)} className="h-12 w-full rounded-md border border-stone-200 bg-stone-50 px-4 outline-none focus:border-amber-700">
                <option>Diwali</option>
                <option>Raksha Bandhan</option>
                <option>Eid al-Fitr</option>
                <option>Christmas</option>
                <option>Birthday</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Delivery date</span>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="h-12 w-full rounded-md border border-stone-200 bg-stone-50 px-4 outline-none focus:border-amber-700" />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500">City</span>
              <input value={city} onChange={(event) => setCity(event.target.value)} className="h-12 w-full rounded-md border border-stone-200 bg-stone-50 px-4 outline-none focus:border-amber-700" />
            </label>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {featuredGifts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setGiftId(product.id)}
                className={`rounded-md border p-4 text-left transition ${giftId === product.id ? "border-amber-700 bg-amber-50" : "border-stone-200 bg-white hover:border-stone-400"}`}
              >
                <span className="block h-28">
                  <Image
                    src={product.image}
                    alt=""
                    width={220}
                    height={140}
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="mt-3 block font-serif text-lg leading-tight">{product.name}</span>
                <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-amber-700">{product.price}</span>
              </button>
            ))}
          </div>

          {error ? <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">{error}</div> : null}

          <button disabled={status === "saving"} className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-md bg-stone-900 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-stone-800 disabled:opacity-70">
            {status === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarDays className="h-4 w-4" />}
            Save annual schedule
          </button>
        </form>

        <aside className="space-y-6">
          <section className="rounded-lg border border-stone-200 bg-stone-900 p-6 text-white shadow-xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
              <Mail className="h-4 w-4" />
              Reminder preview
            </p>
            <h2 className="font-serif text-3xl">{occasion} for {recipient}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-300">{gift.name} reaches {city} on {displayDate(date)}.</p>
            <div className="mt-5 space-y-3">
              {[30, 14, 3].map((days) => (
                <div key={days} className="rounded-md bg-white/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-200">Reminder {days} days before</p>
                  <p className="mt-1 text-sm text-stone-200">{reminderDate(date, days)}: approve, edit, or cancel before Tyohar ships.</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-xl">
            {savedSchedule ? (
              <>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Photo-confirmation proof
                </p>
                <div className="overflow-hidden rounded-md border border-stone-200 bg-stone-50">
                  <div className="p-5">
                    <Image
                      src={gift.image}
                      alt=""
                      width={420}
                      height={260}
                      className="mx-auto h-56 w-full object-contain"
                    />
                  </div>
                  <div className="border-t border-stone-200 bg-white p-4 text-sm">
                    <p className="font-bold text-stone-900">Proof screen ready</p>
                    <p className="mt-2 text-stone-600">Schedule {savedSchedule.id} will show the delivery photo here after handoff.</p>
                    <p className="mt-2 text-stone-600">{savedSchedule.recipient} in {savedSchedule.city} gets email and WhatsApp confirmation.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                  <Camera className="h-4 w-4" />
                  Proof state
                </p>
                <h2 className="font-serif text-3xl">Save to unlock photo proof.</h2>
                <p className="mt-3 text-sm leading-6 text-stone-600">After the schedule is saved, this panel becomes the delivery proof screen with a pending photo-confirmation state.</p>
              </>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}
