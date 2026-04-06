import { create } from "zustand";
import type { Product } from "@prisma/client";

export type CartLine = {
  product: Product;
  quantity: number;
};

type CartState = {
  linesById: Record<string, CartLine>;
  add: (product: Product) => void;
  removeOne: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  linesById: {},
  add: (product) =>
    set((state) => {
      const existing = state.linesById[product.id];
      return {
        linesById: {
          ...state.linesById,
          [product.id]: {
            product,
            quantity: (existing?.quantity ?? 0) + 1,
          },
        },
      };
    }),
  removeOne: (productId) =>
    set((state) => {
      const existing = state.linesById[productId];
      if (!existing) return state;
      const next = { ...state.linesById };
      if (existing.quantity <= 1) delete next[productId];
      else next[productId] = { ...existing, quantity: existing.quantity - 1 };
      return { linesById: next };
    }),
  setQuantity: (productId, quantity) =>
    set((state) => {
      const existing = state.linesById[productId];
      if (!existing) return state;
      const q = Math.max(0, Math.floor(quantity));
      const next = { ...state.linesById };
      if (q === 0) delete next[productId];
      else next[productId] = { ...existing, quantity: q };
      return { linesById: next };
    }),
  clear: () => set({ linesById: {} }),
}));

export function cartTotalCount(linesById: Record<string, CartLine>) {
  return Object.values(linesById).reduce((acc, l) => acc + l.quantity, 0);
}

export function cartSubtotalEur(linesById: Record<string, CartLine>) {
  return Object.values(linesById).reduce(
    (acc, l) => acc + l.quantity * l.product.priceEur,
    0,
  );
}

