import { StoreFront } from "@/components/StoreFront";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 18,
    orderBy: { createdAt: "desc" },
  });

  return (
    <StoreFront products={products} />
  );
}
