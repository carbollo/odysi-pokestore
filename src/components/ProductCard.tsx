import { Minus, Plus, Sparkles } from "lucide-react";
import type { StoreProduct } from "@/lib/pokeapi";

export function ProductCard({
  product,
  onAdd,
  onRemove,
  quantity,
}: {
  product: StoreProduct;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const hasDiscount =
    product.originalPriceEur != null && product.originalPriceEur > product.priceEur;

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-background">
        {product.badge ? (
          <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-extrabold text-white">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {product.badge}
          </div>
        ) : null}

        {product.imageUrl ? (
          // Using <img> instead of next/image to avoid heavy image optimization memory usage in dev.
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted">
            Imagen no disponible
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-sm font-extrabold leading-5">{product.title}</div>
        <div className="mt-1 text-xs text-muted">{product.subtitle}</div>

        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="text-lg font-extrabold">
              {product.priceEur.toFixed(2).replace(".", ",")} €
            </div>
            {hasDiscount ? (
              <div className="text-xs text-muted line-through">
                {product.originalPriceEur?.toFixed(2).replace(".", ",")} €
              </div>
            ) : (
              <div className="text-xs text-muted">Precio especial online</div>
            )}
          </div>

          {quantity > 0 ? (
            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background font-bold transition hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
                aria-label="Quitar una unidad"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="min-w-10 text-center text-sm font-extrabold">
                {quantity}
              </div>
              <button
                type="button"
                onClick={onAdd}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent text-white shadow-sm transition hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
                aria-label="Añadir una unidad"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex w-full items-center justify-center rounded-md bg-accent px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent/50 active:translate-y-[1px] sm:w-auto"
            >
              Añadir al carrito
            </button>
          )}
        </div>

        <div className="mt-4 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted">
          <span className="font-bold text-foreground">Recíbelo mañana</span> (demo)
          · Stock limitado (demo)
        </div>
      </div>
    </div>
  );
}

