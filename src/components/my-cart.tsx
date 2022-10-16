import { useContext } from "react";
import { CarContext } from "../context/cart.provider";

type Props = {
  
};
export const MyCart = (props: Props) => {
  const cartContext =  useContext(CarContext)
  return (
    <nav>
      Cart - Total {cartContext.total} | Items {cartContext.products.length}
    </nav>
  );
};