'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('products', [
      {
        serialNumber: 12345,
        isNew: true,
        isRepairing: false,
        photo: 'sample.jpg',
        title: 'Sample Product 1',
        type: 'Sample Type',
        specification: 'Sample Specification',
        guarantee: JSON.stringify({ start: '2023-09-10', end: '2024-09-10' }),
        price: JSON.stringify([{ value: 100, symbol: '$', isDefault: 1 }]),
        order_id: 1,
        date: '2023-09-10',
      },
      {
        serialNumber: 67890,
        isNew: false,
        isRepairing: true,
        photo: 'another-sample.jpg',
        title: 'Sample Product 2',
        type: 'Another Sample Type',
        specification: 'Another Sample Specification',
        guarantee: JSON.stringify({ start: '2023-09-15', end: '2024-09-15' }),
        price: JSON.stringify([{ value: 150, symbol: '$', isDefault: 1 }]),
        order_id: 1,
        date: '2023-09-15',
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
