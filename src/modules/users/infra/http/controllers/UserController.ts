import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute();

    return response.json(users);
  }

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
      account_type,
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
      account_type,
    });

    delete user.password_hash;

    return response.json(user);
  }
}
