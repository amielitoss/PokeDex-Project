import { useEffect, useState, useRef } from "react";
import pokemonApi, { getPokemonBySearch } from "../services/pokemonApi";
import Hero from "../components/Hero";
import PokemonCard from "../components/PokemonCard";
import {
  getPokemonList,
  getPokemonByType,
  getPokemonByGeneration,
} from "../services/pokemonApi";
import type { Pokemon } from "../types/pokemon";
import axios from "axios";
import "./Home.css";
import "../components/Loading.css";

const PAGE_SIZE = 21;

function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);

  const offset = (currentPage - 1) * PAGE_SIZE;
  const totalPages = Math.ceil(totalPokemon / PAGE_SIZE);
  const gridRef = useRef<HTMLElement | null>(null);

  const displayedPokemon = searchResult ? [searchResult] : pokemonDetails;

  const [selectedType, setSelectedType] = useState("all");
  const [selectedGeneration, setSelectedGeneration] = useState("all");
  const [sortOption, setSortOption] = useState("number-asc");
  const sortedPokemon = [...displayedPokemon];
  const [searchNotFound, setSearchNotFound] = useState(false);

  switch (sortOption) {
    case "number-asc":
      sortedPokemon.sort((a, b) => {
        return a.id - b.id;
      });
      break;

    case "number-desc":
      sortedPokemon.sort((a, b) => {
        return b.id - a.id;
      });
      break;

    case "name-asc":
      sortedPokemon.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      break;

    case "name-desc":
      sortedPokemon.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      break;
  }

  useEffect(() => {
    async function loadFeaturedPokemon() {
      try {
        const data = await pokemonApi();
        setPokemon(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load Featured Pokémon");
      }
    }
    loadFeaturedPokemon();
  }, []);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      setError(null);
      try {
        // Generation selected
        if (selectedGeneration !== "all") {
          const generationData =
            await getPokemonByGeneration(selectedGeneration);

          let generationPokemon = generationData.pokemon_species;

          // Generation + Type selected
          if (selectedType !== "all") {
            const typeData = await getPokemonByType(selectedType);

            const typeNames = new Set(
              typeData.pokemon.map((item) => item.pokemon.name),
            );

            generationPokemon = generationPokemon.filter((pokemon) =>
              typeNames.has(pokemon.name),
            );
          }

          const paginatedGenerationPokemon = generationPokemon.slice(
            offset,
            offset + PAGE_SIZE,
          );

          const detailRequests = paginatedGenerationPokemon.map((item) => {
            const pokemonId = item.url.split("/").filter(Boolean).pop();

            return axios.get<Pokemon>(
              `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
            );
          });

          const detailResponses = await Promise.all(detailRequests);

          const details = detailResponses.map((response) => response.data);

          setTotalPokemon(generationPokemon.length);
          setPokemonDetails(details);

          return;
        }

        // Type only
        if (selectedType !== "all") {
          const typeData = await getPokemonByType(selectedType);

          const paginatedTypePokemon = typeData.pokemon.slice(
            offset,
            offset + PAGE_SIZE,
          );

          const detailRequests = paginatedTypePokemon.map((item) => {
            return axios.get<Pokemon>(item.pokemon.url);
          });

          const detailResponses = await Promise.all(detailRequests);

          const details = detailResponses.map((response) => response.data);

          setTotalPokemon(typeData.pokemon.length);
          setPokemonDetails(details);

          return;
        }

        // No filters
        const listData = await getPokemonList(offset, PAGE_SIZE);

        const detailRequests = listData.results.map((item) => {
          return axios.get<Pokemon>(item.url);
        });

        const detailResponses = await Promise.all(detailRequests);

        const details = detailResponses.map((response) => response.data);

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

  async function handleSearch() {
    setError(null);

    if (searchTerm.trim() === "") {
      setSearchResult(null);
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
      setError("Failed to load Pokémon");
    }
  }

  function handleSearchChange(value: string) {
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchResult(null);
      setError(null);
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

  function nextPage() {
    setCurrentPage((prev) => prev + 1);
    gridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function previousPage() {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
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

      <section className="pokemon-grid-section" ref={gridRef}>
        <div className="pokemon-grid-header">
          <div>
            <p>Explore the Pokédex</p>
            <h2>All Pokémon</h2>
          </div>
          <div className="pokemon-grid-controls">
            <span>{totalPokemon} Pokémon</span>

            <select
              value={selectedGeneration}
              onChange={(event) => handleGenerationChange(event.target.value)}
            >
              <option value="all">All generations</option>
              <option value="1">Generation I</option>
              <option value="2">Generation II</option>
              <option value="3">Generation III</option>
              <option value="4">Generation IV</option>
              <option value="5">Generation V</option>
              <option value="6">Generation VI</option>
              <option value="7">Generation VII</option>
              <option value="8">Generation VIII</option>
              <option value="9">Generation IX</option>
            </select>

            <select
              value={selectedType}
              onChange={(event) => handleTypeChange(event.target.value)}
            >
              <option value="all">All types</option>
              <option value="normal">Normal</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="electric">Electric</option>
              <option value="grass">Grass</option>
              <option value="ice">Ice</option>
              <option value="fighting">Fighting</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="flying">Flying</option>
              <option value="psychic">Psychic</option>
              <option value="bug">Bug</option>
              <option value="rock">Rock</option>
              <option value="ghost">Ghost</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="steel">Steel</option>
              <option value="fairy">Fairy</option>
            </select>

            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
            >
              <option value="number-asc">Number: Low to High</option>
              <option value="number-desc">Number: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

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

        <div className="pagination">
          <button
            type="button"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>Page {currentPage}</p>
          <button
            type="button"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>

      {loading && (
        <div className="loading-state">
          <div className="pokeball-loader"></div>
          <p>Loading Pokémon...</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </>
  );
}

export default Home;
