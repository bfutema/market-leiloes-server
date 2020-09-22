import { getRepository, Repository } from 'typeorm';

import IProductsStatusRepository from '@modules/products/repositories/IProductsStatusRepository';

import ProductStatus from '../entities/ProductStatus';

class ProductsStatusRepository implements IProductsStatusRepository {
  private ormRepository: Repository<ProductStatus>;

  constructor() {
    this.ormRepository = getRepository(ProductStatus);
  }

  public async create(description: string): Promise<ProductStatus> {
    const productStatus = this.ormRepository.create({ description });

    await this.ormRepository.save(productStatus);

    return productStatus;
  }

  public async findById(id: number): Promise<ProductStatus | undefined> {
    const productStatus = await this.ormRepository.findOne(id);

    return productStatus;
  }

  public async findByDescription(
    description: string,
  ): Promise<ProductStatus | undefined> {
    const productStatus = this.ormRepository.findOne({
      where: { description },
    });

    return productStatus;
  }

  public async save(productStatus: ProductStatus): Promise<ProductStatus> {
    const newProductStatus = await this.ormRepository.save(productStatus);

    return newProductStatus;
  }
}

export default ProductsStatusRepository;
