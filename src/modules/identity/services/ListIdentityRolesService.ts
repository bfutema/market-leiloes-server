import { injectable, inject } from 'tsyringe';

import IIdentityRolesRepository from '../repositories/IIdentityRolesRepository';

import IdentityRole from '../infra/typeorm/entities/IdentityRole';

@injectable()
class ListIdentityRolesService {
  constructor(
    @inject('IdentityRolesRepository')
    private identityRolesRepository: IIdentityRolesRepository,
  ) {}

  public async execute(): Promise<IdentityRole[]> {
    const identityRoles = this.identityRolesRepository.find();

    return identityRoles;
  }
}

export default ListIdentityRolesService;
