'use strict';

const { Op } = require("sequelize");

const albums = [
  {
    userId: 1,
    title: "Pacific DayDream",
    description: "a great album",
    imageUrl: "https://i.imgur.com/w2JwBfr.png",
  },
  {
    userId: 2,
    title: "Just like leaving",
    description: "a great album",
    imageUrl: "https://i.imgur.com/7ghGnUz.png",
  },
  {
    userId: 3,
    title: "Sorry",
    description: "a great album",
    imageUrl: "https://i.imgur.com/g4VNBwY.png",
  },
  {
    userId: 4,
    title: "hometwon",
    description: "a great album",
    imageUrl: "https://i.imgur.com/7GmCjuM.png",
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
