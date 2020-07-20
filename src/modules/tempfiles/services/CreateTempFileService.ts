import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITempFilesRepository from '../repositories/ITempFilesRepository';

import TempFile from '../infra/typeorm/schemas/TempFile';

interface IRequest {
  name: string;
  size: number;
  key: string;
  url: string;
}

@injectable()
class CreateTempFileService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('TempFilesRepository')
    private tempFilesRepository: ITempFilesRepository,
  ) {}

  public async execute({ name, size, key, url }: IRequest): Promise<TempFile> {
    const tempFile = await this.tempFilesRepository.create({
      name,
      size,
      key,
      url,
    });

    // tempFile.name = await this.storageProvider.saveFile(tempFile.key);

    return tempFile;
  }
}

export default CreateTempFileService;
