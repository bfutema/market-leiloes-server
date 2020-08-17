import { getMongoRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import ITempFilesRepository from '@modules/tempfiles/repositories/ITempFilesRepository';
import ICreateTempFileFTO from '@modules/tempfiles/dtos/ICreateTempFileDTO';

import TempFile from '../schemas/TempFile';

class TempFilesRepository implements ITempFilesRepository {
  private ormRepository: MongoRepository<TempFile>;

  constructor() {
    this.ormRepository = getMongoRepository(TempFile, 'mongo');
  }

  public async create({
    name,
    size,
    key,
    url,
  }: ICreateTempFileFTO): Promise<TempFile> {
    const tempFile = this.ormRepository.create({
      name,
      size,
      key,
      url,
    });

    tempFile.url = `http://localhost:3333/tempfiles/${tempFile.key}`;

    await this.ormRepository.save(tempFile);

    return tempFile;
  }

  public async findById(id: string): Promise<TempFile | undefined> {
    const findTempFile = await this.ormRepository.findOne({
      where: { _id: new ObjectID(id) },
    });

    return findTempFile;
  }

  public async listInIds(ids: string[]): Promise<TempFile[] | []> {
    const objectIds = ids.map(id => new ObjectID(id));

    const findTempFiles = await this.ormRepository.find({
      where: { _id: { $in: objectIds } },
    });

    return findTempFiles;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async deleteFiles(files: TempFile[]): Promise<void> {
    const deleteFilesPromise = files.map((file: TempFile) =>
      this.ormRepository.delete(file.id.toString()),
    );

    await Promise.all(deleteFilesPromise);
  }
}

export default TempFilesRepository;
