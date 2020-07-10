import { parseISO } from 'date-fns';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  cpf_cnpj: string;
  rg: string;
  birth: string;
  gender: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    username,
    email,
    password,
    name,
    surname,
    cpf_cnpj,
    rg,
    birth: birth_date,
    gender,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const password_hash = await hash(password, 8);

    const birth = parseISO(birth_date);

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
