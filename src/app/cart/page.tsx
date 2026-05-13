"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/stores/cartStore";
import { ShippingFormInputs } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

const SHIPPING_STORAGE_KEY = "amy_shipping_form";

const steps = [
  { id: 1, title: "Carrinho" },
  { id: 2, title: "Morada" },
  { id: 3, title: "Pagamento" },
];

const CartPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
          <ShoppingBag className="h-7 w-7" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
          O Seu Carrinho
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Doces momentos começam aqui ✨
        </p>
      </div>

      <Suspense fallback={<CartLoading />}>
        <CartContent />
      </Suspense>
    </div>
  );
};

export default CartPage;

const CartLoading = () => {
  return (
    <div className="grid w-full gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
        <p className="text-sm text-gray-500">A carregar carrinho...</p>
      </div>

      <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
        <p className="text-sm text-gray-500">A carregar resumo...</p>
      </div>
    </div>
  );
};

const CartContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawStep = Number(searchParams.get("step") || "1");
  const activeStep = [1, 2, 3].includes(rawStep) ? rawStep : 1;

  const [shippingForm, setShippingForm] = useState<
    ShippingFormInputs | undefined
  >();

  const { cart, removeFromCart } = useCartStore() as any;

  useEffect(() => {
    const savedShipping = localStorage.getItem(SHIPPING_STORAGE_KEY);

    if (savedShipping) {
      try {
        setShippingForm(JSON.parse(savedShipping));
      } catch {
        localStorage.removeItem(SHIPPING_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const paymentSuccess = searchParams.get("payment") === "success";

    if (paymentSuccess) return;

    if (activeStep === 3 && !shippingForm) {
      router.replace("/cart?step=2", { scroll: false });
    }
  }, [activeStep, shippingForm, router, searchParams]);

  const totals = useMemo(() => {
    const subtotal =
      cart?.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      ) || 0;

    const discount = subtotal > 0 ? subtotal * 0.1 : 0;
    const shipping = subtotal > 0 ? 150 : 0;
    const total = subtotal - discount + shipping;

    return {
      subtotal,
      discount,
      shipping,
      total,
    };
  }, [cart]);

  const handleShippingSave = (data: ShippingFormInputs) => {
    setShippingForm(data);
    localStorage.setItem(SHIPPING_STORAGE_KEY, JSON.stringify(data));
  };

  const goToStep = (step: number) => {
    router.push(`/cart?step=${step}`, { scroll: false });
  };

  const canGoToPayment = Boolean(shippingForm);

  return (
    <div className="grid w-full gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="space-y-6">
        <StepIndicator activeStep={activeStep} />

        <div className="rounded-3xl border border-pink-100 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          {activeStep === 1 && (
            <CartItems cart={cart || []} removeFromCart={removeFromCart} />
          )}

          {activeStep === 2 && (
            <ShippingForm
              defaultValues={shippingForm}
              setShippingForm={handleShippingSave}
            />
          )}

          {activeStep === 3 && (
            <PaymentForm
              shippingForm={shippingForm}
              subtotal={totals.subtotal}
              discount={totals.discount}
              shipping={totals.shipping}
              total={totals.total}
            />
          )}
        </div>
      </div>

      <OrderSummary
        activeStep={activeStep}
        cart={cart || []}
        subtotal={totals.subtotal}
        discount={totals.discount}
        shipping={totals.shipping}
        total={totals.total}
        canGoToPayment={canGoToPayment}
        goToStep={goToStep}
      />
    </div>
  );
};

const StepIndicator = ({ activeStep }: { activeStep: number }) => {
  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-2">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          const isCompleted = activeStep > step.id;

          return (
            <div
              key={step.id}
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl px-2 py-3 text-center transition-all sm:flex-row ${
                isActive
                  ? "bg-pink-600 text-white"
                  : isCompleted
                  ? "bg-green-50 text-green-700"
                  : "bg-pink-50 text-gray-500"
              }`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  isActive
                    ? "bg-white text-pink-600"
                    : isCompleted
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-500"
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : step.id}
              </div>

              <span className="text-xs font-semibold sm:text-sm">
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CartItems = ({
  cart,
  removeFromCart,
}: {
  cart: any[];
  removeFromCart: (item: any) => void;
}) => {
  if (!cart.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
          <ShoppingBag className="h-8 w-8" />
        </div>

        <h2 className="text-xl font-bold text-gray-900">
          O seu carrinho está vazio
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Adicione doces deliciosos antes de continuar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {cart.map((item) => {
        const imageSrc =
          item.images?.[item.selectedFlavor] ||
          item.images?.[0] ||
          "/logo-b.jpg";

        return (
          <div
            key={`${item.id}-${item.selectedSize}-${item.selectedFlavor}`}
            className="flex flex-col gap-4 rounded-2xl border border-pink-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-pink-50 sm:h-28 sm:w-28">
                <Image
                  src={imageSrc}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between gap-3">
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="rounded-full bg-pink-50 px-3 py-1">
                      Qtd: {item.quantity}
                    </span>

                    <span className="rounded-full bg-pink-50 px-3 py-1">
                      Tamanho: {item.selectedSize || "N/A"}
                    </span>

                    <span className="rounded-full bg-pink-50 px-3 py-1">
                      Sabor: {item.selectedFlavor || "N/A"}
                    </span>
                  </div>
                </div>

                <p className="font-bold text-pink-600">
                  MZN {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeFromCart(item)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-100 sm:w-auto"
            >
              <Trash2 className="h-4 w-4" />
              Remover
            </button>
          </div>
        );
      })}
    </div>
  );
};

const OrderSummary = ({
  activeStep,
  cart,
  subtotal,
  discount,
  shipping,
  total,
  canGoToPayment,
  goToStep,
}: {
  activeStep: number;
  cart: any[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  canGoToPayment: boolean;
  goToStep: (step: number) => void;
}) => {
  return (
    <aside className="h-fit rounded-3xl border border-pink-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
      <h2 className="text-xl font-black text-gray-900">Resumo do Pedido</h2>

      <div className="mt-6 space-y-4 text-sm">
        <SummaryRow label="Produtos" value={`${cart.length}`} />
        <SummaryRow label="Subtotal" value={`MZN ${subtotal.toFixed(2)}`} />
        <SummaryRow
          label="Desconto (10%)"
          value={`- MZN ${discount.toFixed(2)}`}
          valueClassName="text-green-600"
        />
        <SummaryRow label="Envio" value={`MZN ${shipping.toFixed(2)}`} />

        <div className="border-t border-dashed border-pink-200 pt-4">
          <SummaryRow
            label="Total"
            value={`MZN ${total.toFixed(2)}`}
            labelClassName="text-base font-bold text-gray-900"
            valueClassName="text-lg font-black text-pink-600"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {activeStep === 1 && cart.length > 0 && (
          <button
            type="button"
            onClick={() => goToStep(2)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-all hover:-translate-y-0.5 hover:bg-pink-700"
          >
            Continuar
            <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {activeStep === 2 && (
          <p className="rounded-xl bg-pink-50 p-3 text-sm text-gray-600">
            Preencha os dados de entrega para avançar ao pagamento.
          </p>
        )}

        {activeStep === 3 && canGoToPayment && (
          <button
            type="button"
            onClick={() => goToStep(2)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-pink-200 bg-white px-5 py-3 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Editar Morada
          </button>
        )}
      </div>
    </aside>
  );
};

const SummaryRow = ({
  label,
  value,
  labelClassName = "text-gray-500",
  valueClassName = "font-semibold text-gray-900",
}: {
  label: string;
  value: string;
  labelClassName?: string;
  valueClassName?: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={labelClassName}>{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
};