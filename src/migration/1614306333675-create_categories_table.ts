import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createCategoriesTable1614306333675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'categories',
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
                  name: 'title',
                  type: 'nvarchar',
                  isNullable: true,
                },
                {
                  name: 'image',
                  type: 'nvarchar(1000)',
                  isNullable: true,
                },
              ],
            }),
            true
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories');
    }

}
