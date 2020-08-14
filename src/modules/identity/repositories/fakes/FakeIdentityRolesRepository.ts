import IIdentityRolesRepository from '@modules/identity/repositories/IIdentityRolesRepository';

import IdentityRole from '@modules/identity/infra/typeorm/entities/IdentityRole';

import ICreateIdentityRoleDTO from '@modules/identity/dtos/ICreateIdentityRoleDTO';

class FakeIdentityRolesRepository implements IIdentityRolesRepository {
  private identityRoles: IdentityRole[] = [];

  public async create({ name }: ICreateIdentityRoleDTO): Promise<IdentityRole> {
    const identityRole = new IdentityRole();

    Object.assign(identityRole, { id: this.identityRoles.length + 1, name });

    this.identityRoles.push(identityRole);

    return identityRole;
  }

  public async find(): Promise<IdentityRole[]> {
    return this.identityRoles;
  }

  public async findByName(name: string): Promise<IdentityRole[]> {
    const findIdentityRoles = this.identityRoles.filter(identityRole =>
      identityRole.name.toUpperCase().includes(name.toUpperCase()),
    );

    return findIdentityRoles;
  }

  public async save(identityRole: IdentityRole): Promise<IdentityRole> {
    const findIndex = this.identityRoles.findIndex(
      findIdentityRole => findIdentityRole.id === identityRole.id,
    );

    this.identityRoles[findIndex] = identityRole;

    return identityRole;
  }
}

export default FakeIdentityRolesRepository;
