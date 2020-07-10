import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserAccountStatusController from '../controllers/UserAccountStatusController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userAccountStatusController = new UserAccountStatusController();

usersRouter.post('/', usersController.create);

usersRouter.use(ensureAuthenticated);

usersRouter.post('/account_status', userAccountStatusController.create);
usersRouter.patch('/avatar', upload.single('avatar'), userAvatarController.update);

export default usersRouter;
