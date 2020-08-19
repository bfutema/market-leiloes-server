import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListClientsService from './ListClientsService';

let fakeUsersRepository: FakeUsersRepository;
let listClientsService: ListClientsService;

describe('ListClients', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listClientsService = new ListClientsService(fakeUsersRepository);
  });

  it('should be able to list clients', async () => {
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
      account_type: 'client',
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
      account_type: 'client',
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
      account_type: 'client',
    });

    const candidates = await listClientsService.execute({
      user_id: loggedUser.id,
    });

    expect(candidates).toEqual([client, bidder]);
  });
});
