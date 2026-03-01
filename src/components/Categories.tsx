"use client";

import {
  Cake,
  Cookie,
  Candy,
  IceCreamBowl,
  Sandwich,
  ShoppingBasket,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "Todos",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "Bolos",
    icon: <Cake className="w-4 h-4" />,
    slug: "bolos",
  },
  {
    name: "Cupcakes",
    icon: <IceCreamBowl className="w-4 h-4" />,
    slug: "cupcakes",
  },
  {
    name: "Biscoitos",
    icon: <Cookie className="w-4 h-4" />,
    slug: "biscoitos",
  },
  {
    name: "Brigadeiros",
    icon: <Candy className="w-4 h-4" />,
    slug: "brigadeiros",
  },
  {
    name: "Salgados",
    icon: <Sandwich className="w-4 h-4" />,
    slug: "salgados",
  },
  {
    name: "Doces Especiais",
    icon: <Candy className="w-4 h-4" />,
    slug: "doces-especiais",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 bg-pink-50 p-3 rounded-xl mb-6 text-sm shadow-sm">
      {categories.map((category) => {
        const isActive = category.slug === selectedCategory;

        return (
          <div
            key={category.slug}
            onClick={() => handleChange(category.slug)}
            className={`flex items-center justify-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 select-none
              ${
                isActive
                  ? "bg-white shadow-md text-pink-600 font-semibold"
                  : "text-gray-500 hover:bg-white hover:text-pink-600"
              }`}
          >
            {category.icon}
            {category.name}
          </div>
        );
      })}
    </div>
  );
};

export default Categories;