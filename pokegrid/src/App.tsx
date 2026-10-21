import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Moves from "./pages/Moves";
import Ability from "./pages/Ability";
import "./App.css";
import PokemonDetails from "./pages/PokemonDetails";
import Types from "./pages/Types";
import Items from "./pages/Items";

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    function toggleTheme() {
      setDarkMode(prev => !prev);
    }

  return (
    <div className={darkMode ? "dark" : "light"}>
    <Navbar darkMode={darkMode} toggleTheme={toggleTheme}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="/moves" element={<Moves />} />
      <Route path="/abilities" element={<Ability />} />
      <Route path="/types" element={<Types />} />
      <Route path="/items" element={<Items />} />
    </Routes>
    </div>
  );
}

export default App;
