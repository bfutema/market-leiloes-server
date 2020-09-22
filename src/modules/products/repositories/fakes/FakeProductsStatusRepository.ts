import IProductsStatusRepository from '@modules/products/repositories/IProductsStatusRepository';

import ProductStatus from '../../infra/typeorm/entities/ProductStatus';

class FakeProductsStatusRepository implements IProductsStatusRepository {
  private productsStatus: ProductStatus[] = [];

  public async create(description: string): Promise<ProductStatus> {
    const productStatus = new ProductStatus();

    Object.assign(productStatus, {
      id: this.productsStatus.length + 1,
      description,
    });

    this.productsStatus.push(productStatus);

    return productStatus;
  }

  public async findById(id: number): Promise<ProductStatus | undefined> {
    const findProductStatus = this.productsStatus.find(
      productStatus => productStatus.id === id,
    );

    return findProductStatus;
  }

  public async findByDescription(
    description: string,
  ): Promise<ProductStatus | undefined> {
    const findUserAccountStatus = this.productsStatus.find(
      productStatus => productStatus.description === description,
    );

    return findUserAccountStatus;
  }

  public async save(productStatus: ProductStatus): Promise<ProductStatus> {
    const findIndex = this.productsStatus.findIndex(
      findProductStatus => findProductStatus.id === productStatus.id,
    );

    this.productsStatus[findIndex] = productStatus;

    return productStatus;
  }
}

export default FakeProductsStatusRepository;
