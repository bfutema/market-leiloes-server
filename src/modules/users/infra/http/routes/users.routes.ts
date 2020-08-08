import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserAccountStatusController from '../controllers/UserAccountStatusController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const userAvatarController = new UserAvatarController();
const userAccountStatusController = new UserAccountStatusController();

usersRouter.post('/', userController.create);

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', userController.index);
usersRouter.post('/account_status', userAccountStatusController.create);
usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
