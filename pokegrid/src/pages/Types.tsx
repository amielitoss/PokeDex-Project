import { useState, useEffect } from "react";
import type { TypeListResponse } from "../types/pokemon";
import { getTypeList } from "../services/pokemonApi";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import "./Types.css";

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
  }, []);

  return (
    <>
      {loading && <Loading message="Loading Types..." />}

      {error && <ErrorMessage message={error} />}

      <div className="types-page">
        <h1>Types</h1>

        {!loading && !error && (
          <div className="types-grid">
            {types.map((typeInfo) => (
              <p
                className={`types-card type-${typeInfo.name}`}
                key={typeInfo.name}
              >
                {typeInfo.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Types;
