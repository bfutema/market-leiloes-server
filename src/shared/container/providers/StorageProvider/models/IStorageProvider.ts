import TempFile from '@modules/tempfiles/infra/typeorm/schemas/TempFile';

export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  saveFiles(files: TempFile[]): Promise<void>;
  deleteTempFile(file: string): Promise<void>;
  deleteFile(file: string): Promise<void>;
}
