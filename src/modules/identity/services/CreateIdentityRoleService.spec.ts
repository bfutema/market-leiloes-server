import AppError from '@shared/errors/AppError';

import FakeIdentityRolesRepository from '@modules/identity/repositories/fakes/FakeIdentityRolesRepository';
import CreateIdentityRoleService from '@modules/identity/services/CreateIdentityRoleService';

let fakeIdentityRolesRepository: FakeIdentityRolesRepository;
let createIdentityRoleService: CreateIdentityRoleService;

describe('CreateIdentityRole', () => {
  beforeEach(() => {
    fakeIdentityRolesRepository = new FakeIdentityRolesRepository();

    createIdentityRoleService = new CreateIdentityRoleService(
      fakeIdentityRolesRepository,
    );
  });

  it('should be able to create a new identity role', async () => {
    const identityRole = await createIdentityRoleService.execute({
      name: 'Admin',
    });

    expect(identityRole).toHaveProperty('id');
  });

  it('should not be able to create a new identity role with same name from another', async () => {
    await createIdentityRoleService.execute({
      name: 'Admin',
    });

    await expect(
      createIdentityRoleService.execute({
        name: 'Admin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
