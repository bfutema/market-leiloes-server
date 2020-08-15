import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateIdentityUserRoleService from '@modules/identity/services/CreateIdentityUserRoleService';

class IdentityUserRolesController {
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
}

export default IdentityUserRolesController;
