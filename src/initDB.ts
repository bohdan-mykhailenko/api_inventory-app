import { Sequelize } from 'sequelize-typescript';
import { Order } from './models/orders.model';
import { Product } from './models/products.model';
import { db } from './db';

// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const initDB = () => {
  const DB_USERNAME = db.DB_USERNAME;
  const DB_PASSWORD = db.DB_PASSWORD;
  const DB_HOST = db.DB_HOST;
  const DB_NAME = db.DB_NAME;

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
