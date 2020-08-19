import IUsersAccountsStatusRepository from '@modules/users/repositories/IUsersAccountsStatusRepository';

import UserAccountStatus from '../../infra/typeorm/entities/UserAccountStatus';

class FakeUsersAccountsRepository implements IUsersAccountsStatusRepository {
  private usersAccountsStatus: UserAccountStatus[] = [];

  public async create(description: string): Promise<UserAccountStatus> {
    const userAccountStatus = new UserAccountStatus();

    Object.assign(userAccountStatus, {
      id: this.usersAccountsStatus.length + 1,
      description,
    });

    this.usersAccountsStatus.push(userAccountStatus);

    return userAccountStatus;
  }

  public async findById(id: number): Promise<UserAccountStatus | undefined> {
    const findUserAccountStatus = this.usersAccountsStatus.find(
      userAccountStatus => userAccountStatus.id === id,
    );

    return findUserAccountStatus;
  }

  public async findByDescription(
    description: string,
  ): Promise<UserAccountStatus | undefined> {
    const findUserAccountStatus = this.usersAccountsStatus.find(
      userAccountStatus => userAccountStatus.description === description,
    );

    return findUserAccountStatus;
  }

  public async save(
    userAccountStatus: UserAccountStatus,
  ): Promise<UserAccountStatus> {
    const findIndex = this.usersAccountsStatus.findIndex(
      findUserAccountStatus =>
        findUserAccountStatus.id === userAccountStatus.id,
    );

    this.usersAccountsStatus[findIndex] = userAccountStatus;

    return userAccountStatus;
  }
}

export default FakeUsersAccountsRepository;
