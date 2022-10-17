import { http } from './http';
import { Container } from "inversify";
import { ProductHttpGateway } from './gateways/product-http.gateway';
import { ListProductUseCase } from '../application/product/list-products.use-case';
import { GetProductUseCase } from '../application/product/get-product.use-case';

export const Registry = {
  AxiosAdapter: Symbol.for("AxiosAdapter"),
  ProductGateway: Symbol.for("ProducGateway"),
  ListProductsUseCase: Symbol.for("ListProductsUseCase"),
  GetProductUseCase: Symbol.for("GetProductUseCase"),
}

export const container = new Container()

container.bind(Registry.AxiosAdapter).toConstantValue(http);
container.bind(Registry.ProductGateway).toDynamicValue((context) => {
  return new ProductHttpGateway(context.container.get(Registry.AxiosAdapter))
});
container.bind(Registry.ListProductsUseCase).toDynamicValue((context) => {
  return new ListProductUseCase(context.container.get(Registry.ProductGateway))
});
container.bind(Registry.GetProductUseCase).toDynamicValue((context) => {
  return new GetProductUseCase(context.container.get(Registry.ProductGateway))
});