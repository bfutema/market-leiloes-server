import { ObjectID } from 'mongodb';

import ITempFilesRepository from '@modules/tempfiles/repositories/ITempFilesRepository';
import ICreateTempFileFTO from '@modules/tempfiles/dtos/ICreateTempFileDTO';

import TempFile from '../../infra/typeorm/schemas/TempFile';

class FakeTempFilesRepository implements ITempFilesRepository {
  private files: TempFile[] = [];

  public async create(fileData: ICreateTempFileFTO): Promise<TempFile> {
    const file = new TempFile();

    Object.assign(file, { id: new ObjectID() }, fileData);

    this.files.push(file);

    return file;
  }

  public async findById(id: string): Promise<TempFile | undefined> {
    const findTempFile = this.files.find(
      tempFile => tempFile.id.toString() === id,
    );

    return findTempFile;
  }

  public async listInIds(ids: string[]): Promise<TempFile[] | []> {
    const findTempFiles = this.files.filter(
      tempFile => ids.indexOf(tempFile.id.toString()) !== -1,
    );

    return findTempFiles;
  }

  public async delete(id: string): Promise<void> {
    const tempFileIndex = this.files.findIndex(
      tempFile => tempFile.id === new ObjectID(id),
    );

    this.files.splice(tempFileIndex, 1);
  }
}

export default FakeTempFilesRepository;
