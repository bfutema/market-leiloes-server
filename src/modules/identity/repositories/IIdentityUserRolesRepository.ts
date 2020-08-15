import IdentityUserRole from '@modules/identity/infra/typeorm/entities/IdentityUserRole';

import ICreateIdentityUserRoleDTO from '@modules/identity/dtos/ICreateIdentityUserRoleDTO';

export default interface IIdentityUserRolesRepository {
  create(data: ICreateIdentityUserRoleDTO): Promise<IdentityUserRole>;
  findByUserId(user_id: string): Promise<IdentityUserRole[]>;
  findByRoleId(role_id: number): Promise<IdentityUserRole[]>;
  findByUserIdAndRoleId(
    user_id: string,
    role_id: number,
  ): Promise<IdentityUserRole | undefined>;
  save(identityUserRole: IdentityUserRole): Promise<IdentityUserRole>;
}
