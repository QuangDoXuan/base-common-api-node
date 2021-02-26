import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey, Table} from "typeorm";

export class createAnswersTable1614314121825 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'answers',
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
                    name: 'answer_type',
                    type: 'int(1)',
                    isNullable: true,
                },
                {
                    name: 'question_id',
                    type: 'int',
                    isNullable: true,
                },
              ],
            }),
            true
        )

        await queryRunner.createForeignKey("answers", new TableForeignKey({
            columnNames: ["question_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "questions",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('answers');
    }

}
