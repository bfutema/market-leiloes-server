import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersAccountsStatusRepository from '@modules/users/repositories/IUsersAccountsStatusRepository';
import UsersAccountsStatusRepository from '@modules/users/infra/typeorm/repositories/UsersAccountsStatusRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IUsersAccountsStatusRepository>(
  'UsersAccountsStatusRepository',
  UsersAccountsStatusRepository,
);
