import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersAccountsStatusRepository from '@modules/users/repositories/IUsersAccountsStatusRepository';
import UsersAccountsStatusRepository from '@modules/users/infra/typeorm/repositories/UsersAccountsStatusRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUsersAccountsStatusRepository>(
  'UsersAccountsStatusRepository',
  UsersAccountsStatusRepository
);
