export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    }[];
  };
  cries: {
    latest: string;
    legacy: string;
  };
};


export type PokemonListItem = {
    name: string;
    url: string;
};

export type PokemonListResponse = {
    results: PokemonListItem[];
    count: number;
};

export type PokemonTypeResponse = {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
};

export type PokemonGenerationResponse = {
  pokemon_species: {
    name: string;
    url: string;
  }[];
};