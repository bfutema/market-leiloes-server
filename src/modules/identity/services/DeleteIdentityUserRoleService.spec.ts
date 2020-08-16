import AppError from '@shared/errors/AppError';

import FakeIdentityUserRolesRepository from '@modules/identity/repositories/fakes/FakeIdentityUserRolesRepository';
import DeleteIdentityUserRoleService from './DeleteIdentityUserRoleService';

let fakeIdentityUserRolesRepository: FakeIdentityUserRolesRepository;
let deleteIdentityUserRoleService: DeleteIdentityUserRoleService;

describe('DeleteIdentityUserRole', () => {
  beforeEach(() => {
    fakeIdentityUserRolesRepository = new FakeIdentityUserRolesRepository();

    deleteIdentityUserRoleService = new DeleteIdentityUserRoleService(
      fakeIdentityUserRolesRepository,
    );
  });

  it('should be able to delete identity user role by user_id and role_id', async () => {
    const identityUserRole = await fakeIdentityUserRolesRepository.create({
      user_id: 'user1',
      role_id: 1,
    });

    await deleteIdentityUserRoleService.execute({
      user_id: identityUserRole.user_id,
      role_id: identityUserRole.role_id,
    });

    const findIdentityUserRole = await fakeIdentityUserRolesRepository.findByUserIdAndRoleId(
      {
        user_id: identityUserRole.user_id,
        role_id: identityUserRole.role_id,
      },
    );

    expect(findIdentityUserRole).toBeUndefined();
  });

  it('should not be able to delete non existing identity user role', async () => {
    await expect(
      deleteIdentityUserRoleService.execute({
        user_id: 'non-existing-identity-user-role',
        role_id: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
