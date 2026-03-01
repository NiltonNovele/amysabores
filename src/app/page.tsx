"use client";

import ProductList from "@/components/ProductList";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Slides da homepage
type FeaturedSlide = {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaLink: string;
  ctaLabel: string;
};

const featuredSlides: FeaturedSlide[] = [
  {
    id: 1,
    image: "/banner1.webp",
    title: "Bolos Artesanais",
    description:
      "Deliciosos bolos feitos com ingredientes frescos e muito amor.",
    ctaLink: "/produtos/?category=bolos",
    ctaLabel: "Comprar Agora",
  },
  {
    id: 2,
    image: "/banner20.jpg",
    title: "Cupcakes Criativos",
    description:
      "Sabores únicos e cores vibrantes para qualquer ocasião especial.",
    ctaLink: "/produtos/?category=cupcakes",
    ctaLabel: "Ver Mais",
  },
  {
    id: 3,
    image: "/banner3.webp",
    title: "Brigadeiros Gourmet",
    description:
      "Pequenas delícias que tornam cada momento inesquecível.",
    ctaLink: "/produtos/?category=brigadeiros",
    ctaLabel: "Comprar Agora",
  },
];

interface HomepageProps {
  category?: string;
}

// Componente principal
const Homepage = ({ category }: HomepageProps) => {
  return (
    <div className="space-y-12">
      <HomepageContent category={category} />
    </div>
  );
};

export default Homepage;

// ------------------------
// Client Component para conteúdo interativo
// ------------------------
const HomepageContent = ({ category }: HomepageProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide(
      currentSlide === 0 ? featuredSlides.length - 1 : currentSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % featuredSlides.length);
  };

  return (
    <>
      {/* SLIDESHOW */}
      <div className="bg-white relative w-full aspect-video md:aspect-3/1 overflow-hidden rounded-2xl shadow-lg">
        {featuredSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

            {/* Conteúdo */}
            <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-center md:items-start text-center md:text-left px-5 md:px-12 pb-8 md:pb-0 text-white space-y-3 md:space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight max-w-lg">
                {slide.title}
              </h2>

              <p className="text-xs sm:text-sm md:text-base max-w-md opacity-90">
                {slide.description}
              </p>

              <Link
                href={slide.ctaLink}
                className="mt-2 md:mt-0 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all duration-200 px-5 py-2.5 rounded-lg text-sm md:text-base font-semibold shadow-md"
              >
                {slide.ctaLabel}
              </Link>
            </div>
          </div>
        ))}

        {/* Navegação */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-white/70 hover:bg-white/90 active:scale-95 rounded-full p-3 md:p-2 shadow-md transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-white/70 hover:bg-white/90 active:scale-95 rounded-full p-3 md:p-2 shadow-md transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
                idx === currentSlide ? "bg-pink-600 scale-110" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* PRODUCT LIST */}
      <ProductList category={category || ""} params="homepage" />
    </>
  );
};