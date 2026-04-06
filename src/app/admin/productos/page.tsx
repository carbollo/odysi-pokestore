import { Plus } from "lucide-react";

export default function AdminProducts() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-extrabold tracking-tight">Productos</h1>
          <p className="mt-2 text-sm text-muted">
            Gestiona el catálogo de la tienda. Actualmente los datos provienen de la PokéAPI.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-center text-sm font-extrabold text-white shadow-sm hover:bg-accent-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Plus className="h-4 w-4" />
            Añadir producto
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg border border-border">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-surface">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-6">
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                      Categoría
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                      Precio
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                      Estado
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {/* Mock data row */}
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6">
                      Pikachu (Figura)
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">
                      Figuras
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">
                      24,99 €
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400">
                        Activo
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="#" className="text-accent hover:text-accent-2">
                        Editar<span className="sr-only">, Pikachu (Figura)</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6">
                      Booster Pack
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">
                      Cartas
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">
                      5,49 €
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400">
                        Activo
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="#" className="text-accent hover:text-accent-2">
                        Editar<span className="sr-only">, Booster Pack</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-muted text-center bg-surface-2 p-4 rounded-lg border border-border">
              <p>
                <strong>Nota:</strong> Para que este panel sea funcional y puedas añadir/editar productos reales,
                necesitamos configurar una base de datos (ej. Supabase, PostgreSQL) y un sistema de autenticación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
