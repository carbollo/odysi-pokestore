"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type CategoryOption = {
  id: string;
  name: string;
};

type ProductRow = {
  id: string;
  title: string;
  description: string | null;
  priceEur: number;
  stock: number;
  categoryId: string | null;
};

export function AdminEditProductButton({
  product,
  categories,
}: {
  product: ProductRow;
  categories: CategoryOption[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "PATCH",
      body: form,
    });
    const payload = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(payload.error ?? "No se pudo actualizar el producto.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        className="text-accent hover:text-accent-2"
        onClick={() => setOpen(true)}
      >
        Editar<span className="sr-only">, {product.title}</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-label="Cerrar edición"
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-border bg-background p-6 shadow-2xl">
            <h2 className="text-xl font-extrabold">Editar producto</h2>
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="mb-1 block text-sm font-bold">Título</label>
                <input
                  name="title"
                  defaultValue={product.title}
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Descripción</label>
                <textarea
                  name="description"
                  defaultValue={product.description ?? ""}
                  rows={5}
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold">Precio (EUR)</label>
                  <input
                    name="priceEur"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    defaultValue={product.priceEur}
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold">Stock</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    required
                    defaultValue={product.stock}
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Categoría existente</label>
                <select
                  name="categoryId"
                  defaultValue={product.categoryId ?? ""}
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                >
                  <option value="">Sin categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Nueva categoría (opcional)</label>
                <input
                  name="categoryName"
                  placeholder="Si rellenas esto, se usará/creará esa categoría"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Añadir imágenes (archivos)</label>
                <input
                  name="imageFiles"
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Añadir videos (archivos)</label>
                <input
                  name="videoFiles"
                  type="file"
                  accept="video/*"
                  multiple
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Añadir imágenes por URL</label>
                <textarea
                  name="imageUrls"
                  rows={2}
                  placeholder="https://... (una por línea)"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Añadir videos por URL</label>
                <textarea
                  name="videoUrls"
                  rows={2}
                  placeholder="https://... (una por línea)"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                />
              </div>

              {error ? <p className="text-sm font-semibold text-accent">{error}</p> : null}

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-extrabold text-white disabled:opacity-70"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </form>
          </aside>
        </div>
      ) : null}
    </>
  );
}
