"use client";

import type { StoreProduct } from "@/lib/pokeapi";
import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({
  products,
  getQuantity,
  add,
  remove,
}: {
  products: StoreProduct[];
  getQuantity: (id: string) => number;
  add: (product: StoreProduct) => void;
  remove: (productId: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          quantity={getQuantity(p.id)}
          onAdd={() => add(p)}
          onRemove={() => remove(p.id)}
        />
      ))}
    </div>
  );
}

