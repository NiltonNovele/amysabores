import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";

// TEMPORÁRIO
const product: ProductType = {
  id: 1,
  name: "T-Shirt Adidas CoreFit",
  shortDescription:
    "Descrição breve do produto com informação essencial e apelativa.",
  description:
    "Descrição detalhada do produto com todas as informações relevantes. Pode incluir materiais, conforto, durabilidade e outras características importantes para ajudar na decisão de compra.",
  price: 59.9,
  sizes: ["xs", "s", "m", "l", "xl"],
  colors: ["cinzento", "roxo", "verde"],
  images: {
    cinzento: "/products/1g.png",
    roxo: "/products/1p.png",
    verde: "/products/1gr.png",
  },
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  // TODO: obter o produto da base de dados
  // TEMPORÁRIO
  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const { size, color } = await searchParams;

  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* IMAGEM */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>

      {/* DETALHES */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>

        <p className="text-gray-500">{product.description}</p>

        <h2 className="text-2xl font-semibold">
          MZN{product.price.toFixed(2)}
        </h2>

        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedFlavor={selectedColor}
        />

        {/* INFORMAÇÕES DE PAGAMENTO */}
        <div className="flex items-center gap-2 mt-4">
          <Image
            src="/klarna.png"
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/cards.png"
            alt="cartões"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/stripe.png"
            alt="stripe"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>

        <p className="text-gray-500 text-xs">
          Ao clicar em *Pagar Agora*, concorda com os nossos{" "}
          <span className="underline hover:text-black">
            Termos e Condições
          </span>{" "}
          e com a nossa{" "}
          <span className="underline hover:text-black">
            Política de Privacidade
          </span>
          . Autoriza-nos a cobrar o montante total apresentado no método de
          pagamento selecionado. Todas as vendas estão sujeitas à nossa política
          de devoluções e{" "}
          <span className="underline hover:text-black">
            Política de Reembolso
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default ProductPage;