"use strict";

const { Op } = require("sequelize");

const songs = [
  {
    albumId: 1,
    userId: 1,
    title: "LoFi Study",
    description: "When you're getting your study on but still want to jam",
    url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
    imageUrl: "https://i.imgur.com/VRl5ZdK.png",
  },
  {
    albumId: 2,
    userId: 1,
    title: "King Around Here",
    description: "The jam when you want to make an epic entrance",
    url: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3",
    imageUrl: "https://i.imgur.com/AgOPjNo.png",
  },
  {
    albumId: 3,
    userId: 1,
    title: "Tropical House Music",
    description: "When you're on the beach but that trying to jam",
    url: "https://cdn.pixabay.com/audio/2022/10/02/audio_c216ad4a20.mp3",
    imageUrl: "https://i.imgur.com/hwl6dKZ.png",
  },
  {
    albumId: 4,
    userId: 2,
    title: "Song of Little Ducks",
    description: "It makes sense here",
    url: "https://cdn.pixabay.com/audio/2022/06/27/audio_6c20d71794.mp3",
    imageUrl: "https://i.imgur.com/jwXJlHr.png",
  },
  {
    albumId: 4,
    userId: 2,
    title: "Jazzy Beat",
    description: "Feeling kinda jazzy tonight?",
    url: "https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3",
    imageUrl: "https://i.imgur.com/FUpMm3V.png",
  },
  {
    albumId: 4,
    userId: 2,
    title: "The Beast of Nature",
    description: "some country never hurt no one",
    url: "https://cdn.pixabay.com/audio/2022/10/14/audio_9939f792cb.mp3",
    imageUrl: "https://i.imgur.com/aRsp3vJ.png",
  },
  {
    albumId: 4,
    userId: 3,
    title: "In the Forest",
    description: "extra chill music",
    url: "https://cdn.pixabay.com/audio/2021/07/27/audio_202082aa0b.mp3",
    imageUrl: "https://i.imgur.com/QgMHFil.png",
  },
  {
    albumId: 4,
    userId: 3,
    title: "Powerful Beat",
    description: "Hype beat",
    url: "https://cdn.pixabay.com/audio/2022/10/05/audio_686ddcce85.mp3",
    imageUrl: "https://i.imgur.com/liuNmE4.png",
  },
  {
    albumId: 4,
    userId: 3,
    title: "Into The Night",
    description: "chill vibeeess",
    url: "https://cdn.pixabay.com/audio/2022/02/15/audio_1e79dbf2b9.mp3",
    imageUrl: "https://i.imgur.com/UHVr6OP.png",
  },
  {
    albumId: 4,
    userId: 4,
    title: "Powerful Stomp Rock",
    description: "Rocky vibezzz",
    url: "https://cdn.pixabay.com/audio/2022/07/03/audio_8938382846.mp3",
    imageUrl: "https://i.imgur.com/VYHVBAP.png",
  },
  {
    albumId: 4,
    userId: 4,
    title: "Country Rock and Roll",
    description: "Country? Rock? idk?",
    url: "https://cdn.pixabay.com/audio/2022/05/22/audio_d697fc0224.mp3",
    imageUrl: "https://i.imgur.com/VtnkVW6.png",
  },
  {
    albumId: 4,
    userId: 4,
    title: "LoFi Hip Hop",
    description: "Country? Rock? idk?",
    url: "https://cdn.pixabay.com/audio/2021/11/30/audio_b946bb80da.mp3",
    imageUrl: "https://i.imgur.com/GxnvIQO.png",
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
