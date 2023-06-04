'use strict';
const bcrypt = require('bcrypt');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordPlain = 'JohnDoe1!';
    const salt = await bcrypt.genSalt(parseInt(process.env.NUMBER_SALT));
    const hash = await bcrypt.hash(passwordPlain, salt);

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        mobile:'+6421234567',
        password: hash,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
