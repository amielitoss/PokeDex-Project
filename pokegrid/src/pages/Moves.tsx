import { useState, useEffect } from "react";
import type { MoveListResponse } from "../types/pokemon";
import { getMoveList } from "../services/pokemonApi";

import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import "./Moves.css";

function Moves() {
  const [moves, setMoves] = useState<MoveListResponse["results"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const movesPerPage = 20;

  useEffect(() => {
    async function loadMoves() {
      setLoading(true);
      setError(null);

      try {
        const offset = (currentPage - 1) * movesPerPage;

        const data = await getMoveList(movesPerPage, offset);

        setMoves(data.results);
        setTotalCount(data.count);
      } catch (error) {
        console.error(error);
        setError("Failed to load Pokémon moves");
      } finally {
        setLoading(false);
      }
    }

    loadMoves();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / movesPerPage);

  return (
    <>
      {loading && <Loading message="Loading Moves..." />}

      {error && <ErrorMessage message={error} />}

      <div className="moves-page">
        <h1>Moves</h1>

        {!loading && !error && (
          <>
            <div className="moves-grid">
              {moves.map((moveInfo) => (
                <p className="moves-card" key={moveInfo.name}>
                  {moveInfo.name}
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

export default Moves;
