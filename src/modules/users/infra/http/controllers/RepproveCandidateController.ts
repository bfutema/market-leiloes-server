import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RepproveCandidateService from '@modules/users/services/RepproveCandidateService';

class RepproveCandidateController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const repproveCandidateService = container.resolve(
      RepproveCandidateService,
    );

    await repproveCandidateService.execute({ user_id });

    return response.send();
  }
}

export default RepproveCandidateController;
