import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListIdentityRolesService from '@modules/identity/services/ListIdentityRolesService';
import CreateIdentityRoleService from '@modules/identity/services/CreateIdentityRoleService';
import UpdateIdentityRoleService from '@modules/identity/services/UpdateIdentityRoleService';

class IdentityRolesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listIdentityRolesService = container.resolve(
      ListIdentityRolesService,
    );

    const identityRoles = await listIdentityRolesService.execute();

    return response.json(identityRoles);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createIdentityRoleService = container.resolve(
      CreateIdentityRoleService,
    );

    const identityRole = await createIdentityRoleService.execute({
      name,
    });

    return response.json(identityRole);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    const updateIdentityRoleService = container.resolve(
      UpdateIdentityRoleService,
    );

    const updatedIdentityRole = await updateIdentityRoleService.execute({
      id,
      name,
    });

    return response.json(updatedIdentityRole);
  }
}

export default IdentityRolesController;
