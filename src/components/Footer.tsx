export function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="text-lg font-extrabold tracking-tight">
            Odissey Games
          </div>
          <p className="mt-2 text-sm text-muted">
            Artículos Pokémon con estética gaming, ofertas agresivas y checkout
            directo al grano.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <div className="font-bold">Tienda</div>
            <ul className="mt-3 space-y-2 text-muted">
              <li>
                <a className="hover:text-foreground" href="#catalogo">
                  Catálogo
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="#ofertas">
                  Ofertas
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="#novedades">
                  Novedades
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-bold">Ayuda</div>
            <ul className="mt-3 space-y-2 text-muted">
              <li>
                <a className="hover:text-foreground" href="#">
                  Envíos y devoluciones
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="#">
                  Contacto
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="#">
                  Privacidad
                </a>
              </li>
              <li className="pt-2">
                <a className="text-accent hover:text-accent-2 font-bold flex items-center gap-1" href="/admin">
                  Panel de Admin
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="font-bold">Cupón de bienvenida</div>
          <p className="mt-1 text-sm text-muted">
            Suscríbete y recibe <span className="text-foreground">-10%</span>{" "}
            en tu primera compra.
          </p>
          <form className="mt-4 flex gap-2">
            <input
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
              placeholder="tu@email.com"
              type="email"
              required
            />
            <button
              className="rounded-md bg-accent px-3 py-2 text-sm font-bold text-white transition hover:bg-accent-2"
              type="submit"
            >
              Enviar
            </button>
          </form>
          <p className="mt-2 text-xs text-muted">
            No spam. Puedes darte de baja cuando quieras.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Odissey Games. Proyecto demo.
      </div>
    </footer>
  );
}

