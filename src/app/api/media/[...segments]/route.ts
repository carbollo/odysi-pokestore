import { NextResponse } from "next/server";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const DATA_ROOT = process.env.MEDIA_STORAGE_PATH || "/data";

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ segments: string[] }> },
) {
  try {
    const { segments } = await params;
    if (!segments?.length) {
      return NextResponse.json({ error: "Ruta de archivo inválida." }, { status: 400 });
    }

    const safeSegments = segments.map((segment) => path.basename(segment));
    const diskPath = path.join(DATA_ROOT, ...safeSegments);
    await access(diskPath);

    const file = await readFile(diskPath);
    const ext = path.extname(diskPath).toLowerCase();
    const contentType = MIME_BY_EXT[ext] || "application/octet-stream";

    return new NextResponse(file, {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Archivo no encontrado." }, { status: 404 });
  }
}
