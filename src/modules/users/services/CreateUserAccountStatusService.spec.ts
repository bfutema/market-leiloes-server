import AppError from '@shared/errors/AppError';

import FakeUsersAccountsRepository from '../repositories/fakes/FakeUsersAccountsStatusRepository';
import CreateUserAccountStatusService from './CreateUserAccountStatusService';

describe('CreateUserAccountStatus', () => {
  it('should be able to create a new status for user account', async () => {
    const fakeUsersAccountsStatusRepository = new FakeUsersAccountsRepository();

    const createUserAccountStatus = new CreateUserAccountStatusService(
      fakeUsersAccountsStatusRepository,
    );

    const userAccountStatus = await createUserAccountStatus.execute({
      description: 'status-test',
    });

    expect(userAccountStatus).toHaveProperty('id');
  });

  it('should not be able to create a new status for user account with same description from another', async () => {
    const fakeUsersAccountsStatusRepository = new FakeUsersAccountsRepository();

    const createUserAccountStatus = new CreateUserAccountStatusService(
      fakeUsersAccountsStatusRepository,
    );

    await createUserAccountStatus.execute({
      description: 'status-test',
    });

    await expect(
      createUserAccountStatus.execute({
        description: 'status-test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
