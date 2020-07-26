import { Router } from 'express';

import ValidatorController from '../controllers/ValidatorController';

const validatorsRouter = Router();

const validatorController = new ValidatorController();

validatorsRouter.post('/', validatorController.post);

export default validatorsRouter;
