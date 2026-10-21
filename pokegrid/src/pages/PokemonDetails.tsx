import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PokemonDetailsCard from "../components/PokemonDetailsCard";
import PokemonDetailsInfo from "../components/PokemonDetailsInfo";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import usePokemonDetails from "../hooks/usePokemonDetails";

import "./PokemonDetails.css";

function PokemonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isCrying, setIsCrying] = useState(false);

  const {
    pokemon,
    species,
    evolutionPokemon,
    weaknesses,
    resistance,
    immunity,
    loading,
    error,
  } = usePokemonDetails(id);

  function playCry() {
    if (!pokemon || isCrying) {
      return;
    }

    const cry = new Audio(pokemon.cries.latest);

    cry.volume = 0.15;

    setIsCrying(true);

    cry.onended = () => {
      setIsCrying(false);
    };

    cry.play().catch(() => {
      setIsCrying(false);
    });
  }

  return (
    <>
      {loading && <Loading message="Loading Pokémon..." />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && pokemon && (
        <div className="pokemon-details-page">
          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>

          <div className="pokemon-details-main">
            <PokemonDetailsCard
              pokemon={pokemon}
              weaknesses={weaknesses}
              resistance={resistance}
              immunity={immunity}
              isCrying={isCrying}
              onPlayCry={playCry}
            />

            <PokemonDetailsInfo
              pokemon={pokemon}
              species={species}
              evolutionPokemon={evolutionPokemon}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonDetails;
