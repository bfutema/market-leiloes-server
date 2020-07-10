import AppError from '@shared/errors/AppError';

import UserAccountStatus from '../infra/typeorm/entities/UserAccountStatus';
import IUsersAccountStatusRepository from '../repositories/IUsersAccountsStatusRepository';

interface IRequest {
  description: string;
}

class UserAccountStatusService {
  constructor(private usersAccountStatusRepository: IUsersAccountStatusRepository) {}

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
