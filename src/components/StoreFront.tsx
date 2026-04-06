"use client";

import { useMemo, useState } from "react";
import type { Product } from "@prisma/client";
import { Footer } from "@/components/Footer";
import { CartSidebar } from "@/components/CartSidebar";
import { HeroBanner } from "@/components/HeroBanner";
import { Navbar } from "@/components/Navbar";
import { ProductGrid } from "@/components/ProductGrid";
import { cartTotalCount, useCartStore } from "@/store/cart";

export function StoreFront({ products }: { products: Product[] }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const linesById = useCartStore((s) => s.linesById);
  const add = useCartStore((s) => s.add);
  const removeOne = useCartStore((s) => s.removeOne);

  const cartCount = useMemo(() => cartTotalCount(linesById), [linesById]);

  return (
    <div className="flex flex-1 flex-col">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <HeroBanner
        onShopNow={() => {
          document
            .getElementById("catalogo")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section id="catalogo" className="scroll-mt-28">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Catálogo
              </h2>
              <p className="mt-1 text-sm text-muted">
                Explora todos nuestros productos disponibles.
              </p>
            </div>
            <button
              type="button"
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-bold transition hover:bg-surface-2"
              onClick={() => setIsCartOpen(true)}
            >
              Ver carrito
            </button>
          </div>

          <div className="mt-6">
            <ProductGrid
              products={products}
              getQuantity={(id) => linesById[id]?.quantity ?? 0}
              add={add}
              remove={removeOne}
            />
          </div>
        </section>

        <section id="ofertas" className="mt-12 scroll-mt-28">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-xl font-extrabold tracking-tight">Ofertas Especiales</h3>
            <p className="mt-2 text-sm text-muted">
              Descubre nuestras mejores rebajas y promociones.
            </p>
          </div>
        </section>

        <section id="novedades" className="mt-6 scroll-mt-28">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-xl font-extrabold tracking-tight">Novedades</h3>
            <p className="mt-2 text-sm text-muted">
              Lo último en llegar a la tienda.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

