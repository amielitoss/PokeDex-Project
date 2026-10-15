import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";

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
    </Routes>
    </div>
  );
}

export default App;
