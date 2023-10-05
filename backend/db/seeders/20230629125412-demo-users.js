const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface) {
    const usersData = [
      {
        login: 'Ваня',
        email: 'vanya_ne@mail.ru',
        password: await bcrypt.hash('123', 10),

      },
      {
        login: 'Таня',
        email: 'tanya_ne@mail.ru',
        password: await bcrypt.hash('123', 10),

      },
      {
        login: 'Катя',
        email: 'katya_ne@gmail.com',
        password: await bcrypt.hash('123', 10),

      },
    ];
    const users = usersData.map((user) => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};