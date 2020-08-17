import ICreateUserAvatarDTO from '../dtos/ICreateUserAvatarDTO';

import UserAvatar from '../infra/typeorm/entities/UserAvatar';

export default interface IUserAvatarsRepository {
  create(userAvatar: ICreateUserAvatarDTO): Promise<UserAvatar>;
  findById(id: string): Promise<UserAvatar | undefined>;
  findByKey(key: string): Promise<UserAvatar | undefined>;
  save(userAvatar: UserAvatar): Promise<UserAvatar>;
}
