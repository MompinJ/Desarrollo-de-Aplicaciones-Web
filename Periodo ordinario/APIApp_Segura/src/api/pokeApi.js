const BASE = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(limit = 24) {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error("No se pudo cargar la lista");
  return res.json();
}

export async function fetchPokemonById(idOrName) {
  const res = await fetch(`${BASE}/pokemon/${encodeURIComponent(idOrName)}`);
  if (!res.ok) throw new Error("Pokémon no encontrado");
  return res.json();
}

export async function fetchTypes() {
  const res = await fetch(`${BASE}/type`);
  if (!res.ok) throw new Error("No se pudieron cargar los tipos");
  return res.json();
}

export async function fetchTypeByName(typeName) {
  const res = await fetch(`${BASE}/type/${encodeURIComponent(typeName)}`);
  if (!res.ok) throw new Error("Tipo no encontrado");
  return res.json();
}
