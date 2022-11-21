import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tugases'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('deadline')
      table.text('deskripsi')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
