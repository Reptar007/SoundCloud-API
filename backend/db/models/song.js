'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo( models.User, {
        foreignKey: 'userId'
      })
      Song.belongsTo( models.Album, {
        foreignKey: 'albumId',
        onDelete: 'set null',
        hooks: true
      })
      Song.hasMany( models.Comment, {
        foreignKey: 'songId',
        onDelete: 'CASCADE',
        hooks: true
      })
      Song.belongsToMany( models.Playlist, {
        through: 'PlaylistSong',
        foreignKey: 'songId',
        otherKey: 'playlistId'
      })
    }
  }
  Song.init(
    {
      albumId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};