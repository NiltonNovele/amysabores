import ProductList from "@/components/ProductList";
import { productCategories } from "@/types";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

const ProductsPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;

  const category =
    resolvedSearchParams.category &&
    productCategories.includes(resolvedSearchParams.category as any)
      ? resolvedSearchParams.category
      : "all";

  return (
    <div className="space-y-10 py-8">
      <section className="rounded-3xl bg-gradient-to-br from-pink-50 via-white to-rose-50 px-5 py-12 text-center sm:px-8 lg:py-16">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-pink-500">
          Amy Sabores & Cakes
        </span>

        <h1 className="mt-4 text-4xl font-black text-gray-900 sm:text-5xl">
          A Nossa Loja
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          Descubra bolos, doces especiais e sobremesas artesanais preparados
          com carinho para tornar cada momento mais doce.
        </p>
      </section>

      <ProductList category={category} params="products" />
    </div>
  );
};

export default ProductsPage;