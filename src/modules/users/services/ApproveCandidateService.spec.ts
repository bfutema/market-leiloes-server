import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ApproveCandidateService from './ApproveCandidateService';

let fakeUsersRepository: FakeUsersRepository;
let approveCandidateService: ApproveCandidateService;

describe('ApproveCandidate', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    approveCandidateService = new ApproveCandidateService(fakeUsersRepository);
  });

  it('should be able to approve new candidate', async () => {
    const user = await fakeUsersRepository.create({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      name: 'John',
      surname: 'Doe',
      cpf_cnpj: '12345678910',
      rg: '123456781',
      birth: new Date(),
      gender: 'M',
    });

    await approveCandidateService.execute({
      user_id: user.id,
    });

    const findUser = await fakeUsersRepository.findById(user.id);

    expect(findUser?.status_id).toBe(2);
  });

  it('should not be able to approve non exisitng candidate', async () => {
    await expect(
      approveCandidateService.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});