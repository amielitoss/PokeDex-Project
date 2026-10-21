import { Link } from "react-router-dom";

import type {
  Pokemon,
  PokemonSpeciesResponse,
} from "../types/pokemon";

type PokemonDetailsInfoProps = {
  pokemon: Pokemon;
  species: PokemonSpeciesResponse | null;
  evolutionPokemon: Pokemon[];
};

function PokemonDetailsInfo({
  pokemon,
  species,
  evolutionPokemon,
}: PokemonDetailsInfoProps) {
  const englishDescription = species?.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  );

  const cleanDescription =
    englishDescription?.flavor_text.replace(/[\n\f]/g, " ");

  return (
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
          <p key={abilityInfo.slot}>
            {abilityInfo.ability.name}
          </p>
        ))}
      </div>

      <div className="pokemon-stats">
        <h2>Base Stats</h2>

        {pokemon.stats.map((statInfo) => (
          <div
            className="stat-row"
            key={statInfo.stat.name}
          >
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
  );
}

export default PokemonDetailsInfo;