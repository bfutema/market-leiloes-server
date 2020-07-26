import { getRepository, Repository } from 'typeorm';

import IUserDocumentsRepository from '@modules/users/repositories/IUserDocumentsRepository';
import ICreateUserDocumentDTO from '@modules/users/dtos/ICreateUserDocumentDTO';

import UserDocument from '../entities/UserDocument';

class UserDocumentsRepository implements IUserDocumentsRepository {
  private ormRepository: Repository<UserDocument>;

  constructor() {
    this.ormRepository = getRepository(UserDocument);
  }

  public async create(
    userDocumentData: ICreateUserDocumentDTO,
  ): Promise<UserDocument> {
    const userDocument = this.ormRepository.create(userDocumentData);

    await this.ormRepository.save(userDocument);

    return userDocument;
  }

  public async findById(id: string): Promise<UserDocument | undefined> {
    const userDocument = await this.ormRepository.findOne(id);

    return userDocument;
  }

  public async findByKey(key: string): Promise<UserDocument | undefined> {
    const userDocument = await this.ormRepository.findOne({ where: { key } });

    return userDocument;
  }

  public async save(userDocument: UserDocument): Promise<UserDocument> {
    const newUserDocument = await this.ormRepository.save(userDocument);

    return newUserDocument;
  }
}

export default UserDocumentsRepository;
