"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User_Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { }
  }
  User_Tasks.init(
    {
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User_Tasks",
      tableName: "user_tasks",
      timestamps: false,
    }
  );
  return User_Tasks;
};
