'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction,{
          as: "Transaction",
          foreignKey: {
              name: "artisId"
          }
      })
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};