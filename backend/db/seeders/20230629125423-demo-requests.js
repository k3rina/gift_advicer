/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    const requestsData = [
      {
        request: 'init req',
        is_Done: false,
        user_id: 1,
        step: 3,

      },
      {
        request: 'init req',
        is_Done: false,
        user_id: 2,
        step: 1,

      },
      {
        request: 'init req',
        is_Done: false,
        user_id: 3,
        step: 2,
      },

    ];
    const reqs = requestsData.map((req) => ({
      ...req,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Requests', reqs);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Requests');
  },
};
