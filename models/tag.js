'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Task, {
        foreignKey: 'tag',
        as: 'tag_title'
      });
      this.belongsToMany(models.User, { through: models.User_Tags, onDelete: 'SETNULL', onUpdate: "CASCADE", });
    }
  }
  Tag.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: false
  });
  return Tag;
};