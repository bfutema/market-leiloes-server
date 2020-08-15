import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListIdentityRolesService from '@modules/identity/services/ListIdentityRolesService';
import CreateIdentityRoleService from '@modules/identity/services/CreateIdentityRoleService';

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
}

export default IdentityRolesController;
