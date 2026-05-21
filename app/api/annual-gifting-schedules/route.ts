import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SchedulePayload = {
  sender?: unknown;
  recipient?: unknown;
  occasion?: unknown;
  date?: unknown;
  city?: unknown;
  gift?: unknown;
};

const storageDir = path.join(process.cwd(), "var");
const storagePath = path.join(storageDir, "annual-gifting-schedules.json");

function requireText(payload: SchedulePayload, key: keyof SchedulePayload) {
  const value = payload[key];

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Annual gifting schedule requires ${String(key)}.`);
  }

  return value.trim();
}

async function readSchedules() {
  await mkdir(storageDir, { recursive: true });

  try {
    const raw = await readFile(storagePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      throw new Error(`${storagePath} must contain a JSON array.`);
    }

    return parsed;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      await writeFile(storagePath, "[]\n", "utf8");
      return [];
    }

    throw error;
  }
}

export async function POST(req: Request) {
  let payload: SchedulePayload | undefined;

  try {
    payload = (await req.json()) as SchedulePayload;

    const schedule = {
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

    const schedules = await readSchedules();
    schedules.push(schedule);
    await writeFile(storagePath, `${JSON.stringify(schedules, null, 2)}\n`, "utf8");

    return NextResponse.json({ schedule }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown annual gifting schedule failure.";
    console.error("Annual gifting schedule save failed", {
      payload,
      storagePath,
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json({ error: "Could not save annual gifting schedule.", detail: message }, { status: 500 });
  }
}
