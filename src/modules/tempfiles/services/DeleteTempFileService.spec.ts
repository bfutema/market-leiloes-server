import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeTempFilesRepository from '../repositories/fakes/FakeTempFilesRepository';
import CreateTempFileService from './CreateTempFileService';
import DeleteTempFileService from './DeleteTempFileService';

let fakeStorageProvider: FakeStorageProvider;
let fakeTempFilesRepository: FakeTempFilesRepository;
let createTempFileService: CreateTempFileService;
let deleteTempFileService: DeleteTempFileService;

describe('DeleteTempFile', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeTempFilesRepository = new FakeTempFilesRepository();

    createTempFileService = new CreateTempFileService(
      fakeStorageProvider,
      fakeTempFilesRepository,
    );

    deleteTempFileService = new DeleteTempFileService(
      fakeStorageProvider,
      fakeTempFilesRepository,
    );
  });

  it('should be able to delete temp file', async () => {
    const tempFile = await createTempFileService.execute({
      name: 'JohnDoe.jpeg',
      size: 64253,
      key: 'ff2f0d8ea6b22adaf50a37ccb036a8fa-JohnDoe.jpeg',
      url:
        'http://localhost:3333/files/ff2f0d8ea6b22adaf50a37ccb036a8fa-JohnDoe.jpeg',
    });

    const id = tempFile.id.toString();

    await deleteTempFileService.execute({ id });

    const deletedFile = await fakeTempFilesRepository.findById(id);

    expect(deletedFile).toBeUndefined();
  });
});
