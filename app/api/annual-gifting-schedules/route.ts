import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  PERSISTENCE_STORAGE_LABELS,
  saveAnnualGiftingSchedule,
  type AnnualGiftingSchedule,
} from "@/lib/persistence";

export const runtime = "nodejs";

type SchedulePayload = {
  sender?: unknown;
  recipient?: unknown;
  occasion?: unknown;
  date?: unknown;
  city?: unknown;
  gift?: unknown;
};

function requireText(payload: SchedulePayload, key: keyof SchedulePayload) {
  const value = payload[key];

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Annual gifting schedule requires ${String(key)}.`);
  }

  return value.trim();
}

export async function POST(req: Request) {
  let payload: SchedulePayload;

  try {
    payload = (await req.json()) as SchedulePayload;
  } catch (error) {
    console.error("Annual gifting schedule JSON parse failed", { error });
    return NextResponse.json({ error: "Schedule body must be valid JSON." }, { status: 400 });
  }

  let schedule: AnnualGiftingSchedule;

  try {
    schedule = {
      id: `annual_${randomUUID()}`,
      sender: requireText(payload, "sender"),
      recipient: requireText(payload, "recipient"),
      occasion: requireText(payload, "occasion"),
      date: requireText(payload, "date"),
      city: requireText(payload, "city"),
      gift: requireText(payload, "gift"),
      reminderDays: [30, 14, 3],
      proofStatus: "photo_confirmation_pending",
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown annual gifting validation failure.";
    console.error("Annual gifting schedule validation failed", {
      payload,
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    await saveAnnualGiftingSchedule(schedule);

    return NextResponse.json({ schedule }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown annual gifting schedule failure.";
    console.error("Annual gifting schedule save failed", {
      payload,
      storage: PERSISTENCE_STORAGE_LABELS.annualSchedules,
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json({ error: "Could not save annual gifting schedule. Check server logs for context." }, { status: 500 });
  }
}
