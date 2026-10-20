import { Link, NavLink } from "react-router-dom";
import logo from "../assets/PokeGrid-logo.webp";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import "./Navbar.css";

type NavbarProps = {
  darkMode: boolean;
  toggleTheme: () => void;
};

function Navbar({ darkMode, toggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="PokeGrid" />
        </Link>
      </div>
      <div className={`link-container ${menuOpen ? "is-open" : ""}`}>
        <NavLink
          to="/"
          end
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Pokémon
        </NavLink>
        <NavLink
          to="/moves"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Moves
        </NavLink>
        <NavLink
          to="/abilities"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Abilities
        </NavLink>
        <NavLink
          to="/types"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Types
        </NavLink>
        <NavLink
          to="/items"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Items
        </NavLink>
      </div>
      <div className="navbar-actions">
        <button
          type="button"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
