import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListCandidatesService from './ListCandidatesService';

let fakeUsersRepository: FakeUsersRepository;
let listCandidatesService: ListCandidatesService;

describe('ListCandidates', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listCandidatesService = new ListCandidatesService(fakeUsersRepository);
  });

  it('should be able to list users with suatus_id equals 1', async () => {
    const client = await fakeUsersRepository.create({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      name: 'John',
      surname: 'Doe',
      cpf_cnpj: '12345678910',
      rg: '123456781',
      birth: new Date(),
      gender: 'M',
    });

    const bidder = await fakeUsersRepository.create({
      username: 'JohnTre',
      email: 'johntre@example.com',
      password_hash: '123456',
      name: 'John',
      surname: 'Tre',
      cpf_cnpj: '12345678911',
      rg: '123456782',
      birth: new Date(),
      gender: 'F',
    });

    const loggedUser = await fakeUsersRepository.create({
      username: 'JohnQua',
      email: 'johnqua@example.com',
      password_hash: '123456',
      name: 'John',
      surname: 'Qua',
      cpf_cnpj: '12345678913',
      rg: '123456783',
      birth: new Date(),
      gender: 'M',
    });

    const candidates = await listCandidatesService.execute({
      user_id: loggedUser.id,
    });

    expect(candidates).toEqual([client, bidder]);
  });
});
