import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const birth = new Date();

    const user = await fakeUsersRepository.create({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      name: 'John',
      surname: 'Doe',
      cpf_cnpj: '12345678910',
      rg: '123456781',
      birth,
      gender: 'M',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.username).toBe('JohnDoe');
    expect(profile.email).toBe('johndoe@example.com');
    expect(profile.password_hash).toBe('123456');
    expect(profile.name).toBe('John');
    expect(profile.surname).toBe('Doe');
    expect(profile.cpf_cnpj).toBe('12345678910');
    expect(profile.rg).toBe('123456781');
    expect(profile.birth).toBe(birth);
    expect(profile.gender).toBe('M');
  });

  it('should not be able to show the profile from non existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
