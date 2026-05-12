"use client";

import { ShippingFormInputs, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, MapPin, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const inputClass =
  "w-full rounded-xl border border-pink-100 bg-white px-4 py-3 pl-11 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-pink-300 focus:border-pink-400 focus:ring-4 focus:ring-pink-100";

const labelClass = "text-sm font-semibold text-pink-700";

const errorClass = "mt-1 text-xs font-medium text-red-500";

const fieldWrapperClass = "flex flex-col gap-1.5";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      className="w-full rounded-2xl bg-white p-4 shadow-sm ring-1 ring-pink-100 sm:p-6 md:p-8"
      onSubmit={handleSubmit(handleShippingForm)}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Dados de Entrega
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Preencha os seus dados para continuarmos com a encomenda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* NOME */}
        <div className={fieldWrapperClass}>
          <label htmlFor="name" className={labelClass}>
            Nome Completo
          </label>

          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
            <input
              className={inputClass}
              type="text"
              id="name"
              placeholder="Amila Vanimal"
              autoComplete="name"
              {...register("name")}
            />
          </div>

          {errors.name && (
            <p className={errorClass}>{errors.name.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className={fieldWrapperClass}>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
            <input
              className={inputClass}
              type="email"
              id="email"
              placeholder="amila@email.com"
              autoComplete="email"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className={errorClass}>{errors.email.message}</p>
          )}
        </div>

        {/* TELEFONE */}
        <div className={fieldWrapperClass}>
          <label htmlFor="phone" className={labelClass}>
            Telemóvel
          </label>

          <div className="relative">
            <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
            <input
              className={inputClass}
              type="tel"
              id="phone"
              placeholder="85 810 1053"
              autoComplete="tel"
              inputMode="tel"
              {...register("phone")}
            />
          </div>

          {errors.phone && (
            <p className={errorClass}>{errors.phone.message}</p>
          )}
        </div>

        {/* CIDADE */}
        <div className={fieldWrapperClass}>
          <label htmlFor="city" className={labelClass}>
            Cidade
          </label>

          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
            <input
              className={inputClass}
              type="text"
              id="city"
              placeholder="Maputo"
              autoComplete="address-level2"
              {...register("city")}
            />
          </div>

          {errors.city && (
            <p className={errorClass}>{errors.city.message}</p>
          )}
        </div>

        {/* MORADA */}
        <div className={`${fieldWrapperClass} md:col-span-2`}>
          <label htmlFor="address" className={labelClass}>
            Morada
          </label>

          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
            <input
              className={inputClass}
              type="text"
              id="address"
              placeholder="Av. 25 de Setembro, Nº 10"
              autoComplete="street-address"
              {...register("address")}
            />
          </div>

          {errors.address && (
            <p className={errorClass}>{errors.address.message}</p>
          )}
        </div>
      </div>

      {/* BOTÃO CONTINUAR */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-200 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
      >
        {isSubmitting ? "A processar..." : "Continuar"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
};

export default ShippingForm;