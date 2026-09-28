import type { CheckoutFormData } from "../validations/checkoutSchema";
import type { CartItem } from "../store/Store";

export interface Order {
  id: string;
  userEmail: string;
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
    userEmail: order.userEmail.toLowerCase(),
    id: crypto.randomUUID(),
    placedAt: new Date().toISOString(),
  };

  const updated = [...getOrders(), fullOrder];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));

  return fullOrder;
}

export function getOrders(userEmail?: string): Order[] {
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) return [];
  try {
    const all = JSON.parse(raw) as Order[];
    if (!userEmail) return all;
    const email = userEmail.toLowerCase();
    return all.filter((order) => order.userEmail === email);
  } catch {
    return [];
  }
}