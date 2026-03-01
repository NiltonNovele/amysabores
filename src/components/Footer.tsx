import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Phone,
  Mail,
  Clock,
  Cake,
  ShieldCheck,
  MapPin,
  IceCreamBowl,
  Candy,
  Cookie,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 bg-linear-to-br from-pink-50 to-white text-gray-700 rounded-3xl px-5 sm:px-6 md:px-12 py-10 md:py-14 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

        {/* BRAND */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-b.jpg"
              alt="Amy Sabores & Cakes"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="text-base md:text-lg font-semibold text-pink-600 tracking-wide">
              Amy Sabores & Cakes
            </span>
          </Link>

          <p className="text-sm leading-relaxed text-gray-600">
            Doces e Salgados preparados com carinho.
            Sabor que apaixona e torna cada momento especial.
          </p>

          <div className="flex gap-4 pt-1">
            <Link
              href="https://instagram.com/sabores_amy"
              target="_blank"
              className="hover:text-pink-600 transition-colors"
            >
              <Instagram size={18} />
            </Link>

            <Link
              href="tel:858101053"
              className="hover:text-pink-600 transition-colors"
            >
              <Phone size={18} />
            </Link>

            <Link
              href="mailto:amysabores@gmail.com"
              className="hover:text-pink-600 transition-colors"
            >
              <Mail size={18} />
            </Link>
          </div>
        </div>

        {/* PRODUTOS */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
            Produtos
          </h3>

          <Link href="/?category=bolos" className="flex items-center gap-2 text-sm hover:text-pink-600 transition">
            <Cake size={15} />
            Bolos
          </Link>

          <Link href="/?category=cupcakes" className="flex items-center gap-2 text-sm hover:text-pink-600 transition">
            <IceCreamBowl size={15} />
            Cupcakes
          </Link>

          <Link href="/?category=brigadeiros" className="flex items-center gap-2 text-sm hover:text-pink-600 transition">
            <Candy size={15} />
            Brigadeiros
          </Link>

          <Link href="/?category=biscoitos" className="flex items-center gap-2 text-sm hover:text-pink-600 transition">
            <Cookie size={15} />
            Biscoitos
          </Link>
        </div>

        {/* INFORMAÇÕES */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
            Informações
          </h3>

          <div className="flex items-center gap-2 text-sm">
            <Clock size={15} />
            Segunda a Sábado
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone size={15} />
            858101053
          </div>

          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck size={15} />
            Produtos Halal
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin size={15} />
            Maputo, Moçambique
          </div>
        </div>

        {/* INSTAGRAM INFO */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
            Instagram
          </h3>

          <p className="text-sm text-gray-600">
            @sabores_amy
          </p>

          <div className="flex justify-between text-xs text-gray-600">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900 text-sm">42</span>
              <span>Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900 text-sm">121</span>
              <span>Seguidores</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900 text-sm">227</span>
              <span>A seguir</span>
            </div>
          </div>

          <Link
            href="https://instagram.com/sabores_amy"
            target="_blank"
            className="text-pink-600 text-sm font-medium hover:underline"
          >
            Ver perfil
          </Link>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-pink-100 my-8" />

      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm text-gray-500">
        <p>
          © 2026 Amy Sabores & Cakes. Todos os direitos reservados.
        </p>

        <p>
          Desenvolvido pela{" "}
          <Link
            href="https://www.synctechx.com"
            target="_blank"
            className="text-pink-600 font-medium hover:underline"
          >
            Synctechx
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;