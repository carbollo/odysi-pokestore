import { prisma } from "@/lib/db";
import { ArrowUpRight, CreditCard, Package, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let productsCount = 0;
  let categoriesCount = 0;
  let ordersCount = 0;

  try {
    [productsCount, categoriesCount, ordersCount] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
    ]);
  } catch {
    productsCount = 0;
    categoriesCount = 0;
    ordersCount = 0;
  }

  const stats = [
    { name: "Ingresos totales", stat: "€0.00", icon: CreditCard, trend: "0%" },
    { name: "Pedidos activos", stat: ordersCount.toString(), icon: Package, trend: "0%" },
    { name: "Productos", stat: productsCount.toString(), icon: Package, trend: "0%" },
    { name: "Categorías", stat: categoriesCount.toString(), icon: Users, trend: "0%" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">Resumen de la actividad de la tienda.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-xl border border-border bg-background px-4 pb-12 pt-5 shadow-sm sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-accent/10 p-3">
                <item.icon className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-muted">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-extrabold text-foreground">{item.stat}</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-500">
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 self-center text-green-500"
                  aria-hidden="true"
                />
                <span className="sr-only">Subió por</span>
                {item.trend}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-background shadow-sm">
        <div className="border-b border-border px-4 py-5 sm:px-6">
          <h3 className="text-base font-extrabold leading-6 text-foreground">Últimos pedidos</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="py-10 text-center text-sm text-muted">
            No hay pedidos disponibles todavía.
          </div>
        </div>
      </div>
    </div>
  );
}
