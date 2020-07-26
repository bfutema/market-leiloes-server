import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ValidatorUserService from '@modules/users/services/ValidatorUserService';

class ValidatorController {
  public async post(request: Request, response: Response): Promise<Response> {
    const { type, value } = request.body;

    const validatorUserService = container.resolve(ValidatorUserService);

    const message = await validatorUserService.execute({
      validate: { type, value },
    });

    return response.json({ message });
  }
}

export default ValidatorController;
