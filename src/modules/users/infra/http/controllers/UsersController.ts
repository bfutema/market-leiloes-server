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
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      username,
      email,
      password,
      name,
      surname,
      cpf_cnpj,
      rg,
      birth,
      gender,
    });

    delete user.password_hash;

    return response.json(user);
  }
}
