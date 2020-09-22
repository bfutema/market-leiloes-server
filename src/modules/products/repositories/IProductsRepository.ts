import Product from '../infra/typeorm/entities/Product';

import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  find(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByTitle(title: string): Promise<Product | undefined>;
  save(product: Product): Promise<Product>;
}
