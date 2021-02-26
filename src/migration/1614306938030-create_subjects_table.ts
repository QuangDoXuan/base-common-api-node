import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createSubjectsTable1614306938030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'subjects',
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

        await queryRunner.addColumn("categories", new TableColumn({
            name: "subject_id",
            type: "int",
            isNullable: true
        }));

        await queryRunner.createForeignKey("categories", new TableForeignKey({
            columnNames: ["subject_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "subjects",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('subjects');
        const table = await queryRunner.getTable("categories");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("subject_id") !== -1);
        await queryRunner.dropForeignKey("categories", foreignKey);
        await queryRunner.dropColumn("categories", "subject_id");
    }

}
