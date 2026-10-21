import { useState, useEffect } from "react";
import type { AbilityListResponse } from "../types/pokemon";
import { getAbilityList } from "../services/pokemonApi";

import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import "./Ability.css";

function Ability() {
  const [abilities, setAbilities] = useState<AbilityListResponse["results"]>(
    [],
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const abilitiesPerPage = 20;

  useEffect(() => {
    async function loadAbilities() {
      setLoading(true);
      setError(null);

      try {
        const offset = (currentPage - 1) * abilitiesPerPage;

        const data = await getAbilityList(abilitiesPerPage, offset);

        setAbilities(data.results);
        setTotalCount(data.count);
      } catch (error) {
        console.error(error);
        setError("Failed to load Pokémon abilities");
      } finally {
        setLoading(false);
      }
    }

    loadAbilities();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / abilitiesPerPage);

  return (
    <>
      {loading && <Loading message="Loading Abilities..." />}

      {error && <ErrorMessage message={error} />}

      <div className="ability-page">
        <h1>Abilities</h1>

        {!loading && !error && (
          <>
            <div className="ability-grid">
              {abilities.map((abilityInfo) => (
                <p className="ability-card" key={abilityInfo.name}>
                  {abilityInfo.name}
                </p>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Ability;
