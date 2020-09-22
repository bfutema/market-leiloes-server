import ICreateProductImageDTO from '../dtos/ICreateProductImageDTO';

import ProductImage from '../infra/typeorm/entities/ProductImage';

export default interface IProductImagesRepository {
  create(productImage: ICreateProductImageDTO): Promise<ProductImage>;
  createFiles(productImages: ICreateProductImageDTO[]): Promise<ProductImage[]>;
  findById(id: string): Promise<ProductImage | undefined>;
  findByKey(key: string): Promise<ProductImage | undefined>;
  save(productImage: ProductImage): Promise<ProductImage>;
}
