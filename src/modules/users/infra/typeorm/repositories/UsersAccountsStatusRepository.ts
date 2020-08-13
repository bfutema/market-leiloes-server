import { getRepository, Repository } from 'typeorm';

import IUsersAccountsStatusRepository from '@modules/users/repositories/IUsersAccountsStatusRepository';

import UserAccountStatus from '../entities/UserAccountStatus';

class UsersAccountsStatusRepository implements IUsersAccountsStatusRepository {
  private ormRepository: Repository<UserAccountStatus>;

  constructor() {
    this.ormRepository = getRepository(UserAccountStatus);
  }

  public async create(description: string): Promise<UserAccountStatus> {
    const userAccountStatus = this.ormRepository.create({ description });

    await this.ormRepository.save(userAccountStatus);

    return userAccountStatus;
  }

  public async findByDescription(
    description: string,
  ): Promise<UserAccountStatus | undefined> {
    const userAccountStatus = this.ormRepository.findOne({
      where: { description },
    });

    return userAccountStatus;
  }

  public async save(
    userAccountStatus: UserAccountStatus,
  ): Promise<UserAccountStatus> {
    const usersAccountsStatus = await this.ormRepository.save(
      userAccountStatus,
    );
    return usersAccountsStatus;
  }
}

export default UsersAccountsStatusRepository;
