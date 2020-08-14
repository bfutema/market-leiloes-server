import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCandidatesService from '@modules/users/services/ListCandidatesService';

class CandidateController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listCandidatesService = container.resolve(ListCandidatesService);

    const candidates = await listCandidatesService.execute({ user_id });

    return response.json(candidates);
  }
}

export default CandidateController;
