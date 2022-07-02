import RedisCache from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepositoriy';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepositoriy = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if (!products) {
      products = await productsRepositoriy.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
