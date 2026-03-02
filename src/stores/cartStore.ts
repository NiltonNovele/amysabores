import { CartStoreActionsType, CartStoreStateType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set, get) => ({
      cart: [],
      hasHydrated: false,

      addToCart: (product) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (p) =>
              p.id === product.id &&
              p.selectedSize === product.selectedSize &&
              p.selectedFlavor === product.selectedFlavor
          );

          if (existingIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex].quantity += product.quantity;
            return { cart: updatedCart };
          }

          return {
            cart: [...state.cart, product],
          };
        }),

      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter(
            (p) =>
              !(
                p.id === product.id &&
                p.selectedSize === product.selectedSize &&
                p.selectedFlavor === product.selectedFlavor
              )
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "amy-cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    }
  )
);

export default useCartStore;