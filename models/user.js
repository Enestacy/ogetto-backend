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
      this.belongsToMany(models.Tag, { through: models.User_Tags, onDelete: 'cascade' });
      this.belongsToMany(models.Task, { through: models.User_Tasks, onDelete: 'CASCADE', onUpdate: "CASCADE", });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    position: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.TEXT
    },
    office: {
      type: DataTypes.STRING
    },
    tg: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM(["quite", "active"])
    },
    date_of_birth: {
      type: DataTypes.STRING
    },
    grade: {
      type: DataTypes.ENUM(["Мидл", "Джуниор", "Синьор", "N/A"])
    },
    current_project: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  return User;
};