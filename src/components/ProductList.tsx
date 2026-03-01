import { ProductsType } from "@/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";

// TEMPORARY products for Amila Sabores & Cakes in MZN
const products: ProductsType = [
  {
    id: 1,
    name: "Bolo de Chocolate",
    shortDescription: "Delicioso bolo de chocolate com cobertura cremosa.",
    description:
      "Bolo de chocolate artesanal, feito com ingredientes selecionados e recheio de chocolate cremoso. Perfeito para festas e celebrações.",
    price: 7680, // 120 USD * 64 ≈ 7680 MZN
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#7B3F00", "#5A2D0C"], 
    images: {
      "#7B3F00": "/products/1g.png",
      "#5A2D0C": "/products/1p.png",
    },
  },
  {
    id: 2,
    name: "Cupcake de Baunilha",
    shortDescription: "Mini cupcake fofinho com cobertura de baunilha.",
    description:
      "Cupcakes artesanais, macios e fofinhos, com cobertura de creme de baunilha e decoração delicada.",
    price: 1600, // 25 USD * 64 ≈ 1600 MZN
    sizes: ["Unidade", "Dúzia"],
    colors: ["#F3E5AB", "#FFF2CC"],
    images: {
      "#F3E5AB": "/products/2g.png",
      "#FFF2CC": "/products/2gr.png",
    },
  },
  {
    id: 3,
    name: "Brigadeiro Gourmet",
    shortDescription: "Tradicional doce brasileiro em versão gourmet.",
    description:
      "Brigadeiros gourmet feitos com chocolate premium, ideais para festas, lembrancinhas ou presentear.",
    price: 350, // 5.5 USD * 64 ≈ 350 MZN
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#3E1F0D", "#5C2A0E"],
    images: {
      "#3E1F0D": "/products/3gr.png",
      "#5C2A0E": "/products/3b.png",
    },
  },
  {
    id: 4,
    name: "Biscoitos Decorados",
    shortDescription: "Biscoitos crocantes com decorações personalizadas.",
    description:
      "Biscoitos artesanais decorados à mão, ideais para festas, lembranças e presente especial.",
    price: 510, // 8 USD * 64 ≈ 510 MZN
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#F4D6A0", "#E2B07F"],
    images: {
      "#F4D6A0": "/products/4w.png",
      "#E2B07F": "/products/4p.png",
    },
  },
  {
    id: 5,
    name: "Bolo Red Velvet",
    shortDescription: "Clássico bolo Red Velvet com creme de queijo.",
    description:
      "Bolo Red Velvet macio, feito artesanalmente, com camadas de creme de queijo e cobertura delicada.",
    price: 9600, // 150 USD * 64 ≈ 9600 MZN
    sizes: ["Médio", "Grande"],
    colors: ["#C11B17", "#A1120B"],
    images: {
      "#C11B17": "/products/5r.png",
      "#A1120B": "/products/5o.png",
    },
  },
  {
    id: 6,
    name: "Mini Cheesecakes",
    shortDescription: "Cheesecakes individuais com sabores variados.",
    description:
      "Mini cheesecakes delicados, feitos artesanalmente em sabores como morango, chocolate e maracujá.",
    price: 1150, // 18 USD * 64 ≈ 1150 MZN
    sizes: ["Unidade", "Dúzia"],
    colors: ["#F9E79F", "#D6AEDD"],
    images: {
      "#F9E79F": "/products/6g.png",
      "#D6AEDD": "/products/6w.png",
    },
  },
  {
    id: 7,
    name: "Cupcake de Morango",
    shortDescription: "Cupcake fofinho com creme e morango fresco.",
    description:
      "Cupcakes de morango artesanais com cobertura de creme e pedaços de morango fresco.",
    price: 1920, // 30 USD * 64 ≈ 1920 MZN
    sizes: ["Unidade", "Dúzia"],
    colors: ["#F28DA3", "#E75480"],
    images: {
      "#F28DA3": "/products/7g.png",
      "#E75480": "/products/7p.png",
    },
  },
  {
    id: 8,
    name: "Trufas Sortidas",
    shortDescription: "Caixa de trufas gourmet com sabores variados.",
    description:
      "Trufas artesanais gourmet, com sabores de chocolate ao leite, branco e meio amargo, perfeitas para presentear.",
    price: 3840, // 60 USD * 64 ≈ 3840 MZN
    sizes: ["Caixa 6", "Caixa 12"],
    colors: ["#7D3C98", "#1F618D"],
    images: {
      "#7D3C98": "/products/8b.png",
      "#1F618D": "/products/8gr.png",
    },
  },
];

const ProductList = ({
  category,
  params,
}: {
  category: string;
  params: "homepage" | "products";
}) => {
  return (
    <div className="w-full">
      <Categories />
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