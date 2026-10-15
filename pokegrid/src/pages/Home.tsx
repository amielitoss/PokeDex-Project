import { useEffect, useState } from "react";
import pokemonApi from "../services/pokemonApi";
import type { Pokemon } from "../types/pokemon";

import "./Home.css";

function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      setError(null);
      try {
        const data = await pokemonApi();
        setPokemon(data);
      } catch {
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
          <p>{pokemon.name}</p>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        </div>
      )}

      {loading && (
        <div className="loading-state">
          <div className="pokeball-loader"></div>
          <p>Loading Pokémon...</p>
        </div>
      )}

      {error && (
        <p>{error}</p>
      )}
    </>
  );
}

export default Home;