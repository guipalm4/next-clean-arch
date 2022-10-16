import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Product } from '../../utils/model';
import { http } from '../../utils/http';

type ProductDetailPageProps = {
  product: Product
}

export const ProductDetailPage: NextPage<ProductDetailPageProps> = ({product}) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <label>Price: </label>{product.price}
      <button>Add to cart</button>
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
  const {data: product} = await http.get(`products/${id}`);
  
  return {
    props: {
      product
    }
  };
}