import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllCandidatesDTO from '@modules/users/dtos/IFindAllCandidatesDTO';

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
      relations: ['status', 'avatar', 'documents'],
    });

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: ['status', 'avatar', 'documents'],
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
      relations: ['status', 'avatar', 'documents'],
    });

    return findUser;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { username },
      relations: ['status', 'avatar', 'documents'],
    });

    return findUser;
  }

  public async findAllCandidates({
    except_user_id,
  }: IFindAllCandidatesDTO): Promise<User[]> {
    let candidates;

    if (!except_user_id) {
      candidates = await this.ormRepository.find({
        where: { status_id: 1 },
        relations: ['status'],
      });
    } else {
      candidates = await this.ormRepository.find({
        where: { status_id: 1, id: Not(except_user_id) },
        relations: ['status'],
      });
    }

    return candidates;
  }

  public async save(user: User): Promise<User> {
    const newUser = await this.ormRepository.save(user);

    return newUser;
  }
}

export default UsersRepository;
