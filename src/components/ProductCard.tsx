"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productOptions, setProductOptions] = useState({
    size: product.sizes[0],
    flavor: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleProductOption = ({
    type,
    value,
  }: {
    type: "size" | "flavor";
    value: string;
  }) => {
    setProductOptions((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productOptions.size,
      selectedFlavor: productOptions.flavor,
    });

    toast.success("Adicionado ao carrinho 🍰");
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-pink-50">
          <Image
            src={product.images[productOptions.flavor]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-pink-600 shadow-sm backdrop-blur">
            MZN {product.price.toFixed(2)}
          </div>
        </div>
      </Link>

      {/* PRODUCT DETAIL */}
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="flex-1">
          <Link href={`/products/${product.id}`}>
            <h3 className="line-clamp-1 text-base font-bold text-gray-900 transition hover:text-pink-600">
              {product.name}
            </h3>
          </Link>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            {product.shortDescription}
          </p>
        </div>

        {/* PRODUCT OPTIONS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* SIZE */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`size-${product.id}`}
              className="text-xs font-semibold text-pink-700"
            >
              Peso / Porção
            </label>

            <select
              id={`size-${product.id}`}
              name="size"
              value={productOptions.size}
              className="w-full rounded-xl border border-pink-100 bg-pink-50/50 px-3 py-2.5 text-sm font-medium text-gray-700 outline-none transition-all focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
              onChange={(e) =>
                handleProductOption({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* FLAVOR */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-pink-700">Sabor</span>

            <div className="flex min-h-[42px] flex-wrap items-center gap-2">
              {product.colors.map((flavor) => {
                const isActive = productOptions.flavor === flavor;

                return (
                  <button
                    key={flavor}
                    type="button"
                    aria-label={`Selecionar sabor ${flavor}`}
                    onClick={() =>
                      handleProductOption({ type: "flavor", value: flavor })
                    }
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-pink-600 shadow-md shadow-pink-100"
                        : "border-pink-100 hover:scale-105 hover:border-pink-300"
                    }`}
                    style={{ backgroundColor: flavor }}
                  >
                    {isActive && (
                      <Check className="h-3.5 w-3.5 text-white drop-shadow" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PRICE AND ADD TO CART BUTTON */}
        <div className="mt-auto flex flex-col gap-3 border-t border-pink-50 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs text-gray-400">Preço</span>
            <p className="text-lg font-bold text-gray-900">
              MZN {product.price.toFixed(2)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg sm:w-auto"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;