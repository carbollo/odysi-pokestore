"use client";

import { X } from "lucide-react";
import { cartSubtotalEur, useCartStore } from "@/store/cart";

export function CartSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const linesById = useCartStore((s) => s.linesById);
  const removeOne = useCartStore((s) => s.removeOne);
  const clear = useCartStore((s) => s.clear);
  const subtotal = cartSubtotalEur(linesById);
  const lines = Object.values(linesById);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Cerrar carrito"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-border bg-background shadow-2xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <div>
              <div className="text-lg font-extrabold">Tu carrito</div>
              <div className="text-xs text-muted">
                Checkout rápido · Ofertas visibles
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface transition hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {lines.length ? (
              <div className="space-y-3">
                {lines.map((l) => (
                  <div
                    key={l.product.id}
                    className="rounded-xl border border-border bg-surface p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-extrabold">
                          {l.product.title}
                        </div>
                        <div className="mt-1 text-xs text-muted">
                          {l.quantity} ×{" "}
                          {l.product.priceEur.toFixed(2).replace(".", ",")} €
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeOne(l.product.id)}
                        className="shrink-0 rounded-md border border-border bg-background px-3 py-2 text-xs font-bold transition hover:bg-surface-2"
                      >
                        Quitar 1
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs">
                      <span className="text-muted">Entrega</span>
                      <span className="font-bold">
                        24/48h <span className="text-muted">(demo)</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-surface p-5 text-sm text-muted">
                Tu carrito está vacío. Añade un artículo y vuelve: el checkout
                está a un clic.
              </div>
            )}
          </div>

          <div className="border-t border-border p-4">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-muted">Subtotal</div>
                  <div className="text-2xl font-extrabold">
                    {subtotal.toFixed(2).replace(".", ",")} €
                  </div>
                </div>
                <div className="text-right text-xs text-muted">
                  Envío gratis desde <span className="font-bold">49,99 €</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-md bg-accent px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent/50 active:translate-y-[1px]"
              >
                Proceder al pago
              </button>

              <div className="mt-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted">
                {subtotal >= 49.99 ? (
                  <span>
                    <span className="font-bold text-foreground">
                      Envío gratis desbloqueado
                    </span>{" "}
                    (demo).
                  </span>
                ) : (
                  <span>
                    Te faltan{" "}
                    <span className="font-bold text-foreground">
                      {(49.99 - subtotal).toFixed(2).replace(".", ",")} €
                    </span>{" "}
                    para envío gratis (demo).
                  </span>
                )}
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={clear}
                  className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm font-bold transition hover:bg-surface-2"
                >
                  Vaciar carrito
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm font-bold transition hover:bg-surface-2"
                >
                  Seguir comprando
                </button>
              </div>

              <div className="mt-3 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted">
                <span className="font-bold text-foreground">Tip:</span> añade 2
                artículos y desbloquea{" "}
                <span className="font-bold text-foreground">-5% extra</span>{" "}
                (demo).
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

