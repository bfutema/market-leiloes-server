import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      username,
      email,
      password,
      name,
      surname,
      cpf_cnpj,
      rg,
      birth,
      gender,
      avatar_id,
      documents_ids,
    } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      username,
      email,
      password,
      name,
      surname,
      cpf_cnpj,
      rg,
      birth,
      gender,
      avatar_id,
      documents_ids,
    });

    delete user.password_hash;

    return response.json(user);
  }
}
