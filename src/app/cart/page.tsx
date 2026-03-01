"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/stores/cartStore";
import { ShippingFormInputs } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Definimos as etapas do carrinho
const steps = [
  { id: 1, title: "Carrinho" },
  { id: 2, title: "Morada" },
  { id: 3, title: "Pagamento" },
];

const CartPage = () => {
  return (
    <div className="flex flex-col gap-10 items-center mt-12 px-4">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold text-pink-700">
          🛒 O Seu Carrinho
        </h1>
        <p className="text-sm text-gray-500">
          Doces momentos começam aqui ✨
        </p>
      </div>

      {/* Conteúdo do carrinho em componente filho Client Component */}
      <CartContent />
    </div>
  );
};

export default CartPage;

// -----------------------
// Componente Client Component que usa hooks do cliente
// -----------------------
const CartContent = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const { cart, removeFromCart } = useCartStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.1;
  const shipping = subtotal > 0 ? 150 : 0;
  const total = subtotal - discount + shipping;

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-7/12 bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col gap-8">
        {activeStep === 1 ? (
          cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id + item.selectedSize + item.selectedFlavor}
                className="flex flex-col sm:flex-row justify-between gap-6 border-b pb-6"
              >
                <div className="flex gap-5">
                  <div className="relative w-28 h-28 bg-pink-50 rounded-xl overflow-hidden">
                    <Image
                      src={item.images[item.selectedFlavor]}
                      alt={item.name}
                      fill
                      className="object-contain p-3"
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Quantidade: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Tamanho: {item.selectedSize}
                      </p>
                    </div>

                    <p className="text-pink-600 font-semibold">
                      MZN {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item)}
                  className="self-start sm:self-center bg-red-50 hover:bg-red-100 transition p-2 rounded-full text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              O seu carrinho está vazio 🍰
            </div>
          )
        ) : activeStep === 2 ? (
          <ShippingForm setShippingForm={setShippingForm} />
        ) : activeStep === 3 && shippingForm ? (
          <PaymentForm />
        ) : (
          <p className="text-sm text-gray-500">Por favor, preencha a morada de envio.</p>
        )}
      </div>

      {/* RIGHT SIDE SUMMARY */}
      <div className="w-full lg:w-5/12 bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col gap-6 h-fit">
        <h2 className="text-lg font-semibold text-gray-800">Resumo do Pedido</h2>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <p className="text-gray-500">Subtotal</p>
            <p>MZN {subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-green-600">
            <p>Desconto (10%)</p>
            <p>- MZN {discount.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-500">Envio</p>
            <p>MZN {shipping.toFixed(2)}</p>
          </div>

          <hr />

          <div className="flex justify-between font-semibold text-base">
            <p>Total</p>
            <p className="text-pink-600">MZN {total.toFixed(2)}</p>
          </div>
        </div>

        {activeStep === 1 && cart.length > 0 && (
          <button
            onClick={() => router.push("/cart?step=2", { scroll: false })}
            className="w-full bg-pink-600 hover:bg-pink-700 active:scale-[0.98] transition-all duration-200 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-md"
          >
            Continuar
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};