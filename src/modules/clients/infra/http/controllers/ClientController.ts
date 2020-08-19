import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListClientsService from '@modules/clients/services/ListClientsService';

export default class ClientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listClientsService = container.resolve(ListClientsService);

    const clients = await listClientsService.execute({ user_id });

    return response.json(clients);
  }
}
