import TempFile from '../infra/typeorm/schemas/TempFile';
import ICreateTempFileDTO from '../dtos/ICreateTempFileDTO';

export default interface ITempFilesRepository {
  create(data: ICreateTempFileDTO): Promise<TempFile>;
  findById(id: string): Promise<TempFile | undefined>;
  listInIds(ids: string[]): Promise<TempFile[]>;
  delete(id: string): Promise<void>;
  deleteFiles(files: TempFile[]): Promise<void>;
}
