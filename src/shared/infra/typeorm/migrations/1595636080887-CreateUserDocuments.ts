import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserDocuments1595636080887
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_documents',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'newid()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'size',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'key',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'url',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'varchar',
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
        foreignKeys: [
          {
            name: 'UserDocument',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_documents');
  }
}
