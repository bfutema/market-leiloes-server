import ICreateUserDocumentDTO from '../dtos/ICreateUserDocumentDTO';

import UserDocument from '../infra/typeorm/entities/UserDocument';

export default interface IUserDocumentsRepository {
  create(userDocument: ICreateUserDocumentDTO): Promise<UserDocument>;
  createFiles(userDocuments: ICreateUserDocumentDTO[]): Promise<UserDocument[]>;
  findById(id: string): Promise<UserDocument | undefined>;
  findByKey(key: string): Promise<UserDocument | undefined>;
  save(userDocument: UserDocument): Promise<UserDocument>;
}
