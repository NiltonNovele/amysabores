import { ProductType } from "@/types";

export const products: ProductType[] = [
  {
    id: 1,
    name: "Bolo Folhado",
    shortDescription: "Bolo folhado com creme suave e textura delicada.",
    description:
      "Um bolo artesanal em camadas, preparado com massa folhada leve e creme de manteiga suave. Ideal para aniversários, encontros familiares e momentos especiais.",
    price: 600,
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#7B3F00", "#5A2D0C"],
    images: {
      "#7B3F00": "/products/1.0.jpeg",
      "#5A2D0C": "/products/1.1.jpeg",
    },
    category: "bolos",
    badge: "Artesanal",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Bolo de Chocolate",
    shortDescription: "Bolo de chocolate com brigadeiro e granulado.",
    description:
      "Bolo de chocolate macio, recheado e coberto com brigadeiro cremoso. Uma escolha perfeita para quem ama sabores intensos e doces clássicos.",
    price: 900,
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#F3E5AB", "#FFF2CC"],
    images: {
      "#F3E5AB": "/products/2.0.jpeg",
      "#FFF2CC": "/products/2.1.jpeg",
    },
    category: "bolos",
    badge: "Mais pedido",
    isFeatured: true,
  },
  // {
  //   id: 3,
  //   name: "Chiffon de Maracujá",
  //   shortDescription: "Bolo leve com sabor tropical de maracujá.",
  //   description:
  //     "Chiffon fofo e delicado com toque refrescante de maracujá. Perfeito para quem procura um bolo leve, aromático e equilibrado.",
  //   price: 700,
  //   sizes: ["Pequeno", "Médio", "Grande"],
  //   colors: ["#3E1F0D", "#5C2A0E"],
  //   images: {
  //     "#3E1F0D": "/products/3.jpeg",
  //     "#5C2A0E": "/products/3.jpeg",
  //   },
  //   category: "bolos",
  //   badge: "Especial",
  // },
  {
    id: 4,
    name: "Gulabos",
    shortDescription: "Doces tradicionais com sabor caseiro.",
    description:
      "Gulabos preparados com carinho, textura macia e sabor tradicional. Ideais para acompanhar chá, eventos ou oferecer como mimo.",
    price: 80,
    sizes: ["Unidade", "Meia Dúzia", "Dúzia"],
    colors: ["#F4D6A0", "#E2B07F"],
    images: {
      "#F4D6A0": "/products/4.0.jpeg",
      "#E2B07F": "/products/4.1.jpeg",
    },
    category: "doces-especiais",
  },
  {
    id: 5,
    name: "Bolo Individual",
    shortDescription: "Bolo individual de chocolate.",
    description:
      "Bolo individual perfeito para uma sobremesa rápida, presente especial ou momento doce durante o dia. Feito com massa macia e sabor marcante.",
    price: 175,
    sizes: ["Unidade", "Caixa 4", "Caixa 6"],
    colors: ["#C11B17", "#A1120B"],
    images: {
      "#C11B17": "/products/5.0.jpeg",
      "#A1120B": "/products/5.0.jpeg",
    },
    category: "bolos",
  },
  {
    id: 6,
    name: "Orelhudos",
    shortDescription: "Doce especial com apresentação delicada.",
    description:
      "Orelhudos preparados artesanalmente, ideais para festas, mesas doces e pequenas celebrações. Uma opção simples, bonita e saborosa.",
    price: 700,
    sizes: ["Unidade", "Meia Dúzia", "Dúzia"],
    colors: ["#F9E79F", "#D6AEDD"],
    images: {
      "#F9E79F": "/products/6.0.jpeg",
      "#D6AEDD": "/products/6.0.jpeg",
    },
    category: "doces-especiais",
  },
  {
    id: 7,
    name: "Bolo de Cenoura",
    shortDescription: "Bolo de cenoura com cobertura de chocolate.",
    description:
      "Bolo de cenoura fofinho com cobertura de chocolate cremosa. Um clássico que combina simplicidade, sabor e conforto.",
    price: 750,
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#F28DA3", "#E75480"],
    images: {
      "#F28DA3": "/products/7.0.jpeg",
      "#E75480": "/products/7.0.jpeg",
    },
    category: "bolos",
    isFeatured: true,
  },
  {
    id: 8,
    name: "Mini Bolo",
    shortDescription: "Mini bolo artesanal para pequenos momentos.",
    description:
      "Mini bolo elegante e saboroso, ideal para ofertas, comemorações íntimas ou sobremesa individual com toque especial.",
    price: 150,
    sizes: ["Unidade", "Caixa 6", "Caixa 12"],
    colors: ["#7D3C98", "#1F618D"],
    images: {
      "#7D3C98": "/products/8.0.jpeg",
      "#1F618D": "/products/8.1.jpeg",
    },
    category: "bolos",
  },
  {
    id: 9,
    name: "Bolos Personalizados",
    shortDescription: "Bolos feitos conforme a sua preferência.",
    description:
      "Bolos personalizados para aniversários, eventos, celebrações religiosas e ocasiões especiais. Personalize o tamanho, sabor, cores e decoração.",
    price: 500,
    sizes: ["Pequeno", "Médio", "Grande", "Personalizado"],
    colors: ["#7D3C98", "#1F618D"],
    images: {
      "#7D3C98": "/products/9.0.jpeg",
      "#1F618D": "/products/9.0.jpeg",
    },
    category: "bolos",
    badge: "Personalizável",
    isFeatured: true,
  },
  {
    id: 10,
    name: "Bolo de Chocolate Premium",
    shortDescription: "Bolo de chocolate intenso e elegante.",
    description:
      "Bolo de chocolate premium, preparado com massa rica e cobertura cremosa. Ideal para festas, aniversários e momentos especiais.",
    price: 950,
    sizes: ["Pequeno", "Médio", "Grande"],
    colors: ["#7D3C98", "#1F618D"],
    images: {
      "#7D3C98": "/products/10.0.jpeg",
      "#1F618D": "/products/10.1.jpeg",
    },
    category: "bolos",
    badge: "Premium",
  },
  {
    id: 11,
    name: "Mini Bolo de Cenoura",
    shortDescription: "Mini bolo de cenoura com chocolate.",
    description:
      "Mini bolo de cenoura com cobertura de chocolate, perfeito para lanches, presentes ou pequenas celebrações.",
    price: 150,
    sizes: ["Unidade", "Caixa 6", "Caixa 12"],
    colors: ["#7D3C98", "#1F618D"],
    images: {
      "#7D3C98": "/products/11.0.jpeg",
      "#1F618D": "/products/11.0.jpeg",
    },
    category: "bolos",
  },
  {
    id: 12,
    name: "Bolos de Aniversário",
    shortDescription: "Bolos especiais para celebrar a vida.",
    description:
      "Bolos de aniversário feitos sob encomenda, com decoração personalizada e sabores à escolha. Criados para tornar a celebração ainda mais especial.",
    price: 1800,
    sizes: ["Pequeno", "Médio", "Grande", "Personalizado"],
    colors: ["#7D3C98", "#1F618D"],
    images: {
      "#7D3C98": "/products/12.0.jpeg",
      "#1F618D": "/products/12.0.jpeg",
    },
    category: "bolos",
    badge: "Festas",
  },
];