import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IIdentityUserRolesRepository from '@modules/identity/repositories/IIdentityUserRolesRepository';

import IdentityUserRole from '@modules/identity/infra/typeorm/entities/IdentityUserRole';

interface IRequest {
  user_id: string;
  role_id: number;
}

@injectable()
class CreateIdentityUserRoleService {
  constructor(
    @inject('IdentityUserRolesRepository')
    private identityUserRolesRepository: IIdentityUserRolesRepository,
  ) {}

  public async execute({
    user_id,
    role_id,
  }: IRequest): Promise<IdentityUserRole> {
    const checkAssociate = await this.identityUserRolesRepository.findByUserIdAndRoleId(
      {
        user_id,
        role_id,
      },
    );

    if (checkAssociate) {
      throw new AppError('Role already associate to user!');
    }

    const identityUserRole = await this.identityUserRolesRepository.create({
      user_id,
      role_id,
    });

    return identityUserRole;
  }
}

export default CreateIdentityUserRoleService;
