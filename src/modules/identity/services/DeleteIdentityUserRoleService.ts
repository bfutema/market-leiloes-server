import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IIdentityUserRolesRepository from '../repositories/IIdentityUserRolesRepository';

interface IRequest {
  user_id: string;
  role_id: number;
}

@injectable()
class DeleteIdentityUserRoleService {
  constructor(
    @inject('IdentityUserRolesRepository')
    private identityUserRolesRepository: IIdentityUserRolesRepository,
  ) {}

  public async execute({ user_id, role_id }: IRequest): Promise<void> {
    const findIdentityUserRole = await this.identityUserRolesRepository.findByUserIdAndRoleId(
      {
        user_id,
        role_id,
      },
    );

    if (!findIdentityUserRole) {
      throw new AppError('Identity user role not found!');
    }

    await this.identityUserRolesRepository.delete(findIdentityUserRole.id);
  }
}

export default DeleteIdentityUserRoleService;
