"use client";
import React, { useState, useEffect } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const performSearch = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products`);
        const data = await response.json();

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filteredResults = data.filter((item) => {
          const productWords = (item.name || "").toLowerCase().split(" ");
          const allWordsPresent = lowerCaseSearchTerm
            .split(" ")
            .every((searchWord) =>
              productWords.some((productWord) =>
                productWord.includes(searchWord)
              )
            );

          return allWordsPresent;
        });

        if (filteredResults.length === 0) {
          setError("No se encontraron resultados");
        } else {
          setError("");
        }

        setSearchResults(filteredResults);
      } catch (error) {
        setError("Hubo un problema al obtener los productos");
      }
    };

    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setError("");
    } else {
      performSearch();
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
  };

  return (
    <div className="my-4 relative">
      <div className="md:flex md:items-center p-4 rounded">
        <div className="flex flex-col items-center md:flex-row md:items-start md:w-full">
          <input
            className="border p-3 w-full text-gray-800 rounded-lg bg-white focus:border-purple-500"
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            className="bg-purple-500 text-white px-3 py-2 rounded-lg ml-2 flex items-center transition duration-300 ease-in-out hover:bg-purple-700"
            onClick={() => setSearchResults([])}
          >
            <MagnifyingGlass className="mr-2 w-auto h-auto" />
          </button>
        </div>
      </div>

      {error && <div className="mt-2 text-red-500">{error}</div>}

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
