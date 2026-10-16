import axios from "axios";
import type { Pokemon, PokemonListResponse, PokemonTypeResponse } from "../types/pokemon";

async function pokemonApi(): Promise<Pokemon> {
    const response = await axios.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/6");
    return response.data;
}

export async function getPokemonList(offset: number, pageSize: number): Promise<PokemonListResponse> {
    const response = await axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`);
    return response.data;
}

export async function getPokemonBySearch(search: string): Promise<Pokemon> {
    const normalizedSearch = search.trim().toLowerCase();
    const response = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${normalizedSearch}`)
    return response.data;
}

export async function getPokemonByType(type: string): Promise<PokemonTypeResponse> {
  const normalizedType = type.trim().toLowerCase();  
  const response = await axios.get<PokemonTypeResponse>(`https://pokeapi.co/api/v2/type/${normalizedType}`);
  return response.data
}

export default pokemonApi;
