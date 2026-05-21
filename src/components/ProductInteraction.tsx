"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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

  const totalPrice = useMemo(() => {
    return product.price * quantity;
  }, [product.price, quantity]);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

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
    <div className="flex w-full flex-col gap-6 rounded-3xl border border-pink-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-sm font-bold text-pink-700">
            Peso / Porção
          </span>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Escolha o tamanho ideal para a sua encomenda.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => {
            const isActive = currentSize === size;

            return (
              <button
                key={size}
                type="button"
                onClick={() => setCurrentSize(size)}
                className={`rounded-xl border px-4 py-2 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "border-pink-600 bg-pink-600 text-white shadow-md shadow-pink-100"
                    : "border-pink-100 bg-pink-50/50 text-pink-600 hover:border-pink-300 hover:bg-white"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <span className="text-sm font-bold text-pink-700">
            Variação
          </span>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Selecione a variação desejada para este produto.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {product.colors.map((flavor) => {
            const isActive = currentFlavor === flavor;

            return (
              <button
                key={flavor}
                type="button"
                onClick={() => setCurrentFlavor(flavor)}
                aria-label={`Selecionar variação ${flavor}`}
                className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "scale-110 border-pink-600 shadow-md shadow-pink-100"
                    : "border-pink-100 hover:scale-105 hover:border-pink-300"
                }`}
                style={{ backgroundColor: flavor }}
              >
                {isActive && (
                  <Check className="h-4 w-4 text-white drop-shadow" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <span className="text-sm font-bold text-pink-700">
            Quantidade
          </span>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Ajuste a quantidade que deseja adicionar ao carrinho.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-fit items-center overflow-hidden rounded-xl border border-pink-100 bg-pink-50/60">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="flex h-11 w-11 items-center justify-center text-pink-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="flex h-11 min-w-12 items-center justify-center border-x border-pink-100 bg-white px-4 text-sm font-black text-pink-700">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              className="flex h-11 w-11 items-center justify-center text-pink-600 transition hover:bg-white"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-2xl bg-pink-50 px-4 py-3">
            <span className="text-xs text-gray-500">Total selecionado</span>
            <p className="text-lg font-black text-pink-600">
              MZN {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 border-t border-pink-50 pt-5 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Adicionar ao Carrinho
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-pink-200 bg-white px-5 py-3.5 text-sm font-semibold text-pink-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-50"
        >
          <ShoppingCart className="h-4 w-4" />
          Comprar Agora
        </button>
      </div>
    </div>
  );
};

export default ProductInteraction;