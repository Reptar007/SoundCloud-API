'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert(
       "Users",
       [
         {
           firstName: "Sebas",
           lastName: "Smith",
           email: "demo@user.io",
           username: "Demo-lition",
           imageUrl: "image.url",
           hashedPassword: bcrypt.hashSync("password"),
         },
         {
           firstName: "Brin",
           lastName: "Smith",
           email: "user1@user.io",
           username: "FakeUser1",
           imageUrl: "image.url",
           hashedPassword: bcrypt.hashSync("password2"),
         },
         {
           firstName: "Ben",
           lastName: "Smith",
           email: "user2@user.io",
           username: "FakeUser2",
           imageUrl: "image.url",
           hashedPassword: bcrypt.hashSync("password3"),
         },
         {
           firstName: "Allen",
           lastName: "Smith",
           email: "user3@user.io",
           username: "FakeUser3",
           imageUrl: "image.url",
           hashedPassword: bcrypt.hashSync("password4"),
         },
       ],
       {}
     );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Users", {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2", 'FakeUser3'] },
      },{});
  }
};
