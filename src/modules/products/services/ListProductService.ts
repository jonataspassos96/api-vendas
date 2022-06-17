import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepositoriy';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepositoriy = getCustomRepository(ProductRepository);

    const products = await productsRepositoriy.find();

    return products;
  }
}

export default ListProductService;
