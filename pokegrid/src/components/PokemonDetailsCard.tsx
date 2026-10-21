import type { Pokemon } from "../types/pokemon";

type PokemonDetailsCardProps = {
  pokemon: Pokemon;
  weaknesses: string[];
  resistance: string[];
  immunity: string[];
  isCrying: boolean;
  onPlayCry: () => void;
};

function PokemonDetailsCard({
  pokemon,
  weaknesses,
  resistance,
  immunity,
  isCrying,
  onPlayCry,
}: PokemonDetailsCardProps) {
  return (
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

        {resistance.map((resistanceType) => (
          <span
            className={`type-badge type-${resistanceType}`}
            key={resistanceType}
          >
            {resistanceType}
          </span>
        ))}
      </div>

      {immunity.length > 0 && (
        <div className="pokemon-immunities">
          <h2>Immunities</h2>

          {immunity.map((immunityType) => (
            <span
              className={`type-badge type-${immunityType}`}
              key={immunityType}
            >
              {immunityType}
            </span>
          ))}
        </div>
      )}

      <button
        type="button"
        className="cry-button"
        onClick={onPlayCry}
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
  );
}

export default PokemonDetailsCard;