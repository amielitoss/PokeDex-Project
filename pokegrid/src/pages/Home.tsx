import { useEffect, useState } from "react";
import pokemonApi from "../services/pokemonApi";
import Hero from "../components/Hero";
import PokemonCard from "../components/PokemonCard";
import { getPokemonList } from "../services/pokemonApi";
import type { Pokemon } from "../types/pokemon";
import axios from "axios";
import "./Home.css";

function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      setError(null);
      try {
        const data = await pokemonApi();
        const listData = await getPokemonList();
        const detailRequests = listData.results.map((item) => {
          return axios.get<Pokemon>(item.url);
        });
        const detailResponses = await Promise.all(detailRequests);
        const details = detailResponses.map((response) => response.data);
        setPokemonDetails(details);
        setPokemon(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load Pokémon");
      } finally {
        setLoading(false);
      }
    }
    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <div>
          <Hero pokemon={pokemon} />
        </div>
      )}

      <section className="pokemon-grid-section">
        <div className="pokemon-grid-header">
          <div>
            <p>Explore the Pokédex</p>
            <h2>All Pokémon</h2>
          </div>
          <span>{pokemonDetails.length} Pokémon</span>
        </div>
        
        <div className="pokemon-grid">
          {pokemonDetails.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
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
