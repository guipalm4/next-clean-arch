import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link';
import { ListProductUseCase } from '../@core/application/product/list-products.use-case';
import { container, Registry } from '../@core/infra/container.registry';
import { ProductProps } from '../@core/domain/entities/product';

type HomeProps = {
  products: ProductProps[]
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
  const useCase = container.get<ListProductUseCase>(Registry.ListProductsUseCase);
  const products = await useCase.execute();

  return {
    props: {
     products: products.map((product) => product.toJSON()),
    },
  };
}
