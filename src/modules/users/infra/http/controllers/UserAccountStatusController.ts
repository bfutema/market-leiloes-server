import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserAccountStatusService from '@modules/users/services/CreateUserAccountStatusService';

export default class UserAccountStatusController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;

    const createUserAccountStatus = container.resolve(CreateUserAccountStatusService);

    const userAccountStatus = await createUserAccountStatus.execute({
      description,
    });

    return response.json(userAccountStatus);
  }
}
