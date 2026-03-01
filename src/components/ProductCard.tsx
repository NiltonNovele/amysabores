"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
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
    <div className="shadow-lg rounded-xl overflow-hidden bg-white">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[productOptions.flavor]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>

      {/* PRODUCT DETAIL */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-semibold text-gray-800">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>

        {/* PRODUCT OPTIONS */}
        <div className="flex items-center gap-4 text-xs">
          {/* SIZE */}
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-gray-500">Peso / Porção</span>
            <select
              name="size"
              className="ring ring-pink-200 rounded-md px-2 py-1 text-sm"
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
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-gray-500">Sabor</span>
            <div className="flex items-center gap-2">
              {product.colors.map((flavor) => (
                <div
                  key={flavor}
                  className={`cursor-pointer border rounded-full p-[1.5px] ${
                    productOptions.flavor === flavor
                      ? "border-pink-500"
                      : "border-pink-200"
                  }`}
                  onClick={() =>
                    handleProductOption({ type: "flavor", value: flavor })
                  }
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: flavor }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRICE AND ADD TO CART BUTTON */}
        <div className="flex items-center justify-between mt-2">
          <p className="font-medium text-gray-800">MZN {product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="ring-1 ring-pink-200 shadow-md rounded-md px-3 py-1 text-sm cursor-pointer hover:text-white hover:bg-pink-600 transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;