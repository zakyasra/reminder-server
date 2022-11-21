import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Tugas extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public deadline: string

  @column()
  public deskripsi: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: "userId", localKey: "id"
  })
  public user: BelongsTo<typeof User>
}
