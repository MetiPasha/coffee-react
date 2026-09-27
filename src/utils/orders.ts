import type { CheckoutFormData } from "../validations/checkoutSchema";
import type { CartItem } from "../store/Store";

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerInfo: CheckoutFormData;
  placedAt: string;
}

const ORDERS_KEY = "coffee-react-orders";

export function saveOrder(order: Omit<Order, "id" | "placedAt">): Order {
  const fullOrder: Order = {
    ...order,
    id: crypto.randomUUID(),
    placedAt: new Date().toISOString(),
  };

  const existing = getOrders();
  const updated = [...existing, fullOrder];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));

  return fullOrder;
}

export function getOrders(): Order[] {
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}