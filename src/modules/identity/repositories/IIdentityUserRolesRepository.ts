import IdentityUserRole from '@modules/identity/infra/typeorm/entities/IdentityUserRole';

import ICreateIdentityUserRoleDTO from '@modules/identity/dtos/ICreateIdentityUserRoleDTO';
import IFindIdentityUserRoleDTO from '@modules/identity/dtos/IFindIdentityUserRoleDTO';

export default interface IIdentityUserRolesRepository {
  create(data: ICreateIdentityUserRoleDTO): Promise<IdentityUserRole>;
  find(): Promise<IdentityUserRole[]>;
  findByUserId(user_id: string): Promise<IdentityUserRole[]>;
  findByRoleId(role_id: number): Promise<IdentityUserRole[]>;
  findByUserIdAndRoleId(
    data: IFindIdentityUserRoleDTO,
  ): Promise<IdentityUserRole | undefined>;
  delete(id: number): Promise<void>;
  save(identityUserRole: IdentityUserRole): Promise<IdentityUserRole>;
}
