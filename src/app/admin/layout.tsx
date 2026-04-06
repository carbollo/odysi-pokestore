import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Tags,
  CreditCard,
  Undo2,
  Settings,
  Store,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Productos", href: "/admin/productos", icon: Package },
    { name: "Categorías", href: "/admin/categorias", icon: Tags },
    { name: "Ventas", href: "/admin/ventas", icon: CreditCard },
    { name: "Reembolsos", href: "/admin/reembolsos", icon: Undo2 },
    { name: "Ajustes", href: "/admin/ajustes", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen w-full bg-surface-2 text-foreground">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-border bg-background md:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-border px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold tracking-tight"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white shadow-sm">
              <Store className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-base">Odissey Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
              >
                <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-border p-4">
          <Link
            href="/"
            className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
          >
            <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
            Volver a la tienda
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" />
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">
                  AD
                </div>
                <span className="text-sm font-bold">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="py-8 px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
