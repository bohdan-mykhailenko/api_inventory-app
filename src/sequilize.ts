import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { PGDATABASE, PGHOST, PGPASSWORD, PGUSER } from './db';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: PGHOST,
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
