'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('products', [
      {
        serialNumber: 12345,
        isNew: true,
        isRepairing: false,
        photo: 'phone.jpg',
        title: 'Sample Product 1',
        type: 'Phones',
        specification: 'Sample Specification',
        guarantee: JSON.stringify({
          start: '2007-06-29 12:09:33',
          end: '2015-12-29 12:09:33'
        }),
        price: JSON.stringify([
          { value: 920, symbol: 'USD', isDefault: 0 },
          { value: 2100, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 1,
        date: '2023-09-10',
      },
      {
        serialNumber: 67890,
        isNew: false,
        isRepairing: true,
        photo: 'monitor.jpg',
        title: 'Sample Product 2',
        type: 'Monitors',
        specification: 'Another Sample Specification',
        guarantee: JSON.stringify({
          start: '2007-06-29 12:09:33',
          end: '2015-12-29 12:09:33'
        }),
        price: JSON.stringify([
          { value: 920, symbol: 'USD', isDefault: 0 },
          { value: 2100, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 1,
        date: '2023-09-15',
      },
      {
        serialNumber: 1234,
        isNew: false,
        isRepairing: false,
        photo: 'monitor.jpg',
        title: 'Product 7651',
        type: 'Monitors',
        specification: 'Specification 1',
        guarantee: JSON.stringify({
          start: '2017-06-29 12:09:33',
          end: '2017-12-29 12:09:33'
        }),
        price: JSON.stringify([
          { value: 750, symbol: 'USD', isDefault: 0 },
          { value: 5600, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 2,
        date: '2017-06-29 12:09:33',
      },
      {
        serialNumber: 2345,
        isNew: false,
        isRepairing: true,
        photo: 'phone.jpg',
        title: 'Product 221',
        type: 'Phones',
        specification: 'Specification 2',
        guarantee: JSON.stringify({
          start: '2018-07-01 10:00:00',
          end: '2019-01-01 10:00:00'
        }),
        price: JSON.stringify([
          { value: 200, symbol: 'USD', isDefault: 0 },
          { value: 3500, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 2,
        date: '2018-07-01 10:00:00',
      },
      {
        serialNumber: 3456,
        isNew: true,
        isRepairing: false,
        photo: 'phone.jpg',
        title: 'Product With Damage 612',
        type: 'Phones',
        specification: 'Specification 3',
        guarantee: JSON.stringify({
          start: '2019-08-15 08:30:00',
          end: '2020-02-15 08:30:00'
        }),
        price: JSON.stringify([
          { value: 50, symbol: 'USD', isDefault: 0 },
          { value: 1200, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 3,
        date: '2019-08-15 08:30:00',
      },
      {
        serialNumber: 4567,
        isNew: false,
        isRepairing: true,
        photo: 'laptop.jpg',
        title: 'Product 423',
        type: 'Laptops',
        specification: 'Specification 4',
        guarantee: JSON.stringify({
          start: '2020-03-20 14:45:00',
          end: '2021-03-20 14:45:00'
        }),
        price: JSON.stringify([
          { value: 800, symbol: 'USD', isDefault: 0 },
          { value: 18000, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 4,
        date: '2020-03-20 14:45:00',
      },
      {
        serialNumber: 5678,
        isNew: true,
        isRepairing: false,
        photo: 'tablet.jpg',
        title: 'Product 987',
        type: 'Tablets',
        specification: 'Specification 5',
        guarantee: JSON.stringify({
          start: '2021-04-12 09:15:00',
          end: '2022-04-12 09:15:00'
        }),
        price: JSON.stringify([
          { value: 300, symbol: 'USD', isDefault: 0 },
          { value: 7500, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 5,
        date: '2021-04-12 09:15:00',
      },
      {
        serialNumber: 6789,
        isNew: false,
        isRepairing: false,
        photo: 'phone.jpg',
        title: 'Product 123',
        type: 'Phones',
        specification: 'Specification 6',
        guarantee: JSON.stringify({
          start: '2022-05-25 18:30:00',
          end: '2023-05-25 18:30:00'
        }),
        price: JSON.stringify([
          { value: 400, symbol: 'USD', isDefault: 0 },
          { value: 9500, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 6,
        date: '2022-05-25 18:30:00',
      },
      {
        serialNumber: 7890,
        isNew: false,
        isRepairing: true,
        photo: 'monitor.jpg',
        title: 'Product Too Old 789',
        type: 'Monitors',
        specification: 'Specification 7',
        guarantee: JSON.stringify({
          start: '2023-06-10 12:00:00',
          end: '2024-06-10 12:00:00'
        }),
        price: JSON.stringify([
          { value: 20, symbol: 'USD', isDefault: 0 },
          { value: 500, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 2,
        date: '2023-06-10 12:00:00',
      },
      {
        serialNumber: 8901,
        isNew: true,
        isRepairing: false,
        photo: 'laptop.jpg',
        title: 'Product Very New 555',
        type: 'Laptops',
        specification: 'Specification 8',
        guarantee: JSON.stringify({
          start: '2024-07-20 15:30:00',
          end: '2025-07-20 15:30:00'
        }),
        price: JSON.stringify([
          { value: 600, symbol: 'USD', isDefault: 0 },
          { value: 14000, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 8,
        date: '2024-07-20 15:30:00',
      },
      {
        serialNumber: 9012,
        isNew: false,
        isRepairing: false,
        photo: 'tablet.jpg',
        title: 'Product New 333',
        type: 'Tablets',
        specification: 'Specification 9',
        guarantee: JSON.stringify({
          start: '2025-08-05 09:00:00',
          end: '2026-08-05 09:00:00'
        }),
        price: JSON.stringify([
          { value: 150, symbol: 'USD', isDefault: 0 },
          { value: 3600, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 9,
        date: '2025-08-05 09:00:00',
      },
      {
        serialNumber: 1012,
        isNew: true,
        isRepairing: true,
        photo: 'phone.jpg',
        title: 'Product Old 777',
        type: 'Phones',
        specification: 'Specification 10',
        guarantee: JSON.stringify({
          start: '2026-09-15 20:00:00',
          end: '2027-09-15 20:00:00'
        }),
        price: JSON.stringify([
          { value: 700, symbol: 'USD', isDefault: 0 },
          { value: 19000, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 10,
        date: '2026-09-15 20:00:00',
      },
      {
        serialNumber: 1012,
        isNew: true,
        isRepairing: true,
        photo: 'phone.jpg',
        title: 'Product Old 98765',
        type: 'Phones',
        specification: 'Specification 10',
        guarantee: JSON.stringify({
          start: '2026-09-15 20:00:00',
          end: '2027-09-15 20:00:00'
        }),
        price: JSON.stringify([
          { value: 700, symbol: 'USD', isDefault: 0 },
          { value: 19000, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 10,
        date: '2026-09-15 20:00:00',
      },
      {
        serialNumber: 1012,
        isNew: true,
        isRepairing: true,
        photo: 'phone.jpg',
        title: 'Product Old New 6522',
        type: 'Phones',
        specification: 'Specification 10',
        guarantee: JSON.stringify({
          start: '2026-09-15 20:00:00',
          end: '2027-09-15 20:00:00'
        }),
        price: JSON.stringify([
          { value: 700, symbol: 'USD', isDefault: 0 },
          { value: 19000, symbol: 'UAH', isDefault: 1 }
        ]),
        order_id: 10,
        date: '2026-09-15 20:00:00',
      },
    ]);
  },


  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
