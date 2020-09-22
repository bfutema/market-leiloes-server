import AppError from '@shared/errors/AppError';

import FakeTempFilesRepository from '@modules/tempfiles/repositories/fakes/FakeTempFilesRepository';
import FakeUserDocumentsRepository from '@modules/users/repositories/fakes/FakeUserDocumentsRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserAvatarsRepository from '../repositories/fakes/FakeUserAvatarsRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import CreateUserService from './CreateUserService';

let fakeTempFilesRepository: FakeTempFilesRepository;
let fakeUserDocumentsRepository: FakeUserDocumentsRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUserAvatarsRepository: FakeUserAvatarsRepository;
let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatarService: UpdateUserAvatarService;
let createUserService: CreateUserService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUserAvatarsRepository = new FakeUserAvatarsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeTempFilesRepository = new FakeTempFilesRepository();
    fakeUserDocumentsRepository = new FakeUserDocumentsRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeTempFilesRepository,
      fakeMailProvider,
      fakeHashProvider,
      fakeStorageProvider,
      fakeUserDocumentsRepository,
      fakeUserAvatarsRepository,
    );

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeUserAvatarsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update avatar from user', async () => {
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
      account_type: 'client',
    });

    const userAvatar = await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_file_name: 'avatar.jpg',
    });

    expect(userAvatar?.key).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatar_file_name: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update non existing avatar', async () => {
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
      avatar_id: '',
      documents_ids: [document1.id.toString(), document2.id.toString()],
      account_type: 'client',
    });

    await expect(
      updateUserAvatarService.execute({
        user_id: user.id,
        avatar_file_name: 'non-existing-avatar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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
      account_type: 'client',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_file_name: 'avatar1.jpg',
    });

    const userAvatar = await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_file_name: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar1.jpg');
    expect(userAvatar?.key).toBe('avatar2.jpg');
  });
});
