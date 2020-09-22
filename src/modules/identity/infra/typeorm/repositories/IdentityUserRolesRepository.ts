import { getRepository, Repository } from 'typeorm';

import IIdentityUserRolesRepository from '@modules/identity/repositories/IIdentityUserRolesRepository';
import ICreateIdentityUserRoleDTO from '@modules/identity/dtos/ICreateIdentityUserRoleDTO';
import IFindIdentityUserRoleDTO from '@modules/identity/dtos/IFindIdentityUserRoleDTO';

import IdentityUserRole from '../entities/IdentityUserRole';

class IdentityUserRolesRepository implements IIdentityUserRolesRepository {
  private ormRepository: Repository<IdentityUserRole>;

  constructor() {
    this.ormRepository = getRepository(IdentityUserRole);
  }

  public async create(
    identityUserRoleData: ICreateIdentityUserRoleDTO,
  ): Promise<IdentityUserRole> {
    const identityUserRole = this.ormRepository.create(identityUserRoleData);

    await this.ormRepository.save(identityUserRole);

    return identityUserRole;
  }

  public async find(): Promise<IdentityUserRole[]> {
    const identityUserRoles = await this.ormRepository.find({
      relations: ['user', 'role'],
    });

    return identityUserRoles;
  }

  public async findByUserId(user_id: string): Promise<IdentityUserRole[]> {
    const findIdentityUserRoles = await this.ormRepository.find({
      where: { user_id },
    });

    return findIdentityUserRoles;
  }

  public async findByRoleId(role_id: number): Promise<IdentityUserRole[]> {
    const findIdentityUserRoles = await this.ormRepository.find({
      where: { role_id },
    });

    return findIdentityUserRoles;
  }

  public async findByUserIdAndRoleId({
    user_id,
    role_id,
  }: IFindIdentityUserRoleDTO): Promise<IdentityUserRole | undefined> {
    const findIdentityUserRole = await this.ormRepository.findOne({
      where: { user_id, role_id },
    });

    return findIdentityUserRole;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(
    identityUserRole: IdentityUserRole,
  ): Promise<IdentityUserRole> {
    const newIdentityUserRole = await this.ormRepository.save(identityUserRole);

    return newIdentityUserRole;
  }
}

export default IdentityUserRolesRepository;
