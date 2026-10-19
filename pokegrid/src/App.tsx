import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import PokemonDetails from "./pages/PokemonDetails";

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
    </Routes>
    </div>
  );
}

export default App;
