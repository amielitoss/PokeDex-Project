import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";
import {
  getPokemonBySearch,
  getPokemonByType,
  getPokemonBySpecies,
  getEvolutionChain,
} from "../services/pokemonApi";
import type {
  PokemonSpeciesResponse,
  EvolutionChainNode,
} from "../types/pokemon";
import "./PokemonDetails.css";
import "../components/Loading.css";

function getEvolutionNames(node: EvolutionChainNode): string[] {
  const names = [node.species.name];

  node.evolves_to.forEach((nextEvolution) => {
    names.push(...getEvolutionNames(nextEvolution));
  });

  return names;
}

function PokemonDetails() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isCrying, setIsCrying] = useState(false);
  const [species, setSpecies] = useState<PokemonSpeciesResponse | null>(null);
  const [evolutionPokemon, setEvolutionPokemon] = useState<Pokemon[]>([]);
  const englishDescription = species?.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  );
  const cleanDescription = englishDescription?.flavor_text.replace(
    /[\n\f]/g,
    " ",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [resistance, setResistance] = useState<string[]>([]);
  const [immunity, setImmunity] = useState<string[]>([]);

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
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonBySearch(id);
        setPokemon(data);
        const speciesData = await getPokemonBySpecies(id);
        setSpecies(speciesData);
        const evoData = await getEvolutionChain(
          speciesData.evolution_chain.url,
        );
        const evoNames = getEvolutionNames(evoData.chain);
        const evolutionRequests = evoNames.map((name) =>
          getPokemonBySearch(name),
        );

        const evolutionData = await Promise.all(evolutionRequests);

        setEvolutionPokemon(evolutionData);

        const typeRequests = data.types.map((typeInfo) => {
          return getPokemonByType(typeInfo.type.name);
        });
        const typeData = await Promise.all(typeRequests);

        //damage multipliers
        const damageMultipliers: Record<string, number> = {};
        typeData.forEach((type) => {
          type.damage_relations.double_damage_from.forEach((damageType) => {
            damageMultipliers[damageType.name] =
              (damageMultipliers[damageType.name] ?? 1) * 2;
          });

          type.damage_relations.half_damage_from.forEach((damageType) => {
            damageMultipliers[damageType.name] =
              (damageMultipliers[damageType.name] ?? 1) * 0.5;
          });

          type.damage_relations.no_damage_from.forEach((damageType) => {
            damageMultipliers[damageType.name] = 0;
          });
        });

        // weakness entries
        const weaknessEntries = Object.entries(damageMultipliers).filter(
          ([, multiplier]) => multiplier > 1,
        );
        const finalWeaknesses = weaknessEntries.map(([typeName]) => typeName);
        setWeaknesses(finalWeaknesses);

        // resistance entries
        const resistanceEntries = Object.entries(damageMultipliers).filter(
          ([, multiplier]) => multiplier > 0 && multiplier < 1,
        );
        const finalResistance = resistanceEntries.map(([typeName]) => typeName);
        setResistance(finalResistance);

        // immunity entries
        const immunityEntries = Object.entries(damageMultipliers).filter(
          ([, multiplier]) => multiplier === 0,
        );
        const finalImmunity = immunityEntries.map(([typeName]) => typeName);
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

  return (
    <>
      {loading && (
        <div className="loading-state">
          <div className="pokeball-loader"></div>
          <p>Loading Pokémon...</p>
        </div>
      )}

      {error && <p>{error}</p>}

      {!loading && !error && pokemon && (
        <div className="pokemon-details-page">
          <button className="back-button" onClick={() => navigate(-1)}>Back</button>
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

              <div className="pokemon-weaknesses">
                <h2>Weaknesses</h2>
                {weaknesses.map((weakness) => (
                  <span
                    className={`type-badge type-${weakness}`}
                    key={weakness}
                  >
                    {weakness}
                  </span>
                ))}
              </div>

              <div className="pokemon-resistances">
                <h2>Resistances</h2>
                {resistance.map((resistance) => (
                  <span
                    className={`type-badge type-${resistance}`}
                    key={resistance}
                  >
                    {resistance}
                  </span>
                ))}
              </div>

              {immunity.length > 0 && (
                <div className="pokemon-immunities">
                  <h2>Immunities</h2>
                  {immunity.map((immunity) => (
                    <span
                      className={`type-badge type-${immunity}`}
                      key={immunity}
                    >
                      {immunity}
                    </span>
                  ))}
                </div>
              )}

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
              {englishDescription && (
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
              <div className="pokemon-evolutions">
                <h2>Evolution Chain</h2>

                {evolutionPokemon.map((evoPokemon) => (
                  <Link
                    key={evoPokemon.id}
                    to={`/pokemon/${evoPokemon.id}`}
                    className="evolution-link"
                  >
                    <img
                      src={
                        evoPokemon.sprites.other["official-artwork"]
                          .front_default
                      }
                      alt={evoPokemon.name}
                    />

                    <span>{evoPokemon.name}</span>
                  </Link>
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
