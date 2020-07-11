import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  username: string;
  email: string;
  old_password?: string;
  password?: string;
  name: string;
  surname: string;
  cpf_cnpj: string;
  rg: string;
  birth: Date;
  gender: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(userData: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userData.user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(
      userData.email,
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userData.user_id) {
      throw new AppError('E-mail already in use.');
    }

    user.username = userData.username;
    user.email = userData.email;
    user.name = userData.name;
    user.surname = userData.surname;
    user.cpf_cnpj = userData.cpf_cnpj;
    user.rg = userData.rg;
    user.gender = userData.gender;

    if (userData.password && !userData.old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (userData.password && userData.old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        userData.old_password,
        user.password_hash,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password_hash = await this.hashProvider.generateHash(
        userData.password,
      );
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
