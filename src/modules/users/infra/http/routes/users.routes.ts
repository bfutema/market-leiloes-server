import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UsersAccountsStatusRepository from '@modules/users/infra/typeorm/repositories/UsersAccountsStatusRepository';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserAccountStatusService from '@modules/users/services/CreateUserAccountStatusService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
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

  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository);

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
});

usersRouter.use(ensureAuthenticated);

usersRouter.post('/account_status', async (request, response) => {
  const { description } = request.body;

  const usersAccountsStatusRepository = new UsersAccountsStatusRepository();
  const createUserAccountStatus = new CreateUserAccountStatusService(usersAccountsStatusRepository);

  const userAccountStatus = await createUserAccountStatus.execute({
    description,
  });

  return response.json(userAccountStatus);
});

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatar_file_name: request.file.filename,
    });

    delete user.password_hash;

    return response.json(user);
  },
);

export default usersRouter;
