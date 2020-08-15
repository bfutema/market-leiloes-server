import { injectable, inject } from 'tsyringe';

import IIdentityUserRolesRepository from '../repositories/IIdentityUserRolesRepository';

import IdentityUserRole from '../infra/typeorm/entities/IdentityUserRole';

@injectable()
class ListIdentityUserRolesService {
  constructor(
    @inject('IdentityUserRolesRepository')
    private identityUserRolesRepository: IIdentityUserRolesRepository,
  ) {}

  public async execute(): Promise<IdentityUserRole[]> {
    const identityUserRoles = await this.identityUserRolesRepository.find();

    return identityUserRoles;
  }
}

export default ListIdentityUserRolesService;
