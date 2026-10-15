import axios from "axios";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";

async function pokemonApi(): Promise<Pokemon> {
    const response = await axios.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/6");
    return response.data;
}

export async function getPokemonList(offset: number): Promise<PokemonListResponse> {
    const response = await axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${offset}`);
    return response.data;
}

export default pokemonApi;
