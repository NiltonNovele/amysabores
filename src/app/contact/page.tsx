"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Instagram,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";

const faqs = [
  {
    question: "Como faço uma encomenda?",
    answer:
      "Pode fazer a sua encomenda através do número 858101053 ou enviando mensagem direta no Instagram.",
  },
  {
    question: "Quais são os dias de atendimento?",
    answer:
      "Atendemos de Segunda a Sábado. Não trabalhamos aos domingos.",
  },
  {
    question: "Os produtos são Halal?",
    answer:
      "Sim! Todos os nossos produtos são preparados seguindo os princípios Halal.",
  },
];

const inputClass =
  "w-full rounded-2xl border border-pink-100 bg-white px-4 py-3.5 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-100";

const ContactPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    orderType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert(
      "Pedido enviado com sucesso! Entraremos em contacto brevemente."
    );

    setFormData({
      name: "",
      phone: "",
      orderType: "",
      message: "",
    });
  };

  return (
    <div className="bg-white">
      {/* HERO */}
      {/* <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-rose-100" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10 lg:py-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-pink-600 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Amy Sabores & Cakes
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Faça a sua
            <span className="block text-pink-600">
              encomenda connosco ✨
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            Doces e salgados preparados com carinho para tornar os seus
            momentos ainda mais especiais.
          </p>
        </div>
      </section> */}

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* FORM */}
          <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-xl shadow-pink-100/30 sm:p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-900">
                Faça a sua Encomenda
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Preencha o formulário abaixo e entraremos em contacto para
                confirmar os detalhes do seu pedido.
              </p>
            </div>

            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Número de telefone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="text"
                name="orderType"
                placeholder="Tipo de encomenda (bolo, cupcakes, salgados...)"
                value={formData.orderType}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <textarea
                name="message"
                placeholder="Descreva os detalhes da sua encomenda..."
                value={formData.message}
                onChange={handleChange}
                required
                className={`${inputClass} h-36 resize-none`}
              />

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
              >
                Enviar Pedido
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-8">
            {/* INFO CARD */}
            <div className="rounded-[2rem] border border-pink-100 bg-white p-8 shadow-xl shadow-pink-100/20">
              <h2 className="text-3xl font-black text-gray-900">
                Informações
              </h2>

              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                    <Clock className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Horário
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Segunda a Sábado
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Contacto
                    </p>

                    <Link
                      href="tel:+258858101053"
                      className="mt-1 block text-sm leading-6 text-gray-600 transition hover:text-pink-600"
                    >
                      85 810 1053
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                    <Instagram className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Instagram
                    </p>

                    <Link
                      href="https://instagram.com/sabores_amy"
                      target="_blank"
                      className="mt-1 block text-sm leading-6 text-gray-600 transition hover:text-pink-600"
                    >
                      @sabores_amy
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border border-pink-100 bg-pink-50/60 p-5">
                  <p className="text-sm font-medium leading-7 text-gray-700">
                    🧁 Todos os nossos produtos seguem princípios Halal e
                    são preparados com ingredientes frescos e de qualidade.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="rounded-[2rem] border border-pink-100 bg-white p-8 shadow-xl shadow-pink-100/20">
              <h2 className="text-3xl font-black text-gray-900">
                Perguntas Frequentes
              </h2>

              <div className="mt-8 flex flex-col gap-4">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={index}
                      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isOpen
                          ? "border-pink-300 bg-pink-50/50"
                          : "border-pink-100 bg-white"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenIndex(isOpen ? null : index)
                        }
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                      >
                        <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                          {faq.question}
                        </h3>

                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-pink-600 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 text-sm leading-7 text-gray-600">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-[2rem] bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-white shadow-xl">
              <h3 className="text-2xl font-black">
                Vamos criar algo delicioso juntos 🍰
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/90">
                Entre em contacto connosco para bolos personalizados,
                eventos especiais, cupcakes, brigadeiros e muito mais.
              </p>

              <Link
                href="tel:+258858101053"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-pink-600 transition-all duration-300 hover:-translate-y-0.5"
              >
                Ligar Agora
                <Phone className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;