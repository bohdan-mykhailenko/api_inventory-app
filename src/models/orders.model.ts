/* eslint-disable indent */
import { DataType, Model, Table, Column, HasMany } from 'sequelize-typescript';
import { Product } from './products.model';

@Table({
  tableName: 'orders',
  timestamps: false,
})
export class Order extends Model {
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

  @HasMany(() => Product, 'order_id')
  products!: Product[];
}
