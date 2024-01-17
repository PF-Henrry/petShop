"use client";

import { useState, useEffect } from "react";
import "./SearchBar.css";
import { MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";

export default function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
    localStorage.setItem("searchQuery", query);
  };

  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedQuery && storedQuery !== query) {
      setQuery(storedQuery);
      onSearch(storedQuery);
    }
  }, [onSearch, query]);

  const handleClear = () => {
    setQuery("");
    onClear();
    clearLocalStorage();
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("filteredProducts");
    localStorage.removeItem("filterQuery");
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Backspace" && query.length > 0) {
  //     const updatedQuery = query.slice(0, -1);
  //     setQuery(updatedQuery);
  //     onSearch(updatedQuery);
  //     localStorage.setItem("searchQuery", updatedQuery);
  //   }
  // };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && query.length > 0) {
      const updatedQuery = query.slice(0, -1);
      setQuery(updatedQuery);
      onSearch(updatedQuery);
      localStorage.setItem("searchQuery", updatedQuery);
    } else if (e.key === "Enter" && query.trim() !== "") {
      handleSearch();
    }
  };
  
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Busca productos..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="search-bar"
      />
      {query && ( // Mostrar la 'X' solo si hay texto en el input
        <button onClick={handleClear} className="clear-button">
          <X size={20} />
        </button>
      )}
      <button onClick={handleSearch} className="search-button">
        <MagnifyingGlass size={25} />
      </button>
    </div>
  );
}
