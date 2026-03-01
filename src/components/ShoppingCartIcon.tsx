"use client";

import useCartStore from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();

  if (!hasHydrated) return null;

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-5 h-5 text-pink-600" />
      <span className="absolute -top-3 -right-3 bg-pink-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium shadow-md">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;