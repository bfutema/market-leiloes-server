import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersAccountsStatusRepository from '@modules/users/repositories/IUsersAccountsStatusRepository';
import UsersAccountsStatusRepository from '@modules/users/infra/typeorm/repositories/UsersAccountsStatusRepository';

import IUserDocumentsRepository from '@modules/users/repositories/IUserDocumentsRepository';
import UserDocumentsRepository from '@modules/users/infra/typeorm/repositories/UserDocumentsRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ITempFilesRepository from '@modules/tempfiles/repositories/ITempFilesRepository';
import TempFilesRepository from '@modules/tempfiles/infra/typeorm/repositories/TempFilesRepository';

import IIdentityRolesRepository from '@modules/identity/repositories/IIdentityRolesRepository';
import IdentityRolesRepository from '@modules/identity/infra/typeorm/repositories/IdentityRolesRepository';

import IIdentityUserRolesRepository from '@modules/identity/repositories/IIdentityUserRolesRepository';
import IdentityUserRolesRepository from '@modules/identity/infra/typeorm/repositories/IdentityUserRolesRepository';

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

container.registerSingleton<IUserDocumentsRepository>(
  'UserDocumentsRepository',
  UserDocumentsRepository,
);

container.registerSingleton<ITempFilesRepository>(
  'TempFilesRepository',
  TempFilesRepository,
);

container.registerSingleton<IIdentityRolesRepository>(
  'IdentityRolesRepository',
  IdentityRolesRepository,
);

container.registerSingleton<IIdentityUserRolesRepository>(
  'IdentityUserRolesRepository',
  IdentityUserRolesRepository,
);
