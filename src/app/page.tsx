"use client";

import ProductList from "@/components/ProductList";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    description: "Deliciosos bolos feitos com ingredientes frescos e muito amor.",
    ctaLink: "/products/?category=bolos",
    ctaLabel: "Comprar Agora",
  },
  {
    id: 2,
    image: "/banner20.jpg",
    title: "Cupcakes Criativos",
    description: "Sabores únicos e cores vibrantes para qualquer ocasião especial.",
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

export default function HomePage({ category }: ClientHomepageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? featuredSlides.length - 1 : prev - 1
    );

  const handleNext = () =>
    setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);

  return (
    <div className="space-y-12">
      {/* SLIDER */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-lg aspect-video md:aspect-3/1">
        {featuredSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === currentSlide ? "z-10 opacity-100" : "z-0 opacity-0"
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-end space-y-3 px-5 pb-8 text-center text-white md:items-start md:justify-center md:space-y-4 md:px-12 md:pb-0 md:text-left">
              <h2 className="max-w-lg text-xl font-bold leading-tight sm:text-2xl md:text-4xl">
                {slide.title}
              </h2>

              <p className="max-w-md text-xs opacity-90 sm:text-sm md:text-base">
                {slide.description}
              </p>

              <Link
                href={slide.ctaLink}
                className="mt-2 rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-semibold shadow-md transition-all duration-200 hover:bg-pink-700 active:scale-95 md:mt-0 md:text-base"
              >
                {slide.ctaLabel}
              </Link>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handlePrev}
          aria-label="Slide anterior"
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/70 p-3 shadow-md transition hover:bg-white/90 active:scale-95 md:left-4 md:p-2"
        >
          <ChevronLeft className="h-5 w-5 text-gray-800" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Próximo slide"
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/70 p-3 shadow-md transition hover:bg-white/90 active:scale-95 md:right-4 md:p-2"
        >
          <ChevronRight className="h-5 w-5 text-gray-800" />
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-4">
          {featuredSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ir para slide ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all md:h-3 md:w-3 ${
                idx === currentSlide ? "scale-110 bg-pink-600" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* PROMO IMAGE */}
      <section className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
        <div className="relative aspect-[4/5] w-full bg-pink-50 sm:aspect-[16/10] lg:aspect-[16/9]">
          <Image
            src="/ban.jpeg"
            alt="Sabores da Amy - serviços e encomendas"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* PRODUCT LIST */}
      <ProductList category={category || ""} params="homepage" />
    </div>
  );
}