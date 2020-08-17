import AppError from '@shared/errors/AppError';

import FakeUserDocumentsRepository from '../repositories/fakes/FakeUserDocumentsRepository';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserDocumentService from './CreateUserDocumentService';

let fakeUsersRepository: FakeUserRepository;
let fakeUserDocumentsRepository: FakeUserDocumentsRepository;
let createUserDocumentService: CreateUserDocumentService;

describe('CreateUserDocument', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeUserDocumentsRepository = new FakeUserDocumentsRepository();

    createUserDocumentService = new CreateUserDocumentService(
      fakeUsersRepository,
      fakeUserDocumentsRepository,
    );
  });

  it('should be able to create a new user document', async () => {
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

    const userDocument = await createUserDocumentService.execute({
      name: 'document.jpeg',
      size: 12333,
      key: 'asdfghjkl-document.jpeg',
      url: 'http://localhost:3333/users/documents/asdfghjkl-document.jpeg',
      user_id: user.id,
    });

    expect(userDocument).toHaveProperty('id');
  });

  it('should not be able to create a new user document from non existing user', async () => {
    await expect(
      createUserDocumentService.execute({
        name: 'document.jpeg',
        size: 13222,
        key: 'asdfghjkl-document.jpeg',
        url: 'http://localhost:3333/users/documents/asdfghjkl-document.jpeg',
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
