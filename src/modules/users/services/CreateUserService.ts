/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable, inject, container } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITempFilesRepository from '@modules/tempfiles/repositories/ITempFilesRepository';
import TempFile from '@modules/tempfiles/infra/typeorm/schemas/TempFile';
import IUserDocumentsRepository from '@modules/users/repositories/IUserDocumentsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import CreateUserDocumentService from './CreateUserDocumentService';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  cpf_cnpj: string;
  rg: string;
  birth: Date;
  gender: string;
  avatar_id: string;
  documents_ids: string[];
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TempFilesRepository')
    private tempFilesRepository: ITempFilesRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('UserDocumentsRepository')
    private userDocumentsRepository: IUserDocumentsRepository,
  ) {}

  public async execute({
    username,
    email,
    password,
    name,
    surname,
    cpf_cnpj,
    rg,
    birth,
    gender,
    avatar_id,
    documents_ids,
  }: IRequest): Promise<User> {
    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError('Email address already used.');
    }

    const checkUsernameExists = await this.usersRepository.findByUsername(
      username,
    );

    if (checkUsernameExists) {
      throw new AppError('Username already used.');
    }

    if (!documents_ids) {
      throw new AppError('Please, fill documents field');
    }

    const avatar = await this.tempFilesRepository.findById(avatar_id);

    if (avatar_id && !avatar) {
      throw new AppError('Avatar not found');
    }

    const documents = await this.tempFilesRepository.listInIds(documents_ids);

    if (!documents_ids) {
      throw new AppError('Documents not found');
    }

    const password_hash = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      username,
      email,
      password_hash,
      name,
      surname,
      cpf_cnpj,
      rg,
      birth,
      gender,
    });

    if (avatar) {
      await this.storageProvider.saveFile(avatar.key);
      await this.tempFilesRepository.delete(avatar_id);

      await this.userDocumentsRepository.create({
        name: avatar.name,
        size: avatar.size,
        key: avatar.key,
        url: avatar.url,
        user_id: user.id,
      });
    }

    if (documents.length === documents_ids.length) {
      const saveDocumentsPromise: any = [];

      documents.forEach((document: TempFile) => {
        saveDocumentsPromise.push(this.storageProvider.saveFile(document.key));
      });

      await Promise.all(saveDocumentsPromise);

      const deleteDocumentsPromise: any = [];

      documents.forEach((document: TempFile) => {
        deleteDocumentsPromise.push(
          this.tempFilesRepository.delete(document.id.toString()),
        );
      });

      await Promise.all(deleteDocumentsPromise);

      const createDocuments: any = [];

      documents.forEach((document: TempFile) => {
        createDocuments.push(
          this.userDocumentsRepository.create({
            name: document.name,
            size: document.size,
            key: document.key,
            url: document.url,
            user_id: user.id,
          }),
        );
      });

      await Promise.all(createDocuments);
    }

    const welcomeNewUserTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'welcome_new_user.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[MARKET Leilões] Cadastro Enviado',
      templateData: {
        file: welcomeNewUserTemplate,
        variables: {
          name: user.name,
        },
      },
    });

    return user;
  }
}

export default CreateUserService;
