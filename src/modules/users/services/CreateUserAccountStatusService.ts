import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import UserAccountStatus from '../infra/typeorm/entities/UserAccountStatus';
import IUsersAccountStatusRepository from '../repositories/IUsersAccountsStatusRepository';

interface IRequest {
  description: string;
}

@injectable()
class UserAccountStatusService {
  constructor(
    @inject('UsersAccountsStatusRepository')
    private usersAccountStatusRepository: IUsersAccountStatusRepository
  ) {}

  public async execute({ description }: IRequest): Promise<UserAccountStatus> {
    const checkStatusExists = await this.usersAccountStatusRepository.findByDescription(description);

    if (checkStatusExists) {
      throw new AppError('Status already used');
    }

    const userAccountStatus = this.usersAccountStatusRepository.create(description);

    return userAccountStatus;
  }
}

export default UserAccountStatusService;
