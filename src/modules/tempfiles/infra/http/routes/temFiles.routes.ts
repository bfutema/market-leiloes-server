import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import TempFileController from '../controllers/TempFileController';

const tempFilesRouter = Router();
const upload = multer(uploadConfig);

const tempFileController = new TempFileController();

tempFilesRouter.post('/', upload.single('file'), tempFileController.create);
tempFilesRouter.delete('/:id', tempFileController.delete);

export default tempFilesRouter;
