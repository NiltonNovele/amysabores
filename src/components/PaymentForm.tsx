"use client";

import useCartStore from "@/stores/cartStore";
import {
  Check,
  CreditCard,
  Download,
  MessageCircle,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const API_URL = "https://ejem-donations.onrender.com";
const WHATSAPP_NUMBER = "258858101053";
const RECEIPT_STORAGE_KEY = "amy_payment_receipt";

type PaymentMethod = "M-Pesa" | "e-Mola" | "Cartão" | "cash";

type ReceiptData = {
  reference: string;
  paymentRequestId?: string;
  paymentStatus: string;
  paymentMethod: PaymentMethod;
  amount: number;
  createdAt: string;
  customerName: string;
  customerContact: string;
  deliveryMethod: string;
  message: string;
  items: any[];
};

const PaymentForm = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("M-Pesa");
  const [isLoading, setIsLoading] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  const { cart } = useCartStore() as any;

  const totalAmount = useMemo(() => {
    return (
      cart?.reduce(
        (total: number, item: any) => total + item.price * item.quantity,
        0
      ) || 0
    );
  }, [cart]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentSuccess = params.get("payment") === "success";

    if (paymentSuccess) {
      const savedReceipt = localStorage.getItem(RECEIPT_STORAGE_KEY);

      if (savedReceipt) {
        setReceipt(JSON.parse(savedReceipt));
        toast.success("Pagamento concluído. Guarde o seu recibo.");
      }
    }
  }, []);

  const paymentMethods = [
    {
      id: "M-Pesa",
      label: "M-Pesa",
      description: "Pagamento rápido via M-Pesa.",
      icons: ["/mpesa.png"],
      icon: Wallet,
    },
    {
      id: "e-Mola",
      label: "e-Mola",
      description: "Pagamento rápido via e-Mola.",
      icons: ["/emola.png"],
      icon: Wallet,
    },
    {
      id: "Cartão",
      label: "Cartão",
      description: "Pague com cartão de crédito ou débito.",
      icons: ["/cards.png", "/stripe.png"],
      icon: CreditCard,
    },
    {
      id: "cash",
      label: "Dinheiro na Entrega",
      description: "Pague quando receber a encomenda.",
      icons: [],
      icon: ShoppingCart,
    },
  ] as const;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("pt-MZ", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handlePayment = async () => {
    try {
      if (!totalAmount || totalAmount <= 0) {
        toast.error("O carrinho está vazio.");
        return;
      }

      setIsLoading(true);

      if (selectedMethod === "cash") {
        const cashReceipt: ReceiptData = {
          reference: `CASH-${Date.now()}`,
          paymentStatus: "Pagamento na entrega",
          paymentMethod: "cash",
          amount: totalAmount,
          createdAt: new Date().toISOString(),
          customerName: "Cliente Amy Sabores",
          customerContact: "",
          deliveryMethod: "Entrega",
          message: "Encomenda Amy Sabores & Cakes",
          items: cart || [],
        };

        localStorage.setItem(RECEIPT_STORAGE_KEY, JSON.stringify(cashReceipt));
        setReceipt(cashReceipt);
        toast.success("Pedido registado. Tire screenshot do recibo.");
        return;
      }

      const response = await fetch(`${API_URL}/api/donations/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donorName: "Cliente Amy Sabores",
          donorContact: "",
          anonymousDonation: false,
          amount: 1, //totalAmount
          paymentMethod: selectedMethod,
          message: "Pagamento de encomenda Amy Sabores & Cakes",
          donationMode: "money",
          selectedGoods: cart || [],
          otherDonation: "",
          deliveryMethod: "delivery",
          returnUrl: `${window.location.origin}/cart?payment=success`,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.status !== "success") {
        throw new Error(result.message || "Erro ao iniciar pagamento.");
      }

      const receiptData: ReceiptData = {
        reference: result?.data?.reference || `AMY-${Date.now()}`,
        paymentRequestId: result?.data?.paymentRequestId,
        paymentStatus: result?.data?.paymentStatus || "pending",
        paymentMethod: selectedMethod,
        amount: totalAmount,
        createdAt: new Date().toISOString(),
        customerName: "Cliente Amy Sabores",
        customerContact: "",
        deliveryMethod: "Entrega",
        message: "Pagamento de encomenda Amy Sabores & Cakes",
        items: cart || [],
      };

      localStorage.setItem(RECEIPT_STORAGE_KEY, JSON.stringify(receiptData));

      const checkoutUrl = result?.data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("URL de pagamento não recebida.");
      }

      toast.success("A redirecionar para o pagamento...");
      window.location.href = checkoutUrl;
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar pagamento.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    if (!receipt) return;

    const text = `Olá Amy Sabores & Cakes. Segue o recibo da minha encomenda.

Referência: ${receipt.reference}
Método: ${receipt.paymentMethod}
Estado: ${receipt.paymentStatus}
Total: MZN ${receipt.amount.toFixed(2)}

Vou enviar o screenshot do recibo.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  if (receipt) {
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-pink-100 sm:p-6">
        <div
          id="digital-receipt"
          className="overflow-hidden rounded-2xl border border-pink-100 bg-white"
        >
          <div className="bg-pink-600 px-5 py-6 text-center text-white">
            <h2 className="text-2xl font-black">Amy Sabores & Cakes</h2>
            <p className="mt-1 text-sm text-pink-100">
              Recibo Digital de Encomenda
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-5 rounded-2xl bg-green-50 p-4 text-center">
              <Check className="mx-auto h-8 w-8 text-green-600" />
              <h3 className="mt-2 text-lg font-bold text-green-700">
                Pagamento registado com sucesso
              </h3>
              <p className="mt-1 text-xs text-green-700">
                Tire screenshot deste recibo e envie pelo WhatsApp.
              </p>
            </div>

            <div className="grid gap-3 text-sm">
              <ReceiptRow label="Referência" value={receipt.reference} />
              <ReceiptRow
                label="ID do Pagamento"
                value={receipt.paymentRequestId || "N/A"}
              />
              <ReceiptRow label="Método" value={receipt.paymentMethod} />
              <ReceiptRow label="Estado" value={receipt.paymentStatus} />
              <ReceiptRow label="Data" value={formatDate(receipt.createdAt)} />
              <ReceiptRow label="Cliente" value={receipt.customerName} />
              <ReceiptRow label="Contacto" value={receipt.customerContact || "N/A"} />
              <ReceiptRow label="Entrega" value={receipt.deliveryMethod} />
            </div>

            <div className="my-6 border-t border-dashed border-pink-200" />

            <h4 className="mb-3 font-bold text-gray-900">Produtos</h4>

            <div className="space-y-3">
              {receipt.items.map((item: any, index: number) => (
                <div
                  key={`${item.id}-${index}`}
                  className="rounded-xl bg-pink-50/60 p-3 text-sm"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Qtd: {item.quantity} | Tamanho:{" "}
                        {item.selectedSize || "N/A"} | Sabor:{" "}
                        {item.selectedFlavor || "N/A"}
                      </p>
                    </div>

                    <p className="font-bold text-pink-600">
                      MZN {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-dashed border-pink-200" />

            <div className="flex items-center justify-between rounded-2xl bg-pink-600 px-4 py-4 text-white">
              <span className="font-semibold">Total Pago</span>
              <span className="text-xl font-black">
                MZN {receipt.amount.toFixed(2)}
              </span>
            </div>

            <div className="mt-5 rounded-2xl bg-yellow-50 p-4 text-sm leading-6 text-yellow-800">
              Tire screenshot deste recibo completo e envie para a nossa equipa
              pelo WhatsApp para confirmarmos a sua encomenda.
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar via WhatsApp
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-pink-200 bg-white px-5 py-3.5 text-sm font-semibold text-pink-600 transition-all duration-300 hover:bg-pink-50"
          >
            <Download className="h-4 w-4" />
            Imprimir / Guardar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-pink-100 sm:p-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Método de Pagamento
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Total a pagar:{" "}
          <span className="font-bold text-pink-600">
            MZN {totalAmount.toFixed(2)}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {paymentMethods.map((method) => {
          const isActive = selectedMethod === method.id;
          const Icon = method.icon;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedMethod(method.id)}
              className={`relative flex flex-col items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                isActive
                  ? "border-pink-500 bg-pink-50 shadow-md shadow-pink-100"
                  : "border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/50"
              }`}
            >
              {isActive && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-white">
                  <Check className="h-3.5 w-3.5" />
                </div>
              )}

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  {method.label}
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {method.description}
                </p>
              </div>

              {method.icons.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {method.icons.map((icon) => (
                    <div
                      key={icon}
                      className="overflow-hidden rounded-md border border-pink-100 bg-white p-1"
                    >
                      <Image
                        src={icon}
                        alt={method.label}
                        width={42}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-pink-100 bg-pink-50/50 p-4 text-sm leading-6 text-gray-600">
        {selectedMethod === "cash"
          ? "A sua encomenda será confirmada pela equipa antes da entrega."
          : "Ao clicar em finalizar, será redirecionado para concluir o pagamento."}
      </div>

      <button
        type="button"
        onClick={handlePayment}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "A processar..." : "Finalizar Pagamento"}
        <ShoppingCart className="h-4 w-4" />
      </button>
    </div>
  );
};

const ReceiptRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-pink-50 pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-semibold text-gray-900">{value}</span>
    </div>
  );
};

export default PaymentForm;