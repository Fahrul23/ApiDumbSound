'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User,{
          as: "User",
          foreignKey: {
              name: "artisId"
          }
      })
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    attache: DataTypes.STRING,
    startDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};