"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedFlavor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedFlavor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const handleOptionChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedFlavor,
    });
    toast.success("Produto adicionado ao carrinho 🍰");
  };

  return (
    <div className="flex flex-col gap-6 mt-4">

      {/* TAMANHO / PORÇÃO */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-pink-600 font-medium">Peso / Porção</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleOptionChange("size", size)}
              className={`w-10 h-10 flex items-center justify-center rounded-md border transition font-medium
                ${selectedSize === size
                  ? "bg-pink-600 text-white border-pink-600"
                  : "bg-white text-pink-600 border-pink-200 hover:bg-pink-50"}`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* SABOR */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-pink-600 font-medium">Sabor</span>
        <div className="flex items-center gap-2">
          {product.colors.map((flavor) => (
            <button
              key={flavor}
              onClick={() => handleOptionChange("flavor", flavor)}
              className={`w-8 h-8 rounded-full border-2 transition 
                ${selectedFlavor === flavor ? "border-pink-600" : "border-pink-200"}`}
              style={{ backgroundColor: flavor }}
            />
          ))}
        </div>
      </div>

      {/* QUANTIDADE */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-pink-600 font-medium">Quantidade</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange("decrement")}
            className="flex items-center justify-center w-8 h-8 border border-pink-200 rounded-md hover:bg-pink-50 transition"
          >
            <Minus className="w-4 h-4 text-pink-600" />
          </button>
          <span className="w-6 text-center font-medium text-pink-600">{quantity}</span>
          <button
            onClick={() => handleQuantityChange("increment")}
            className="flex items-center justify-center w-8 h-8 border border-pink-200 rounded-md hover:bg-pink-50 transition"
          >
            <Plus className="w-4 h-4 text-pink-600" />
          </button>
        </div>
      </div>

      {/* BOTÕES DE AÇÃO */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition"
        >
          <Plus className="w-4 h-4" />
          Adicionar ao Carrinho
        </button>
        <button className="flex-1 border border-pink-200 hover:bg-pink-50 text-pink-600 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition">
          <ShoppingCart className="w-4 h-4" />
          Comprar Agora
        </button>
      </div>
    </div>
  );
};

export default ProductInteraction;