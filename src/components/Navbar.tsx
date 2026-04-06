"use client";

import Link from "next/link";
import { Menu, Search, ShoppingCart, Store, X, Zap } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePokemonOpen, setMobilePokemonOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileMenuOpen(false);
      }
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
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 py-2 text-xs font-bold sm:px-6 lg:px-8">
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
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setMobileMenuOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface transition hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent/40 md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <Link
          href="/#top"
          className="group flex min-w-0 items-center gap-2 font-extrabold tracking-tight"
          aria-label="Ir a inicio"
          onClick={() => {
            setOpen(false);
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent text-white shadow-sm">
            <Store className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate text-base sm:text-lg">Odissey Games</span>
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
          className="ml-auto inline-flex items-center gap-2 rounded-md bg-accent px-2.5 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent/50 active:translate-y-[1px] sm:px-3"
          aria-label="Abrir carrito"
        >
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Carrito</span>
          <span className="inline-flex min-w-6 items-center justify-center rounded bg-black/20 px-2 py-0.5 text-xs font-extrabold">
            {cartCount}
          </span>
        </button>
      </div>
      <nav className="hidden border-t border-border bg-background md:block">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-2 text-xs font-semibold text-foreground/90 sm:px-6 lg:px-8">
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
                  className="absolute left-0 top-[calc(100%+10px)] z-50 w-[min(520px,calc(100vw-2rem))] rounded-xl border border-border bg-background p-4 shadow-xl"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

                    <div className="border-t border-border pt-4 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
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

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60"
            aria-label="Cerrar menú móvil"
          />
          <aside className="absolute left-0 top-0 h-full w-[88%] max-w-sm border-r border-border bg-background shadow-2xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <div className="text-base font-extrabold">Menú</div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                  <input
                    placeholder="Busca cartas, figuras, peluches…"
                    className="w-full rounded-md border border-border bg-surface px-9 py-2 text-sm text-foreground placeholder:text-muted outline-none ring-accent/40 focus:ring-2"
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    type="button"
                    onClick={() => setMobilePokemonOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-lg border border-border bg-surface px-3 py-3 text-sm font-extrabold"
                  >
                    <span>Pokémon</span>
                    <span className="text-muted">
                      {mobilePokemonOpen ? "Ocultar" : "Ver"}
                    </span>
                  </button>

                  {mobilePokemonOpen ? (
                    <div className="rounded-lg border border-border bg-surface p-3">
                      <div className="text-[11px] font-extrabold tracking-widest text-foreground/80">
                        EXPANSIONES
                      </div>
                      <div className="mt-2 space-y-1">
                        {POKEMON_CATEGORIES.expansions.map((c) => (
                          <a
                            key={c}
                            href="#catalogo"
                            className="block rounded-md px-2 py-2 text-sm text-foreground/85 transition hover:bg-background"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {c}
                          </a>
                        ))}
                      </div>
                      <div className="mt-3 border-t border-border pt-3 text-[11px] font-extrabold tracking-widest text-foreground/80">
                        CATEGORÍAS
                      </div>
                      <div className="mt-2 space-y-1">
                        {POKEMON_CATEGORIES.products.map((c) => (
                          <a
                            key={c}
                            href="#catalogo"
                            className="block rounded-md px-2 py-2 text-sm text-muted transition hover:bg-background hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {c}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <a
                    href="#ofertas"
                    className="block rounded-lg border border-border bg-surface px-3 py-3 text-sm font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ofertas
                  </a>
                  <a
                    href="#novedades"
                    className="block rounded-lg border border-border bg-surface px-3 py-3 text-sm font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Novedades
                  </a>
                </div>
              </div>

              <div className="border-t border-border p-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onCartClick();
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-extrabold text-white"
                >
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  Ir al carrito ({cartCount})
                </button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}

