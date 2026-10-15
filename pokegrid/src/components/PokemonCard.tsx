import type { Pokemon } from "../types/pokemon";
import "./PokemonCard.css";

type PokemonCardProps = {
  pokemon: Pokemon;
};

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <article className="pokemon-card">
      <div className="pokemon-card-image">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
        />
      </div>

      <div className="pokemon-card-content">
        <span>{pokemon.id}</span>
        <h3>{pokemon.name}</h3>
        <div className="pokemon-card-types">
            {pokemon.types.map((typeInfo) => (
                <span key={typeInfo.slot}>
                    {typeInfo.type.name}
                </span>
            ))}
        </div>
      </div>
    </article>
  );
}

export default PokemonCard;
