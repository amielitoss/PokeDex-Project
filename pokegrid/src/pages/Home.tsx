import { useEffect, useState, useRef } from "react";
import pokemonApi, { getPokemonBySearch } from "../services/pokemonApi";
import Hero from "../components/Hero";
import PokemonCard from "../components/PokemonCard";
import { getPokemonList } from "../services/pokemonApi";
import type { Pokemon } from "../types/pokemon";
import axios from "axios";
import "./Home.css";

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
  }, [offset]);

  async function handleSearch() {
    setError(null);
    
    if (searchTerm.trim() === "") {
      setSearchResult(null);
      return;
    }

    try {
      const data = await getPokemonBySearch(searchTerm);
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load Pokémon");
    }
  }

  function handleSearchChange(value: string) {
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchResult(null);
      setError(null);
    }
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
          <span>{totalPokemon} Pokémon</span>
        </div>

        <div className="pokemon-grid">
          {displayedPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

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
