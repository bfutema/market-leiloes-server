import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserAvatarsRepository from '../repositories/IUserAvatarsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';
import UserAvatar from '../infra/typeorm/entities/UserAvatar';

interface IRequest {
  user_id: string;
  avatar_file_name: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserAvatarsRepository')
    private userAvatarsRepository: IUserAvatarsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatar_file_name,
  }: IRequest): Promise<UserAvatar> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    const avatar = await this.userAvatarsRepository.findByUserId(user.id);

    if (!avatar) {
      throw new AppError('Avatar not found.', 404);
    }

    await this.storageProvider.deleteFile(avatar.key);

    const filename = await this.storageProvider.saveFile(avatar_file_name);

    avatar.key = filename;

    await this.usersRepository.save(user);

    return avatar;
  }
}

export default UpdateUserAvatarService;
