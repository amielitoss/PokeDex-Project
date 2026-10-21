import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Moves from "./pages/Moves";
import Ability from "./pages/Ability";
import PokemonDetails from "./pages/PokemonDetails";
import Types from "./pages/Types";
import Items from "./pages/Items";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  return (
    <div className={darkMode ? "dark app" : "light app"}>
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pokemon/:id"
            element={<PokemonDetails />}
          />
          <Route path="/moves" element={<Moves />} />
          <Route path="/abilities" element={<Ability />} />
          <Route path="/types" element={<Types />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;