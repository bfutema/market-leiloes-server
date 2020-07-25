import { uuid } from 'uuidv4';

import IUserDocumentsRepository from '@modules/users/repositories/IUserDocumentsRepository';
import ICreateUserDocumentDTO from '@modules/users/dtos/ICreateUserDocumentDTO';

import UserDocument from '../../infra/typeorm/entities/UserDocument';

class FakeUserDocumentsRepository implements IUserDocumentsRepository {
  private userDocuments: UserDocument[] = [];

  public async create(
    userDocumentData: ICreateUserDocumentDTO,
  ): Promise<UserDocument> {
    const userDocument = new UserDocument();

    Object.assign(userDocument, { id: uuid() }, userDocumentData);

    this.userDocuments.push(userDocument);

    return userDocument;
  }

  public async findById(id: string): Promise<UserDocument | undefined> {
    const findUserDocument = this.userDocuments.find(
      userDocument => userDocument.id === id,
    );

    return findUserDocument;
  }

  public async findByKey(key: string): Promise<UserDocument | undefined> {
    const findUserDocument = this.userDocuments.find(
      userDocument => userDocument.key === key,
    );

    return findUserDocument;
  }

  public async save(userDocument: UserDocument): Promise<UserDocument> {
    const findIndex = this.userDocuments.findIndex(
      findUserDocument => findUserDocument.id === userDocument.id,
    );

    this.userDocuments[findIndex] = userDocument;

    return userDocument;
  }
}

export default FakeUserDocumentsRepository;
