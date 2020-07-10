import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: '123456',
      name: 'John',
      surname: 'Doe',
      cpf_cnpj: '12345678910',
      rg: '123456781',
      birth: new Date(),
      gender: 'M',
    });

    expect(user).toHaveProperty('id');
  });
});
