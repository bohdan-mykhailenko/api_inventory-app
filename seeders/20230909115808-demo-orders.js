'use strict';

module.exports = {
  up: async (queryInterface) => {
    const ordersData = [
      {
        title: 'Order #1 - Special Deal',
        date: '2017-09-01',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry\'s standard dummy text ever since the 1500s.',
      },
      {
        title: 'Order #2 - Summer Sale',
        date: '2020-09-12',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      },
      {
        title: 'Order #3 - Limited Edition',
        date: '2019-02-03',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry\'s standard dummy text ever since the 1500s.',
      },
      {
        title: 'Order #4 - Exclusive Offer',
        date: '2021-29-04',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      },
      {
        title: 'Order #5 - Holiday Season',
        date: '2019-13-24',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry\'s standard dummy text ever since the 1500s.',
      },
      {
        title: 'Order #6 - VIP Customer',
        date: '2012-09-06',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      },
      {
        title: 'Order #7 - Flash Sale',
        date: '2023-09-07',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry\'s standard dummy text ever since the 1500s.',
      },
      {
        title: 'Order #8 - Limited Time Offer',
        date: '2018-19-08',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      },
      {
        title: 'Order #9 - Spring Collection',
        date: '2022-06-09',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry\'s standard dummy text ever since the 1500s.',
      },
      {
        title: 'Order #10 - Clearance Sale',
        date: '2020-09-10',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
      }
    ];

    await queryInterface.bulkInsert('orders', ordersData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('orders', null, {});
  },
};
