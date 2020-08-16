import IIdentityUserRolesRepository from '@modules/identity/repositories/IIdentityUserRolesRepository';

import IdentityUserRole from '@modules/identity/infra/typeorm/entities/IdentityUserRole';

import ICreateIdentityUserRoleDTO from '@modules/identity/dtos/ICreateIdentityUserRoleDTO';
import IFindIdentityUserRoleDTO from '@modules/identity/dtos/IFindIdentityUserRoleDTO';

class FakeIdentityUserRolesRepository implements IIdentityUserRolesRepository {
  private identityUserRoles: IdentityUserRole[] = [];

  public async create({
    user_id,
    role_id,
  }: ICreateIdentityUserRoleDTO): Promise<IdentityUserRole> {
    const identityUserRole = new IdentityUserRole();

    Object.assign(identityUserRole, { user_id, role_id });

    this.identityUserRoles.push(identityUserRole);

    return identityUserRole;
  }

  public async find(): Promise<IdentityUserRole[]> {
    return this.identityUserRoles;
  }

  public async findByUserId(user_id: string): Promise<IdentityUserRole[]> {
    const findIdentityUserRoles = this.identityUserRoles.filter(
      identityUserRole => identityUserRole.user_id === user_id,
    );

    return findIdentityUserRoles;
  }

  public async findByRoleId(role_id: number): Promise<IdentityUserRole[]> {
    const findIdentityUserRoles = this.identityUserRoles.filter(
      identityUserRole => identityUserRole.role_id === role_id,
    );

    return findIdentityUserRoles;
  }

  public async findByUserIdAndRoleId({
    user_id,
    role_id,
  }: IFindIdentityUserRoleDTO): Promise<IdentityUserRole | undefined> {
    const findIdentityUserRole = this.identityUserRoles.find(
      identityUserRole =>
        identityUserRole.user_id === user_id &&
        identityUserRole.role_id === role_id,
    );

    return findIdentityUserRole;
  }

  public async delete(id: number): Promise<void> {
    const findIndex = this.identityUserRoles.findIndex(
      findIdentityUserRole => findIdentityUserRole.id === id,
    );

    this.identityUserRoles.splice(findIndex, 1);
  }

  public async save(
    identityUserRole: IdentityUserRole,
  ): Promise<IdentityUserRole> {
    const findIndex = this.identityUserRoles.findIndex(
      findIdentityUserRole =>
        findIdentityUserRole.user_id === identityUserRole.user_id &&
        findIdentityUserRole.role_id === identityUserRole.role_id,
    );

    this.identityUserRoles[findIndex] = identityUserRole;

    return identityUserRole;
  }
}

export default FakeIdentityUserRolesRepository;
