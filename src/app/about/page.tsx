"use client";

import Image from "next/image";

const portfolioImages = [
  "/cake.jpg",
  "/cake.jpg",
  "/cake.jpg",
  "/cake.jpg",
  "/cake.jpg",
  "/cake.jpg",
  "/cake.jpg",
  "/cake.jpg",
];

export default function AboutPage() {
  return (
    <div className="space-y-16 px-4 md:px-12 lg:px-24 py-12 max-w-7xl mx-auto">
      {/* HEADER */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600">
          Amy Sabores & Cakes
        </h1>
        <p className="text-gray-700 text-lg md:text-xl">
          Doces momentos, doces sabores! 🧁
        </p>
        <p className="text-gray-500">
          Halal | Atendimento: Segunda a Sábado | Doces e Salgados | Sabor que apaixona
        </p>
      </header>

      {/* SOBRE NÓS */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-pink-600">Sobre a Amy Sabores & Cakes</h2>
          <p className="text-gray-700 leading-relaxed">
            Amy Sabores & Cakes é uma confeitaria artesanal dedicada a criar doces e salgados que transformam cada momento em uma experiência inesquecível. A nossa paixão é combinar sabores autênticos com criatividade, oferecendo produtos de alta qualidade para todas as ocasiões.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Encomendas abertas: 858101053 ☎️ | Instagram: <a href="https://www.instagram.com/amila.vanimal_" className="text-pink-600 underline">@amila.vanimal_</a>
          </p>
        </div>
        <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/logo-b.jpg"
            alt="Amy Sabores & Cakes Loja"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* MISSÃO, VISÃO, VALORES */}
      <section className="space-y-12 text-center">
        <h2 className="text-3xl font-semibold text-pink-600">Missão, Visão e Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl text-pink-600 mb-2">Missão</h3>
            <p className="text-gray-700">
              Criar doces e salgados que tragam alegria e momentos memoráveis aos nossos clientes, com qualidade, amor e atenção ao detalhe.
            </p>
          </div>
          <div className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl text-pink-600 mb-2">Visão</h3>
            <p className="text-gray-700">
              Tornar-se referência em confeitaria artesanal em Moçambique, reconhecida pelo sabor único e criatividade nos produtos.
            </p>
          </div>
          <div className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl text-pink-600 mb-2">Valores</h3>
            <p className="text-gray-700">
              Paixão, qualidade, atenção aos detalhes, respeito pelos clientes e compromisso com produtos frescos e saborosos.
            </p>
          </div>
        </div>
      </section>

      {/* MEET AMILA */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/ceo.webp"
            alt="Amila - Baker"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-pink-600">Conheça a Amila</h2>
          <p className="text-gray-700 leading-relaxed">
            Amila é a talentosa cake designer por trás da Amy Sabores & Cakes. Com anos de experiência e um amor genuíno pela confeitaria, ela transforma cada bolo, cupcake e brigadeiro em uma verdadeira obra de arte. Sua dedicação e criatividade garantem que cada produto seja único e delicioso.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Desde bolos de aniversário até doces gourmet para eventos especiais, Amila coloca o coração em cada detalhe, garantindo experiências doces e memoráveis para todos os clientes.
          </p>
        </div>
      </section>

      {/* PORTFÓLIO / GALERIA */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-pink-600 text-center">Portfólio</h2>
        <p className="text-gray-700 text-center max-w-2xl mx-auto">
          Uma seleção dos nossos melhores trabalhos. Cada criação é feita com cuidado e dedicação para tornar seus momentos ainda mais especiais.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {portfolioImages.map((img, idx) => (
            <div key={idx} className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
              <Image src={img} alt={`Portfólio ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}