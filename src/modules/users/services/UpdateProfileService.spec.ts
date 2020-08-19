import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
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

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      username: 'JohnTre',
      email: 'johntre@example.com',
      name: 'Johnn',
      surname: 'Tre',
      cpf_cnpj: '12345678911',
      rg: '123456782',
      birth: new Date(),
      gender: 'F',
    });

    expect(updatedUser.username).toBe('JohnTre');
    expect(updatedUser.email).toBe('johntre@example.com');
    expect(updatedUser.name).toBe('Johnn');
    expect(updatedUser.surname).toBe('Tre');
    expect(updatedUser.cpf_cnpj).toBe('12345678911');
    expect(updatedUser.rg).toBe('123456782');
    expect(updatedUser.gender).toBe('F');
  });

  it('should not be able to update the profile with non existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        username: 'JohnTre',
        email: 'johntre@example.com',
        name: 'Johnn',
        surname: 'Tre',
        cpf_cnpj: '12345678911',
        rg: '123456782',
        birth: new Date(),
        gender: 'F',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
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

    const user = await fakeUsersRepository.create({
      username: 'JohnTre',
      email: 'johntre@example.com',
      password_hash: '123456',
      name: 'John',
      surname: 'Tre',
      cpf_cnpj: '12345678911',
      rg: '123456782',
      birth: new Date(),
      gender: 'M',
      account_type: 'client',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        username: 'JohnTre',
        email: 'johndoe@example.com',
        name: 'Johnn',
        surname: 'Tre',
        cpf_cnpj: '12345678911',
        rg: '123456782',
        birth: new Date(),
        gender: 'F',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
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

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      username: 'JohnTre',
      email: 'johntre@example.com',
      name: 'Johnn',
      surname: 'Tre',
      cpf_cnpj: '12345678911',
      rg: '123456782',
      birth: new Date(),
      gender: 'F',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password_hash).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
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

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        username: 'JohnTre',
        email: 'johntre@example.com',
        name: 'Johnn',
        surname: 'Tre',
        cpf_cnpj: '12345678911',
        rg: '123456782',
        birth: new Date(),
        gender: 'F',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
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

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        username: 'JohnTre',
        email: 'johntre@example.com',
        name: 'Johnn',
        surname: 'Tre',
        cpf_cnpj: '12345678911',
        rg: '123456782',
        birth: new Date(),
        gender: 'F',
        password: '123123',
        old_password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
