import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    delete user.password_hash;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      username,
      email,
      old_password,
      password,
      name,
      surname,
      cpf_cnpj,
      rg,
      birth,
      gender,
    } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      username,
      email,
      old_password,
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
