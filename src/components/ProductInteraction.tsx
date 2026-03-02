"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const { addToCart } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [currentSize, setCurrentSize] = useState(selectedSize);
  const [currentFlavor, setCurrentFlavor] = useState(selectedFlavor);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedSize: currentSize,
      selectedFlavor: currentFlavor,
    });

    toast.success("Produto adicionado ao carrinho 🍰");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart?step=2");
  };

  return (
    <div className="flex flex-col gap-6 mt-4">

      {/* TAMANHO */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-pink-600 font-medium">Peso / Porção</span>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setCurrentSize(size)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition whitespace-nowrap
                ${
                  currentSize === size
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white text-pink-600 border-pink-200 hover:bg-pink-50"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* SABOR */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-pink-600 font-medium">Sabor</span>

        <div className="flex items-center gap-3">
          {product.colors.map((flavor) => (
            <button
              key={flavor}
              onClick={() => setCurrentFlavor(flavor)}
              className={`w-8 h-8 rounded-full border-2 transition
                ${
                  currentFlavor === flavor
                    ? "border-pink-600 scale-110"
                    : "border-pink-200"
                }`}
              style={{ backgroundColor: flavor }}
            />
          ))}
        </div>
      </div>

      {/* QUANTIDADE */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-pink-600 font-medium">Quantidade</span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            className="w-9 h-9 border border-pink-200 rounded-md hover:bg-pink-50 transition flex items-center justify-center"
          >
            <Minus className="w-4 h-4 text-pink-600" />
          </button>

          <span className="text-pink-600 font-semibold w-6 text-center">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 border border-pink-200 rounded-md hover:bg-pink-50 transition flex items-center justify-center"
          >
            <Plus className="w-4 h-4 text-pink-600" />
          </button>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition"
        >
          <Plus className="w-4 h-4" />
          Adicionar ao Carrinho
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 border border-pink-200 hover:bg-pink-50 text-pink-600 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition"
        >
          <ShoppingCart className="w-4 h-4" />
          Comprar Agora
        </button>
      </div>
    </div>
  );
};

export default ProductInteraction;