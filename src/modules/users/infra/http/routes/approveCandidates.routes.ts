import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ApproveCandidateController from '../controllers/ApproveCandidateController';

const approveCandidateRouter = Router();
const approveCandidateController = new ApproveCandidateController();

approveCandidateRouter.use(ensureAuthenticated);

approveCandidateRouter.patch('/:user_id', approveCandidateController.update);

export default approveCandidateRouter;
