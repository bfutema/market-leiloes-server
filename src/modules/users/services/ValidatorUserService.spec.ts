import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ValidatorUserService from './ValidatorUserService';

let fakeUsersRepository: FakeUsersRepository;
let validatorUserService: ValidatorUserService;

describe('Validators', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    validatorUserService = new ValidatorUserService(fakeUsersRepository);
  });

  it('should be able to validate non existing username', async () => {
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

    const valid = await validatorUserService.execute({
      validate: { type: 'username', value: 'JohnTre' },
    });

    expect(valid.success).toEqual(true);
  });

  it('should be able to validate username', async () => {
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

    const valid = await validatorUserService.execute({
      validate: { type: 'username', value: 'JohnDoe' },
    });

    expect(valid.success).toEqual(false);
  });

  it('should be able to validate non existing email', async () => {
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

    const valid = await validatorUserService.execute({
      validate: { type: 'email', value: 'johntre@example.com' },
    });

    expect(valid.success).toEqual(true);
  });

  it('should be able to validate email', async () => {
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

    const valid = await validatorUserService.execute({
      validate: { type: 'email', value: 'johndoe@example.com' },
    });

    expect(valid.success).toEqual(false);
  });

  it('should not be able to validate with non passing validate value', async () => {
    const valid = await validatorUserService.execute({
      validate: { type: '', value: '' },
    });

    expect(valid.success).toEqual(true);
  });
});
