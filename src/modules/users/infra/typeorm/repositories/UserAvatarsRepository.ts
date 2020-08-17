import { getRepository, Repository } from 'typeorm';

import IUserAvatarsRepository from '@modules/users/repositories/IUserAvatarsRepository';
import ICreateUserAvatarDTO from '@modules/users/dtos/ICreateUserAvatarDTO';

import UserAvatar from '../entities/UserAvatar';

class UserAvatarsRepository implements IUserAvatarsRepository {
  private ormRepository: Repository<UserAvatar>;

  constructor() {
    this.ormRepository = getRepository(UserAvatar);
  }

  public async create(
    userAvatarData: ICreateUserAvatarDTO,
  ): Promise<UserAvatar> {
    const userAvatar = this.ormRepository.create(userAvatarData);

    await this.ormRepository.save(userAvatar);

    return userAvatar;
  }

  public async findById(id: string): Promise<UserAvatar | undefined> {
    const userAvatar = await this.ormRepository.findOne(id);

    return userAvatar;
  }

  public async findByKey(key: string): Promise<UserAvatar | undefined> {
    const userAvatar = await this.ormRepository.findOne({ where: { key } });

    return userAvatar;
  }

  public async save(userAvatar: UserAvatar): Promise<UserAvatar> {
    const newUserAvatar = await this.ormRepository.save(userAvatar);

    return newUserAvatar;
  }
}

export default UserAvatarsRepository;
