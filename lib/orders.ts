import type { CartItem } from "@/context/CartContext";

export type DeliveryDetails = {
  occasion: string;
  date: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  city: string;
  pincode: string;
  message: string;
};

export type OrderDraft = {
  items: CartItem[];
  total: number;
  isAnnual: boolean;
  delivery: DeliveryDetails;
};

export type OrderRecord = OrderDraft & {
  id: string;
  status: "confirmed";
  paymentMode: "demo";
  createdAt: string;
};

export function parsePrice(price: string) {
  const amount = Number.parseInt(price.replace(/[^0-9]/g, ""), 10);

  if (!Number.isFinite(amount)) {
    throw new Error(`Unable to parse price "${price}".`);
  }

  return amount;
}

export function getCartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}
