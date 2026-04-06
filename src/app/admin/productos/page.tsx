import { prisma } from "@/lib/db";
import { AdminCreateProductButton } from "@/components/AdminCreateProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProducts() {
  let products: Array<{
    id: string;
    title: string;
    priceEur: number;
    stock: number;
    category?: { name: string } | null;
  }> = [];
  let categories: Array<{ id: string; name: string }> = [];

  try {
    [products, categories] = await Promise.all([
      prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
    ]);
  } catch {
    products = [];
    categories = [];
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-extrabold tracking-tight">Productos</h1>
          <p className="mt-2 text-sm text-muted">Gestiona el catálogo de la tienda.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <AdminCreateProductButton categories={categories} />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border border-border shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-surface">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-6"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-foreground"
                    >
                      Categoría
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-foreground"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-foreground"
                    >
                      Stock
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-sm text-muted">
                        No hay productos en la base de datos.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6">
                          {product.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">
                          {product.category?.name ?? "Sin categoría"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">
                          {product.priceEur.toFixed(2).replace(".", ",")} €
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-muted">
                          {product.stock}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-accent hover:text-accent-2">
                            Editar<span className="sr-only">, {product.title}</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
