import axios from "axios";
import type { Pokemon } from "../types/pokemon";

async function pokemonApi(): Promise<Pokemon> {
    const response = await axios.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/6");
    return response.data;
}

export default pokemonApi;
