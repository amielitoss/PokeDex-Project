import { Link } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";
import "./PokemonCard.css";

type PokemonCardProps = {
  pokemon: Pokemon;
};

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="pokemon-card-link"
    >
      <article className="pokemon-card">
        <div className="pokemon-card-image">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            loading="lazy"
            width="96"
            height="96"
          />
        </div>

        <div className="pokemon-card-content">
          <span>
            #{String(pokemon.id).padStart(3, "0")}
          </span>

          <h3>{pokemon.name}</h3>

          <div className="pokemon-card-types">
            {pokemon.types.map((typeInfo) => (
              <span
                className={`type-badge type-${typeInfo.type.name}`}
                key={typeInfo.slot}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PokemonCard;