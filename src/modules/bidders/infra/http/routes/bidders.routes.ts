import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BidderController from '../controllers/BidderController';

const biddersRouter = Router();

const bidderController = new BidderController();

biddersRouter.use(ensureAuthenticated);

biddersRouter.get('/', bidderController.index);

export default biddersRouter;
