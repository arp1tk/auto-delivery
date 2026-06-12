import type { OrderRecord } from "@/lib/orders";
import { getSql } from "@/lib/neon";

export type WaitlistRecord = {
  id: string;
  email: string;
  phone: string | null;
  countryCode: string | null;
  source: string;
  createdAt: string;
  userAgent: string | null;
};

export type AnnualGiftingSchedule = {
  id: string;
  sender: string;
  recipient: string;
  occasion: string;
  date: string;
  city: string;
  gift: string;
  reminderDays: number[];
  proofStatus: string;
  createdAt: string;
};

type OrderRow = {
  id: string;
  status: "confirmed";
  payment_mode: "demo";
  total: number;
  is_annual: boolean;
  delivery: unknown;
  items: unknown;
  created_at: string | Date;
};

export const PERSISTENCE_STORAGE_LABELS = {
  annualSchedules: "neon:annual_gifting_schedules",
  orders: "neon:tyohar_orders",
  waitlist: "neon:waitlist_submissions",
} as const;

function asIsoString(value: string | Date) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function parseJsonValue<T>(value: unknown, label: string): T {
  if (typeof value === "string") {
    return JSON.parse(value) as T;
  }

  if (!value || typeof value !== "object") {
    throw new Error(`${label} must be a JSON object or array.`);
  }

  return value as T;
}

function mapOrderRow(row: OrderRow): OrderRecord {
  return {
    id: row.id,
    status: row.status,
    paymentMode: row.payment_mode,
    total: row.total,
    isAnnual: row.is_annual,
    delivery: parseJsonValue<OrderRecord["delivery"]>(row.delivery, "order.delivery"),
    items: parseJsonValue<OrderRecord["items"]>(row.items, "order.items"),
    createdAt: asIsoString(row.created_at),
  };
}

export async function saveWaitlistRecord(record: WaitlistRecord) {
  const sql = getSql();

  await sql`
    INSERT INTO waitlist_submissions (
      id,
      email,
      phone,
      country_code,
      source,
      user_agent,
      created_at
    ) VALUES (
      ${record.id}::uuid,
      ${record.email},
      ${record.phone},
      ${record.countryCode},
      ${record.source},
      ${record.userAgent},
      ${record.createdAt}::timestamptz
    )
  `;
}

export async function saveOrderRecord(order: OrderRecord) {
  const sql = getSql();

  await sql`
    INSERT INTO tyohar_orders (
      id,
      status,
      payment_mode,
      total,
      is_annual,
      delivery,
      items,
      created_at
    ) VALUES (
      ${order.id},
      ${order.status},
      ${order.paymentMode},
      ${order.total},
      ${order.isAnnual},
      ${JSON.stringify(order.delivery)}::jsonb,
      ${JSON.stringify(order.items)}::jsonb,
      ${order.createdAt}::timestamptz
    )
  `;
}

export async function findOrderRecord(orderId: string) {
  const sql = getSql();
  const rows = await sql`
    SELECT
      id,
      status,
      payment_mode,
      total,
      is_annual,
      delivery,
      items,
      created_at
    FROM tyohar_orders
    WHERE id = ${orderId}
    LIMIT 1
  `;

  const [row] = rows as OrderRow[];
  return row ? mapOrderRow(row) : null;
}

export async function saveAnnualGiftingSchedule(schedule: AnnualGiftingSchedule) {
  const sql = getSql();

  await sql`
    INSERT INTO annual_gifting_schedules (
      id,
      sender,
      recipient,
      occasion,
      annual_date,
      city,
      gift,
      reminder_days,
      proof_status,
      created_at
    ) VALUES (
      ${schedule.id},
      ${schedule.sender},
      ${schedule.recipient},
      ${schedule.occasion},
      ${schedule.date}::date,
      ${schedule.city},
      ${schedule.gift},
      ${JSON.stringify(schedule.reminderDays)}::jsonb,
      ${schedule.proofStatus},
      ${schedule.createdAt}::timestamptz
    )
  `;
}
