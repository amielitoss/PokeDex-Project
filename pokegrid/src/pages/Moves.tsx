import { useState, useEffect } from "react";
import type { MoveListResponse } from "../types/pokemon";
import { getMoveList } from "../services/pokemonApi";
import "./Moves.css";
import "../components/Loading.css";

function Moves() {
  const [moves, setMoves] = useState<MoveListResponse["results"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMoves() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMoveList();
        setMoves(data.results);
      } catch (error) {
        console.error(error);
        setError("Failed to load Pokémon moves");
      } finally {
        setLoading(false);
      }
    }
    loadMoves();
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-state">
          <div className="pokeball-loader"></div>
          <p>Loading Moves...</p>
        </div>
      )}

      {error && <p>{error}</p>}
      <div className="moves-page">
        <h1>Moves</h1>

        {!loading && !error && (
          <div className="moves-grid">
            {moves.map((moveInfo) => (
              <p className="move-card" key={moveInfo.name}>
                {moveInfo.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Moves;
