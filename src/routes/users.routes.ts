import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import CreateUserAccountStatusService from '../services/CreateUserAccountStatusService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const {
      username,
      email,
      password,
      name,
      surname,
      cpf_cnpj,
      rg,
      birth,
      gender,
    } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      username,
      email,
      password,
      name,
      surname,
      cpf_cnpj,
      rg,
      birth,
      gender,
    });

    delete user.password_hash;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.use(ensureAuthenticated);

usersRouter.post('/account_status', async (request, response) => {
  try {
    const { description } = request.body;

    const createUserAccountStatus = new CreateUserAccountStatusService();

    const userAccountStatus = await createUserAccountStatus.execute({
      description,
    });

    return response.json(userAccountStatus);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatar_file_name: request.file.filename,
      });

      delete user.password_hash;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

export default usersRouter;
