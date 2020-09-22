import { uuid } from 'uuidv4';

import IProductImagesRepository from '@modules/products/repositories/IProductImagesRepository';
import ICreateProductImageDTO from '@modules/products/dtos/ICreateProductImageDTO';

import ProductImage from '../../infra/typeorm/entities/ProductImage';

class FakeProductImagesRepository implements IProductImagesRepository {
  private productImages: ProductImage[] = [];

  public async create(
    productImageData: ICreateProductImageDTO,
  ): Promise<ProductImage> {
    const productImage = new ProductImage();

    Object.assign(productImage, { id: uuid() }, productImageData);

    this.productImages.push(productImage);

    return productImage;
  }

  public async createFiles(
    productImagesData: ICreateProductImageDTO[],
  ): Promise<ProductImage[]> {
    const productImages = productImagesData.map(
      (productImageData: ICreateProductImageDTO) => {
        const productImage = new ProductImage();

        Object.assign(productImage, { id: uuid() }, productImageData);

        this.productImages.push(productImage);

        return productImage;
      },
    );

    return productImages;
  }

  public async findById(id: string): Promise<ProductImage | undefined> {
    const findProductImage = this.productImages.find(
      productImage => productImage.id === id,
    );

    return findProductImage;
  }

  public async findByKey(key: string): Promise<ProductImage | undefined> {
    const findProductImage = this.productImages.find(
      productImage => productImage.key === key,
    );

    return findProductImage;
  }

  public async save(productImage: ProductImage): Promise<ProductImage> {
    const findIndex = this.productImages.findIndex(
      findProductImage => findProductImage.id === productImage.id,
    );

    this.productImages[findIndex] = productImage;

    return productImage;
  }
}

export default FakeProductImagesRepository;
