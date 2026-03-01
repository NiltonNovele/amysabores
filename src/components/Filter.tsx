"use client";

import { useState } from "react";

const Filter = () => {
  const [selectedSort, setSelectedSort] = useState("recentes");

  const handleFilter = (value: string) => {
    setSelectedSort(value);
    // Here you could trigger any callback or state update to filter products
    // e.g., call a parent function via props if needed
    console.log("Selected sort:", value);
  };

  return (
    <div className="flex items-center justify-end gap-3 text-sm text-gray-600 my-6">
      <label htmlFor="sort" className="font-medium text-pink-600">
        Ordenar por:
      </label>

      <select
        name="sort"
        id="sort"
        value={selectedSort}
        onChange={(e) => handleFilter(e.target.value)}
        className="ring-1 ring-pink-200 bg-white px-3 py-1.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 cursor-pointer"
      >
        <option value="recentes">Mais recentes</option>
        <option value="populares">Mais populares</option>
        <option value="asc">Preço: do mais baixo ao mais alto</option>
        <option value="desc">Preço: do mais alto ao mais baixo</option>
        <option value="recomendados">Recomendados pela Amy</option>
      </select>
    </div>
  );
};

export default Filter;