import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import RepproveCandidateService from './RepproveCandidateService';

let fakeUsersRepository: FakeUsersRepository;
let repproveCandidateService: RepproveCandidateService;

describe('RepproveCandidate', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    repproveCandidateService = new RepproveCandidateService(
      fakeUsersRepository,
    );
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

    await repproveCandidateService.execute({
      user_id: user.id,
    });

    const findUser = await fakeUsersRepository.findById(user.id);

    expect(findUser?.status_id).toBe(3);
  });

  it('should not be able to approve non exisitng candidate', async () => {
    await expect(
      repproveCandidateService.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
