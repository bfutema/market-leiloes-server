import AppError from '@shared/errors/AppError';

import FakeUserAvatarsRepository from '../repositories/fakes/FakeUserAvatarsRepository';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserAvatarService from './CreateUserAvatarService';

let fakeUsersRepository: FakeUserRepository;
let fakeUserAvatarsRepository: FakeUserAvatarsRepository;
let createUserAvatarService: CreateUserAvatarService;

describe('CreateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeUserAvatarsRepository = new FakeUserAvatarsRepository();

    createUserAvatarService = new CreateUserAvatarService(
      fakeUsersRepository,
      fakeUserAvatarsRepository,
    );
  });

  it('should be able to create a new user avatar', async () => {
    const user = await fakeUsersRepository.create({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      name: 'John',
      surname: 'Doe',
      cpf_cnpj: '12345678910',
      rg: '123456781',
      birth: new Date(),
      gender: 'M',
      account_type: 'client',
    });

    const userAvatar = await createUserAvatarService.execute({
      name: 'avatar.jpeg',
      size: 12333,
      key: 'asdfghjkl-avatar.jpeg',
      url: 'http://localhost:3333/users/avatars/asdfghjkl-avatar.jpeg',
      user_id: user.id,
    });

    expect(userAvatar).toHaveProperty('id');
  });

  it('should not be able to create a new user avatar from non existing user', async () => {
    await expect(
      createUserAvatarService.execute({
        name: 'avatar.jpeg',
        size: 13222,
        key: 'asdfghjkl-avatar.jpeg',
        url: 'http://localhost:3333/users/avatars/asdfghjkl-avatar.jpeg',
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
