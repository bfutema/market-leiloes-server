import AppError from '@shared/errors/AppError';

import FakeIdentityRolesRepository from '@modules/identity/repositories/fakes/FakeIdentityRolesRepository';

import UpdateIdentityRolesService from '@modules/identity/services/UpdateIdentityRoleService';

let fakeIdentityRolesRepository: FakeIdentityRolesRepository;
let updateIdentityRolesService: UpdateIdentityRolesService;

describe('UpdateIdentityRoles', () => {
  beforeEach(() => {
    fakeIdentityRolesRepository = new FakeIdentityRolesRepository();

    updateIdentityRolesService = new UpdateIdentityRolesService(
      fakeIdentityRolesRepository,
    );
  });

  it('should be able to update identity role', async () => {
    const identityRole = await fakeIdentityRolesRepository.create({
      name: 'Admin',
    });

    await updateIdentityRolesService.execute({
      id: identityRole.id,
      name: 'SuperAdmin',
    });

    expect(identityRole.name).toBe('SuperAdmin');
  });

  it('should not be able to update non existing identity role', async () => {
    await expect(
      updateIdentityRolesService.execute({
        id: 0,
        name: 'SuperAdmin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
