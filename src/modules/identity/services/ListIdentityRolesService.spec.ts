import FakeIdentityRolesRepository from '@modules/identity/repositories/fakes/FakeIdentityRolesRepository';

import ListIdentityRolesService from './ListIdentityRolesService';

let fakeIdentityRolesRepository: FakeIdentityRolesRepository;
let listIdentityRolesService: ListIdentityRolesService;

describe('ListIdentityRoles', () => {
  beforeEach(() => {
    fakeIdentityRolesRepository = new FakeIdentityRolesRepository();

    listIdentityRolesService = new ListIdentityRolesService(
      fakeIdentityRolesRepository,
    );
  });

  it('should be able to list identity roles', async () => {
    const adminRole = await fakeIdentityRolesRepository.create({
      name: 'Admin',
    });

    const bidderRole = await fakeIdentityRolesRepository.create({
      name: 'Bidder',
    });

    const clientRole = await fakeIdentityRolesRepository.create({
      name: 'Client',
    });

    const identityRoles = await listIdentityRolesService.execute();

    expect(identityRoles).toEqual([adminRole, bidderRole, clientRole]);
  });
});
