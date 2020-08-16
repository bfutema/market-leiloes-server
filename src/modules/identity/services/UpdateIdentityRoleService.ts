import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IIdentityRolesRepository from '@modules/identity/repositories/IIdentityRolesRepository';

import IdentityRole from '../infra/typeorm/entities/IdentityRole';

interface IRequest {
  id: number;
  name: string;
}

@injectable()
class UpdateIdentityRoleService {
  constructor(
    @inject('IdentityRolesRepository')
    private identityRolesRepository: IIdentityRolesRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<IdentityRole> {
    const identityRole = await this.identityRolesRepository.findById(id);

    if (!identityRole) {
      throw new AppError('Identity role not found!');
    }

    identityRole.name = name;

    const updatedIdentityRole = await this.identityRolesRepository.save(
      identityRole,
    );

    return updatedIdentityRole;
  }
}

export default UpdateIdentityRoleService;
