"use client";

import ProductList from "./ProductList";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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
    ctaLink: "/products/?category=bolos",
    ctaLabel: "Comprar Agora",
  },
  {
    id: 2,
    image: "/banner20.jpg",
    title: "Cupcakes Criativos",
    description:
      "Sabores únicos e cores vibrantes para qualquer ocasião especial.",
    ctaLink: "/products/?category=cupcakes",
    ctaLabel: "Ver Mais",
  },
  {
    id: 3,
    image: "/banner3.webp",
    title: "Brigadeiros Gourmet",
    description: "Pequenas delícias que tornam cada momento inesquecível.",
    ctaLink: "/products/?category=brigadeiros",
    ctaLabel: "Comprar Agora",
  },
];

interface ClientHomepageProps {
  category?: string;
}

const ClientHomepage = ({ category }: ClientHomepageProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredSlides.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
  };

  return (
    <div className="space-y-12">
      {/* HERO SLIDER */}
      <section className="relative overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[3/1]">
          {featuredSlides.map((slide, idx) => {
            const isActive = idx === currentSlide;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  isActive
                    ? "z-10 opacity-100 scale-100"
                    : "z-0 opacity-0 scale-105"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black/75 lg:via-black/35 lg:to-transparent" />

                <div className="absolute inset-0 flex items-end px-5 pb-8 sm:px-8 sm:pb-10 lg:items-center lg:px-14 lg:pb-0">
                  <div className="max-w-xl text-center text-white sm:text-left">
                    <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur sm:mx-0">
                      <Sparkles className="h-3.5 w-3.5 text-pink-200" />
                      Amy Sabores
                    </div>

                    <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                      {slide.title}
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/90 sm:mx-0 sm:text-base">
                      {slide.description}
                    </p>

                    <Link
                      href={slide.ctaLink}
                      className="mt-5 inline-flex items-center justify-center rounded-xl bg-pink-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 active:scale-95 sm:text-base"
                    >
                      {slide.ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* CONTROLS */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Slide anterior"
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md backdrop-blur transition-all duration-300 hover:bg-white hover:text-pink-600 active:scale-95 sm:left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Próximo slide"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md backdrop-blur transition-all duration-300 hover:bg-white hover:text-pink-600 active:scale-95 sm:right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* DOTS */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {featuredSlides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Ir para slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-8 bg-pink-500"
                    : "w-2.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT LIST */}
      <ProductList category={category || ""} params="homepage" />
    </div>
  );
};

export default ClientHomepage;