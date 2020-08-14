import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IIdentityRolesRepository from '@modules/identity/repositories/IIdentityRolesRepository';

import IdentityRole from '../infra/typeorm/entities/IdentityRole';

interface IRequest {
  name: string;
}

@injectable()
class CreateIdentityRoleService {
  constructor(
    @inject('IdentityRolesRepository')
    private identityRolesRepository: IIdentityRolesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<IdentityRole> {
    const checkNameExists = await this.identityRolesRepository.findByName(name);

    if (checkNameExists.length > 0) {
      throw new AppError('Name of identity role already exists!');
    }

    const identityRole = await this.identityRolesRepository.create({
      name,
    });

    return identityRole;
  }
}

export default CreateIdentityRoleService;
