import ProductStatus from '../infra/typeorm/entities/ProductStatus';

export default interface IProductsStatusRepository {
  create(description: string): Promise<ProductStatus>;
  findById(id: number): Promise<ProductStatus | undefined>;
  findByDescription(description: string): Promise<ProductStatus | undefined>;
  save(productStatus: ProductStatus): Promise<ProductStatus>;
}
