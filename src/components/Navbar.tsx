"use client";

import Link from "next/link";
import { Search, ShoppingCart, Store, Zap } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const POKEMON_CATEGORIES = {
  expansions: ["30th Anniversary", "Ascended Heroes", "Phantasmal Flames"],
  products: [
    "Barajas de combate",
    "Blisters",
    "Cajas de colección",
    "Cajas de entrenador",
    "Caja de sobres",
    "Latas",
    "Sobres",
  ],
} as const;

export function Navbar({
  cartCount,
  onCartClick,
}: {
  cartCount: number;
  onCartClick: () => void;
}) {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function scheduleClose() {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 120);
  }

  function cancelClose() {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="border-b border-border bg-black text-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 text-xs font-bold">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
            <span>Flash deals hoy</span>
            <span className="hidden sm:inline text-white/70">
              · stock limitado · compra rápida
            </span>
          </div>
          <div className="hidden sm:inline text-white/80">
            Envío gratis desde <span className="text-white">49,99 €</span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
        <Link
          href="/"
          className="group flex items-center gap-2 font-extrabold tracking-tight"
          aria-label="Ir a inicio"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent text-white shadow-sm">
            <Store className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg">
            Odysi<span className="text-accent">Poké</span>Store
          </span>
        </Link>

        <div className="hidden flex-1 items-center md:flex">
          <div className="relative w-full">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              placeholder="Busca cartas, figuras, peluches…"
              className="w-full rounded-md border border-border bg-surface px-9 py-2 text-sm text-foreground placeholder:text-muted outline-none ring-accent/40 focus:ring-2"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onCartClick}
          className="ml-auto inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent/50 active:translate-y-[1px]"
          aria-label="Abrir carrito"
        >
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Carrito</span>
          <span className="inline-flex min-w-6 items-center justify-center rounded bg-black/20 px-2 py-0.5 text-xs font-extrabold">
            {cartCount}
          </span>
        </button>
      </div>
      <nav className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-2 text-xs font-semibold text-foreground/90">
          <div className="flex items-center gap-2">
            <div
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setOpen(true);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 transition hover:border-accent/60 hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen((v) => !v)}
                onFocus={() => setOpen(true)}
                onBlur={scheduleClose}
              >
                Pokémon
              </button>

              {open ? (
                <div
                  id={menuId}
                  role="menu"
                  className="absolute left-0 top-[calc(100%+10px)] z-50 w-[520px] max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-background p-4 shadow-xl"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="pr-2">
                      <div className="text-[11px] font-extrabold tracking-widest text-foreground/80">
                        EXPANSIONES
                      </div>
                      <div className="mt-3 space-y-2">
                        {POKEMON_CATEGORIES.expansions.map((c) => (
                          <a
                            key={c}
                            href="#catalogo"
                            role="menuitem"
                            className="block rounded-md px-2 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-surface hover:text-foreground"
                            onClick={() => setOpen(false)}
                          >
                            {c}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="border-l border-border pl-4">
                      <div className="space-y-1">
                        {POKEMON_CATEGORIES.products.map((c) => (
                          <a
                            key={c}
                            href="#catalogo"
                            role="menuitem"
                            className="block rounded-md px-2 py-2 text-sm text-muted transition hover:bg-surface hover:text-foreground"
                            onClick={() => setOpen(false)}
                          >
                            {c}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex flex-1 items-center gap-2 overflow-x-auto">
              {["Ofertas", "Novedades"].map((label) => (
                <a
                  key={label}
                  href={label === "Ofertas" ? "#ofertas" : "#novedades"}
                  className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 transition hover:border-accent/60 hover:bg-surface-2"
                >
                  {label}
                </a>
              ))}
            </div>

            <span className="hidden text-muted md:inline">
              Compra segura (demo) · Devolución fácil (demo)
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}

