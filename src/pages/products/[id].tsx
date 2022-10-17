import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ProductProps } from '../../@core/domain/entities/product';
import { useContext } from 'react';
import { CarContext } from '../../context/cart.provider';
import { container, Registry } from '../../@core/infra/container.registry';
import { GetProductUseCase } from '../../@core/application/product/get-product.use-case';

type ProductDetailPageProps = {
  product: ProductProps
}

export const ProductDetailPage: NextPage<ProductDetailPageProps> = ({
  product,
}) => {
  const carContext = useContext(CarContext);
    
  return (
    <div>
      <h3>{product.name}</h3>
      <label>Price: </label>{product.price}
      <button onClick={() => carContext.addProduct(product)}>Add to cart</button>
    </div>
  );
};

export default ProductDetailPage;
export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [],
    fallback: 'blocking'
  };
;}

export const getStaticProps: GetStaticProps = async (context) => {
  
  const { id } = context.params || {};
  const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase);

  const product = await useCase.execute(+id!)
  
  return {
    props: {
      product: product.toJSON()
    }
  };
}