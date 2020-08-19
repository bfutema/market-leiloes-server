import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListBiddersService from './ListBiddersService';

let fakeUsersRepository: FakeUsersRepository;
let listBiddersService: ListBiddersService;

describe('ListBidders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listBiddersService = new ListBiddersService(fakeUsersRepository);
  });

  it('should be able to list bidders', async () => {
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
      account_type: 'bidder',
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

    const candidates = await listBiddersService.execute({
      user_id: loggedUser.id,
    });

    expect(candidates).toEqual([bidder]);
  });
});
