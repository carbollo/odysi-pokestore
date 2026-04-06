import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

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
    const diskPath = path.join(targetDir, unique);
    await writeFile(diskPath, bytes);
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

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body: CreateProductPayload = {};
    let uploadedImageUrls: string[] = [];
    let uploadedVideoUrls: string[] = [];

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      body = {
        title: String(form.get("title") ?? ""),
        description: String(form.get("description") ?? ""),
        priceEur: Number(String(form.get("priceEur") ?? "0").replace(",", ".")),
        stock: Number(form.get("stock") ?? 0),
        categoryId: String(form.get("categoryId") ?? ""),
        categoryName: String(form.get("categoryName") ?? ""),
        imageUrls: String(form.get("imageUrls") ?? "")
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean),
        videoUrls: String(form.get("videoUrls") ?? "")
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean),
      };

      const imageFiles = form
        .getAll("imageFiles")
        .filter((value): value is File => value instanceof File && value.size > 0);
      const videoFiles = form
        .getAll("videoFiles")
        .filter((value): value is File => value instanceof File && value.size > 0);

      uploadedImageUrls = await saveUploadedFiles(imageFiles, "images");
      uploadedVideoUrls = await saveUploadedFiles(videoFiles, "videos");
    } else {
      body = (await req.json()) as CreateProductPayload;
    }

    const description = (body.description ?? "").trim();
    const priceEur = Number(body.priceEur);
    const stock = Math.max(0, Math.floor(Number(body.stock ?? 0)));
    const imageUrls = [
      ...(body.imageUrls ?? []).map((v) => v.trim()).filter(Boolean),
      ...uploadedImageUrls,
    ];
    const videoUrls = [
      ...(body.videoUrls ?? []).map((v) => v.trim()).filter(Boolean),
      ...uploadedVideoUrls,
    ];

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
