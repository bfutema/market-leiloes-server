import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ApproveCandidateService from '@modules/users/services/ApproveCandidateService';

class ApproveCandidateController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const approveCandidateService = container.resolve(ApproveCandidateService);

    await approveCandidateService.execute({ user_id });

    return response.send();
  }
}

export default ApproveCandidateController;
