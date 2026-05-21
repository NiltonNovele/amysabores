import ProductInteraction from "@/components/ProductInteraction";
import { products } from "@/data/products";
import { ArrowLeft, CheckCircle, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ color?: string; size?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === Number(resolvedParams.id));

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "Este produto não existe na nossa loja.",
    };
  }

  return {
    title: `${product.name} | Amy Sabores & Cakes`,
    description: product.shortDescription,
  };
}

const ProductPage = async ({ params, searchParams }: Props) => {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const product = products.find((p) => p.id === Number(resolvedParams.id));

  if (!product) return notFound();

  const selectedSize =
    resolvedSearchParams.size && product.sizes.includes(resolvedSearchParams.size)
      ? resolvedSearchParams.size
      : product.sizes[0];

  const selectedColor =
    resolvedSearchParams.color && product.colors.includes(resolvedSearchParams.color)
      ? resolvedSearchParams.color
      : product.colors[0];

  const imageSrc =
    product.images[selectedColor] ||
    product.images[product.colors[0]] ||
    "/logo-b.jpg";

  return (
    <div className="py-8">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-2 rounded-xl border border-pink-100 bg-white px-4 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar à loja
      </Link>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-3xl border border-pink-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-pink-50">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />

            {product.badge && (
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wide text-pink-600 shadow-sm backdrop-blur">
                {product.badge}
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-pink-500">
              {product.category.replace("-", " ")}
            </span>

            <h1 className="mt-3 text-3xl font-black leading-tight text-gray-900 sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 text-base leading-8 text-gray-600">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-pink-50 pt-6">
              <div>
                <span className="text-sm text-gray-400">Preço desde</span>
                <h2 className="text-3xl font-black text-pink-600">
                  MZN {product.price.toFixed(2)}
                </h2>
              </div>

              <div className="rounded-2xl bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-700">
                Feito sob encomenda
              </div>
            </div>
          </div>

          <ProductInteraction
            product={product}
            selectedSize={selectedSize}
            selectedFlavor={selectedColor}
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <InfoCard
              icon={<Truck className="h-5 w-5" />}
              title="Entrega"
              text="Entrega disponível mediante confirmação."
            />

            <InfoCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Halal"
              text="Produtos preparados com princípios Halal."
            />

            <InfoCard
              icon={<CheckCircle className="h-5 w-5" />}
              title="Fresco"
              text="Preparado com carinho após encomenda."
            />
          </div>

          <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-900">
              Métodos de pagamento disponíveis
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Image src="/mpesa.png" alt="M-Pesa" width={56} height={28} />
              <Image src="/emola.png" alt="e-Mola" width={56} height={28} />
              <Image src="/mkesh.png" alt="mKesh" width={56} height={28} />
            </div>

            <p className="mt-4 text-xs leading-6 text-gray-500">
              Ao clicar em <strong>Comprar Agora</strong>, será encaminhado para
              o carrinho para preencher os dados de entrega e finalizar o
              pagamento.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const InfoCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
        {icon}
      </div>

      <h3 className="font-bold text-gray-900">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-gray-500">{text}</p>
    </div>
  );
};

export default ProductPage;