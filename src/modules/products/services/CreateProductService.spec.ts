import AppError from '@shared/errors/AppError';

import FakeTempFilesRepository from '@modules/tempfiles/repositories/fakes/FakeTempFilesRepository';
import FakeProductImagesRepository from '@modules/products/repositories/fakes/FakeProductImagesRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeTempFilesRepository: FakeTempFilesRepository;
let fakeProductImagesRepository: FakeProductImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeProductsRepository: FakeProductsRepository;
let createProductService: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeTempFilesRepository = new FakeTempFilesRepository();
    fakeProductImagesRepository = new FakeProductImagesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeProductsRepository = new FakeProductsRepository();

    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeProductImagesRepository,
      fakeTempFilesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new product', async () => {
    const saveFiles = jest.spyOn(fakeStorageProvider, 'saveFiles');
    const deleteFiles = jest.spyOn(fakeTempFilesRepository, 'deleteFiles');
    const createFiles = jest.spyOn(fakeProductImagesRepository, 'createFiles');

    const image1 = await fakeTempFilesRepository.create({
      name: 'image1.jpeg',
      size: 84862,
      key: 'ff2f0d8ea6b22adaf50a37ccb036a8fa-image1.jpeg',
      url:
        'http://localhost:3333/files/ff2f0d8ea6b22adaf50a37ccb036a8fa-image1.jpeg',
    });

    const image2 = await fakeTempFilesRepository.create({
      name: 'image2.jpeg',
      size: 72059,
      key: 'ff2f0d8ea6b22adaf50a37ccb036a8fa-image2.jpeg',
      url:
        'http://localhost:3333/files/ff2f0d8ea6b22adaf50a37ccb036a8fa-image2.jpeg',
    });

    const user = await createProductService.execute({
      title: 'Product 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus sem, faucibus in leo vel, rhoncus viverra neque.',
      note:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus sem, faucibus in leo vel, rhoncus viverra neque.',
      images_ids: [image1.id.toString(), image2.id.toString()],
    });

    expect(user).toHaveProperty('id');

    expect(saveFiles).toHaveBeenCalled();
    expect(deleteFiles).toHaveBeenCalled();
    expect(createFiles).toHaveBeenCalled();
  });

  it('should not be able to create a new product with same title from another', async () => {
    await createProductService.execute({
      title: 'Product 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus sem, faucibus in leo vel, rhoncus viverra neque.',
      note:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus sem, faucibus in leo vel, rhoncus viverra neque.',
      images_ids: [''],
    });

    await expect(
      createProductService.execute({
        title: 'Product 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus sem, faucibus in leo vel, rhoncus viverra neque.',
        note:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus sem, faucibus in leo vel, rhoncus viverra neque.',
        images_ids: [''],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new product without images_ids field not fill', async () => {
    await createProductService.execute({
      title: 'Product 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus sem, faucibus in leo vel, rhoncus viverra neque.',
      note:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus sem, faucibus in leo vel, rhoncus viverra neque.',
      images_ids: [''],
    });

    await expect(
      createProductService.execute({
        title: 'Product 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus sem, faucibus in leo vel, rhoncus viverra neque.',
        note:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus sem, faucibus in leo vel, rhoncus viverra neque.',
        images_ids: [''],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
