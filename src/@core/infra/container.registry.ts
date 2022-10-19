import "reflect-metadata";
import { RemoveProductFromCartUseCase } from './../application/cart/remove-product-from--cart.usecase';
import { AddProductInCartUseCase } from './../application/cart/add-product-in-cart.use-case';
import { GetCartUseCase } from './../application/cart/get-cart.use-case';
import { http } from './http';
import { Container } from "inversify";
import { ProductHttpGateway } from './gateways/product-http.gateway';
import { ListProductUseCase } from '../application/product/list-products.use-case';
import { GetProductUseCase } from '../application/product/get-product.use-case';
import { CartLocalStorageGateway } from './gateways/cart-local-storage.gateway';
import { ClearCartUseCase } from '../application/cart/clear-cart.use-case';

export const Registry = {
  AxiosAdapter: Symbol.for("AxiosAdapter"),

  ProductGateway: Symbol.for("ProductGateway"),
  CartGateway: Symbol.for("CartGateway"),
  OrderGateway: Symbol.for("OrderGateway"),

  ListProductsUseCase: Symbol.for("ListProductsUseCase"),
  GetProductUseCase: Symbol.for("GetProductUseCase"),

  GetCartUseCase: Symbol.for("GetCartUseCase"),
  AddProductInCartUseCase: Symbol.for("AddProductInCartUseCase"),
  RemoveProductFromCartUseCase: Symbol.for("RemoveProductFromCartUseCase"),
  ClearCartUseCase: Symbol.for("ClearCartUseCase"),

  GetOrderUseCase: Symbol.for("GetOrderUseCase"),
  ProcessOrderUseCase: Symbol.for("ProcessOrderUseCase"),
};

export const container = new Container();

//########## HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(http);

//########## GATEWAYS
container.bind(Registry.ProductGateway).toDynamicValue((context) => {
  return new ProductHttpGateway(context.container.get(Registry.AxiosAdapter));
});
container.bind(Registry.CartGateway).to(CartLocalStorageGateway);

//########## USE CASES
container.bind(Registry.ListProductsUseCase).toDynamicValue((context) => {
  return new ListProductUseCase(
    context.container.get(Registry.ProductGateway)
  );
});

container.bind(Registry.GetProductUseCase).toDynamicValue((context) => {
  return new GetProductUseCase(context.container.get(Registry.ProductGateway));
});

container.bind(Registry.GetCartUseCase).toDynamicValue((context) => {
  return new GetCartUseCase(context.container.get(Registry.CartGateway));
});

container.bind(Registry.AddProductInCartUseCase).toDynamicValue((context) => {
  return new AddProductInCartUseCase(
    context.container.get(Registry.CartGateway)
  );
});

container
  .bind(Registry.RemoveProductFromCartUseCase)
  .toDynamicValue((context) => {
    return new RemoveProductFromCartUseCase(
      context.container.get(Registry.CartGateway)
    );
  });

container.bind(Registry.ClearCartUseCase).toDynamicValue((context) => {
  return new ClearCartUseCase(context.container.get(Registry.CartGateway));
});
