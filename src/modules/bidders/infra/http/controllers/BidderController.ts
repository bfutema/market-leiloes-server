import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListBiddersService from '@modules/bidders/services/ListBiddersService';

export default class BidderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listBiddersService = container.resolve(ListBiddersService);

    const bidders = await listBiddersService.execute({ user_id });

    return response.json(bidders);
  }
}
