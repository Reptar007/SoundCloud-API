'use strict';

const { Op } = require("sequelize");

const albums = [
  {
    userId: 1,
    title: "Pacific DayDream",
    description: "a great album",
    imageUrl: "image.url",
  },
  {
    userId: 2,
    title: "Just like leaving",
    description: "a great album",
    imageUrl: "image.url",
  },
  {
    userId: 3,
    title: "Sorry",
    description: "a great album",
    imageUrl: "image.url",
  },
  {
    userId: 4,
    title: "hometwon",
    description: "a great album",
    imageUrl: "image.url",
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
   await queryInterface.bulkInsert("Albums", albums);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Albums", { [Op.or]: albums });
  }
};
