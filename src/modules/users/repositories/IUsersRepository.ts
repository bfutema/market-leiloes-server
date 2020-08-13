import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllCandidatesDTO from '../dtos/IFindAllCandidatesDTO';

export default interface IUsersRepositories {
  create(data: ICreateUserDTO): Promise<User>;
  find(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findAllCandidates(data: IFindAllCandidatesDTO): Promise<User[]>;
  save(user: User): Promise<User>;
}
