"use client";

import { Plus, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type CategoryOption = {
  id: string;
  name: string;
};

export function AdminCreateProductButton({ categories }: { categories: CategoryOption[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const priceEur = Number(String(form.get("priceEur") ?? "0").replace(",", "."));
    const stock = Number(form.get("stock") ?? 0);
    const categoryId = String(form.get("categoryId") ?? "");
    const categoryName = String(form.get("categoryName") ?? "").trim();
    const imageUrls = String(form.get("imageUrls") ?? "")
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean);
    const videoUrls = String(form.get("videoUrls") ?? "")
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean);

    if (!Number.isFinite(priceEur) || priceEur <= 0) {
      setError("El precio debe ser mayor que 0.");
      setSaving(false);
      return;
    }

    if (!Number.isFinite(stock) || stock < 0) {
      setError("El stock no puede ser negativo.");
      setSaving(false);
      return;
    }

    if (!categoryId && !categoryName) {
      setError("Selecciona una categoría o escribe una nueva.");
      setSaving(false);
      return;
    }

    const payload = new FormData();
    payload.set("title", title);
    payload.set("description", description);
    payload.set("priceEur", String(priceEur));
    payload.set("stock", String(stock));
    payload.set("categoryId", categoryId);
    payload.set("categoryName", categoryName);
    payload.set("imageUrls", imageUrls.join("\n"));
    payload.set("videoUrls", videoUrls.join("\n"));

    const imageFiles = form.getAll("imageFiles");
    const videoFiles = form.getAll("videoFiles");
    imageFiles.forEach((file) => payload.append("imageFiles", file));
    videoFiles.forEach((file) => payload.append("videoFiles", file));

    const res = await fetch("/api/admin/products", {
      method: "POST",
      body: payload,
    });

    const responseData = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(responseData.error ?? "No se pudo crear el producto.");
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
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-center text-sm font-extrabold text-white shadow-sm hover:bg-accent-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Plus className="h-4 w-4" />
        Añadir producto
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Cerrar formulario"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-border bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Nuevo producto</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface hover:bg-surface-2"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-sm font-bold text-foreground">Título</label>
                <input
                  name="title"
                  placeholder="Ej. Caja Entrenador Elite Pokémon"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-foreground">Descripción</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Descripción del producto"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold text-foreground">Precio (EUR)</label>
                  <input
                    name="priceEur"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-foreground">Stock actual</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    required
                    className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-foreground">Categoría existente</label>
                <select
                  name="categoryId"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
                  defaultValue=""
                >
                  <option value="">Selecciona una categoría...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-foreground">
                  O crear nueva categoría
                </label>
                <input
                  name="categoryName"
                  placeholder="Ej. Cajas especiales"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-foreground">
                  Imágenes (archivos)
                </label>
                <input
                  name="imageFiles"
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-foreground">
                  Videos (archivos)
                </label>
                <input
                  name="videoFiles"
                  type="file"
                  accept="video/*"
                  multiple
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-foreground">
                  Imágenes (URLs opcionales, una por línea)
                </label>
                <textarea
                  name="imageUrls"
                  rows={2}
                  placeholder="https://.../imagen-1.jpg"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-foreground">
                  Videos (URLs opcionales, una por línea)
                </label>
                <textarea
                  name="videoUrls"
                  rows={2}
                  placeholder="https://.../video-1.mp4"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none ring-accent/40 focus:ring-2"
                />
              </div>

              {error ? <p className="text-sm font-semibold text-accent">{error}</p> : null}

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-extrabold text-white transition hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Guardando..." : "Guardar producto"}
              </button>
            </form>
          </aside>
        </div>
      ) : null}
    </>
  );
}
