import type { Pokemon } from "../types/pokemon";

export function sortPokemon(
  pokemon: Pokemon[],
  sortOption: string,
) {
  const sortedPokemon = [...pokemon];

  switch (sortOption) {
    case "number-asc":
      sortedPokemon.sort((a, b) => a.id - b.id);
      break;

    case "number-desc":
      sortedPokemon.sort((a, b) => b.id - a.id);
      break;

    case "name-asc":
      sortedPokemon.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      break;

    case "name-desc":
      sortedPokemon.sort((a, b) =>
        b.name.localeCompare(a.name),
      );
      break;
  }

  return sortedPokemon;
}