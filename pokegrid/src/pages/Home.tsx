import { useEffect, useState, useRef } from "react";

import pokemonApi, { getPokemonBySearch } from "../services/pokemonApi";

import type { Pokemon } from "../types/pokemon";

import Hero from "../components/Hero";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import PokemonControls from "../components/PokemonControls";

import { sortPokemon } from "../utils/sortPokemon";
import usePokemonList from "../hooks/usePokemonList";

import "./Home.css";

const PAGE_SIZE = 21;

function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const [featuredError, setFeaturedError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [selectedType, setSelectedType] = useState("all");
  const [selectedGeneration, setSelectedGeneration] = useState("all");
  const [sortOption, setSortOption] = useState("number-asc");

  const gridRef = useRef<HTMLElement | null>(null);

  const { pokemonDetails, totalPokemon, loading, error } = usePokemonList({
    currentPage,
    selectedType,
    selectedGeneration,
  });

  const totalPages = Math.ceil(totalPokemon / PAGE_SIZE);

  const displayedPokemon = searchResult ? [searchResult] : pokemonDetails;

  const sortedPokemon = sortPokemon(displayedPokemon, sortOption);

  useEffect(() => {
    async function loadFeaturedPokemon() {
      try {
        const data = await pokemonApi();

        setPokemon(data);
        setFeaturedError(null);
      } catch (error) {
        console.error(error);
        setFeaturedError("Failed to load Featured Pokémon");
      }
    }

    loadFeaturedPokemon();
  }, []);

  async function handleSearch() {
    setSearchError(null);

    if (searchTerm.trim() === "") {
      setSearchResult(null);
      setSearchNotFound(false);
      return;
    }

    try {
      const data = await getPokemonBySearch(searchTerm);

      setSearchResult(data);
      setSearchNotFound(false);
    } catch (error) {
      console.error(error);

      setSearchResult(null);
      setSearchNotFound(true);
      setSearchError("Failed to load Pokémon");
    }
  }

  function handleSearchChange(value: string) {
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchResult(null);
      setSearchError(null);
      setSearchNotFound(false);
    }
  }

  function handleGenerationChange(value: string) {
    setSelectedGeneration(value);
    setCurrentPage(1);
  }

  function handleTypeChange(value: string) {
    setSelectedType(value);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);

    gridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      {pokemon && (
        <div>
          <Hero
            pokemon={pokemon}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
          />
        </div>
      )}

      {featuredError && <ErrorMessage message={featuredError} />}

      <section className="pokemon-grid-section" ref={gridRef}>
        <PokemonControls
          totalPokemon={totalPokemon}
          selectedGeneration={selectedGeneration}
          selectedType={selectedType}
          sortOption={sortOption}
          onGenerationChange={handleGenerationChange}
          onTypeChange={handleTypeChange}
          onSortChange={setSortOption}
        />

        {searchNotFound || sortedPokemon.length === 0 ? (
          <div className="empty-state">
            <h3>No Pokémon found</h3>
            <p>Try changing your filters or search.</p>
          </div>
        ) : (
          <div className="pokemon-grid">
            {sortedPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}

        {!searchResult && totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>

      {loading && <Loading message="Loading Pokémon..." />}

      {error && <ErrorMessage message={error} />}

      {searchError && <ErrorMessage message={searchError} />}
    </>
  );
}

export default Home;
