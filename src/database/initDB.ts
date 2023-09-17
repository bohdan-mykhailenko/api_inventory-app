import { Sequelize } from 'sequelize-typescript';
import { Order } from '../models/orders.model';
import { Product } from '../models/products.model';
import { config } from './config';

export const initDB = () => {
  const DB_USERNAME = config.DB_USERNAME;
  const DB_PASSWORD = config.DB_PASSWORD;
  const DB_HOST = config.DB_HOST;
  const DB_NAME = config.DB_NAME;

  const URI = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

  if (!URI) {
    throw new Error('DB_URI is not defined in the environment variables.');
  }

  const sequelize = new Sequelize(URI, {
    models: [Order, Product],
    dialectOptions: {
      ssl: true,
    },
  });

  return sequelize;
};
