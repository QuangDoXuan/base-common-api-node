import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class createUserTable1579247286346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'nvarchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'nvarchar',
            isNullable: true,
            isUnique: true
          },
          {
            name: 'password',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'signUpBy',
            type: 'int',
            default: 0,
          },
          {
            name: 'role',
            type: 'int',
            isNullable: true,
            default: 0
          },
          {
            name: 'status',
            type: 'int',
            default: 0,
          },
          {
            name: 'verifyToken',
            type: 'nvarchar',
            isNullable: true
          },
          {
            name: 'notification',
            type: 'boolean',
            default: false,
          },
          {
            name: 'lastLogin',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'softDelete',
            type: 'boolean',
            default: 'false'
          },
          {
						name: 'createdAt',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'updatedAt',
						type: 'timestamp',
						default: 'now()'
          },
          {
						name: 'expiredToken',
						type: 'timestamp',
						default: 'now()'
          },
          {
            name: 'openId',
            type: 'nvarchar',
            isNullable: true
          },
          {
            name: 'loginType',
            type: 'int',
            default: 0
          }
        ],
      }),
      true
    )
  }
 
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
