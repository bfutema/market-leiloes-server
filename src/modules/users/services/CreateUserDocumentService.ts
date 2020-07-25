import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserDocumentsRepository from '@modules/users/repositories/IUserDocumentsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import UserDocument from '../infra/typeorm/entities/UserDocument';

interface IRequest {
  name: string;
  size: number;
  key: string;
  url: string;
  user_id: string;
}

@injectable()
class CreateUserDocumentService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserDocumentsRepository')
    private userDocumentsRepository: IUserDocumentsRepository,
  ) {}

  public async execute({
    name,
    size,
    key,
    url,
    user_id,
  }: IRequest): Promise<UserDocument> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const userDocument = await this.userDocumentsRepository.create({
      name,
      size,
      key,
      url,
      user_id,
    });

    return userDocument;
  }
}

export default CreateUserDocumentService;
