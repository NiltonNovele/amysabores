"use client";

import { useState } from "react";
import type { ProductsType } from "@/types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";
import { products as productsData } from "@/data/products";

import {
  Cake,
  Cookie,
  Candy,
  IceCreamBowl,
  Sandwich,
  ShoppingBasket,
} from "lucide-react";

const ProductList = ({
  category,
  params,
}: {
  category: string;
  params: "homepage" | "products";
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { name: "Todos", icon: <ShoppingBasket className="w-4 h-4" />, slug: "all" },
    { name: "Bolos", icon: <Cake className="w-4 h-4" />, slug: "bolos" },
    { name: "Cupcakes", icon: <IceCreamBowl className="w-4 h-4" />, slug: "cupcakes" },
    { name: "Biscoitos", icon: <Cookie className="w-4 h-4" />, slug: "biscoitos" },
    { name: "Brigadeiros", icon: <Candy className="w-4 h-4" />, slug: "brigadeiros" },
    { name: "Salgados", icon: <Sandwich className="w-4 h-4" />, slug: "salgados" },
    { name: "Doces Especiais", icon: <Candy className="w-4 h-4" />, slug: "doces-especiais" },
  ];

  const handleChange = (slug: string) => setSelectedCategory(slug);

  const filteredProducts =
    selectedCategory === "all"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 bg-pink-50 p-3 rounded-xl mb-6 text-sm shadow-sm">
        {categories.map((cat) => {
          const isActive = cat.slug === selectedCategory;
          return (
            <div
              key={cat.slug}
              onClick={() => handleChange(cat.slug)}
              className={`flex items-center justify-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 select-none ${
                isActive
                  ? "bg-white shadow-md text-pink-600 font-semibold"
                  : "text-gray-500 hover:bg-white hover:text-pink-600"
              }`}
            >
              {cat.icon}
              {cat.name}
            </div>
          );
        })}
      </div>

      {params === "products" && <Filter />}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        Ver todos produtos
      </Link>
    </div>
  );
};

export default ProductList;