import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateProductImageDTO from '@modules/products/dtos/ICreateProductImageDTO';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITempFilesRepository from '@modules/tempfiles/repositories/ITempFilesRepository';
import TempFile from '@modules/tempfiles/infra/typeorm/schemas/TempFile';
import IProductImagesRepository from '@modules/products/repositories/IProductImagesRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  title: string;
  description: string;
  note: string;
  images_ids: string[];
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductImagesRepository')
    private productImagesRepository: IProductImagesRepository,

    @inject('TempFilesRepository')
    private tempFilesRepository: ITempFilesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    title,
    description,
    note,
    images_ids,
  }: IRequest): Promise<Product> {
    const checkProductWithTitleExists = await this.productsRepository.findByTitle(
      title,
    );

    if (checkProductWithTitleExists) {
      throw new AppError('This title already used.');
    }

    const images = await this.tempFilesRepository.listInIds(images_ids);

    const product = await this.productsRepository.create({
      title,
      description,
      note,
    });

    if (images.length === images_ids.length) {
      await this.storageProvider.saveFiles(images);
      await this.tempFilesRepository.deleteFiles(images);

      const docs: ICreateProductImageDTO[] = images.map((image: TempFile) => {
        return {
          name: image.name,
          size: image.size,
          key: image.key,
          url: image.url.replace('/tempfiles/', '/files/'),
          product_id: product.id,
        };
      });

      await this.productImagesRepository.createFiles(docs);
    }

    return product;
  }
}

export default CreateProductService;
