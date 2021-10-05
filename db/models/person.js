const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Person extends Sequelize.Model {}
  Person.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "firstName"',
        },
        notEmpty: {
          msg: 'Please provide a value for "firstName"',
        },
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for lastName"',
        },
        notEmpty: {
          msg: 'Please provide a value for "lastName"',
        },
      }
    }
  }, { 
    timestamps: false ,
    freezeTableName: true, 
    sequelize 
  });

  return Person
}