import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeTempFilesRepository from '../repositories/fakes/FakeTempFilesRepository';
import CreateTempFileService from './CreateTempFileService';

let fakeStorageProvider: FakeStorageProvider;
let fakeTempFilesRepository: FakeTempFilesRepository;
let createTempFileService: CreateTempFileService;

describe('CreateTempFile', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeTempFilesRepository = new FakeTempFilesRepository();

    createTempFileService = new CreateTempFileService(
      fakeStorageProvider,
      fakeTempFilesRepository,
    );
  });

  it('should be able to upload documents from user', async () => {
    const file = await createTempFileService.execute({
      name: 'JohnDoe.jpeg',
      size: 64253,
      key: 'ff2f0d8ea6b22adaf50a37ccb036a8fa-JohnDoe.jpeg',
      url:
        'http://localhost:3333/files/ff2f0d8ea6b22adaf50a37ccb036a8fa-JohnDoe.jpeg',
    });

    expect(file).toHaveProperty('id');
  });
});
