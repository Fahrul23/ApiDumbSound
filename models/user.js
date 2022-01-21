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
            name: "userId"
        }
    })
    }
  }
  User.init({
    fullName:DataTypes.STRING,
    email:DataTypes.STRING,
    phone:DataTypes.INTEGER,
    gender:DataTypes.STRING,
    address:DataTypes.INTEGER,
    subscribe: DataTypes.BOOLEAN,
    role:DataTypes.STRING,
    password:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};