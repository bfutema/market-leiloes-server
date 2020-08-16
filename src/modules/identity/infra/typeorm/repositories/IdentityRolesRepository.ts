import { getRepository, Repository, Like } from 'typeorm';

import IIdentityRolesRepository from '@modules/identity/repositories/IIdentityRolesRepository';
import ICreateIdentityRoleDTO from '@modules/identity/dtos/ICreateIdentityRoleDTO';

import IdentityRole from '../entities/IdentityRole';

class IdentityRolesRepository implements IIdentityRolesRepository {
  private ormRepository: Repository<IdentityRole>;

  constructor() {
    this.ormRepository = getRepository(IdentityRole);
  }

  public async create(
    identityRoleData: ICreateIdentityRoleDTO,
  ): Promise<IdentityRole> {
    const identityRole = this.ormRepository.create(identityRoleData);

    await this.ormRepository.save(identityRole);

    return identityRole;
  }

  public async find(): Promise<IdentityRole[]> {
    const identityRoles = await this.ormRepository.find();

    return identityRoles;
  }

  public async findById(id: number): Promise<IdentityRole | undefined> {
    const findIdentityRole = await this.ormRepository.findOne({
      where: { id },
    });

    return findIdentityRole;
  }

  public async findByName(name: string): Promise<IdentityRole[]> {
    const findIdentityRoles = await this.ormRepository.find({
      where: { name: Like(name) },
    });

    return findIdentityRoles;
  }

  public async save(identityRole: IdentityRole): Promise<IdentityRole> {
    const newIdentityRole = await this.ormRepository.save(identityRole);

    return newIdentityRole;
  }
}

export default IdentityRolesRepository;
