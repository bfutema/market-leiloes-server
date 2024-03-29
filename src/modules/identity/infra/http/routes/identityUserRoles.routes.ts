import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import IdentityUserRolesController from '../controllers/IdentityUserRolesController';

const identityUserRolesRouter = Router();

const identityUserRolesController = new IdentityUserRolesController();

identityUserRolesRouter.use(ensureAuthenticated);

identityUserRolesRouter.get('/', identityUserRolesController.index);
identityUserRolesRouter.post('/', identityUserRolesController.create);
identityUserRolesRouter.delete(
  '/:user_id/:role_id',
  identityUserRolesController.delete,
);

export default identityUserRolesRouter;
