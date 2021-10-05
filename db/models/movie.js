const Sequelize = require('sequelize')
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    //** FOR UUID **//
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV1,
    //   primaryKey: true,
    // },
    title: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
         notEmpty: {
           msg: 'Please provide a value for "title"',
         },
         notNull: {
          msg: 'Please provide a value for "title"',
        },
       }
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "runtime"',
        },
        min: {
          args: 1,
          msg: 'Please provide a value greater than "0" for "runtime"',
        }
      }
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "releaseDate"',
        },
        isAfter: {
          args: '1895-12-27',
          msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',
        },
      }
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
       freezeTableName: true,
       paranoid: true, // enable "soft" deletes. paranoid option to true means that a destroyed record will not be physically deleted from the database, but it will also not be returned in future queries.
      sequelize 
  });

  return Movie;
}