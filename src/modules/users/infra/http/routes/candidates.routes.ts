import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CandidateController from '../controllers/CandidateController';

const candidatesRouter = Router();
const candidatesController = new CandidateController();

candidatesRouter.use(ensureAuthenticated);

candidatesRouter.get('/', candidatesController.index);

export default candidatesRouter;
