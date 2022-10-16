// @flow 
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { http } from '../../../utils/http';
import { Order } from '../../../utils/model';

type CheckoutSuccessPageProps = {
  order: Order;
};
export const CheckoutSuccesPage: NextPage<CheckoutSuccessPageProps> = ({
  order
}) => {
  return (
    <div>
      <h3>Congratulations, your ID purchase has been confirmed</h3>
      <ul>
        {order.products.map((product) => (
          <li key={product.id}>
            Product {product.name} - ${product.price}
          </li>
        ))}        
      </ul>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [],
    fallback: 'blocking'
  };
;}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params || {};
  const { data: order } = await http.get(`orders/${id}`);
  return {
    props: {
      order
    }
  }
}

export default CheckoutSuccesPage;