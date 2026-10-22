type PokemonControlsProps = {
  totalPokemon: number;
  selectedGeneration: string;
  selectedType: string;
  sortOption: string;
  onGenerationChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

function PokemonControls({
  totalPokemon,
  selectedGeneration,
  selectedType,
  sortOption,
  onGenerationChange,
  onTypeChange,
  onSortChange,
}: PokemonControlsProps) {
  return (
    <div className="pokemon-grid-header">
      <div>
        <p>Explore the Pokédex</p>
        <h2>All Pokémon</h2>
      </div>

      <div className="pokemon-grid-controls">
        <span>{totalPokemon} Pokémon</span>

        <select
          aria-label="Filter Pokémon by generation"
          value={selectedGeneration}
          onChange={(event) =>
            onGenerationChange(event.target.value)
          }
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
          aria-label="Filter Pokémon by type"
          value={selectedType}
          onChange={(event) =>
            onTypeChange(event.target.value)
          }
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
          aria-label="Sort Pokémon"
          value={sortOption}
          onChange={(event) =>
            onSortChange(event.target.value)
          }
        >
          <option value="number-asc">
            Number: Low to High
          </option>
          <option value="number-desc">
            Number: High to Low
          </option>
          <option value="name-asc">
            Name: A to Z
          </option>
          <option value="name-desc">
            Name: Z to A
          </option>
        </select>
      </div>
    </div>
  );
}

export default PokemonControls;