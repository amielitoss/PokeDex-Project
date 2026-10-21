import { useEffect, useState } from "react";

import {
  getPokemonBySearch,
  getPokemonByType,
  getPokemonBySpecies,
  getEvolutionChain,
} from "../services/pokemonApi";

import type {
  Pokemon,
  PokemonSpeciesResponse,
  EvolutionChainNode,
} from "../types/pokemon";

function getEvolutionNames(node: EvolutionChainNode): string[] {
  const names = [node.species.name];

  node.evolves_to.forEach((nextEvolution) => {
    names.push(...getEvolutionNames(nextEvolution));
  });

  return names;
}

function usePokemonDetails(id: string | undefined) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] =
    useState<PokemonSpeciesResponse | null>(null);

  const [evolutionPokemon, setEvolutionPokemon] = useState<Pokemon[]>([]);

  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [resistance, setResistance] = useState<string[]>([]);
  const [immunity, setImmunity] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPokemonDetails() {
      if (!id) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getPokemonBySearch(id);
        setPokemon(data);

        const speciesData = await getPokemonBySpecies(id);
        setSpecies(speciesData);

        const evolutionData = await getEvolutionChain(
          speciesData.evolution_chain.url,
        );

        const evolutionNames = getEvolutionNames(
          evolutionData.chain,
        );

        const evolutionRequests = evolutionNames.map((name) =>
          getPokemonBySearch(name),
        );

        const evolutionPokemonData = await Promise.all(
          evolutionRequests,
        );

        setEvolutionPokemon(evolutionPokemonData);

        const typeRequests = data.types.map((typeInfo) =>
          getPokemonByType(typeInfo.type.name),
        );

        const typeData = await Promise.all(typeRequests);

        const damageMultipliers: Record<string, number> = {};

        typeData.forEach((type) => {
          type.damage_relations.double_damage_from.forEach(
            (damageType) => {
              damageMultipliers[damageType.name] =
                (damageMultipliers[damageType.name] ?? 1) * 2;
            },
          );

          type.damage_relations.half_damage_from.forEach(
            (damageType) => {
              damageMultipliers[damageType.name] =
                (damageMultipliers[damageType.name] ?? 1) * 0.5;
            },
          );

          type.damage_relations.no_damage_from.forEach(
            (damageType) => {
              damageMultipliers[damageType.name] = 0;
            },
          );
        });

        const finalWeaknesses = Object.entries(
          damageMultipliers,
        )
          .filter(([, multiplier]) => multiplier > 1)
          .map(([typeName]) => typeName);

        const finalResistance = Object.entries(
          damageMultipliers,
        )
          .filter(
            ([, multiplier]) =>
              multiplier > 0 && multiplier < 1,
          )
          .map(([typeName]) => typeName);

        const finalImmunity = Object.entries(
          damageMultipliers,
        )
          .filter(([, multiplier]) => multiplier === 0)
          .map(([typeName]) => typeName);

        setWeaknesses(finalWeaknesses);
        setResistance(finalResistance);
        setImmunity(finalImmunity);
      } catch (error) {
        console.error(error);
        setError("Failed to load Pokémon");
      } finally {
        setLoading(false);
      }
    }

    loadPokemonDetails();
  }, [id]);

  return {
    pokemon,
    species,
    evolutionPokemon,
    weaknesses,
    resistance,
    immunity,
    loading,
    error,
  };
}

export default usePokemonDetails;