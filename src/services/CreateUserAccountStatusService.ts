import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import UserAccountStatus from '../models/UserAccountStatus';

interface Request {
  description: string;
}

class UserAccountStatusService {
  public async execute({ description }: Request): Promise<UserAccountStatus> {
    const usersAccountStatusRepository = getRepository(UserAccountStatus);

    const checkStatusExists = await usersAccountStatusRepository.findOne({
      where: { description },
    });

    if (checkStatusExists) {
      throw new AppError('Status already used');
    }

    const userAccountStatus = usersAccountStatusRepository.create({
      description,
    });

    await usersAccountStatusRepository.save(userAccountStatus);

    return userAccountStatus;
  }
}

export default UserAccountStatusService;
