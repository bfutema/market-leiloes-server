import { getMongoRepository, MongoRepository } from 'typeorm';

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
    const findTempFile = this.ormRepository.findOne(id);

    return findTempFile;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TempFilesRepository;
