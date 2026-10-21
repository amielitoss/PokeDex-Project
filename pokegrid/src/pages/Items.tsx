import { useState, useEffect } from "react";
import type { ItemListResponse } from "../types/pokemon";
import { getItemList } from "../services/pokemonApi";

import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import "./Items.css";

function Items() {
  const [items, setItems] = useState<ItemListResponse["results"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 20;

  useEffect(() => {
    async function loadItems() {
      setLoading(true);
      setError(null);

      try {
        const offset = (currentPage - 1) * itemsPerPage;

        const data = await getItemList(itemsPerPage, offset);

        setItems(data.results);
        setTotalCount(data.count);
      } catch (error) {
        console.error(error);
        setError("Failed to load Pokémon items");
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <>
      {loading && <Loading message="Loading Items..." />}

      {error && <ErrorMessage message={error} />}

      <div className="items-page">
        <h1>Items</h1>

        {!loading && !error && (
          <>
            <div className="items-grid">
              {items.map((itemInfo) => (
                <p className="items-card" key={itemInfo.name}>
                  {itemInfo.name}
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

export default Items;
