import AppError from '@shared/errors/AppError';

import FakeTempFilesRepository from '@modules/tempfiles/repositories/fakes/FakeTempFilesRepository';
import FakeUserDocumentsRepository from '@modules/users/repositories/fakes/FakeUserDocumentsRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeTempFilesRepository: FakeTempFilesRepository;
let fakeUserDocumentsRepository: FakeUserDocumentsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeStorageProvider: FakeStorageProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUserRepository;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeTempFilesRepository = new FakeTempFilesRepository();
    fakeUserDocumentsRepository = new FakeUserDocumentsRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUserRepository();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeTempFilesRepository,
      fakeMailProvider,
      fakeHashProvider,
      fakeStorageProvider,
      fakeUserDocumentsRepository,
    );
  });

  it('should be able to create a new user', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const saveFile = jest.spyOn(fakeStorageProvider, 'saveFile');
    const deleteFile = jest.spyOn(fakeTempFilesRepository, 'delete');
    const createFile = jest.spyOn(fakeUserDocumentsRepository, 'create');

    const saveFiles = jest.spyOn(fakeStorageProvider, 'saveFiles');
    const deleteFiles = jest.spyOn(fakeTempFilesRepository, 'deleteFiles');
    const createFiles = jest.spyOn(fakeUserDocumentsRepository, 'createFiles');

    const avatar = await fakeTempFilesRepository.create({
      name: 'JohnDoe.jpeg',
      size: 64253,
      key: 'ff2f0d8ea6b22adaf50a37ccb036a8fa-JohnDoe.jpeg',
      url:
        'http://localhost:3333/files/ff2f0d8ea6b22adaf50a37ccb036a8fa-JohnDoe.jpeg',
    });

    const document1 = await fakeTempFilesRepository.create({
      name: 'document1.jpeg',
      size: 84862,
      key: 'ff2f0d8ea6b22adaf50a37ccb036a8fa-document1.jpeg',
      url:
        'http://localhost:3333/files/ff2f0d8ea6b22adaf50a37ccb036a8fa-document1.jpeg',
    });

    const document2 = await fakeTempFilesRepository.create({
      name: 'document2.jpeg',
      size: 72059,
      key: 'ff2f0d8ea6b22adaf50a37ccb036a8fa-document2.jpeg',
      url:
        'http://localhost:3333/files/ff2f0d8ea6b22adaf50a37ccb036a8fa-document2.jpeg',
    });

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
      avatar_id: avatar.id.toString(),
      documents_ids: [document1.id.toString(), document2.id.toString()],
    });

    expect(user).toHaveProperty('id');
    expect(sendMail).toHaveBeenCalled();

    expect(saveFile).toHaveBeenCalled();
    expect(deleteFile).toHaveBeenCalled();
    expect(createFile).toHaveBeenCalled();

    expect(saveFiles).toHaveBeenCalled();
    expect(deleteFiles).toHaveBeenCalled();
    expect(createFiles).toHaveBeenCalled();
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
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

    await expect(
      createUserService.execute({
        username: 'JohnDoe2',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with same username from another', async () => {
    await createUserService.execute({
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

    await expect(
      createUserService.execute({
        username: 'JohnDoe',
        email: 'johndoe2@example.com',
        password: '123456',
        name: 'John',
        surname: 'Doe',
        cpf_cnpj: '12345678910',
        rg: '123456781',
        birth: new Date(),
        gender: 'M',
        avatar_id: '',
        documents_ids: [''],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user without documents_ids field not fill', async () => {
    await createUserService.execute({
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

    await expect(
      createUserService.execute({
        username: 'JohnDoe2',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
