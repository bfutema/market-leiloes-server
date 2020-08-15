import AppError from '@shared/errors/AppError';

import FakeIdentityUserRolesRepository from '@modules/identity/repositories/fakes/FakeIdentityUserRolesRepository';
import CreateIdentityUserRoleService from './CreateIdentityUserRoleService';

let fakeIdentityUserRolesRepository: FakeIdentityUserRolesRepository;
let createIdentityUserRoleService: CreateIdentityUserRoleService;

describe('CreateIdentityUserRole', () => {
  beforeEach(() => {
    fakeIdentityUserRolesRepository = new FakeIdentityUserRolesRepository();

    createIdentityUserRoleService = new CreateIdentityUserRoleService(
      fakeIdentityUserRolesRepository,
    );
  });

  it('should be able to create a new identity user role', async () => {
    const identityUserRole = await createIdentityUserRoleService.execute({
      user_id: 'user1',
      role_id: 1,
    });

    expect(identityUserRole.user_id).toEqual('user1');
    expect(identityUserRole.role_id).toEqual(1);
  });

  it('should not be able to create a new identity user role with same user_id and role_id', async () => {
    await createIdentityUserRoleService.execute({
      user_id: 'user1',
      role_id: 1,
    });

    await expect(
      createIdentityUserRoleService.execute({
        user_id: 'user1',
        role_id: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
