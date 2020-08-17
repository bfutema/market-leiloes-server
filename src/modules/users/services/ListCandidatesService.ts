import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListCandidatesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const candidates = await this.usersRepository.findAllCandidates({
      except_user_id: user_id,
    });

    return candidates;
  }
}

export default ListCandidatesService;
