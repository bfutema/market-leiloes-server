import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async find(): Promise<User[]> {
    const users = await this.ormRepository.find({
      relations: ['status', 'avatar', 'documents', 'roles', 'roles.role'],
    });

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: ['status', 'avatar', 'documents', 'roles', 'roles.role'],
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
      relations: ['status', 'avatar', 'documents', 'roles', 'roles.role'],
    });

    return findUser;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { username },
      relations: ['status', 'avatar', 'documents', 'roles', 'roles.role'],
    });

    return findUser;
  }

  public async findAllCandidates({
    except_user_id,
  }: IFindAllUsersDTO): Promise<User[]> {
    let candidates;

    if (!except_user_id) {
      candidates = await this.ormRepository.find({
        relations: ['status', 'avatar', 'documents', 'roles', 'roles.role'],
        where: { status_id: 1 },
      });
    } else {
      candidates = await this.ormRepository.find({
        relations: ['status', 'avatar', 'documents', 'roles', 'roles.role'],
        where: { status_id: 1, id: Not(except_user_id) },
      });
    }

    return candidates;
  }

  public async findAllBidders({
    except_user_id,
  }: IFindAllUsersDTO): Promise<User[]> {
    let bidders;

    if (!except_user_id) {
      bidders = await this.ormRepository.find({
        relations: ['status', 'avatar', 'documents', 'roles', 'roles.role'],
        where: { status_id: 2, account_type: 'bidder' },
      });
    } else {
      bidders = await this.ormRepository.find({
        relations: ['status', 'avatar', 'documents', 'roles', 'roles.role'],
        where: {
          status_id: 2,
          account_type: 'bidder',
          id: Not(except_user_id),
        },
      });
    }

    return bidders;
  }

  public async findAllClients({
    except_user_id,
  }: IFindAllUsersDTO): Promise<User[]> {
    let clients;

    if (!except_user_id) {
      clients = await this.ormRepository.find({
        relations: ['status', 'avatar', 'documents', 'roles', 'roles.role'],
        where: { status_id: 2, account_type: 'client' },
      });
    } else {
      clients = await this.ormRepository.find({
        relations: ['status', 'avatar', 'documents', 'roles', 'roles.role'],
        where: {
          status_id: 2,
          account_type: 'client',
          id: Not(except_user_id),
        },
      });
    }

    return clients;
  }

  public async save(user: User): Promise<User> {
    const newUser = await this.ormRepository.save(user);

    return newUser;
  }
}

export default UsersRepository;
