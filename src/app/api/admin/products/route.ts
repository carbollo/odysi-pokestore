import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

type CreateProductPayload = {
  title?: string;
  description?: string;
  priceEur?: number;
  stock?: number;
  categoryId?: string;
  categoryName?: string;
  imageUrls?: string[];
  videoUrls?: string[];
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateProductPayload;

    const description = (body.description ?? "").trim();
    const priceEur = Number(body.priceEur);
    const stock = Math.max(0, Math.floor(Number(body.stock ?? 0)));
    const imageUrls = (body.imageUrls ?? [])
      .map((v) => v.trim())
      .filter(Boolean);
    const videoUrls = (body.videoUrls ?? [])
      .map((v) => v.trim())
      .filter(Boolean);

    if (!Number.isFinite(priceEur) || priceEur <= 0) {
      return NextResponse.json({ error: "Precio inválido." }, { status: 400 });
    }

    const fallbackTitle = description.slice(0, 48) || "Producto sin título";
    const title = (body.title ?? "").trim() || fallbackTitle;

    let categoryId: string | null = null;

    if (body.categoryId) {
      categoryId = body.categoryId;
    } else if (body.categoryName?.trim()) {
      const categoryName = body.categoryName.trim();
      const baseSlug = toSlug(categoryName) || "categoria";

      let slug = baseSlug;
      let category = await prisma.category.findUnique({ where: { slug } });
      if (!category) {
        category = await prisma.category.findFirst({
          where: { name: { equals: categoryName, mode: "insensitive" } },
        });
      }

      if (!category) {
        let suffix = 1;
        while (await prisma.category.findUnique({ where: { slug } })) {
          slug = `${baseSlug}-${suffix}`;
          suffix += 1;
        }
        category = await prisma.category.create({
          data: {
            name: categoryName,
            slug,
          },
        });
      }

      categoryId = category.id;
    }

    const mediaLines = [
      imageUrls.length ? `Imagenes: ${imageUrls.join(" | ")}` : "",
      videoUrls.length ? `Videos: ${videoUrls.join(" | ")}` : "",
    ].filter(Boolean);

    const mergedDescription = [description, ...mediaLines].filter(Boolean).join("\n\n");

    const product = await prisma.product.create({
      data: {
        title,
        description: mergedDescription || null,
        priceEur,
        stock,
        imageUrl: imageUrls[0] ?? null,
        categoryId,
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, id: product.id });
  } catch (error) {
    console.error("Error creating product", error);
    return NextResponse.json({ error: "No se pudo crear el producto." }, { status: 500 });
  }
}
