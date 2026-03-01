"use client";

import { ShippingFormInputs, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });

  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleShippingForm)}
    >
      {/* NOME */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs text-pink-600 font-medium">
          Nome Completo
        </label>
        <input
          className="border-b border-pink-200 py-2 outline-none text-sm placeholder-pink-300 focus:border-pink-500 focus:ring-0 transition"
          type="text"
          id="name"
          placeholder="Amila van Animal"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-pink-600 font-medium">
          Email
        </label>
        <input
          className="border-b border-pink-200 py-2 outline-none text-sm placeholder-pink-300 focus:border-pink-500 focus:ring-0 transition"
          type="email"
          id="email"
          placeholder="amila@email.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* TELEFONE */}
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs text-pink-600 font-medium">
          Telemóvel
        </label>
        <input
          className="border-b border-pink-200 py-2 outline-none text-sm placeholder-pink-300 focus:border-pink-500 focus:ring-0 transition"
          type="text"
          id="phone"
          placeholder="85 810 1053"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* MORADA */}
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs text-pink-600 font-medium">
          Morada
        </label>
        <input
          className="border-b border-pink-200 py-2 outline-none text-sm placeholder-pink-300 focus:border-pink-500 focus:ring-0 transition"
          type="text"
          id="address"
          placeholder="Av. 25 de Setembro, Nº 10"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* CIDADE */}
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs text-pink-600 font-medium">
          Cidade
        </label>
        <input
          className="border-b border-pink-200 py-2 outline-none text-sm placeholder-pink-300 focus:border-pink-500 focus:ring-0 transition"
          type="text"
          id="city"
          placeholder="Maputo"
          {...register("city")}
        />
        {errors.city && (
          <p className="text-xs text-red-500">{errors.city.message}</p>
        )}
      </div>

      {/* BOTÃO CONTINUAR */}
      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
      >
        Continuar
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

export default ShippingForm;