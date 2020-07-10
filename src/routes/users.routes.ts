import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import CreateUserAccountStatusService from '../services/CreateUserAccountStatusService';

const usersRouter = Router();

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

export default usersRouter;
