import { z } from "zod";

export const productCategories = [
  "bolos",
  "cupcakes",
  "biscoitos",
  "brigadeiros",
  "salgados",
  "doces-especiais",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export type ProductType = {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
  category: ProductCategory;
  badge?: string;
  isFeatured?: boolean;
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedFlavor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(2, "Informe o seu nome completo."),
  email: z.string().email("Informe um email válido."),
  phone: z
    .string()
    .min(7, "O número deve ter entre 7 e 10 dígitos.")
    .max(10, "O número deve ter entre 7 e 10 dígitos.")
    .regex(/^\d+$/, "O número deve conter apenas dígitos."),
  address: z.string().min(3, "Informe a sua morada."),
  city: z.string().min(2, "Informe a sua cidade."),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(2, "Informe o nome no cartão."),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "O cartão deve ter 16 dígitos."),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use o formato MM/AA."),
  cvv: z.string().regex(/^\d{3}$/, "O CVV deve ter 3 dígitos."),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};