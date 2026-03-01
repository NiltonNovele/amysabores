"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { Bell, Home, Menu, X, Info, Gift, Package, Mail } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const menuItems = [
    { name: "Sobre", href: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Loja", href: "/products", icon: <Gift className="w-4 h-4" /> },
    { name: "Contacto", href: "/contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <nav className="w-full border-b border-pink-100 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Logo + Name */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-b.jpg"
                alt="Amila Sabores & Cakes"
                width={36}
                height={36}
                className="w-6 h-6 md:w-9 md:h-9 rounded-full object-cover"
              />
              <p className="text-md font-semibold tracking-wide text-pink-600">
                AMY SABORES & CAKES
              </p>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-6 ml-6 text-gray-700 font-medium">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-1 hover:text-pink-600 transition px-2 py-1 rounded-md hover:bg-pink-50"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* Search only on desktop */}
            <SearchBar className="hidden md:block" />

            <Link href="/" className="hidden md:block">
              <Home className="w-5 h-5 text-gray-500 hover:text-pink-600 transition"/>
            </Link>

            <Bell className="hidden md:block w-5 h-5 text-gray-500 hover:text-pink-600 transition"/>

            <ShoppingCartIcon/>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-pink-50 transition"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-pink-600"/>
              ) : (
                <Menu className="w-6 h-6 text-gray-700"/>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-pink-100 shadow-md">
          <div className="flex flex-col gap-4 px-4 py-4 text-gray-700 font-medium">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-2 py-2 rounded-md hover:text-pink-600 transition hover:bg-pink-50"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;