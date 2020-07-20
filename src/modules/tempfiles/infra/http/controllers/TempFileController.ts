import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTempFileService from '@modules/tempfiles/services/CreateTempFileService';
import DeleteTempFileService from '@modules/tempfiles/services/DeleteTempFileService';

class TempFileController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { originalname: name, size, key, location: url = '' } = request.file;

    const createTempFileService = container.resolve(CreateTempFileService);

    const tempFile = await createTempFileService.execute({
      name,
      size,
      key,
      url,
    });

    return response.json(tempFile);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteTempFileService = container.resolve(DeleteTempFileService);

    await deleteTempFileService.execute({ id: request.params.id });

    return response.send();
  }
}

export default TempFileController;
