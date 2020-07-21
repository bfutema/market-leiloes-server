import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUserRepository;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUserRepository();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

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
    });

    expect(user).toHaveProperty('id');
    expect(sendMail).toHaveBeenCalled();
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
