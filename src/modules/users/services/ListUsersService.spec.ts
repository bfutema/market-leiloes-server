import FakeTempFilesRepository from '@modules/tempfiles/repositories/fakes/FakeTempFilesRepository';
import FakeUserDocumentsRepository from '@modules/users/repositories/fakes/FakeUserDocumentsRepository';
import FakeUserAvatarsRepository from '@modules/users/repositories/fakes/FakeUserAvatarsRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import ListUsersService from './ListUsersService';

let fakeTempFilesRepository: FakeTempFilesRepository;
let fakeUserDocumentsRepository: FakeUserDocumentsRepository;
let fakeUserAvatarsRepository: FakeUserAvatarsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeStorageProvider: FakeStorageProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let listUsersService: ListUsersService;

describe('ListCandidates', () => {
  beforeEach(() => {
    fakeTempFilesRepository = new FakeTempFilesRepository();
    fakeUserDocumentsRepository = new FakeUserDocumentsRepository();
    fakeUserAvatarsRepository = new FakeUserAvatarsRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();

    listUsersService = new ListUsersService(fakeUsersRepository);

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeTempFilesRepository,
      fakeMailProvider,
      fakeHashProvider,
      fakeStorageProvider,
      fakeUserDocumentsRepository,
      fakeUserAvatarsRepository,
    );
  });

  it('should be able to list users with account under analysis', async () => {
    const file = await fakeTempFilesRepository.create({
      name: 'JohnDoe.jpeg',
      size: 64253,
      key: 'ff2f0d8ea6b22adaf50a37ccb036a8fa-JohnDoe.jpeg',
      url:
        'http://localhost:3333/files/ff2f0d8ea6b22adaf50a37ccb036a8fa-JohnDoe.jpeg',
    });

    const birth = new Date();

    const user = await createUserService.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: '123456',
      name: 'John',
      surname: 'Doe',
      cpf_cnpj: '12345678910',
      rg: '123456781',
      birth,
      gender: 'M',
      avatar_id: file.id.toString(),
      documents_ids: [''],
      account_type: 'client',
    });

    const users = await listUsersService.execute();

    expect(users).toEqual([user]);
  });

  it('should be able to list users', async () => {
    const file = await fakeTempFilesRepository.create({
      name: 'JohnDoe.jpeg',
      size: 64253,
      key: 'ff2f0d8ea6b22adaf50a37ccb036a8fa-JohnDoe.jpeg',
      url:
        'http://localhost:3333/files/ff2f0d8ea6b22adaf50a37ccb036a8fa-JohnDoe.jpeg',
    });

    const birth = new Date();

    const user = await createUserService.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: '123456',
      name: 'John',
      surname: 'Doe',
      cpf_cnpj: '12345678910',
      rg: '123456781',
      birth,
      gender: 'M',
      avatar_id: file.id.toString(),
      documents_ids: [''],
      account_type: 'client',
    });

    const users = await listUsersService.execute();

    expect(users).toEqual([user]);
  });
});
