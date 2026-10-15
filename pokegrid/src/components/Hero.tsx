import type { Pokemon } from "../types/pokemon";
import { useState } from "react";
import "./Hero.css";

type HeroProps = {
  pokemon: Pokemon;
};

function Hero({ pokemon }: HeroProps) {
  const [isCrying, setIsCrying] = useState(false);

  function playCry() {
    if (isCrying) {
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
    <section className="section-hero">
      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-eyebrow">Discover your next favorite Pokémon</p>
          <h1>Meet {pokemon.name}</h1>
          <p className="hero-description">
            Explore Pokémon, compare their stats, discover abilities, types, and
            evolution paths.
          </p>
          <div className="hero-search">
            <input
              type="text"
              placeholder="Search Pokémon..."
              aria-label="Search Pokémon"
            />
          </div>
        </div>
        <div className="hero-image">
          <button type="button" onClick={playCry}>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
