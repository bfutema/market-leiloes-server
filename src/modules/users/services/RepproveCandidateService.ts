import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class RepproveCandidateService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    user.status_id = 3;
    delete user.status;

    await this.usersRepository.save(user);

    const candidateRepprovedTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'candidate_repproved.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[MARKET Leilões] Cadastro Reprovado',
      templateData: {
        file: candidateRepprovedTemplate,
        variables: {
          name: user.name,
        },
      },
    });
  }
}

export default RepproveCandidateService;
