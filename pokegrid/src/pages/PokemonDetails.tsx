import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";
import { getPokemonBySearch } from "../services/pokemonApi";
import type { PokemonSpeciesResponse } from "../types/pokemon";
import { getPokemonBySpecies } from "../services/pokemonApi";
import "./PokemonDetails.css";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isCrying, setIsCrying] = useState(false);
  const [species, setSpecies] = useState<PokemonSpeciesResponse | null>(null);
  const englishDescription = species?.flavor_text_entries.find((entry) => entry.language.name === "en");
  const cleanDescription = englishDescription?.flavor_text.replace(
  /[\n\f]/g,
  " ",
);

  function playCry() {
    if (!pokemon || isCrying) {
      return;
    }

    const cry = new Audio(pokemon.cries.latest);
    cry.volume = 0.15;
    setIsCrying(true);
    cry.onended = () => {
      setIsCrying(false);
    };
    cry.play().catch(() => {
      setIsCrying(false);
    });
  }

  useEffect(() => {
    async function loadPokemonDetails() {
      if (!id) return;
      const data = await getPokemonBySearch(id);
      setPokemon(data);
      const speciesData = await getPokemonBySpecies(id);
      setSpecies(speciesData);
    }

    loadPokemonDetails();
  }, [id]);



  return (
    <>
      {pokemon && (
        <div className="pokemon-details-page">
          <div className="pokemon-details-main">
            <div className="pokemon-details-card">
              <span className="pokemon-details-id">
                #{String(pokemon.id).padStart(3, "0")}
              </span>

              <h1>{pokemon.name}</h1>

              <div className="pokemon-details-image">
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                />
              </div>

              <div className="pokemon-details-types">
                {pokemon.types.map((typeInfo) => (
                  <span
                    className={`type-badge type-${typeInfo.type.name}`}
                    key={typeInfo.slot}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="cry-button"
                onClick={playCry}
                disabled={isCrying}
              >
                {isCrying ? "Playing..." : "Play Cry"}
              </button>

              <div className="pokemon-details-meta">
                <div>
                  <span>Height</span>
                  <strong>{pokemon.height / 10} m</strong>
                </div>

                <div>
                  <span>Weight</span>
                  <strong>{pokemon.weight / 10} kg</strong>
                </div>
              </div>
            </div>

            <div className="pokemon-details-info">
                {englishDescription &&  (
                    <div className="pokemon-description">
                        <h2>Description</h2>
                        <p>{cleanDescription}</p>
                    </div>
                )}
              <div className="pokemon-abilities">
                <h2>Abilities</h2>

                {pokemon.abilities.map((abilityInfo) => (
                  <p key={abilityInfo.slot}>{abilityInfo.ability.name}</p>
                ))}
              </div>

              <div className="pokemon-stats">
                <h2>Base Stats</h2>

                {pokemon.stats.map((statInfo) => (
                  <div className="stat-row" key={statInfo.stat.name}>
                    <div className="stat-info">
                      <p>{statInfo.stat.name}</p>
                      <p>{statInfo.base_stat}</p>
                    </div>

                    <div className="stat-bar">
                      <div
                        className="stat-bar-fill"
                        style={{
                          width: `${Math.min(
                            (statInfo.base_stat / 180) * 100,
                            100,
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonDetails;
