import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async find(): Promise<Product[]> {
    const products = await this.ormRepository.find({
      relations: ['status'],
    });

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id, {
      relations: ['status'],
    });

    return product;
  }

  public async findByTitle(title: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { title },
      relations: ['status'],
    });

    return product;
  }

  public async save(product: Product): Promise<Product> {
    const newProduct = await this.ormRepository.save(product);

    return newProduct;
  }
}

export default ProductsRepository;
