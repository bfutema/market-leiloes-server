import FakeIdentityUserRolesRepository from '@modules/identity/repositories/fakes/FakeIdentityUserRolesRepository';

import ListIdentityUserRolesService from './ListIdentityUserRolesService';

let fakeIdentityUserRolesRepository: FakeIdentityUserRolesRepository;
let listIdentityUserRolesService: ListIdentityUserRolesService;

describe('ListIdentityUserRoles', () => {
  beforeEach(() => {
    fakeIdentityUserRolesRepository = new FakeIdentityUserRolesRepository();

    listIdentityUserRolesService = new ListIdentityUserRolesService(
      fakeIdentityUserRolesRepository,
    );
  });

  it('should be able to list identity user roles', async () => {
    const identityUserRole1 = await fakeIdentityUserRolesRepository.create({
      user_id: 'user1',
      role_id: 1,
    });

    const identityUserRole2 = await fakeIdentityUserRolesRepository.create({
      user_id: 'user2',
      role_id: 2,
    });

    const identityUserRole3 = await fakeIdentityUserRolesRepository.create({
      user_id: 'user3',
      role_id: 3,
    });

    const identityUserRoles = await listIdentityUserRolesService.execute();

    expect(identityUserRoles).toEqual([
      identityUserRole1,
      identityUserRole2,
      identityUserRole3,
    ]);
  });
});
