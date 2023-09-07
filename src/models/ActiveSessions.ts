import { DataTypes } from 'sequelize';
import sequelize from '../sequilize';

const ActiveSession = sequelize.define('ActiveSession', {
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default ActiveSession;
