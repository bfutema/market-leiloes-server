import AppError from '@shared/errors/AppError';

import FakeUsersAccountsRepository from '../repositories/fakes/FakeUsersAccountsStatusRepository';
import CreateUserAccountStatusService from './CreateUserAccountStatusService';

let fakeUsersAccountsStatusRepository: FakeUsersAccountsRepository;
let crateUsersAccountsStatusService: CreateUserAccountStatusService;

describe('CreateUserAccountStatus', () => {
  beforeEach(() => {
    fakeUsersAccountsStatusRepository = new FakeUsersAccountsRepository();

    crateUsersAccountsStatusService = new CreateUserAccountStatusService(
      fakeUsersAccountsStatusRepository,
    );
  });

  it('should be able to create a new status for user account', async () => {
    const userAccountStatus = await crateUsersAccountsStatusService.execute({
      description: 'status-test',
    });

    expect(userAccountStatus).toHaveProperty('id');
  });

  it('should not be able to create a new status for user account with same description from another', async () => {
    await crateUsersAccountsStatusService.execute({
      description: 'status-test',
    });

    await expect(
      crateUsersAccountsStatusService.execute({
        description: 'status-test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
