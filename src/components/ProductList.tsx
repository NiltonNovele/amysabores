"use client";

import { useState } from "react";
import { ProductsType } from "@/types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";
import {
  Cake,
  Cookie,
  Candy,
  IceCreamBowl,
  Sandwich,
  ShoppingBasket,
} from "lucide-react";

// TEMPORARY products for Amila Sabores & Cakes in MZN
const products: ProductsType = [
  {
    id: 1,
    name: "Bolo de Chocolate",
    shortDescription: "Delicioso bolo de chocolate com cobertura cremosa.",
    description:
      "Bolo de chocolate artesanal, feito com ingredientes selecionados e recheio de chocolate cremoso. Perfeito para festas e celebrações.",
    price: 7680,
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#7B3F00", "#5A2D0C"],
    images: { "#7B3F00": "/cake.jpg", "#5A2D0C": "/cake.jpg" },
  },
  {
    id: 2,
    name: "Cupcake de Baunilha",
    shortDescription: "Mini cupcake fofinho com cobertura de baunilha.",
    description:
      "Cupcakes artesanais, macios e fofinhos, com cobertura de creme de baunilha e decoração delicada.",
    price: 1600,
    sizes: ["Unidade", "Dúzia"],
    colors: ["#F3E5AB", "#FFF2CC"],
    images: { "#F3E5AB": "/cake.jpg", "#FFF2CC": "/cake.jpg" },
  },
  {
    id: 3,
    name: "Brigadeiro Gourmet",
    shortDescription: "Tradicional doce brasileiro em versão gourmet.",
    description:
      "Brigadeiros gourmet feitos com chocolate premium, ideais para festas, lembrancinhas ou presentear.",
    price: 350,
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#3E1F0D", "#5C2A0E"],
    images: { "#3E1F0D": "/cake.jpg", "#5C2A0E": "/cake.jpg" },
  },
  {
    id: 4,
    name: "Biscoitos Decorados",
    shortDescription: "Biscoitos crocantes com decorações personalizadas.",
    description:
      "Biscoitos artesanais decorados à mão, ideais para festas, lembranças e presente especial.",
    price: 510,
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#F4D6A0", "#E2B07F"],
    images: { "#F4D6A0": "/cake.jpg", "#E2B07F": "/cake.jpg" },
  },
  {
    id: 5,
    name: "Bolo Red Velvet",
    shortDescription: "Clássico bolo Red Velvet com creme de queijo.",
    description:
      "Bolo Red Velvet macio, feito artesanalmente, com camadas de creme de queijo e cobertura delicada.",
    price: 9600,
    sizes: ["Médio", "Grande"],
    colors: ["#C11B17", "#A1120B"],
    images: { "#C11B17": "/cake.jpg", "#A1120B": "/cake.jpg" },
  },
  {
    id: 6,
    name: "Mini Cheesecakes",
    shortDescription: "Cheesecakes individuais com sabores variados.",
    description:
      "Mini cheesecakes delicados, feitos artesanalmente em sabores como morango, chocolate e maracujá.",
    price: 1150,
    sizes: ["Unidade", "Dúzia"],
    colors: ["#F9E79F", "#D6AEDD"],
    images: { "#F9E79F": "/cake.jpg", "#D6AEDD": "/cake.jpg" },
  },
  {
    id: 7,
    name: "Cupcake de Morango",
    shortDescription: "Cupcake fofinho com creme e morango fresco.",
    description:
      "Cupcakes de morango artesanais com cobertura de creme e pedaços de morango fresco.",
    price: 1920,
    sizes: ["Unidade", "Dúzia"],
    colors: ["#F28DA3", "#E75480"],
    images: { "#F28DA3": "/cake.jpg", "#E75480": "/cake.jpg" },
  },
  {
    id: 8,
    name: "Trufas Sortidas",
    shortDescription: "Caixa de trufas gourmet com sabores variados.",
    description:
      "Trufas artesanais gourmet, com sabores de chocolate ao leite, branco e meio amargo, perfeitas para presentear.",
    price: 3840,
    sizes: ["Caixa 6", "Caixa 12"],
    colors: ["#7D3C98", "#1F618D"],
    images: { "#7D3C98": "/cake.jpg", "#1F618D": "/cake.jpg" },
  },
];

const ProductList = ({
  category,
  params,
}: {
  category: string;
  params: "homepage" | "products";
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { name: "Todos", icon: <ShoppingBasket className="w-4 h-4" />, slug: "all" },
    { name: "Bolos", icon: <Cake className="w-4 h-4" />, slug: "bolos" },
    { name: "Cupcakes", icon: <IceCreamBowl className="w-4 h-4" />, slug: "cupcakes" },
    { name: "Biscoitos", icon: <Cookie className="w-4 h-4" />, slug: "biscoitos" },
    { name: "Brigadeiros", icon: <Candy className="w-4 h-4" />, slug: "brigadeiros" },
    { name: "Salgados", icon: <Sandwich className="w-4 h-4" />, slug: "salgados" },
    { name: "Doces Especiais", icon: <Candy className="w-4 h-4" />, slug: "doces-especiais" },
  ];

  const handleChange = (slug: string) => {
    setSelectedCategory(slug);
    console.log("Selected category:", slug);
    // If you want to filter products dynamically, implement here
  };

  return (
    <div className="w-full">
      {/* Hardcoded Categories */}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map((product) => (
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