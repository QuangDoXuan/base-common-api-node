import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createLessonsTable1614307541884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'lessons',
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

        await queryRunner.addColumn("lessons", new TableColumn({
            name: "category_id",
            type: "int",
            isNullable: true
        }));

        await queryRunner.createForeignKey("lessons", new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('lessons');
    }

}
