import UserAccountStatus from '../infra/typeorm/entities/UserAccountStatus';

export default interface IUsersAccountsStatus {
  create(description: string): Promise<UserAccountStatus>;
  findById(id: number): Promise<UserAccountStatus | undefined>;
  findByDescription(
    description: string,
  ): Promise<UserAccountStatus | undefined>;
  save(userAccountStatus: UserAccountStatus): Promise<UserAccountStatus>;
}
