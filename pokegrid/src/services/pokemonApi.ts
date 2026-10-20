import axios from "axios";
import type { Pokemon, PokemonEvolutionResponse, PokemonGenerationResponse, PokemonListResponse, PokemonSpeciesResponse, PokemonTypeResponse } from "../types/pokemon";

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

export async function getPokemonByGeneration(generation: string): Promise<PokemonGenerationResponse> {
    const normalizedGen = generation.trim().toLowerCase();
    const response = await axios.get<PokemonGenerationResponse>(`https://pokeapi.co/api/v2/generation/${normalizedGen}`);
    return response.data;
}

export async function getPokemonBySpecies(id: string): Promise<PokemonSpeciesResponse> {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return response.data;
}

export async function getEvolutionChain(url: string): Promise<PokemonEvolutionResponse> {
    const response = await axios.get<PokemonEvolutionResponse>(url);
    return response.data;
}

export default pokemonApi;
