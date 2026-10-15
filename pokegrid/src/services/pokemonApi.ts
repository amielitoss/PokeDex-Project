import axios from "axios";
import type { Pokemon } from "../types/pokemon";

async function pokemonApi(): Promise<Pokemon> {
    const response = await axios.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/1");
    return response.data;
}

export default pokemonApi;
