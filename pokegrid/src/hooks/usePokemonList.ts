import { useEffect, useState } from "react";
import axios from "axios";

import {
  getPokemonList,
  getPokemonByType,
  getPokemonByGeneration,
} from "../services/pokemonApi";

import type { Pokemon } from "../types/pokemon";

const PAGE_SIZE = 21;

type UsePokemonListProps = {
  currentPage: number;
  selectedType: string;
  selectedGeneration: string;
};

function usePokemonList({
  currentPage,
  selectedType,
  selectedGeneration,
}: UsePokemonListProps) {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const offset = (currentPage - 1) * PAGE_SIZE;

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      setError(null);

      try {
        if (selectedGeneration !== "all") {
          const generationData =
            await getPokemonByGeneration(selectedGeneration);

          let generationPokemon =
            generationData.pokemon_species;

          if (selectedType !== "all") {
            const typeData =
              await getPokemonByType(selectedType);

            const typeNames = new Set(
              typeData.pokemon.map(
                (item) => item.pokemon.name
              )
            );

            generationPokemon =
              generationPokemon.filter((pokemon) =>
                typeNames.has(pokemon.name)
              );
          }

          const paginatedGenerationPokemon =
            generationPokemon.slice(
              offset,
              offset + PAGE_SIZE
            );

          const detailRequests =
            paginatedGenerationPokemon.map((item) => {
              const pokemonId = item.url
                .split("/")
                .filter(Boolean)
                .pop();

              return axios.get<Pokemon>(
                `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
              );
            });

          const detailResponses =
            await Promise.all(detailRequests);

          const details = detailResponses.map(
            (response) => response.data
          );

          setTotalPokemon(generationPokemon.length);
          setPokemonDetails(details);

          return;
        }

        if (selectedType !== "all") {
          const typeData =
            await getPokemonByType(selectedType);

          const paginatedTypePokemon =
            typeData.pokemon.slice(
              offset,
              offset + PAGE_SIZE
            );

          const detailRequests =
            paginatedTypePokemon.map((item) =>
              axios.get<Pokemon>(item.pokemon.url)
            );

          const detailResponses =
            await Promise.all(detailRequests);

          const details = detailResponses.map(
            (response) => response.data
          );

          setTotalPokemon(typeData.pokemon.length);
          setPokemonDetails(details);

          return;
        }

        const listData =
          await getPokemonList(offset, PAGE_SIZE);

        const detailRequests =
          listData.results.map((item) =>
            axios.get<Pokemon>(item.url)
          );

        const detailResponses =
          await Promise.all(detailRequests);

        const details = detailResponses.map(
          (response) => response.data
        );

        setTotalPokemon(listData.count);
        setPokemonDetails(details);
      } catch (error) {
        console.error(error);
        setError("Failed to load Pokémon");
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [offset, selectedType, selectedGeneration]);

  return {
    pokemonDetails,
    totalPokemon,
    loading,
    error,
  };
}

export default usePokemonList;