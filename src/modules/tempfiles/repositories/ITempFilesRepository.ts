import TempFile from '../infra/typeorm/schemas/TempFile';
import ICreateTempFileDTO from '../dtos/ICreateTempFileDTO';

export default interface ITempFilesRepository {
  create(data: ICreateTempFileDTO): Promise<TempFile>;
  findById(id: string): Promise<TempFile | undefined>;
  delete(id: string): Promise<void>;
}
