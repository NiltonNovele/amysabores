import ProductInteraction from "@/components/ProductInteraction";
import Image from "next/image";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ color?: string; size?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find(
    (p) => p.id === Number(resolvedParams.id)
  );

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "Este produto não existe na nossa loja.",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

const ProductPage = async ({ params, searchParams }: Props) => {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams
    ? await searchParams
    : {};

  const product = products.find(
    (p) => p.id === Number(resolvedParams.id)
  );

  if (!product) return notFound();

  const selectedSize =
    resolvedSearchParams.size || product.sizes[0];

  const selectedColor =
    resolvedSearchParams.color || product.colors[0];

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* IMAGE */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-contain rounded-md"
        />
      </div>

      {/* DETAILS */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">
          {product.name}
        </h1>

        <p className="text-gray-500">
          {product.description}
        </p>

        <h2 className="text-2xl font-semibold">
          MZN {product.price.toFixed(2)}
        </h2>

        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedFlavor={selectedColor}
        />

        <div className="flex items-center gap-2 mt-4">
          <Image
            src="/mpesa.png"
            alt="klarna"
            width={50}
            height={25}
          />
          <Image
            src="/emola.png"
            alt="cartões"
            width={50}
            height={25}
          />
          <Image
            src="/mkesh.png"
            alt="stripe"
            width={50}
            height={25}
          />
        </div>

        <p className="text-gray-500 text-xs mt-2">
          Ao clicar em <strong>Pagar Agora</strong>,
          concorda com os nossos Termos e Condições
          e Política de Privacidade.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;