import { useEffect, useState } from "react";
import pokemonApi from "./services/pokemonApi";
import type { Pokemon } from "./types/pokemon";


function App() {

  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    async function loadPokemon() {
      const data = await pokemonApi();
      console.log(data)
      setPokemon(data)
    }
    loadPokemon()
  }, [])

  return (
    <>
    {pokemon && (
      <div>
      <p>{pokemon.name}</p>
      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
      </div>
    )}
  </>
  )
}

export default App;