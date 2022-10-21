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
           firstName: "Quackster",
           lastName: "McGee",
           email: "demo@user.io",
           username: "Demo-lition",
           imageUrl: "image.url",
           hashedPassword: bcrypt.hashSync("password"),
         },
         {
           firstName: "Dion",
           lastName: "Quackington",
           email: "user1@user.io",
           username: "Quackington",
           imageUrl: "image.url",
           hashedPassword: bcrypt.hashSync("password2"),
         },
         {
           firstName: "Quacker",
           lastName: "McDuck",
           email: "user2@user.io",
           username: "NotAQuack",
           imageUrl: "image.url",
           hashedPassword: bcrypt.hashSync("password3"),
         },
         {
           firstName: "JoJo",
           lastName: "M",
           email: "user3@user.io",
           username: "Waddelton",
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
