/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    const favoritesData = [
      {
        
        user_id: 1,
       nameFavor: 'ball fffffffffffffffffffffffff ffffffffffffffffff ffffffffffffffff',

      },
      {
        user_id: 1,
        nameFavor: 'mall',

      },
      {
        user_id: 3,
        nameFavor: 'doll',
      },

    ];
    const favor = favoritesData.map((req) => ({
      ...req,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Favorites', favor);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Favorites');
  },
};
