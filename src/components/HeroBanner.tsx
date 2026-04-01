import { ArrowRight, Zap } from "lucide-react";

export function HeroBanner({ onShopNow }: { onShopNow: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(227,0,15,0.35),transparent_60%),radial-gradient(60%_60%_at_80%_20%,rgba(255,45,45,0.18),transparent_55%)]" />
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-accent-2/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-foreground">
              <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
              Ofertas flash: -25% en productos destacados
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
              Compra artículos Pokémon con vibra{" "}
              <span className="text-accent">gaming</span> y checkout rápido
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted md:text-base">
              Catálogo inspirado en lo mejor del retail gaming: tarjetas grandes,
              descuentos visibles y llamadas a la acción claras para que el
              usuario compre sin fricción.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onShopNow}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-accent/50 active:translate-y-[1px]"
              >
                Comprar ahora <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="text-xs text-muted">
                <span className="font-bold text-foreground">Envío 24/48h</span>{" "}
                (demo) · Pago seguro (demo)
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { k: "🔥", t: "Rebajas", s: "por tiempo limitado" },
                { k: "⚡", t: "Rápido", s: "carrito lateral" },
                { k: "✅", t: "Claro", s: "CTA siempre visible" },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-lg border border-border bg-surface px-3 py-3"
                >
                  <div className="text-lg">{x.k}</div>
                  <div className="mt-1 text-xs font-extrabold">{x.t}</div>
                  <div className="text-[11px] text-muted">{x.s}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-muted">
                  Destacado de la semana
                </div>
                <div className="rounded-full bg-accent px-2 py-1 text-xs font-extrabold text-white">
                  -15%
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="text-xs font-bold text-muted">Figura</div>
                  <div className="mt-1 text-lg font-extrabold">Pikachu</div>
                  <div className="mt-2 text-2xl font-extrabold">
                    24,99 <span className="text-sm text-muted">€</span>
                  </div>
                  <div className="mt-1 text-xs text-muted line-through">
                    29,99 €
                  </div>
                  <div className="mt-4 h-24 rounded-lg bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_50%),linear-gradient(135deg,rgba(227,0,15,0.35),rgba(0,0,0,0))]" />
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="text-xs font-bold text-muted">Cartas</div>
                  <div className="mt-1 text-lg font-extrabold">
                    Booster Pack
                  </div>
                  <div className="mt-2 text-2xl font-extrabold">
                    5,49 <span className="text-sm text-muted">€</span>
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    “Encuentra tu rareza”
                  </div>
                  <div className="mt-4 h-24 rounded-lg bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.07),transparent_55%),linear-gradient(135deg,rgba(255,45,45,0.22),rgba(0,0,0,0))]" />
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-border bg-background px-4 py-3">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>Compra 2 y ahorra</span>
                  <span className="text-accent">-5% extra</span>
                </div>
                <div className="mt-1 text-xs text-muted">
                  Aplica en selección de artículos (demo).
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl border border-border bg-background shadow-sm" />
            <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-2xl border border-border bg-background shadow-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}

