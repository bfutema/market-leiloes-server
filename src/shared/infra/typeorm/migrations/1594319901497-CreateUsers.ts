import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1594319901497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'newid()',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password_hash',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'surname',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cpf_cnpj',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'birth',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'rg',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'char',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'getdate()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'getdate()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
