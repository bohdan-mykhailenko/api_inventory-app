'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      serialNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isNew: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isRepairing: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      specification: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      guarantee: {
        type: Sequelize.JSONB,
      },
      price: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};
