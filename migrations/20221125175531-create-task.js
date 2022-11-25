'use strict';
/** @type {import('sequelize-cli').Migration} */
const { compareAsc, format } = require('date-fns')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      point: {
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
        defaultValue: `${Math.floor(Math.random() * 4)}${(Math.random() + 1).toString(36).substring(7)}`
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: format(new Date(Date.now()), 'yyyy/MM/dd h:mm:ss')
      },
    }, {
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};