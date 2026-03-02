import ProductList from "@/components/ProductList";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

const ProductsPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;

  const validCategories = [
    "bolos",
    "cupcakes",
    "biscoitos",
    "brigadeiros",
    "salgados",
    "doces-especiais",
  ];

  const category =
    resolvedSearchParams.category &&
    validCategories.includes(resolvedSearchParams.category)
      ? resolvedSearchParams.category
      : "all";

  return (
    <div className="mt-8">
      <ProductList category={category} params="products" />
    </div>
  );
};

export default ProductsPage;