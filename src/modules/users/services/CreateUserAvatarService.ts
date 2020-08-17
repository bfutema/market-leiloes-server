import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserAvatarsRepository from '../repositories/IUserAvatarsRepository';

import UserAvatar from '../infra/typeorm/entities/UserAvatar';

interface IRequest {
  name: string;
  size: number;
  key: string;
  url: string;
  user_id: string;
}

@injectable()
class CreateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserAvatarsRepository')
    private userAvatarsRepository: IUserAvatarsRepository,
  ) {}

  public async execute({
    name,
    size,
    key,
    url,
    user_id,
  }: IRequest): Promise<UserAvatar> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const userDocument = await this.userAvatarsRepository.create({
      name,
      size,
      key,
      url,
      user_id,
    });

    return userDocument;
  }
}

export default CreateUserAvatarService;
