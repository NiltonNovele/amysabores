"use client";

import { ArrowUpDown, Sparkles } from "lucide-react";
import { useState } from "react";

const Filter = () => {
  const [selectedSort, setSelectedSort] = useState("recentes");

  const handleFilter = (value: string) => {
    setSelectedSort(value);

    // Aqui pode chamar callback / API / state global
    console.log("Selected sort:", value);
  };

  return (
    <div className="my-6 flex flex-col gap-3 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
          <Sparkles className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Organizar Produtos
          </h3>

          <p className="text-xs text-gray-500">
            Escolha como deseja visualizar os produtos.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
        <label
          htmlFor="sort"
          className="flex items-center gap-2 text-sm font-semibold text-pink-700"
        >
          <ArrowUpDown className="h-4 w-4" />
          Ordenar por
        </label>

        <select
          name="sort"
          id="sort"
          value={selectedSort}
          onChange={(e) => handleFilter(e.target.value)}
          className="w-full rounded-xl border border-pink-100 bg-pink-50/50 px-4 py-3 text-sm font-medium text-gray-700 outline-none transition-all duration-300 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100 sm:min-w-[280px]"
        >
          <option value="recentes">Mais recentes</option>
          <option value="populares">Mais populares</option>
          <option value="asc">
            Preço: do mais baixo ao mais alto
          </option>
          <option value="desc">
            Preço: do mais alto ao mais baixo
          </option>
          <option value="recomendados">
            Recomendados pela Amy
          </option>
        </select>
      </div>
    </div>
  );
};
export default Filter;