import { useState, useEffect } from "react";
import { getAbilityList } from "../services/pokemonApi";
import "./Ability.css";
import "../components/Loading.css";
import type { AbilityListResponse } from "../types/pokemon";

function Ability() {
      const [abilities, setAbilities] = useState<AbilityListResponse["results"]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
           async function loadAbilities() {
              setLoading(true);
              setError(null);
              try {
                const data = await getAbilityList();
                setAbilities(data.results);
              } catch (error) {
                console.error(error);
                setError("Failed to load Pokémon abilities");
              } finally {
                setLoading(false);
              }
            }
            loadAbilities();
      }, [])

    return (
          <>
      {loading && (
        <div className="loading-state">
          <div className="pokeball-loader"></div>
          <p>Loading Abilities...</p>
        </div>
      )}

      {error && <p>{error}</p>}
      <div className="abilities-page">
        <h1>Abilities</h1>

        {!loading && !error && (
          <div className="abilities-grid">
            {abilities.map((abilityInfo) => (
              <p className="abilities-card" key={abilityInfo.name}>
                {abilityInfo.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
    )
};

export default Ability;