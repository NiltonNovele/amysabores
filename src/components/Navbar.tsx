"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { Bell, Gift, Home, Info, Mail, Menu, X } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const menuItems = [
    { name: "Sobre", href: "/about", icon: Info },
    { name: "Loja", href: "/products", icon: Gift },
    { name: "Contacto", href: "/contact", icon: Mail },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-pink-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* LEFT: Logo + Name */}
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex min-w-0 items-center gap-2"
            >
              <Image
                src="/logo-b.jpg"
                alt="AMY Sabores & Cakes"
                width={40}
                height={40}
                priority
                className="h-9 w-9 rounded-full object-cover ring-2 ring-pink-100"
              />

              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-extrabold tracking-wide text-pink-600 sm:text-base">
                  AMY SABORES
                </p>
                <p className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 sm:block">
                  & Cakes
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="ml-4 hidden items-center gap-1 md:flex">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-gray-600 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600"
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search only on desktop */}
            <SearchBar className="hidden md:block" />

            <Link
              href="/"
              className="hidden rounded-xl p-2 text-gray-500 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600 md:block"
              aria-label="Página inicial"
            >
              <Home className="h-5 w-5" />
            </Link>

            <button
              type="button"
              className="hidden rounded-xl p-2 text-gray-500 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600 md:block"
              aria-label="Notificações"
            >
              <Bell className="h-5 w-5" />
            </button>

            <ShoppingCartIcon />

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="rounded-xl p-2 text-gray-700 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600 md:hidden"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-pink-600" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-t border-pink-100 bg-white shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4">
            <SearchBar className="w-full" />

            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600"
              >
                <Home className="h-4 w-4" />
                Início
              </Link>

              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600"
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;