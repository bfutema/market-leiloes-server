import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITempFilesRepository from '../repositories/ITempFilesRepository';

@injectable()
class DeleteTempFileService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('TempFilesRepository')
    private tempFilesRepository: ITempFilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findTempFile = await this.tempFilesRepository.findById(id);

    if (!findTempFile) {
      throw new AppError('Temp File not found');
    }

    await this.tempFilesRepository.delete(id);

    this.storageProvider.deleteTempFile(findTempFile.key);
  }
}

export default DeleteTempFileService;
