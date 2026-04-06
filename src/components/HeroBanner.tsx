import { ArrowRight, Zap } from "lucide-react";

export function HeroBanner({ onShopNow }: { onShopNow: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(227,0,15,0.35),transparent_60%),radial-gradient(60%_60%_at_80%_20%,rgba(255,45,45,0.18),transparent_55%)]" />
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-accent-2/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 md:py-14 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 md:gap-8 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-foreground">
              <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
              Ofertas flash: -25% en productos destacados
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Compra artículos Pokémon con vibra{" "}
              <span className="text-accent">gaming</span> y checkout rápido
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted md:text-base">
              Todo el catálogo de Pokémon en un solo lugar. Encuentra cartas,
              figuras, peluches y ediciones coleccionista al mejor precio.
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

          </div>
        </div>
      </div>
    </section>
  );
}

