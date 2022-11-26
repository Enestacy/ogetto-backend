'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  User_Tags.init({
  }, {
    sequelize,
    modelName: 'User_Tags',
    tableName: 'user_tags',
    timestamps: false
  });
  return User_Tags;
};