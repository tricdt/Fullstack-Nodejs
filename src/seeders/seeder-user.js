'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'HoiDanIt',
      lastName: 'Eric',
      address: 'USA',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
