import { uuid } from 'uuidv4';

import IUserAvatarsRepository from '@modules/users/repositories/IUserAvatarsRepository';
import ICreateUserAvatarDTO from '@modules/users/dtos/ICreateUserAvatarDTO';

import UserAvatar from '../../infra/typeorm/entities/UserAvatar';

class FakeUserAvatarsRepository implements IUserAvatarsRepository {
  private userAvatars: UserAvatar[] = [];

  public async create(
    userAvatarData: ICreateUserAvatarDTO,
  ): Promise<UserAvatar> {
    const userAvatar = new UserAvatar();

    Object.assign(userAvatar, { id: uuid() }, userAvatarData);

    this.userAvatars.push(userAvatar);

    return userAvatar;
  }

  public async findById(id: string): Promise<UserAvatar | undefined> {
    const findUserAvatar = this.userAvatars.find(
      userAvatar => userAvatar.id === id,
    );

    return findUserAvatar;
  }

  public async findByKey(key: string): Promise<UserAvatar | undefined> {
    const findUserAvatar = this.userAvatars.find(
      userAvatar => userAvatar.key === key,
    );

    return findUserAvatar;
  }

  public async findByUserId(user_id: string): Promise<UserAvatar | undefined> {
    const findUserAvatar = this.userAvatars.find(
      userAvatar => userAvatar.user_id === user_id,
    );

    return findUserAvatar;
  }

  public async save(userAvatar: UserAvatar): Promise<UserAvatar> {
    const findIndex = this.userAvatars.findIndex(
      findUserAvatar => findUserAvatar.id === userAvatar.id,
    );

    this.userAvatars[findIndex] = userAvatar;

    return userAvatar;
  }
}

export default FakeUserAvatarsRepository;
