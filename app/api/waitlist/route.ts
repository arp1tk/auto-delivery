import { randomUUID } from "crypto";
import { appendFile, mkdir } from "fs/promises";
import os from "os";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WAITLIST_DIR = path.join(os.tmpdir(), "tyohar-demo");
const WAITLIST_FILE = path.join(WAITLIST_DIR, "waitlist-submissions.jsonl");
const WAITLIST_STORAGE_LABEL = path.posix.join(
  "runtime-temp",
  "waitlist-submissions.jsonl",
);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_COUNTRY_CODES = new Set([
  "+1",
  "+44",
  "+60",
  "+61",
  "+65",
  "+91",
  "+965",
  "+966",
  "+968",
  "+971",
  "+973",
  "+974",
]);

type WaitlistPayload = {
  email?: unknown;
  phone?: unknown;
  countryCode?: unknown;
  source?: unknown;
};

type ValidWaitlistPayload = {
  email: string;
  phone: string | null;
  countryCode: string | null;
  source: string;
};

type WaitlistRecord = ValidWaitlistPayload & {
  id: string;
  createdAt: string;
  storage: string;
  userAgent: string | null;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateWaitlistPayload(payload: WaitlistPayload):
  | { ok: true; value: ValidWaitlistPayload }
  | { ok: false; error: string } {
  const email = asTrimmedString(payload.email).toLowerCase();
  const phoneInput = asTrimmedString(payload.phone);
  const countryCode = asTrimmedString(payload.countryCode);
  const source = asTrimmedString(payload.source);

  if (!email) {
    return { ok: false, error: "Enter an email address." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (!source || source.length > 80) {
    return { ok: false, error: "Submission source is required." };
  }

  if (!phoneInput) {
    return { ok: true, value: { email, phone: null, countryCode: null, source } };
  }

  if (!ALLOWED_COUNTRY_CODES.has(countryCode)) {
    return { ok: false, error: "Choose a supported country code." };
  }

  const phone = phoneInput.replace(/\D/g, "");

  if (phone.length < 7 || phone.length > 15) {
    return { ok: false, error: "Enter a valid mobile number." };
  }

  return { ok: true, value: { email, phone, countryCode, source } };
}

async function parsePayload(req: Request): Promise<
  | { ok: true; value: WaitlistPayload }
  | { ok: false; error: string }
> {
  try {
    return { ok: true, value: (await req.json()) as WaitlistPayload };
  } catch (error) {
    logWaitlistFailure("parse-request-json", null, error);
    return {
      ok: false,
      error: "Submission body must be valid JSON.",
    };
  }
}

async function saveWaitlistRecord(record: WaitlistRecord) {
  await mkdir(WAITLIST_DIR, { recursive: true });
  await appendFile(WAITLIST_FILE, `${JSON.stringify(record)}\n`, "utf8");
}

function logWaitlistFailure(
  step: string,
  input: WaitlistPayload | null,
  error: unknown,
  context: Record<string, unknown> = {},
) {
  const normalizedError =
    error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : { message: String(error) };

  console.error("waitlist submission failed", {
    step,
    input,
    storagePath: WAITLIST_FILE,
    ...context,
    error: normalizedError,
  });
}

export async function POST(req: Request) {
  const parsed = await parsePayload(req);

  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.error },
      { status: 400 },
    );
  }

  const payload = parsed.value;
  const validated = validateWaitlistPayload(payload);

  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const record: WaitlistRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    storage: WAITLIST_STORAGE_LABEL,
    userAgent: req.headers.get("user-agent"),
    ...validated.value,
  };

  try {
    await saveWaitlistRecord(record);
  } catch (error) {
    logWaitlistFailure("persist-waitlist-record", payload, error, {
      recordId: record.id,
      storageLabel: WAITLIST_STORAGE_LABEL,
    });

    return NextResponse.json(
      { error: "Could not save waitlist submission." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      id: record.id,
      message: "Waitlist spot saved.",
      storage: WAITLIST_STORAGE_LABEL,
    },
    { status: 201 },
  );
}
