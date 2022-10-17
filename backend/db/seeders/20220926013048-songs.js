"use strict";

const { Op } = require("sequelize");

const songs = [
  {
    albumId: 1,
    userId: 1,
    title: "Lofi Study",
    description: "When you're getting your study on but still want to jam",
    url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
    imageUrl: "https://i.imgur.com/jkFSiRi.png",
  },
  {
    albumId: 2,
    userId: 2,
    title: "King Around Here",
    description: "The jam when you want to make an epic entrance",
    url: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3",
    imageUrl: "https://i.imgur.com/RGpc4ut.png",
  },
  {
    albumId: 3,
    userId: 3,
    title: "Tropical House Music",
    description: "When you're on the beach but that trying to jam",
    url: "https://cdn.pixabay.com/audio/2022/10/02/audio_c216ad4a20.mp3",
    imageUrl: "https://i.imgur.com/UDbyTTI.png",
  },
  {
    albumId: 4,
    userId: 4,
    title: "Song of Little Ducks",
    description: "It makes sense here",
    url: "https://cdn.pixabay.com/audio/2022/06/27/audio_6c20d71794.mp3",
    imageUrl: "https://i.imgur.com/fG2pqVm.png",
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
