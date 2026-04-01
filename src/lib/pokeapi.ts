export type PokemonListEntry = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  results: PokemonListEntry[];
};

export type StoreProduct = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  priceEur: number;
  originalPriceEur: number | null;
  badge: string | null;
};

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

const OFFICIAL_ARTWORK_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

function titleCase(s: string) {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

function pseudoRandom01(seed: number) {
  // Deterministic [0,1) from seed; stable across runs.
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

function roundTo99(x: number) {
  // Example: 12.3 -> 12.99 to feel retail-like.
  const base = Math.floor(x);
  return Math.max(1.99, base + 0.99);
}

function priceForPokemonEur(id: number) {
  // Cheap & deterministic price generator (no detail fetch).
  const rarity = pseudoRandom01(id) * 0.35; // small variance
  const core = 7 + (id % 151) / 18; // gen-1 skew, feels "collectible"
  const priced = core * (1 + rarity);
  const clamped = Math.min(99, Math.max(4, priced));
  return roundTo99(clamped);
}

function originalPrice(price: number, seed: number) {
  const r = pseudoRandom01(seed + 42);
  if (r < 0.55) return null;
  const uplift = 1.12 + r * 0.18; // 12%–30% higher
  return roundTo99(price * uplift);
}

function badgeForPokemonId(id: number) {
  const r = pseudoRandom01(id + 7);
  if (r > 0.85) return "Top ventas";
  if (r > 0.72) return "Oferta";
  if (r > 0.6) return "Nuevo";
  return null;
}

function parseIdFromPokemonUrl(url: string) {
  // Example: https://pokeapi.co/api/v2/pokemon/25/
  const m = url.match(/\/pokemon\/(\d+)\/?$/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

export async function fetchPokemonList({
  limit,
  offset,
}: {
  limit: number;
  offset?: number;
}): Promise<PokemonListResponse> {
  const url = new URL(`${POKEAPI_BASE}/pokemon`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset ?? 0));

  const res = await fetch(url.toString(), { next: { revalidate: 60 * 60 } });
  if (!res.ok) throw new Error(`PokéAPI list error: ${res.status}`);
  return (await res.json()) as PokemonListResponse;
}

export async function fetchStoreProducts({
  limit = 12,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}): Promise<StoreProduct[]> {
  const list = await fetchPokemonList({ limit, offset });

  return list.results.map((p, idx) => {
    const id = parseIdFromPokemonUrl(p.url) ?? offset + idx + 1;
    const price = priceForPokemonEur(id);
    const original = originalPrice(price, id);

    return {
      id: String(id),
      title: `${titleCase(p.name)} (Figura)`,
      subtitle: `Edición coleccionista · #${id}`,
      imageUrl: `${OFFICIAL_ARTWORK_BASE}/${id}.png`,
      priceEur: price,
      originalPriceEur: original,
      badge: badgeForPokemonId(id),
    };
  });
}

