import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link';
import { http } from '../utils/http';
import { Product } from '../utils/model';

type HomeProps = {
  products: Product[]
}

const Home: NextPage<HomeProps> = ({products}) => {
  
  return (
    <div>
      <h1>Ecommerce</h1>
      <ul>
        {products.map((product, key) => (
          <li key={key}>
          <label>Name: </label>
          {product.name}    |   
          <Link href={`/products/${product.id}`} passHref>
            <a href= "#">View</a>
          </Link>
        </li>
        ))}        
      </ul>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async(context) => {
  
  const {data: products} = await http.get("products");

  return {
    props: {
     products,
    },
  };
}
