import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getCartTotal, type OrderDraft, type OrderRecord } from "@/lib/orders";
import { findOrderRecord, PERSISTENCE_STORAGE_LABELS, saveOrderRecord } from "@/lib/persistence";

export const runtime = "nodejs";

function assertOrderDraft(value: unknown): asserts value is OrderDraft {
  if (!value || typeof value !== "object") {
    throw new Error("Order payload must be an object.");
  }

  const draft = value as Partial<OrderDraft>;
  const errors: string[] = [];

  if (!Array.isArray(draft.items) || draft.items.length === 0) {
    errors.push("Cart must contain at least one item.");
  }

  if (typeof draft.total !== "number" || draft.total <= 0) {
    errors.push("Order total must be greater than zero.");
  }

  if (typeof draft.isAnnual !== "boolean") {
    errors.push("Annual reminder choice must be true or false.");
  }

  if (!draft.delivery || typeof draft.delivery !== "object") {
    errors.push("Delivery details are required.");
  } else {
    const requiredFields: Array<keyof OrderDraft["delivery"]> = [
      "occasion",
      "date",
      "recipientName",
      "recipientPhone",
      "address",
      "city",
      "pincode",
    ];

    requiredFields.forEach((field) => {
      if (typeof draft.delivery?.[field] !== "string" || draft.delivery[field].trim() === "") {
        errors.push(`Delivery field "${field}" is required.`);
      }
    });
  }

  if (Array.isArray(draft.items)) {
    draft.items.forEach((item, index) => {
      if (!item || typeof item !== "object") {
        errors.push(`Cart item ${index + 1} must be an object.`);
        return;
      }

      if (typeof item.id !== "string" || item.id.trim() === "") {
        errors.push(`Cart item ${index + 1} is missing an id.`);
      }

      if (typeof item.name !== "string" || item.name.trim() === "") {
        errors.push(`Cart item ${index + 1} is missing a name.`);
      }

      if (typeof item.price !== "string" || item.price.trim() === "") {
        errors.push(`Cart item ${index + 1} is missing a price.`);
      }

      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        errors.push(`Cart item ${index + 1} must have a positive quantity.`);
      }
    });
  }

  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }

  const draftItems = draft.items;
  const draftTotal = draft.total;

  if (!Array.isArray(draftItems) || typeof draftTotal !== "number") {
    throw new Error("Order payload failed total validation.");
  }

  const expectedTotal = getCartTotal(draftItems);

  if (expectedTotal !== draftTotal) {
    throw new Error(`Cart total mismatch. Expected ${expectedTotal}, received ${draftTotal}.`);
  }
}

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("id");

  if (!orderId) {
    return NextResponse.json({ error: "Order id is required." }, { status: 400 });
  }

  try {
    const order = await findOrderRecord(orderId);

    if (!order) {
      return NextResponse.json({ error: `Order ${orderId} was not found.` }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Failed to load order.", {
      orderId,
      storage: PERSISTENCE_STORAGE_LABELS.orders,
      error,
    });
    return NextResponse.json({ error: "Failed to load order. Check server logs for context." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch (error) {
    console.error("Failed to parse order payload.", { error });
    return NextResponse.json({ error: "Order body must be valid JSON." }, { status: 400 });
  }

  try {
    assertOrderDraft(payload);
  } catch (error) {
    console.error("Invalid order payload.", { payload, error });
    const message = error instanceof Error ? error.message : "Unknown order validation failure.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const order: OrderRecord = {
    ...payload,
    createdAt: new Date().toISOString(),
    id: `TYO-${randomUUID().slice(0, 8).toUpperCase()}`,
    paymentMode: "demo",
    status: "confirmed",
  };

  try {
    await saveOrderRecord(order);
    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create order.", {
      storage: PERSISTENCE_STORAGE_LABELS.orders,
      orderId: order.id,
      error,
    });
    return NextResponse.json({ error: "Failed to save order. Check server logs for context." }, { status: 500 });
  }
}
