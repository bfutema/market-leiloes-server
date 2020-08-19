import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';

export default interface IUsersRepositories {
  create(data: ICreateUserDTO): Promise<User>;
  find(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findAllCandidates(data: IFindAllUsersDTO): Promise<User[]>;
  findAllBidders(data: IFindAllUsersDTO): Promise<User[]>;
  findAllClients(data: IFindAllUsersDTO): Promise<User[]>;
  save(user: User): Promise<User>;
}
