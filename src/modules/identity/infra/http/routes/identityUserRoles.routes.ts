import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import IdentityUserRolesController from '../controllers/IdentityUserRolesController';

const identityUserRolesRouter = Router();

const identityUserRolesController = new IdentityUserRolesController();

identityUserRolesRouter.use(ensureAuthenticated);

identityUserRolesRouter.post('/', identityUserRolesController.create);

export default identityUserRolesRouter;
