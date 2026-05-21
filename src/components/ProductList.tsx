"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";
import { products as productsData } from "@/data/products";
import { ProductCategory } from "@/types";

import {
  Cake,
  Cookie,
  Candy,
  IceCreamBowl,
  Sandwich,
  ShoppingBasket,
  Search,
  ArrowRight,
} from "lucide-react";

const categories = [
  { name: "Todos", icon: ShoppingBasket, slug: "all" },
  { name: "Bolos", icon: Cake, slug: "bolos" },
  { name: "Cupcakes", icon: IceCreamBowl, slug: "cupcakes" },
  { name: "Biscoitos", icon: Cookie, slug: "biscoitos" },
  { name: "Brigadeiros", icon: Candy, slug: "brigadeiros" },
  { name: "Salgados", icon: Sandwich, slug: "salgados" },
  { name: "Doces Especiais", icon: Candy, slug: "doces-especiais" },
];

type SortOption =
  | "recentes"
  | "populares"
  | "asc"
  | "desc"
  | "recomendados";

const ProductList = ({
  category,
  params,
}: {
  category: string;
  params: "homepage" | "products";
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || "all"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortOption>("recentes");

  const filteredProducts = useMemo(() => {
    const result = productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category === (selectedCategory as ProductCategory);

      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        search === "" ||
        product.name.toLowerCase().includes(search) ||
        product.shortDescription.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });

    return [...result].sort((a, b) => {
      if (selectedSort === "asc") return a.price - b.price;
      if (selectedSort === "desc") return b.price - a.price;
      if (selectedSort === "recomendados") {
        return Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
      }
      if (selectedSort === "populares") return b.id - a.id;
      return b.id - a.id;
    });
  }, [selectedCategory, searchTerm, selectedSort]);

  return (
    <section className="w-full">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-pink-500">
            Produtos
          </span>

          <h2 className="mt-2 text-2xl font-black text-gray-900 sm:text-3xl">
            Escolha os seus favoritos
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Explore bolos artesanais, doces especiais e sobremesas preparadas
            com carinho pela Amy Sabores & Cakes.
          </p>
        </div>

        <div className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />

          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 pl-10 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-pink-300 focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
          />
        </div>
      </div>

      <div className="mb-6 overflow-x-auto rounded-3xl border border-pink-100 bg-pink-50/80 p-2 shadow-sm">
        <div className="flex min-w-max gap-2 lg:grid lg:min-w-0 lg:grid-cols-7">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.slug === selectedCategory;

            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white text-pink-600 shadow-md shadow-pink-100"
                    : "text-gray-500 hover:bg-white hover:text-pink-600"
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {params === "products" && (
        <Filter selectedSort={selectedSort} onSortChange={setSelectedSort} />
      )}

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-gray-500">
          {filteredProducts.length} produto
          {filteredProducts.length !== 1 ? "s" : ""} encontrado
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="w-fit text-sm font-semibold text-pink-600 hover:underline"
          >
            Limpar pesquisa
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-pink-200 bg-pink-50/60 px-6 py-12 text-center">
          <ShoppingBasket className="mb-4 h-10 w-10 text-pink-400" />

          <h3 className="text-lg font-bold text-gray-900">
            Nenhum produto encontrado
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
            Tente pesquisar por outro nome ou escolha uma categoria diferente.
          </p>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchTerm("");
            }}
            className="mt-5 rounded-xl bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-pink-700"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {params === "homepage" && (
        <div className="mt-8 flex justify-center md:justify-end">
          <Link
            href={category ? `/products/?category=${category}` : "/products"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700"
          >
            Ver todos produtos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductList;