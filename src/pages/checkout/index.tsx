import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useContext } from "react";
import { CarContext } from "../../context/cart.provider";
import { http } from "../../utils/http";

type Props = {
  
};
export const CheckoutPage: NextPage = (props: Props) => {
  const router = useRouter();
  
  async function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const creditCardNumber = event.currentTarget.credit_card_number.value;
    const {data: order} = await http.post("orders", {
      products: cartContext.products,
      creditCardNumber
    });
    router.push(`checkout/${order.id}/success`)    
  }

  const cartContext = useContext(CarContext);
  return (
    <div>
      <h3>My cart</h3>
      <ul>
        {cartContext.products.map((product) => (
          <li key= {product.id}>
            Product {product.name} - $ {product.price}
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="">Credit card</label>
          <input type="text" name="credit_card_number" id="credit_card_number"/>

        </div>
        <div>
          <button type="submit">Buy</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;