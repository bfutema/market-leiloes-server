import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersAccountsStatusRepository from '@modules/users/repositories/IUsersAccountsStatusRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ApproveCandidateService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    user.status_id = 2;
    delete user.status;

    await this.usersRepository.save(user);
  }
}

export default ApproveCandidateService;
