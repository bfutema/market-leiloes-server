import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import RepproveCandidateService from './RepproveCandidateService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let repproveCandidateService: RepproveCandidateService;

describe('RepproveCandidate', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();

    repproveCandidateService = new RepproveCandidateService(
      fakeUsersRepository,
      fakeMailProvider,
    );
  });

  it('should be able to repprove new candidate', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

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
      account_type: 'client',
    });

    await repproveCandidateService.execute({
      user_id: user.id,
    });

    const findUser = await fakeUsersRepository.findById(user.id);

    expect(findUser?.status_id).toBe(3);
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to repprove non exisitng candidate', async () => {
    await expect(
      repproveCandidateService.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
