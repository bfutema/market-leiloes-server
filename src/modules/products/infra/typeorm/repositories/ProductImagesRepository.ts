import { getRepository, Repository } from 'typeorm';

import IProductImagesRepository from '@modules/products/repositories/IProductImagesRepository';
import ICreateProductImageDTO from '@modules/products/dtos/ICreateProductImageDTO';

import ProductImage from '../entities/ProductImage';

class ProductImagesRepository implements IProductImagesRepository {
  private ormRepository: Repository<ProductImage>;

  constructor() {
    this.ormRepository = getRepository(ProductImage);
  }

  public async create(
    productImageData: ICreateProductImageDTO,
  ): Promise<ProductImage> {
    const productImage = this.ormRepository.create(productImageData);

    await this.ormRepository.save(productImage);

    return productImage;
  }

  public async createFiles(
    productImagesData: ICreateProductImageDTO[],
  ): Promise<ProductImage[]> {
    const productImages = productImagesData.map(productImageData =>
      this.ormRepository.create(productImageData),
    );

    await Promise.all(productImages);

    const productImagesPromise = productImages.map(productImage =>
      this.ormRepository.save(productImage),
    );

    const newProductImages = await Promise.all(productImagesPromise);

    return newProductImages;
  }

  public async findById(id: string): Promise<ProductImage | undefined> {
    const productImage = await this.ormRepository.findOne(id);

    return productImage;
  }

  public async findByKey(key: string): Promise<ProductImage | undefined> {
    const productImage = await this.ormRepository.findOne({ where: { key } });

    return productImage;
  }

  public async save(productImage: ProductImage): Promise<ProductImage> {
    const newProductImage = await this.ormRepository.save(productImage);

    return newProductImage;
  }
}

export default ProductImagesRepository;
