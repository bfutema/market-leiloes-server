import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class RelateUsersAndUsersAccountStatus1594333340073
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'status_id',
        type: 'integer',
        isNullable: false,
        default: 1,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'fk_status_id',
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users_account_status',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'fk_status_id');

    await queryRunner.dropColumn('users', 'status_id');
  }
}
