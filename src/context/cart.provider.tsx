import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { AddProductInCartUseCase } from "../@core/application/cart/add-product-in-cart.use-case";
import { ClearCartUseCase } from "../@core/application/cart/clear-cart.use-case";
import { RemoveProductFromCartUseCase } from "../@core/application/cart/remove-product-from--cart.usecase";
import { Cart } from "../@core/domain/entities/cart";
import { Product } from "../@core/domain/entities/product";
import { container, Registry } from "../@core/infra/container.registry";

export type CartContextType = {
  cart: Cart;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  clear: () => void;
}
const defaultContext: CartContextType = {
  cart: new Cart({products: []}),
  addProduct: (product: Product) => {},
  removeProduct: (productId: number) =>{},
  clear: () => {},
};

export const CartContext = createContext(defaultContext);

const addProductUseCase = container.get<AddProductInCartUseCase>(
  Registry.AddProductInCartUseCase
);
const removeProductUseCase = container.get<RemoveProductFromCartUseCase>(
  Registry.RemoveProductFromCartUseCase
);

const clearCartUseCase = container.get<ClearCartUseCase>(
  Registry.ClearCartUseCase
);

export const CartProvider = ({children}: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>(defaultContext.cart);
  
  const addProduct = useCallback((product: Product) => {
    const cart = addProductUseCase.execute(product);
    setCart(cart);
  }, []);

  const removeProduct = useCallback((productId: number) => {
    const cart = removeProductUseCase.execute(productId)
    setCart(cart);
  }, [] );

  const clear = useCallback(() => {
    const cart = clearCartUseCase.execute();
    setCart(cart);
  }, []);
   
  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        clear,
      }}
      >
        {children}
      </CartContext.Provider>
  )
}