/* eslint-disable indent */
import { DataType, Model, Table, Column } from 'sequelize-typescript';

@Table({
  tableName: 'orders',
  timestamps: true,
})
class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date!: string;

  @Column({
    type: DataType.TEXT,
  })
  description!: string;
}

export default Order;
