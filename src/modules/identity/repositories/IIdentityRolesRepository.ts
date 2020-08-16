import IdentityRole from '../infra/typeorm/entities/IdentityRole';

import ICreateIdentityRoleDTO from '../dtos/ICreateIdentityRoleDTO';

export default interface IIdentityRolesRepository {
  create(name: ICreateIdentityRoleDTO): Promise<IdentityRole>;
  find(): Promise<IdentityRole[]>;
  findById(id: number): Promise<IdentityRole | undefined>;
  findByName(name: string): Promise<IdentityRole[]>;
  save(idendityRole: IdentityRole): Promise<IdentityRole>;
}
