"use strict";

const { Op } = require("sequelize");

const songs = [
  {
    albumId: 1,
    userId: 1,
    title: "Feels like summer",
    description: "Performed by Weezer",
    url: "audio url",
    imageUrl: "image.url",
  },
  {
    albumId: 2,
    userId: 2,
    title: "Just Like Leaving",
    description: "Performed by Bella White",
    url: "audio url",
    imageUrl: "image.url",
  },
  {
    albumId: 3,
    userId: 3,
    title: "Lemon Eyes",
    description: "Performed by Meg Meyers",
    url: "audio url",
    imageUrl: "image.url",
  },
  {
    albumId: 4,
    userId: 4,
    title: "Hometown",
    description: "Performed by Cleopatrick",
    url: "audio url",
    imageUrl: "image.url",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Songs", songs);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Songs", { [Op.or]: songs });
  },
};
