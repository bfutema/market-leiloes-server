import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), status_id: 1 }, userData);

    this.users.push(user);

    return user;
  }

  public async find(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.username === username);

    return findUser;
  }

  public async findAllCandidates({
    except_user_id,
  }: IFindAllUsersDTO): Promise<User[] | []> {
    const candidates = this.users.filter(
      candidate => candidate.id !== except_user_id,
    );

    return candidates;
  }

  public async findAllBidders({
    except_user_id,
  }: IFindAllUsersDTO): Promise<User[] | []> {
    const candidates = this.users.filter(
      candidate =>
        candidate.id !== except_user_id && candidate.account_type === 'bidder',
    );

    return candidates;
  }

  public async findAllClients({
    except_user_id,
  }: IFindAllUsersDTO): Promise<User[] | []> {
    const candidates = this.users.filter(
      candidate =>
        candidate.id !== except_user_id && candidate.account_type === 'client',
    );

    return candidates;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
