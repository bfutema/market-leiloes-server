import AppError from '@shared/errors/AppError';

import FakeIdentityRolesRepository from '@modules/identity/repositories/fakes/FakeIdentityRolesRepository';

import UpdateIdentityRoleService from '@modules/identity/services/UpdateIdentityRoleService';

let fakeIdentityRolesRepository: FakeIdentityRolesRepository;
let updateIdentityRoleService: UpdateIdentityRoleService;

describe('UpdateIdentityRoles', () => {
  beforeEach(() => {
    fakeIdentityRolesRepository = new FakeIdentityRolesRepository();

    updateIdentityRoleService = new UpdateIdentityRoleService(
      fakeIdentityRolesRepository,
    );
  });

  it('should be able to update identity role', async () => {
    const identityRole = await fakeIdentityRolesRepository.create({
      name: 'Admin',
    });

    await updateIdentityRoleService.execute({
      id: identityRole.id,
      name: 'SuperAdmin',
    });

    expect(identityRole.name).toBe('SuperAdmin');
  });

  it('should not be able to update non existing identity role', async () => {
    await expect(
      updateIdentityRoleService.execute({
        id: 0,
        name: 'SuperAdmin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
