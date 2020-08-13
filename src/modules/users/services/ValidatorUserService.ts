import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  validate: {
    type: string;
    value: string;
  };
}

@injectable()
class ValidatorUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    validate,
  }: IRequest): Promise<{ message: string; success: boolean }> {
    const { type } = validate;

    const valid = { message: '', success: true };

    switch (type) {
      case 'username': {
        const user = await this.usersRepository.findByUsername(validate.value);

        if (user) {
          valid.message = 'Este username já está em uso, tente outro!';
          valid.success = false;
        }

        break;
      }
      case 'email': {
        const user = await this.usersRepository.findByEmail(validate.value);

        if (user) {
          valid.message = 'Este e-mail já existe!';
          valid.success = false;
        }

        break;
      }
      default:
        valid.message = 'Passe algum atributo para validar!';

        break;
    }

    return valid;
  }
}

export default ValidatorUserService;
