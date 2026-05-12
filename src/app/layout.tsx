import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://amysabores.loja.sale";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amy Sabores & Cakes",
    template: "%s | Amy Sabores & Cakes",
  },
  description:
    "Amy Sabores & Cakes — doces momentos, doces sabores. Bolos, cupcakes, brigadeiros, salgados e doces especiais em Moçambique.",
  keywords: [
    "Amy Sabores",
    "Amy Sabores & Cakes",
    "bolos em Moçambique",
    "bolos em Maputo",
    "cupcakes",
    "brigadeiros",
    "salgados",
    "doces halal",
    "confeitaria artesanal",
  ],
  authors: [{ name: "Amy Sabores & Cakes" }],
  creator: "Amy Sabores & Cakes",
  publisher: "Amy Sabores & Cakes",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/logo-b.jpg",
    shortcut: "/logo-b.jpg",
    apple: "/logo-b.jpg",
  },
  openGraph: {
    title: "Amy Sabores & Cakes",
    description:
      "Doces momentos, doces sabores. Encomende bolos, cupcakes, brigadeiros, salgados e doces especiais.",
    url: siteUrl,
    siteName: "Amy Sabores & Cakes",
    images: [
      {
        url: "/logo-b.jpg",
        width: 1200,
        height: 1200,
        alt: "Amy Sabores & Cakes",
      },
    ],
    locale: "pt_MZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amy Sabores & Cakes",
    description:
      "Bolos, cupcakes, brigadeiros, salgados e doces especiais feitos com carinho.",
    images: ["/logo-b.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#db2777",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-MZ">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 font-sans text-gray-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>

          <Footer />
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}