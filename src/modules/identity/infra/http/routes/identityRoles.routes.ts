import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import IdentityRolesController from '../controllers/IdentityRolesController';

const identityRolesRouter = Router();

const identityRolesController = new IdentityRolesController();

identityRolesRouter.use(ensureAuthenticated);

identityRolesRouter.get('/', identityRolesController.index);
identityRolesRouter.post('/', identityRolesController.create);

export default identityRolesRouter;
