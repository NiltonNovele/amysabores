"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedSort = searchParams.get("sort") || "recentes";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
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