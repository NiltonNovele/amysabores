"use client";

import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pedido enviado com sucesso! Entraremos em contacto brevemente.");
    setFormData({ name: "", phone: "", orderType: "", message: "" });
  };

  return (
    <div className="w-full ">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Amy Sabores & Cakes
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Doces momentos, doces sabores! 🧁  
            Doces e Salgados com sabor que apaixona.  
            Encomendas abertas — faça já o seu pedido.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* FORMULÁRIO DE ENCOMENDA */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Faça a sua Encomenda
            </h2>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Número de telefone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
                />

                <input
                  type="text"
                  name="orderType"
                  placeholder="Tipo de encomenda (bolo, salgados, cupcakes...)"
                  value={formData.orderType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
                />

                <textarea
                  name="message"
                  placeholder="Detalhes da encomenda"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
                />
              </div>

              <button
                type="submit"
                className="mt-2 bg-linear-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 shadow-md"
              >
                Enviar Pedido
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* LADO DIREITO */}
          <div className="flex flex-col gap-10">

            {/* INFORMAÇÕES */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Informações
              </h2>

              <div className="flex flex-col gap-5 text-gray-700 text-sm md:text-base">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-900" />
                  Atendimento: Segunda a Sábado
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-900" />
                  858101053
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-900" />
                  Pedido via Instagram: @sabores_amy
                </div>

                <div className="flex items-center gap-3">
                  🧁 Produtos Halal
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Perguntas Frequentes
              </h2>

              <div className="flex flex-col gap-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-800 text-sm md:text-base">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {openIndex === index && (
                      <p className="mt-3 text-gray-600 text-sm">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;