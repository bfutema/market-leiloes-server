import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateIdentityRoleService from '@modules/identity/services/CreateIdentityRoleService';

class IdentityRolesController {
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
