export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteTempFile(file: string): Promise<void>;
  deleteFile(file: string): Promise<void>;
}
