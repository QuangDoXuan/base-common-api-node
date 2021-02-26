import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createQuestionsTable1614308630706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'questions',
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
                {
                    name: 'video',
                    type: 'nvarchar(1000)',
                    isNullable: true,
                },
                {
                    name: 'question_type',
                    type: 'int(1)',
                    isNullable: true,
                },
              ],
            }),
            true
        )

        await queryRunner.addColumn("questions", new TableColumn({
            name: "lesson_id",
            type: "int",
            isNullable: true
        }));

        await queryRunner.createForeignKey("questions", new TableForeignKey({
            columnNames: ["lesson_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "lessons",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('questions');
    }

}
