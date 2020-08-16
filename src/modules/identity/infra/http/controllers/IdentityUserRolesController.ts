import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListIdentityUserRolesService from '@modules/identity/services/ListIdentityUserRolesService';
import CreateIdentityUserRoleService from '@modules/identity/services/CreateIdentityUserRoleService';
import DeleteIdentityUserRoleService from '@modules/identity/services/DeleteIdentityUserRoleService';

class IdentityUserRolesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listIdentityUserRolesService = container.resolve(
      ListIdentityUserRolesService,
    );

    const identityUserRoles = await listIdentityUserRolesService.execute();

    return response.json(identityUserRoles);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, role_id } = request.body;

    const createIdentityUserRoleService = container.resolve(
      CreateIdentityUserRoleService,
    );

    const identityUserRole = await createIdentityUserRoleService.execute({
      user_id,
      role_id,
    });

    return response.json(identityUserRole);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { user_id, role_id } = request.params;

    const deleteIdentityUserRoleService = container.resolve(
      DeleteIdentityUserRoleService,
    );

    await deleteIdentityUserRoleService.execute({
      user_id,
      role_id: Number(role_id),
    });

    return response.send();
  }
}

export default IdentityUserRolesController;
