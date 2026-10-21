import { useState, useEffect } from "react";
import type { ItemListResponse } from "../types/pokemon";
import { getItemList } from "../services/pokemonApi";
import "./Items.css";
import "../components/Loading.css";

function Items() {
      const [items, setItems] = useState<ItemListResponse["results"]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
           async function loadItems() {
              setLoading(true);
              setError(null);
              try {
                const data = await getItemList();
                setItems(data.results);
              } catch (error) {
                console.error(error);
                setError("Failed to load Pokémon items");
              } finally {
                setLoading(false);
              }
            }
            loadItems();
      }, [])

    return (
          <>
      {loading && (
        <div className="loading-state">
          <div className="pokeball-loader"></div>
          <p>Loading Items...</p>
        </div>
      )}

      {error && <p>{error}</p>}
      <div className="items-page">
        <h1>Items</h1>

        {!loading && !error && (
          <div className="items-grid">
            {items.map((itemsInfo) => (
              <p className="items-card" key={itemsInfo.name}>
                {itemsInfo.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
    )
};

export default Items;