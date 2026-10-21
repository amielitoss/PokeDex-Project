import { useState, useEffect } from "react";
import type { TypeListResponse } from "../types/pokemon";
import { getTypeList } from "../services/pokemonApi";
import "./Types.css";
import "../components/Loading.css";

function Types() {
      const [types, setTypes] = useState<TypeListResponse["results"]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
           async function loadTypes() {
              setLoading(true);
              setError(null);
              try {
                const data = await getTypeList();
                setTypes(data.results);
              } catch (error) {
                console.error(error);
                setError("Failed to load Pokémon types");
              } finally {
                setLoading(false);
              }
            }
            loadTypes();
      }, [])

    return (
          <>
      {loading && (
        <div className="loading-state">
          <div className="pokeball-loader"></div>
          <p>Loading Types...</p>
        </div>
      )}

      {error && <p>{error}</p>}
      <div className="types-page">
        <h1>Types</h1>

        {!loading && !error && (
          <div className="types-grid">
            {types.map((typesInfo) => (
              <p className={`types-card type-${typesInfo.name}`} key={typesInfo.name}>
                {typesInfo.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
    )
};

export default Types;