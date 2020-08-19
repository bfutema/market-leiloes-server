import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ClientController from '../controllers/ClientController';

const clientsRouter = Router();

const clientController = new ClientController();

clientsRouter.use(ensureAuthenticated);

clientsRouter.get('/', clientController.index);

export default clientsRouter;
