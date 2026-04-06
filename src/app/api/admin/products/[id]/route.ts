import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs";

const DATA_ROOT = process.env.MEDIA_STORAGE_PATH || "/data";

function safeExt(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  if (ext && ext.length <= 10) return ext;
  return "";
}

async function saveUploadedFiles(files: File[], folder: "images" | "videos") {
  if (!files.length) return [] as string[];
  const targetDir = path.join(DATA_ROOT, folder);
  await mkdir(targetDir, { recursive: true });

  const urls: string[] = [];
  for (const file of files) {
    const bytes = Buffer.from(await file.arrayBuffer());
    const unique = `${Date.now()}-${crypto.randomUUID()}${safeExt(file.name)}`;
    await writeFile(path.join(targetDir, unique), bytes);
    urls.push(`/api/media/${folder}/${unique}`);
  }
  return urls;
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const form = await req.formData();

    const title = String(form.get("title") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const priceEur = Number(String(form.get("priceEur") ?? "0").replace(",", "."));
    const stock = Math.max(0, Math.floor(Number(form.get("stock") ?? 0)));
    const categoryIdRaw = String(form.get("categoryId") ?? "").trim();
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
      return NextResponse.json({ error: "Precio inválido." }, { status: 400 });
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Producto no encontrado." }, { status: 404 });
    }

    let categoryId: string | null = categoryIdRaw || null;
    if (!categoryId && categoryName) {
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
          data: { name: categoryName, slug },
        });
      }
      categoryId = category.id;
    }

    const imageFiles = form
      .getAll("imageFiles")
      .filter((value): value is File => value instanceof File && value.size > 0);
    const videoFiles = form
      .getAll("videoFiles")
      .filter((value): value is File => value instanceof File && value.size > 0);
    const uploadedImageUrls = await saveUploadedFiles(imageFiles, "images");
    const uploadedVideoUrls = await saveUploadedFiles(videoFiles, "videos");

    const allImageUrls = [...imageUrls, ...uploadedImageUrls];
    const allVideoUrls = [...videoUrls, ...uploadedVideoUrls];

    const mediaLines = [
      allImageUrls.length ? `Imagenes: ${allImageUrls.join(" | ")}` : "",
      allVideoUrls.length ? `Videos: ${allVideoUrls.join(" | ")}` : "",
    ].filter(Boolean);

    const mergedDescription = [description, ...mediaLines].filter(Boolean).join("\n\n");

    await prisma.product.update({
      where: { id },
      data: {
        title: title || existing.title,
        description: mergedDescription || null,
        priceEur,
        stock,
        categoryId,
        imageUrl: allImageUrls[0] ?? existing.imageUrl,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error updating product", error);
    return NextResponse.json({ error: "No se pudo actualizar el producto." }, { status: 500 });
  }
}
