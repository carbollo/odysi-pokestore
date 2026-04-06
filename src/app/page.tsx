import { StoreFront } from "@/components/StoreFront";
import { prisma } from "@/lib/db";
import type { Product } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await prisma.product.findMany({
      take: 18,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    products = [];
  }

  return <StoreFront products={products} />;
}
