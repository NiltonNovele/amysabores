import { ProductType } from "@/types";

export const products: ProductType[] = [
  {
    id: 1,
    name: "Bolo folhado",
    shortDescription: "Bolo folhado com creme de manteiga",
    description:
      "Bolo de chocolate artesanal, feito com ingredientes selecionados e recheio de chocolate cremoso. Perfeito para festas e celebrações.",
    price: 600,
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#7B3F00", "#5A2D0C"],
    images: { "#7B3F00": "/products/1.0.jpeg", "#5A2D0C": "/products/1.1.jpeg" },
    category: "bolos",
  },
  {
    id: 2,
    name: "Bolo de chocolate",
    shortDescription: "Bolo de chocolate com brigadeiro e granulado",
    description:
      "Cupcakes artesanais, macios e fofinhos, com cobertura de creme de baunilha e decoração delicada.",
    price: 900,
    sizes: ["Unidade", "Dúzia"],
    colors: ["#F3E5AB", "#FFF2CC"],
    images: { "#F3E5AB": "/products/2.0.jpeg", "#FFF2CC": "/products/2.1.jpeg" },
    category: "cupcakes",
  },
  {
    id: 3,
    name: "Chiffon de Maracujá",
    shortDescription: "Tradicional doce brasileiro em versão gourmet.",
    description:
      "Brigadeiros gourmet feitos com chocolate premium, ideais para festas, lembrancinhas ou presentear.",
    price: 700,
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#3E1F0D", "#5C2A0E"],
    images: { "#3E1F0D": "/products/3.jpeg", "#5C2A0E": "/products/3.jpeg" },
    category: "brigadeiros",
  },
  {
    id: 4,
    name: "Gulabos",
    shortDescription: "Gulabos",
    description:
      "Biscoitos artesanais decorados à mão, ideais para festas, lembranças e presente especial.",
    price: 80,
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#F4D6A0", "#E2B07F"],
    images: { "#F4D6A0": "/products/4.0.jpeg", "#E2B07F": "/products/4.1.jpeg" },
    category: "biscoitos",
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
    category: "bolos",
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
    category: "doces-especiais",
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
    category: "cupcakes",
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
    category: "doces-especiais",
  },
];