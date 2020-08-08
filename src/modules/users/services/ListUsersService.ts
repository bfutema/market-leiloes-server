import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  status_id?: string;
}

@injectable()
class ListCandidatesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ status_id }: IRequest): Promise<User[]> {
    switch (status_id) {
      case '1': {
        const candidates = await this.usersRepository.list();

        return candidates;
      }

      case '2': {
        const users = await this.usersRepository.list();
        return users;
      }

      default: {
        const users = await this.usersRepository.list();

        return users;
      }
    }
  }
}

export default ListCandidatesService;
