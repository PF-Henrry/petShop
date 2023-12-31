"use client";

import { useState, useEffect } from "react";

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

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && query.length > 0) {
      const updatedQuery = query.slice(0, -1);
      setQuery(updatedQuery);
      onSearch(updatedQuery);
      localStorage.setItem("searchQuery", updatedQuery);
    }
  };

  return (
    <div className="flex items-center gap-4 w-full relative px-6 mt-6">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="border p-2 pl-10 w-full" // Añadido el padding izquierdo para acomodar la 'X'
      />
      {query && ( // Mostrar la 'X' solo si hay texto en el input
        <button
          onClick={handleClear}
          className="absolute inset-y-0 left-0 m-2 bg-gray-300 text-gray-700 px-2 py-1 rounded cursor-pointer"
        >
          X
        </button>
      )}
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
