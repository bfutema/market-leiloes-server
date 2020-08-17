import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RepproveCandidateController from '../controllers/RepproveCandidateController';

const repproveCandidateRouter = Router();
const repproveCandidateController = new RepproveCandidateController();

repproveCandidateRouter.use(ensureAuthenticated);

repproveCandidateRouter.patch('/:user_id', repproveCandidateController.update);

export default repproveCandidateRouter;
