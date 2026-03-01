"use client";

import { PaymentFormInputs, paymentFormSchema } from "@/types";
import { zodResolver } from "@/hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

const PaymentForm = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("mobileMoney");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const router = useRouter();

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {
    console.log("Pagamento submetido:", selectedMethod, data);
    // Aqui você pode integrar o seu backend ou redirecionar após pagamento
  };

  const paymentMethods = [
    { 
      id: "mobileMoney", 
      label: "MPESA | EMOLA | MKESH", 
      icons: ["/mpesa.png", "/emola.png", "/mkesh.png"] 
    },
    { 
      id: "card", 
      label: "Cartão de Crédito/Débito", 
      icons: ["/cards.png", "/stripe.png"] 
    },
    { 
      id: "cash", 
      label: "Dinheiro na Entrega", 
      icons: [] 
    },
  ];

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(handlePaymentForm)}>
      
      {/* MÉTODOS DE PAGAMENTO */}
      <div className="flex flex-col gap-3">
        <p className="font-medium text-gray-700">Escolha o método de pagamento:</p>
        <div className="flex flex-col sm:flex-row gap-2">
          {paymentMethods.map((method) => (
            <button
              type="button"
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md transition flex-1 justify-between ${
                selectedMethod === method.id
                  ? "border-pink-600 bg-pink-50"
                  : "border-pink-200 hover:bg-pink-50"
              }`}
            >
              <span className="text-sm font-medium text-pink-700">{method.label}</span>
              {/* <div className="flex gap-2">
                {method.icons.map((icon) => (
                  <Image key={icon} src={icon} alt={icon} width={40} height={25} className="rounded-sm"/>
                ))}
              </div> */}
            </button>
          ))}
        </div>
      </div>

      {/* CAMPOS DO CARTÃO */}
      {selectedMethod === "card" && (
        <div className="flex flex-col gap-4 border-t border-pink-200 pt-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="cardHolder" className="text-xs text-gray-500 font-medium">
              Nome no cartão
            </label>
            <input
              className="border-b border-pink-200 py-2 outline-none text-sm"
              type="text"
              id="cardHolder"
              placeholder="Amila Sabores"
              {...register("cardHolder")}
            />
            {errors.cardHolder && <p className="text-xs text-red-500">{errors.cardHolder.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cardNumber" className="text-xs text-gray-500 font-medium">
              Número do cartão
            </label>
            <input
              className="border-b border-pink-200 py-2 outline-none text-sm"
              type="text"
              id="cardNumber"
              placeholder="1234 5678 9123 4567"
              {...register("cardNumber")}
            />
            {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber.message}</p>}
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="expirationDate" className="text-xs text-gray-500 font-medium">
                Data de expiração
              </label>
              <input
                className="border-b border-pink-200 py-2 outline-none text-sm"
                type="text"
                id="expirationDate"
                placeholder="01/32"
                {...register("expirationDate")}
              />
              {errors.expirationDate && <p className="text-xs text-red-500">{errors.expirationDate.message}</p>}
            </div>
            <div className="flex flex-col gap-1 w-24">
              <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">
                CVV
              </label>
              <input
                className="border-b border-pink-200 py-2 outline-none text-sm"
                type="text"
                id="cvv"
                placeholder="123"
                {...register("cvv")}
              />
              {errors.cvv && <p className="text-xs text-red-500">{errors.cvv.message}</p>}
            </div>
          </div>
        </div>
      )}

      {/* MENSAGEM CASH ON DELIVERY */}
      {selectedMethod === "cash" && (
        <div className="border-t border-pink-200 pt-4 text-sm text-gray-600">
          Este método será confirmado pela nossa equipa. 
          Aguarde que um dos nossos colaboradores entre em contacto para garantir que receba a sua encomenda.
        </div>
      )}

      {/* ICONES DE PAGAMENTO GERAL */}
      {selectedMethod !== "cash" && (
        <div className="flex items-center gap-2 mt-2">
          {(selectedMethod === "card" ? ["/cards.png", "/stripe.png"] : ["/mpesa.png","/emola.png","/mkesh.png"]).map((icon) => (
            <Image key={icon} src={icon} alt={icon} width={50} height={25} className="rounded-md"/>
          ))}
        </div>
      )}

      {/* BOTÃO FINAL */}
      <button
        type="submit"
        className="w-full bg-pink-600 hover:bg-pink-700 transition-all duration-300 text-white p-3 rounded-lg cursor-pointer flex items-center justify-center gap-2"
      >
        Finalizar Pagamento
        <ShoppingCart className="w-4 h-4"/>
      </button>
    </form>
  );
};

export default PaymentForm;