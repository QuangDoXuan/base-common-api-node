import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class createProvinceTable1610444156499 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'provinces',
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
            name: 'address',
            type: 'nvarchar',
            isNullable: true,
          },
        ],
      }),
      true
    )
    await queryRunner.addColumn("users", new TableColumn({
      name: "provinceId",
      type: "int",
      isNullable: true
    }));
    await queryRunner.createForeignKey("users", new TableForeignKey({
      columnNames: ["provinceId"],
      referencedColumnNames: ["id"],
      referencedTableName: "provinces",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('provinces');
    const table = await queryRunner.getTable("users");
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("provinceId") !== -1);
    await queryRunner.dropForeignKey("provinces", foreignKey);
    await queryRunner.dropColumn("users", "provinceId");
  }

}
