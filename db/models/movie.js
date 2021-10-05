const Sequelize = require('sequelize')
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    title: {
       type: Sequelize.STRING,
       allowNull: false,
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, { sequelize });

  return Movie;
}