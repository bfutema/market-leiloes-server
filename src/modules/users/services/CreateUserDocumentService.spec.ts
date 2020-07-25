import AppError from '@shared/errors/AppError';

import FakeTempFilesRepository from '@modules/tempfiles/repositories/fakes/FakeTempFilesRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserDocumentsRepository from '../repositories/fakes/FakeUserDocumentsRepository';
import CreateUserDocumentService from './CreateUserDocumentService';
import CreateUserService from './CreateUserService';

let fakeTempFilesRepository: FakeTempFilesRepository;
let fakeMailProvider: FakeMailProvider;
let fakeStorageProvider: FakeStorageProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUserRepository;
let fakeUserDocumentsRepository: FakeUserDocumentsRepository;
let createUserDocumentService: CreateUserDocumentService;
let createUserService: CreateUserService;

describe('CreateUserDocument', () => {
  beforeEach(() => {
    fakeTempFilesRepository = new FakeTempFilesRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUserRepository();
    fakeUserDocumentsRepository = new FakeUserDocumentsRepository();

    createUserDocumentService = new CreateUserDocumentService(
      fakeUsersRepository,
      fakeUserDocumentsRepository,
    );

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeTempFilesRepository,
      fakeMailProvider,
      fakeHashProvider,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new user document', async () => {
    const user = await createUserService.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: '123456',
      name: 'John',
      surname: 'Doe',
      cpf_cnpj: '12345678910',
      rg: '123456781',
      birth: new Date(),
      gender: 'M',
      avatar_id: '',
      documents_ids: [''],
    });

    const userDocument = await createUserDocumentService.execute({
      name: 'document.jpeg',
      size: 12333,
      key: 'asdfghjkl-document.jpeg',
      url: 'http://localhost:3333/users/documents/asdfghjkl-document.jpeg',
      user_id: user.id,
    });

    expect(userDocument).toHaveProperty('id');
  });

  it('should not be able to create a new user document from non existing user', async () => {
    await expect(
      createUserDocumentService.execute({
        name: 'document.jpeg',
        size: 13222,
        key: 'asdfghjkl-document.jpeg',
        url: 'http://localhost:3333/users/documents/asdfghjkl-document.jpeg',
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
