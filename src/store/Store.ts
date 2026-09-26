import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Product {
  id: number | string;
  name: string;
  price: number;
  image?: string;
  [key: string]: unknown; // allows extra fields you might have (category, description, etc.)
}

export interface CartItem extends Product {
  quantity: number;
  discount: number;
}

interface StoreState {
  cart: CartItem[];
  discount: number;
  setDiscount: (amount: number) => void;
  addToCart: (product: Product) => void;
  setProductDiscount: (id: number | string, discountAmount: number) => void;
  increment: (id: number | string) => void;
  decrement: (id: number | string) => void;
  removeFromCart: (productId: number | string) => void;
  clearCart: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      discount: 0,

      setDiscount: (amount) => set({ discount: amount }),

      addToCart: (product) =>
        set((state) => {
          const exists = state.cart.find((item) => item.id === product.id);
          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1, discount: 0 }],
          };
        }),

      setProductDiscount: (id, discountAmount) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, discount: discountAmount } : item
          ),
        })),

      increment: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decrement: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        })),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      clearCart: () => set({ cart: [], discount: 0 }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;