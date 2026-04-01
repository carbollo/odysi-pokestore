import { StoreFront } from "@/components/StoreFront";
import { fetchStoreProducts } from "@/lib/pokeapi";

export default async function Home() {
  const products = await fetchStoreProducts({ limit: 18, offset: 0 });
  return (
    <StoreFront products={products} />
  );
}
