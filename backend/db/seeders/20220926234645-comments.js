'use strict';

const { Op } = require("sequelize");

const comments = [
  {
    userId: 1,
    songId: 1,
    body: "wow what a great song",
  },
  {
    userId: 2,
    songId: 2,
    body: "wow what a great song",
  },
  {
    userId: 3,
    songId: 3,
    body: "wow what a great song",
  },
  {
    userId: 4,
    songId: 4,
    body: "wow what a great song",
  },
];

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
   await queryInterface.bulkInsert("Comments", comments);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Comments", { [Op.or]: comments });
  }
};
