import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  cpf_cnpj: string;
  rg: string;
  birth: Date;
  gender: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    email,
    password,
    name,
    surname,
    cpf_cnpj,
    rg,
    birth,
    gender,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const password_hash = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      username,
      email,
      password_hash,
      name,
      surname,
      cpf_cnpj,
      rg,
      birth,
      gender,
    });

    return user;
  }
}

export default CreateUserService;
